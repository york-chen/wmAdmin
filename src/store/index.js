import Vue from 'vue'
import Vuex from 'vuex'
import login from '@/store/modules/login'
import announcement from '@/store/modules/announcement'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
        announcement
    }
})