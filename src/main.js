import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'

import Cookies from 'js-cookie'

Vue.config.productionTip = false



const members = "{\n\"members\": [\n\t{\n\t\t\"id\": \"1\",\n\t\t\"name\": \"John\",\n\t\t\"position\": \"Engineer\"\n\t},\n\t{\n\t\t\"id\": \"2\",\n\t\t\"name\": \"Hanna\",\n\t\t\"position\": \"Manager\"\n\t},\n\t{\n\t\t\"id\": \"3\",\n\t\t\"name\": \"Alex\",\n\t\t\"position\": \"Manager\"\n\t},\n\t{\n\t\t\"id\": \"4\",\n\t\t\"name\": \"Sam\",\n\t\t\"position\": \"Engineer\"\n\t},\n\t{\n\t\t\"id\": \"5\",\n\t\t\"name\": \"Chris\",\n\t\t\"position\": \"Other stuff\"\n\t},\n\t{\n\t\t\"id\": \"6\",\n\t\t\"name\": \"Elizabeth\",\n\t\t\"position\": \"Manager\"\n\t},\n\t{\n\t\t\"id\": \"7\",\n\t\t\"name\": \"Drake\",\n\t\t\"position\": \"Manager\"\n\t},\n\t{\n\t\t\"id\": \"8\",\n\t\t\"name\": \"Mike\",\n\t\t\"position\": \"Engineer\"\n\t},\n\t{\n\t\t\"id\": \"9\",\n\t\t\"name\": \"Tom\",\n\t\t\"position\": \"Other stuff\"\n\t},\n\t{\n\t\t\"id\": \"10\",\n\t\t\"name\": \"Roman\",\n\t\t\"position\": \"Other stuff\"\n\t}\n]\n}"

Cookies.set('members', members);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
