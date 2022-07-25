import {h, onMounted} from 'vue'
import {reactivityStore} from '../store/reactivityStore.js';

export default {
  setup() {
    reactivityStore.ssrIncrement();

    return () => h('div', [
      h('p', `CSRP lead to hydration mismatch.`),
      h('p', 'Reload this page multiple time, view page source code to check the value'),
      h('p', `SSR Counter: ${reactivityStore.ssrCount}`),
    ])
  }
}
