<template>
    <ul class="comment-list">
        <li class="comment-list__user">
            user name
        </li>
        <li class="comment-list__message">
            In vel auctor orci, a egestas nunc. Aenean
            consectetur elementum risus, nec sodales
            sem volutpat vitae. Donec scelerisque
            lectus id tortor ultricies maximus. Nulla
            mattis condimentum egestas. Cras facilisis
            diam sit amet erat volutpat scelerisque.
            Donec a vulputate elit. Nulla tempus massa
            sed faucibus venenatis. Nulla feugiat quam
            eu lectus tristique, id elementum lorem aliquam.
        </li>
        <li class="comment-list__timestamp">
            Monday, July 12th 08:26 p.m.
        </li>
        <li class="comment-list__action">
            <div class="buttons is-right">
                <div
                    v-if="isViewer || isAdmin"
                    class="button is-small is-text">
                    <div class="icon">
                        <i class="fa fa-reply" />
                    </div>
                </div>
                <div
                    v-if="isCommenter || isAdmin"
                    class="button is-small is-text">
                    <div class="icon">
                        <i class="fa fa-trash" />
                    </div>
                </div>
                <div
                    v-if="isCommenter"
                    class="button is-small is-text">
                    <div class="icon">
                        <i class="fa fa-edit" />
                    </div>
                </div>
            </div>
        </li>
        <!-- can make this recursive for nested components
            don't turn on until you have a way to end the loop or else
            infinite but you probably know that... :)-->
        <Comment v-if="false" />
    </ul>
</template>

<script>
export default {
    name: 'Comment',
    components: {
    },
    props: {
        isAdmin: Boolean,
        isCommenter: Boolean,
        isViewer: Boolean
    }
};
</script>