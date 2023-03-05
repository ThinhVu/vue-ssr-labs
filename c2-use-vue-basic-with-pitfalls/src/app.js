// similar like App.vue
import {h, resolveComponent as rc, useSSRContext} from 'vue'
import {ssrContextStore} from './store/ssrContext.js';
import ReactivityTest from './components/ReactivityTest.js';

const App = {
  components: {ReactivityTest},
  props: ['serverRenderTime'],
  setup(props, __) {
    const ssrContext = useSSRContext()
    console.log('[App] info',
        'props', props,
        'ssr context', ssrContext,
        'ssr context store', ssrContextStore
    )

    const refs = [
      'https://vuejs.org/api/ssr.html',
      'https://vuejs.org/guide/scaling-up/ssr.html',
    ]

    return () => h('div', [
      h('h3', 'Welcome to Vue SSR Labs use-vue'),
      h('p', 'This project will give you some basic knowledge about Vue SSR'),
      h('p', 'References'),
      h('ol', [
        refs.map(ref => h('li', { key: ref }, h('a', { href: ref }, ref)))
      ]),

      h('hr'),

      h(ReactivityTest),

      h('hr'),

      h('p', '1. Global State (Refresh browser multiple time then open Dev tools, compare html returned by server & what has been rendered to the UI)'),
      h('p', `Server render time: ${props.serverRenderTime}`),
      h('p', `SSR Context (useSSRContext): ${ssrContext && ssrContext.counter}`),
      h('p', `SSR Context (direct import ssrContextStore): ${ssrContextStore.counter}`),

      h('hr'),

      h('p', 'Click to each link below to explore more'),

      h('div', { style: 'display: flex; gap: 15px;' }, [
        h(rc('router-link'), { to: '/beer'}, () => '2. Beer'),
        h(rc('router-link'), { to: '/beer/1'}, () => '3. Beer Detail'),
        h(rc('router-link'), { to: '/hydration-mismatch'}, () => '4. Hydration Mismatch'),
        h(rc('router-link'), { to: '/interval-leak'}, () => '5. Interval leak'),
        h(rc('router-link'), { to: '/access-platform-api'}, () => '6. Access platform api'),
        h(rc('router-link'), { to: '/cross-request-state-pollution'}, () => '7. Cross-Request State Pollution'),
      ]),

      h(rc('router-view'))
    ])
  }
}

export default App
