import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { CIcon } from '@coreui/icons-vue'
import {
  cilXCircle,
  cilCheckCircle,
  cilAvTimer,
  cilChartLine,
  cilClock,
  cilExitToApp,
  cilMediaPlay,
} from '@coreui/icons'

import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const icons = {
  cilXCircle,
  cilCheckCircle,
  cilAvTimer,
  cilChartLine,
  cilClock,
  cilExitToApp,
  cilMediaPlay,
}

const app = createApp(App)

app.use(router)

app.provide('icons', icons)
app.component('CIcon', CIcon)

app.mount('#app')
