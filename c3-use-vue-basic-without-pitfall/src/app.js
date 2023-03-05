// similar like App.vue
import {h, resolveComponent as rc} from 'vue'

const App = {
  setup() {
    return () => h('div', [
      h(rc('router-link'), { to: '/'}, 'Home'),
      h(rc('router-link'), { to: '/about'}, 'About'),
      h(rc('router-view'))
    ])
  }
}

export default App
