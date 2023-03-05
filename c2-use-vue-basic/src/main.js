// similar like main.js in normal CSR application. The only difference is createSSR
// will be used instead of createApp.

// main.js is shared between client (for hydration) & server (for ssr)
import {createSSRApp, markRaw} from 'vue';
import App from './app.js'
import router from './router.js'
import { createPinia } from 'pinia'

export const createApp = () => {
  const app = createSSRApp(App)
  const pinia = createPinia()
  app.use(router)
  app.use(pinia)
  // inject vue router into pinia. now you can use vue-router in pinia actions
  pinia.use(({store}) => store.$router = markRaw(router))
  return {app, router, store: pinia}
}
