// client.js
import { createApp } from './src/main.js'

const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
  console.log('__pinia', window.__INITIAL_STATE__)
  store.state.value = window.__INITIAL_STATE__
}
router.isReady().then(() => app.mount('#app'))
