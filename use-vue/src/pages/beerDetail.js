import {h, onServerPrefetch, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import useBeerStore from '../store/pinia/beer.js'

export default {
  setup() {
    const route = useRoute()
    const beerId = route.params.id;
    const beerStore = useBeerStore()

    onServerPrefetch(async () => {
      console.log('ssr: beerId', beerId)
      await beerStore.fetchBeer(beerId)
    })

    onMounted(() => {
      console.log('csr: beerId', beerId)
      if (!beerStore.beer)
        beerStore.fetchBeer(beerId)
    })

    function renderBeerInfo() {
      if (!beerStore.beer)
        return
      return [
        h('p', `Id: ${beerStore.beer.id}`),
        h('p', `Name: ${beerStore.beer.name}`),
        h('p', `Tag line: ${beerStore.beer.tagline}`),
        h('p', `Desc: ${beerStore.beer.description}`)
      ]
    }

    return () => h('div', [
      h('h3', 'Beer info'),
      renderBeerInfo(),
      h('h4', 'Notes:'),
      h('p', '- See server log about warning: [Vue Router warn]: Path "/beer/1" was passed with params but they will be ignored.'),
      h('p', "- Uncomment server.get('/beer/:id', namedRoute('beer_id'), ssr) in server.js to resolve"),
    ])
  }
}
