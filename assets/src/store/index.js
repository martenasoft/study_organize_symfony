import Vue from 'vue';
import Vuex from 'vuex';

import userSore from "./modules/userSore";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        userSore
    }
});