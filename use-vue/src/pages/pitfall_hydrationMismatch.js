import {h} from 'vue'

export default {
  setup() {
    return () => h('div', [
      h('p', 'Try to reload the page multiple time with F12/Console tab open, watch the warning/error'),
      h('p', `Mismatch by value changed: ${new Date().getSeconds()}`),
      h('p', h('div', 'Mismatch by invalid html syntax. div inside p.')),
    ])
  }
}
