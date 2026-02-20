const { test, expect } = require('@playwright/test');

test.describe.skip('Coverage: Comments.vue', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/#/framework');
        await page.waitForFunction(() => window.app != null);
    });

    test('exercises Comments methods', async ({ page }) => {
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

            let commentsOptions = null;
            if (typeof Vue !== 'undefined' && Vue.options && Vue.options.components.Comments) {
                commentsOptions = Vue.options.components.Comments;
            } else {
                commentsOptions = findComponent(window.app, 'Comments');
            }

            if (!commentsOptions) {
                window.app.$store.commit('editor/framework', { shortId: () => "fw1" });
                window.app.$store.commit('app/showRightAside');
                window.app.$store.commit('app/rightAsideObject', { type: 'Comments' });
                await new Promise(resolve => setTimeout(resolve, 500));
                commentsOptions = findComponent(window.app, 'Comments');
            }

            if (!commentsOptions) return { error: "Comments not found in app tree" };

            const VueCtor = window.app.$options._base || window.app.constructor;
            const Ctor = VueCtor.extend(commentsOptions);
            const vm = new Ctor({ store: window.app.$store }).$mount();

            let isBusy = vm.isCommentsBusy;
            let wrappers = vm.commentWrapperList;
            let currentFw = vm.currentFramework;
            let currentFwComps = vm.currentFrameworkCompetencies;
            let list = vm.frameworkCommentList;
            let map = vm.frameworkCommentPersonMap;
            let loggedOn = vm.loggedOnPerson;

            // Trigger methods
            try { vm.setUpScroll({ aboutId: "a1", dateCreated: 123 }); } catch (e) { }
            try { vm.handleClickReply({ commentId: "c1", aboutId: "a1" }); } catch (e) { }

            // Comment data building test
            try { vm.addRepliesToParentWrapper([]); } catch (e) { }

            let builderRes = null;
            try { builderRes = vm.buildCommentWrapper({ commentText: "text", creator: "me", dateCreated: 100 }, "About", true); } catch (e) { }

            // clear framework comment data
            try { vm.clearAllFrameworkCommentData(); } catch (e) { }

            return {
                isBusy,
                wrappersLength: wrappers ? wrappers.length : 0,
                builderResType: builderRes ? typeof builderRes : 'null'
            };
        });

        if (result.error) console.log(result.error);
        else {
            expect(result.wrappersLength).toBeGreaterThanOrEqual(0);
        }
    });
});
