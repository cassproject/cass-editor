<template>
    <div
        :class="!simple ? 'has-secondary' : ''"
        class="cass--main-layout">
        <div
            :class="simpleClass"
            class="cass--main-layout--primary-top">
            <slot name="top" />
        </div>
        <div
            v-if="!simple"
            class="cass--main-layout--secondary-top">
            <slot name="secondary-top" />
        </div>
        <div
            class="cass--main-layout--body"
            :class="topBarClass">
            <slot name="body" />
        </div>
        <div
            v-if="rightActive"
            class="cass--main-layout--right"
            :class="topBarClass">
            <slot name="right" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'MainLayout',
    data() {
        return {
        };
    },
    props: {
        rightActive: {
            type: Boolean,
            default: false
        },
        simple: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        simpleClass() {
            return {
                'is-simple-top-bar': this.simple
            };
        },
        topBarClass() {
            return {
                'has-simple-top-bar': this.simple,
                'has-secondary-top-bar': !this.simple,
                'regular-top-bar': !this.simple
            };
        }
    }
};
</script>

<style lang="scss">
.cass--main-layout {
    height: 100vh;
}
.cass--main-layout--primary-top {
    position: absolute;
    width:calc(100% - 64px);
    top: 0px;
    padding: 0rem 1rem;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    z-index:30;
    border-bottom: solid 1px black;
}
.cass--main-layout--primary-top.is-simple-top-bar {
    height: 48px;
}
.cass--main-layout--secondary-top {
    position: absolute;
    text-align: left;
    top: 60px;
    padding: .25rem 1rem;
    width:calc(100% - 64px);
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: white;
    z-index:13;
    border-bottom: solid 1px black;
    color: black;
}
.cass--main-layout--body {
    height: calc(100vh - 100px);
    overflow: hidden;
    margin-top: 100px;
    width: 100%;
}
.cass--main-layout--body.has-simple-top-bar{
    height: calc(100vh - 48px);
    overflow: auto;
    margin-top: 48px;
    width: 100%;
}
.cass--main-layout--body.has-regular-top-bar{
    top: calc( 60px + 48px);
}
.cass--main-layout--right {
    z-index:10;
    position: absolute;
    right: 0;
    width: min(360px, calc(100vw - 64px));
    top: 100px;
    height: calc(100vh - 100px);

}
.cass--main-layout--right.has-simple-top-bar {
    top: 48px;
    height: calc(100vh - 48px);
}
.has-banner {
    .cass--main-layout--primary-top {
        top: 15px;
    }
    .cass--main-layout--secondary-top {
        top: 75px;
    }
    .cass--main-layout--body {
        height: calc(100vh - 130px);
        margin-top: 100px;
    }
    .cass--main-layout--body.has-simple-top-bar {
        height: calc(100vh - 78px);
        margin-top: 48px;
    }
    .cass--main-layout--right {
        top: 115px;
        height: calc(100vh - 130px);
    }
    .cass--main-layout--right.has-simple-top-bar {
        top: 63px;
        height: calc(100vh - 78px);
    }
}
</style>