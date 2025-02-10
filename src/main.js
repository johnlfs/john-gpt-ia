/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { registerServices } from '@/services'
import { createVuetify } from 'vuetify'

import './styles/settings.scss'

export default createVuetify({
    display: {
      mobileBreakpoint: 'md', // Define o breakpoint para mobile
    },
  })

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)
registerServices()

import { useChatStore } from '@/stores'
await useChatStore().init()

app.mount('#app')
