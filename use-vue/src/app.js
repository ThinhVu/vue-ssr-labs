// similar like App.vue
import {h, resolveComponent as rc} from 'vue'

const App = {
  setup() {
    return () => h('div', [
      h('div', { style: 'display: flex; gap: 15px;' }, [
        h(rc('router-link'), { to: '/'}, 'Home'),
        h(rc('router-link'), { to: '/beer'}, 'Beer'),
        h(rc('router-link'), { to: '/beer/1'}, 'Beer Detail'),
        h(rc('router-link'), { to: '/about'}, 'About'),
      ]),
      h(rc('router-view'))
    ])
  }
}

export default App
