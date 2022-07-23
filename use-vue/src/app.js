import {h} from 'vue'

const App = {
  setup() {
    return () => h('div', h('router-view'))
  }
}

export default App
