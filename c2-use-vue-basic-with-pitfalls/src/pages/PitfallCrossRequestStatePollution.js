import {h, onMounted} from 'vue'
import {reactivityStore} from '../store/reactivityStore.js';
import useBeerStore from '../store/pinia/beer.js';
import {onServerPrefetch} from 'vue';

export default {
  setup() {
    reactivityStore.ssrIncrement();
    const beerStore = useBeerStore()

    onServerPrefetch(async () => await beerStore.fetchBeers())

    onMounted(() => {
      if (beerStore.beers.length === 0)
        beerStore.fetchBeers();
    })

    return () => h('div', [
      h('p', `CSRP lead to hydration mismatch.`),
      h('p', 'Reload this page multiple time, view page source code to check the value'),
      h('p', `SSR Counter: ${reactivityStore.ssrCount}`),
      h('p', `Fetched: ${beerStore.beerFetched}`),
      h('p', `Fetched at: ${beerStore.beerFetchedAt}`),
    ])
  }
}
