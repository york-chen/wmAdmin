import Vue from 'vue'
import Vuex from 'vuex'
import login from '@/store/modules/login'
import home from '@/store/modules/home'
import creditScore from '@/store/modules/creditScore'
import creditReport from '@/store/modules/creditReport'
import admin from '@/store/modules/admin'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
        home,
        creditScore,
        creditReport,
        admin
    }
})