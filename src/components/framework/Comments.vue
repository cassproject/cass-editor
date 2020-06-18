<!--
    This template is used to show the comments by framework
    This is controlled by an event sent from the EditorToolbar.vue template
    which triggers Framework.vue to open this component.
-->
<template>
    <aside
        id="right-side-bar__comments"
        class="menu has-background-lightest">
        <div class="right-aside-bar__title">
            <h3 class="title is-size-3">
                Comments
            </h3>
        </div>
        <!-- for each comment in time sequence
            click to scroll to position in framework eventually -->
        <!-- for each response -->
        <div
            v-if="isCommentsBusy"
            class="has-text-centered">
            <span class="icon is-large has-text-center has-text-link">
                <i class="fas fa-3x fa-spinner is-info fa-pulse" />
            </span>
        </div>
        <div v-if="!isCommentsBusy">
            <div
                v-if="commentWrapperList.length <= 0"
                class="has-text-centered">
                <span class="has-text-center">
                    <p><i class="fa fa-exclamation-circle" /> No comments available</p>
                </span>
            </div>
            <template v-if="commentWrapperList.length > 0">
                <div
                    v-for="(commentWrapper, index) in commentWrapperList"
                    :key="index"
                    class="comment-list">
                    <h4
                        class="comment-list__about"
                        @click="setUpScroll(commentWrapper)">
                        {{ commentWrapper.aboutName }}
                    </h4>
                    <Comment
                        :comment="commentWrapper"
                        :key="commentWrapper.commentId"
                        :canReply="canReplyToComments" />
                    <div class="buttons is-right">
                        <div
                            class="button is-small is-outlined is-primary"
                            title="reply"
                            @click="handleClickReply(commentWrapper)">
                            <span class="icon">
                                <i class="fa fa-reply" />
                            </span>
                            <span>reply</span>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </aside>
</template>
<script>
import Comment from './Comment.vue';
import common from '@/mixins/common.js';

export default {
    name: 'Comments',
    mixins: [common],
    data() {
        return {
            COMMENT_SEARCH_SIZE: 10000,
            isCommentsBusy: false,
            localFrameworkCommentList: [],
            commentAboutMap: {},
            commentWrapperList: [],
            commentWrapperMap: {},
            canReplyToComments: false
        };
    },
    components: {
        Comment
    },
    methods: {
        setUpScroll: function(comment) {
            let scrollObj = {ts: Date.now(), scrollId: '#scroll-' + comment.aboutId.split('/').pop()};
            this.$store.commit('editor/setCommentScrollTo', scrollObj);
        },
        handleClickReply: function(comment) {
            this.$store.commit('editor/setAddCommentAboutId', comment.aboutId);
            this.$store.commit('editor/setAddCommentType', 'reply');
            this.$store.commit('editor/setCommentToReply', comment.comment);
            this.$store.commit('app/showModal', {component: 'AddComment'});
        },
        determineCanModifyComment: function(comment) {
            if (this.loggedOnPerson.shortId().equals(comment.creator)) return true;
            else return false;
        },
        buildCommentWrapper: function(comment, aboutName, isTopLevel) {
            let commentWrapper = {};
            let commentCreatorPerson = this.frameworkCommentPersonMap[comment.creator];
            commentWrapper.comment = comment;
            commentWrapper.creator = commentCreatorPerson;
            commentWrapper.aboutId = comment.about;
            commentWrapper.aboutName = aboutName;
            commentWrapper.commentId = comment.shortId();
            commentWrapper.creatorName = commentCreatorPerson.name;
            commentWrapper.creatorEmail = commentCreatorPerson.email;
            commentWrapper.dateCreated = comment.dateCreated - 0;
            if (comment.lastEditDate) commentWrapper.lastEditDate = comment.lastEditDate - 0;
            commentWrapper.commentText = comment.text;
            commentWrapper.isTopLevel = isTopLevel;
            commentWrapper.canModify = this.determineCanModifyComment(comment);
            commentWrapper.replies = [];
            return commentWrapper;
        },
        buildFrameworkCommentWrappers: function() {
            let fwkComments = this.commentAboutMap[this.currentFramework.shortId()];
            if (fwkComments && fwkComments.length > 0) {
                for (let fc of fwkComments) {
                    let cw = this.buildCommentWrapper(fc, this.currentFramework.getName(), true);
                    this.commentWrapperList.push(cw);
                    this.commentWrapperMap[fc.shortId()] = cw;
                }
            }
        },
        getCompetencyName(compId) {
            let comp = EcRepository.getBlocking(compId);
            if (comp) return comp.getName();
            else return 'Unknown Competency';
        },
        buildCompetencyCommentWrappers: function() {
            if (this.currentFramework.competency) {
                for (let fwkCompId of this.currentFramework.competency) {
                    let compComments = this.commentAboutMap[fwkCompId];
                    if (compComments && compComments.length > 0) {
                        let compName = this.getCompetencyName(fwkCompId);
                        for (let cc of compComments) {
                            let cw = this.buildCommentWrapper(cc, compName, true);
                            this.commentWrapperList.push(cw);
                            this.commentWrapperMap[cc.shortId()] = cw;
                        }
                    }
                }
            }
        },
        addRepliesToParentWrapper: function(replyList) {
            for (let replyId of replyList) {
                let reply = this.commentWrapperMap[replyId];
                let replyAboutId = reply.aboutId;
                let parent = this.commentWrapperMap[replyAboutId];
                if (parent) parent.replies.push(reply);
            }
        },
        buildReplyCommentWrappers: function() {
            let replyList = [];
            for (let c of this.frameworkCommentList) {
                let commentId = c.shortId();
                let commentReplies = this.commentAboutMap[commentId];
                if (commentReplies && commentReplies.length > 0) {
                    for (let cr of commentReplies) {
                        let cw = this.buildCommentWrapper(cr, 'reply', false);
                        this.commentWrapperMap[cr.shortId()] = cw;
                        replyList.push(cr.shortId());
                    }
                }
            }
            this.addRepliesToParentWrapper(replyList);
        },
        buildCommentDisplayStructures: function() {
            this.buildFrameworkCommentWrappers();
            this.buildCompetencyCommentWrappers();
            this.buildReplyCommentWrappers();
        },
        buildCommentAboutMap: function() {
            for (let c of this.frameworkCommentList) {
                let ca = c.about;
                if (!this.commentAboutMap[ca]) this.commentAboutMap[ca] = [];
                this.commentAboutMap[ca].push(c);
            }
        },
        parseComments: function() {
            if (!this.currentFramework) this.clearAllFrameworkCommentData();
            else {
                this.isCommentsBusy = true;
                this.commentAboutMap = {};
                this.commentWrapperList = [];
                this.commentWrapperMap = {};
                this.buildCommentAboutMap();
                this.buildCommentDisplayStructures();
                this.isCommentsBusy = false;
            }
        },
        buildFrameworkCommentPersonMapSuccess: function(ecPersonList) {
            let commentPersonMap = {};
            for (let p of ecPersonList) {
                commentPersonMap[p.shortId()] = p;
            }
            this.$store.commit('editor/setFrameworkCommentDataLoaded', true);
            this.$store.commit('editor/setFrameworkCommentPersonMap', commentPersonMap);
            this.$store.commit('editor/setFrameworkCommentList', this.localFrameworkCommentList); // this SHOULD trigger parseComments
        },
        buildFrameworkCommentPersonMapFailure: function(msg) {
            console.log('buildFrameworkCommentPersonMapFailure: ' + msg);
            this.isCommentsBusy = false;
        },
        buildCommentCreatorList: function() {
            let commentCreators = [];
            for (let c of this.localFrameworkCommentList) {
                if (!commentCreators.includes(c.creator)) commentCreators.push(c.creator);
            }
            return commentCreators;
        },
        buildFrameworkCommentPersonMap: function() {
            let commentCreators = this.buildCommentCreatorList();
            if (commentCreators.length > 0) {
                window.repo.multiget(commentCreators, this.buildFrameworkCommentPersonMapSuccess, this.buildFrameworkCommentPersonMapFailure);
            } else this.buildFrameworkCommentPersonMapSuccess([]);
        },
        sortLocalFrameworkCommentList() {
            this.localFrameworkCommentList.sort(function(c1, c2) {
                if (c1.dateCreated - 0 > c2.dateCreated - 0) return 1;
                else if (c2.dateCreated - 0 > c1.dateCreated - 0) return -1;
                else return 0;
            });
        },
        buildFrameworkCommentListSuccess: function(ecCommentList) {
            this.localFrameworkCommentList = ecCommentList;
            this.sortLocalFrameworkCommentList();
            this.buildFrameworkCommentPersonMap();
        },
        buildFrameworkCommentListFailure: function(msg) {
            console.log('buildFrameworkCommentListFailure: ' + msg);
            this.isCommentsBusy = false;
        },
        clearAllFrameworkCommentData: function() {
            this.isCommentsBusy = false;
            this.localFrameworkCommentList = [];
            this.commentAboutMap = {};
            this.commentWrapperList = [];
            this.commentWrapperMap = {};
            this.canReplyToComments = false;
        },
        buildFrameworkCommentList: function() {
            if (!this.currentFramework) this.clearAllFrameworkCommentData();
            else {
                let paramObj = {};
                paramObj.size = this.COMMENT_SEARCH_SIZE;
                EcComment.search(window.repo,
                    'isBasedOn:"' + this.currentFramework.shortId() + '"',
                    this.buildFrameworkCommentListSuccess,
                    this.buildFrameworkCommentListFailure,
                    null);
            }
        },
        buildCommentDataSet: function() {
            if (!this.frameworkCommentList || this.frameworkCommentList.length <= 0) {
                this.isCommentsBusy = true;
                this.buildFrameworkCommentList();
            } else this.parseComments();
        }
    },
    computed: {
        loggedOnPerson: function() {
            return this.$store.getters['user/loggedOnPerson'];
        },
        currentFramework: function() {
            return this.$store.getters['editor/framework'];
        },
        currentFrameworkCompetencies: function() {
            return this.$store.getters['editor/framework'].competency;
        },
        frameworkCommentList: function() {
            return this.$store.getters['editor/frameworkCommentList'];
        },
        frameworkCommentPersonMap: function() {
            return this.$store.getters['editor/frameworkCommentPersonMap'];
        }
    },
    watch: {
        currentFrameworkCompetencies: function() {
            this.parseComments();
        },
        frameworkCommentList: function() {
            this.parseComments();
        }
    },
    mounted: function() {
        this.buildCommentDataSet();
        this.canReplyToComments = this.canAddCommentsCurrentFramework();
    }
};
</script>

<style lang="scss">
    @import './../../scss/variables.scss';

    /** Commented this out for now...it was confusing me with respect to the style in RightAside.vue**/
    /**
#right-side-bar__comments {
    position: fixed;
    border-left: solid 1px rgba($dark, .4);
    z-index: 10;
    height: calc(100vh - 48px);
    overflow: scroll;
    right: 0;
    padding: 2.5rem 1.5rem;
    width: 340px;
    transform: translateX(0);
    .comment-list {
        .comment-list__user {
            font-weight: 700;
        }
        .comment-list__email {
            font-size: .7rem;
            font-weight: 500;
            font-style: italic;
            margin-left: .5rem;
        }
        .comment-list__user {
            font-weight: 700;
        }
        .comment-list__message {
            font-size: .7rem;
        }
        .comment-list__about, .comment-list__timestamp {
            font-size: .7rem;
            font-weight: 600;
        }
        .comment-list__nested {
            padding-left: .5rem;
        }
    }

}
**/

</style>

