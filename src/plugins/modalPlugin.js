import CassModal from './../components/CassModal.vue';

const Modal = {
    install(Vue, options) {
        this.EventBus = new Vue();
        Vue.component('CassModal', CassModal);
        Vue.prototype.$modal = {
            show(params) {
                Modal.EventBus.$emit('show', params);
            }
        };
    }
};
export default Modal;
