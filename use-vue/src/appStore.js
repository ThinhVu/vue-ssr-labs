// State management with Reactivity API
import {reactive} from 'vue';

export const reactivityStore = reactive({
  browserCount: 0,
  browserIncrement() {
    reactivityStore.browserCount++;
  },
  ssrCount: 0,
  ssrIncrement() {
    reactivityStore.ssrCount++
  }
});


export const ssrContextStore = { counter: 0 }
