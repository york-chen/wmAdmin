import Vue from 'vue'
import Vuex from 'vuex'
import login from '@/store/modules/login'
import announcement from '@/store/modules/announcement'
import versionDesc from '@/store/modules/versionDescription'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
        announcement,
        versionDesc
    }
})