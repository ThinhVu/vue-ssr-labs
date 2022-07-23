import {h, resolveComponent} from 'vue'

const App = {
  setup() {
    return () => h('div', h(resolveComponent('router-view')))
  }
}

export default App
