import Vue from 'vue'
import Vuex from 'vuex'
import login from '@/store/modules/login'
import announcement from '@/store/modules/announcement'
import versionDesc from '@/store/modules/versionDescription'
import limitedMallAd from '@/store/modules/limitedMallAd'
import legendMallAd from '@/store/modules/legendMallAd'
import battlepassMallAd from '@/store/modules/battlepassMallAd'
import safeguard from '@/store/modules/safeguard'
import stopService from '@/store/modules/stopService'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
        announcement,
        versionDesc,
        limitedMallAd,
        legendMallAd,
        battlepassMallAd,
        safeguard,
        stopService
    }
})