const state = ()=>({
    cassApiLocation: ''
});

const actions = {
    setCassApiLocation(f) {
        this.cassApiLocation = f;
    }
};

const getters = {
};

import { defineStore } from 'pinia';

export default defineStore('environment', {
    state,
    actions,
    getters
});