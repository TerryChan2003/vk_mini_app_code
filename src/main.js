import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@urapywka/vkui-icons'
import '@urapywka/vkui-icons/dist/vkui-icons.css'
import PortalVue from 'portal-vue'
import components from '@urapywka/vkui/src/components'
import connect from "@vkontakte/vkui-connect"
connect.send('VKWebAppInit')
Vue.use(PortalVue)

Vue.config.productionTip = false

new Vue({
  components,
  router,
  render: h => h(App)
}).$mount('#app')
