// similar like main.js in normal CSR application. The only difference is createSSR
// will be used instead of createApp.

// main.js is shared between client (for hydration) & server (for ssr)
import {createSSRApp, markRaw} from 'vue';
import App from './app.js'
import router from './router.js'
import pinia from './store/pinia/piniaStore.js'

export const createApp = () => {
  const app = createSSRApp(App)
  app.use(router)

  // pitfall: using the same pinia instance in piniaStore.js
  // because we use the same instance of pinia, every request of every user will use the same pinia store
  // you can see the beerFetched & beerFetchedAt variable in PitfallCrossRequestStatePollution.js page
  // refresh everytime and the beerFetchedAt is still the same => Cross Request State Pollution
  app.use(pinia)
  // inject vue router into pinia. now you can use vue-router in pinia actions
  pinia.use(({store}) => store.$router = markRaw(router))
  return {app, router, store: pinia}
}
