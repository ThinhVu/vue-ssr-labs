import {h, onServerPrefetch, onMounted} from 'vue';
import useBeerStore from '../store/pinia/beer.js'

export default {
  setup() {
    const beerStore = useBeerStore()

    onServerPrefetch(async () => await beerStore.fetchBeers())

    onMounted(() => {
      if (beerStore.beers.length === 0)
        beerStore.fetchBeers();
    })

    return () => h('div', [
      h('h3', 'Using Pinia store beer list'),
      h('ul', beerStore.beers.map(beer => h('li', { key: beer.id }, `${beer.name} - ${beer.tagline}`))),
    ])
  }
}
