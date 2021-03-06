import Vue from 'vue'
import Vuex from 'vuex'
import login from '@/store/modules/login'
import announcement from '@/store/modules/announcement'
import versionDesc from '@/store/modules/versionDescription'
import limitedMallAd from '@/store/modules/limitedMallAd'
import legendMallAd from '@/store/modules/legendMallAd'
import battlepassMallAd from '@/store/modules/battlepassMallAd'
import maintenanceNotice from '@/store/modules/maintenanceNotice'
import regularMail from '@/store/modules/regularMail'
import stopService from '@/store/modules/stopService'
import common from '@/store/modules/common'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
        announcement,
        versionDesc,
        limitedMallAd,
        legendMallAd,
        battlepassMallAd,
        maintenanceNotice,
        stopService,
        common,
        regularMail
    }
})