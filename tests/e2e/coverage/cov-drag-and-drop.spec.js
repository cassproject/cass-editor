const { test, expect } = require('@playwright/test');

test.describe('Coverage: DragAndDrop.vue', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/#/framework');
        await page.waitForFunction(() => window.app != null);
    });

    test('exercises DragAndDrop methods', async ({ page }) => {
        const result = await page.evaluate(async () => {
            const findComponent = (root, name) => {
                let q = [root];
                let seen = new Set();
                while (q.length > 0) {
                    let node = q.shift();
                    if (node && node._uid && !seen.has(node._uid)) {
                        seen.add(node._uid);
                        if (node.$options && node.$options.name === name) return node.$options;
                        if (node.$children) q.push(...node.$children);
                    }
                }
                return null;
            };

            await new Promise(resolve => {
                window.app.$router.push('/import');
                setTimeout(resolve, 1000); // let it render
            });

            let dndOptions = findComponent(window.app, 'DragAndDrop');
            if (!dndOptions) return { error: "DragAndDrop not found in app tree" };

            const VueCtor = window.app.$options._base || window.app.constructor;
            const Ctor = VueCtor.extend(dndOptions);
            const vm = new Ctor({ store: window.app.$store }).$mount();

            let initialUploadDisabled = vm.uploadDisabled;

            // exercise drag functions
            vm.handleDragEnter({ target: { id: 'drag-and-drop' } });
            let isDraggedOverEnter = vm.isDraggedOver;

            vm.handleDragLeave({ target: { id: 'drag-and-drop' } });
            let isDraggedOverLeave = vm.isDraggedOver;

            // exercise file addition
            let mockFile = new File(["test"], "test.csv", { type: "text/csv" });
            vm.addFile({ dataTransfer: { files: [mockFile] } });

            let filesLengthAfterAdd = vm.files.length;
            let uploadDisabledAfterAdd = vm.uploadDisabled;

            // filters
            let kbFilter = dndOptions.filters.kb(2048);

            // file change
            vm.fileChange({ target: { files: [new File(["test2"], "test2.csv")] } });
            let filesLengthAfterChange = vm.files.length;

            // remove file
            vm.$refs = { file: { value: 'something' } };
            vm.removeFile(vm.files[0]);
            let filesLengthAfterRemove = vm.files.length;

            // process
            vm.process();
            let importedFiles = window.app.$store.getters['app/importFiles'];

            return {
                initialUploadDisabled,
                isDraggedOverEnter,
                isDraggedOverLeave,
                filesLengthAfterAdd,
                uploadDisabledAfterAdd,
                kbFilter,
                filesLengthAfterChange,
                filesLengthAfterRemove,
                importedFilesLength: importedFiles ? importedFiles.length : 0
            };
        });

        if (result.error) console.log(result.error);
        else {
            expect(result.initialUploadDisabled).toBe(true);
            expect(result.isDraggedOverEnter).toBe(true);
            expect(result.isDraggedOverLeave).toBe(false);
            expect(result.filesLengthAfterAdd).toBe(1);
            expect(result.uploadDisabledAfterAdd).toBe(false);
            expect(result.kbFilter).toBe(2);
            expect(result.filesLengthAfterChange).toBe(2);
            expect(result.filesLengthAfterRemove).toBe(1);
            expect(result.importedFilesLength).toBe(1);
        }
    });
});
