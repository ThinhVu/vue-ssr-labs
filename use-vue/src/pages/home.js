// Refs:
// https://vuejs.org/api/ssr.html
// https://vuejs.org/guide/scaling-up/ssr.html
// https://vuejs.org/guide/scaling-up/ssr.html#cross-request-state-pollution
import {h} from 'vue';
import helloWorld from '../components/hello-world.js';

export default {
  components: {helloWorld},
  props: ['serverRenderTime'],
  setup(props, __) {
    const refs = [
      'https://vuejs.org/api/ssr.html',
      'https://vuejs.org/guide/scaling-up/ssr.html',
    ]

    return () => h('div', [
      h('h3', 'References'),
      h('ol', [
        refs.map(ref => h('li', { key: ref }, h('a', { href: ref }, ref)))
      ])
    ])
  }
}
