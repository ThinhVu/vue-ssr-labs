import {h, ref, onServerPrefetch, onMounted} from 'vue';
import useBeerStore from '../store/beer.js';

const Home = {
  setup() {
    const beerStore = useBeerStore();
    onServerPrefetch(async () => {
      await beerStore.fetchData()
    })
    onMounted(() => {
      // client side only
      console.log('beers', beerStore.beers)
      if (beerStore.beers.length === 0)
        beerStore.fetchData();
    })
    const count = ref(0)
    const increment = () => {
      console.log('increment')
      count.value++
    }
    return () => h('div', [
      'Home',
      h('button', { onClick: increment }, `Clicked: ${count.value}`),
      h('ul', beerStore.beers.map(beer => h('li',
          { key: beer.id },
          `${beer.name} - ${beer.tagline}`
      )))
    ])
  }
}

export default Home;
