import Vue from 'vue'
import Vuex from 'vuex'
import vkapi from "./modules/vkapi"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        vkapi
    }
})