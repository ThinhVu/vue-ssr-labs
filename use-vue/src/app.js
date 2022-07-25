// similar like App.vue
import {h, resolveComponent as rc} from 'vue'
import HelloWorld from './components/hello-world.js';

const App = {
  components: {HelloWorld},
  setup() {
    return () => h('div', [
      h(HelloWorld),
      h('br'),
      h('div', { style: 'display: flex; gap: 15px;' }, [
        h(rc('router-link'), { to: '/'}, () => 'Home'),
        h(rc('router-link'), { to: '/beer'}, () => 'Beer'),
        h(rc('router-link'), { to: '/beer/1'}, () => 'Beer Detail'),
        h(rc('router-link'), { to: '/hydration-mismatch'}, () => 'Hydration Mismatch'),
        h(rc('router-link'), { to: '/interval-leak'}, () => 'Interval leak'),
        h(rc('router-link'), { to: '/access-platform-api'}, () => 'Access platform api'),
        h(rc('router-link'), { to: '/cross-request-state-pollution'}, () => 'Cross-Request State Pollution'),
      ]),
      h(rc('router-view'))
    ])
  }
}

export default App
