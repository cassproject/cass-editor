import { defineStore } from 'pinia';

export const useEnvironmentStore = defineStore('environment', {
    state: () => ({
        cassApiLocation: ''
    }),
    getters: {
    },
    actions: {
        setCassApiLocation(f) {
            this.cassApiLocation = f;
        }
    }
});
