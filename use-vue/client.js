import { createApp } from './src/main.js'

const { app, router, store } = createApp()
if (window.__pinia) {
  console.log('__pinia', window.__pinia)
  store.state.value = window.__pinia
}
router.isReady().then(() => app.mount('#app'))
