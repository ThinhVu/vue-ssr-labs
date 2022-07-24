// Refs:
// https://vuejs.org/api/ssr.html
// https://vuejs.org/guide/scaling-up/ssr.html
// https://vuejs.org/guide/scaling-up/ssr.html#cross-request-state-pollution
import {h, onBeforeUnmount, onMounted, ref, useSSRContext} from 'vue';
import {reactivityStore} from '../store/reactivityStore.js';
import useBeerStore from '../store/pinia/beer.js'

const Home = {
  props: ['serverRenderTime'],
  async serverPrefetch() {
    // server side only
    const beerStore = useBeerStore()
    await beerStore.fetchData()
  },
  setup(props, ctx) {
    ctx.emit('setup:starting', 'Lorem ispum')

    // region Setup
    // 0. Access SSRContext
    // SSR content is server only code
    let uid;
    const ssrContext = useSSRContext(); // see ssrContext value in server.js
    console.log('server:ssrContext', ssrContext);
    if (ssrContext) {
      uid = ssrContext.uid;
    }

    const componentCounter = ref(0);
    const increment = () => componentCounter.value++; // only call in browser

    const beerStore = useBeerStore();
    onMounted(() => {
      // client side only
      console.log('beers', beerStore.beers)
      if (beerStore.beers.length === 0)
        beerStore.fetchData();
    })

    // 1. Component Lifecycle Hooks
    const ssrLifeCycleHooksCounter = ref(0);
    const browserLifeCycleHooksCounter = ref(0);
    let intervalId = null;

    // this one will be called in both server & browser
    setInterval(() => {
      console.log('ssrLifeCycleHooksCounter')
      ssrLifeCycleHooksCounter.value++
    }, 1000)

    // this one only call in browser
    onMounted(() => {
      intervalId = setInterval(() => {
        console.log('browserLifeCycleHooksCounter')
        browserLifeCycleHooksCounter.value++
      }, 1000)
    })
    onBeforeUnmount(() => clearInterval(intervalId))

    // 2. Access to Platform-Specific APIs
    // Universal code cannot assume access to platform-specific APIs,
    // so if your code directly uses browser-only globals like window or document,
    // they will throw errors when executed in Node.js, and vice-versa.
    const env = ref(typeof window === 'undefined' ? 'nodejs' : 'browser')

    // 3. Cross-Request State Pollution
    let ssrContextCounter = 0;
    ssrContext && (ssrContextCounter = ssrContext.counter++); // ssrContext
    reactivityStore.ssrIncrement(); // Increment Global ReactivityAPI obj counter (ssr)
    // endregion

    // region Render
    return () => h('div', [
      // Data & Cross-Request State Pollution
      h('h3', 'Data & Cross-Request State Pollution (Reload multiple time & compare the view with html source)'),
      h('p', { style: 'margin-right: 10px' }, `Component counter (this one only run in user browser): ${componentCounter.value}`),
      h('button', {onClick: increment}, `Increase component counter`),
      h('p', { style: 'margin-right: 10px' }, `Global ReactivityAPI obj counter (this one only run in user browser): ${reactivityStore.browserCount}`),
      h('button', {onClick: reactivityStore.browserIncrement}, `Increment Global ReactivityAPI obj counter (browser)`),
      h('p', `Global ReactivityAPI obj counter (this one run in server, lead to hydration mismatch): ${reactivityStore.ssrCount}`),
      h('p', `ssrContext counter (this one run in server, lead to hydration mismatch): ${ssrContextCounter}`),
      h('p', `ssrLifeCycleHooksCounter (this one run in server too: no hydration mismatch but memory leak, performance leak): ${ssrLifeCycleHooksCounter.value}`),
      h('p', `browserLifeCycleHooksCounter (this one only run in user browser): ${browserLifeCycleHooksCounter.value}`),
      h('br'),
      h('h3', 'Using Pinia store'),
      h('ul', beerStore.beers.map(beer => h('li', { key: beer.id }, `${beer.name} - ${beer.tagline}`))),
      //  Access to Platform-Specific APIs
      props.serverRenderTime && h('p', `Ssr props: ${props.serverRenderTime}`),
      uid && h('p', `User Id: ${uid}`),
      h('p', `Platform-Specific APIs: ${env.value}`),
      h('br'),
      // Hydration mismatch
      h('h3', 'Hydration mismatch'),
      h('p', `Mismatch by value changed: ${Date.now()}`),
      h('p', h('div', 'Mismatch by invalid html syntax. div inside p.')),
    ])
    // endregion
  }
}

export default Home;
