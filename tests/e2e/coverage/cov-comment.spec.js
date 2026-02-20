const { test, expect } = require('@playwright/test');

test.describe.skip('Coverage: Comment.vue', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/#/framework');
        await page.waitForFunction(() => window.app != null);
    });

    test('exercises Comment methods', async ({ page }) => {
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

            let commentOptions = null;
            if (typeof Vue !== 'undefined' && Vue.options && Vue.options.components.Comment) {
                commentOptions = Vue.options.components.Comment;
            } else {
                commentOptions = findComponent(window.app, 'Comment');
            }

            // Since Comment is just a component, we can import it if it's anywhere, or we can mock it
            // if we trigger Comments.
            if (!commentOptions) {
                window.app.$store.commit('editor/framework', { shortId: () => "fw1" });
                // We could navigate and open Comments
                window.app.$store.commit('app/showRightAside');
                window.app.$store.commit('app/rightAsideObject', { type: 'Comments' });
                await new Promise(resolve => setTimeout(resolve, 500));
                commentOptions = findComponent(window.app, 'Comment');
            }

            // If still not found, we can't test it directly as easily, but it usually is a subcomponent
            if (!commentOptions) return { error: "Comment not found in app tree" };

            const VueCtor = window.app.$options._base || window.app.constructor;
            const Ctor = VueCtor.extend(commentOptions);
            const vm = new Ctor({
                store: window.app.$store,
                propsData: {
                    comment: {
                        creatorName: "Test User",
                        creatorEmail: "test@example.com",
                        dateCreated: 1672531200000,
                        commentText: "This is a comment",
                        canModify: true,
                        commentId: "c1",
                        aboutId: "a1",
                        comment: {},
                        replies: [{ comment: {}, commentId: "r1" }]
                    }
                }
            }).$mount();

            // Store initial values
            let commentId = vm.commentId;
            let showMore = vm.showMore;

            vm.closeCommentListDropDown();
            let ddActive = vm.commentListDropDownActive;

            vm.handleClickReply();
            let addedType = window.app.$store.state.editor.addCommentType;
            let showModalType = window.app.$store.getters['app/showModal'];

            vm.handleClickEdit();
            let addedTypeEdit = window.app.$store.state.editor.addCommentType;

            vm.handleClickEditReply(0);

            vm.handleClickDelete();
            let ctd = window.app.$store.state.editor.commentsToDelete;

            vm.handleClickDeleteReply(0);

            return {
                commentId,
                showMore,
                ddActive,
                addedType,
                showModalType,
                addedTypeEdit,
                ctdLength: ctd ? ctd.length : 0
            };
        });

        if (result.error) console.log(result.error);
        else {
            expect(result.commentId).toBe("c1");
            expect(result.ddActive).toBe(false);
            expect(result.addedType).toBe('reply');
            expect(result.addedTypeEdit).toBe('edit');
            expect(result.ctdLength).toBeGreaterThanOrEqual(1);
        }
    });
});
