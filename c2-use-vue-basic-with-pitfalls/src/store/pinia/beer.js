import {defineStore} from 'pinia';
import {_fetch} from '../../utils.js';

const beerStore = defineStore('beer', {
  state() {
    return {
      beer: null,
      beers: [],
      beerFetched: false,
      beerFetchedAt: null
    }
  },
  actions: {
    async fetchBeers() {
      if (this.beerFetched)
        return
      this.beerFetched = true;
      this.beerFetchedAt = Date.now();
      console.log('fetch beers')
      const res = await _fetch('https://api.punkapi.com/v2/beers')
      const json = await res.json()
      this.beers = json.map(beer => ({
            id: beer.id,
            name: beer.name,
            tagline: beer.tagline,
          })).slice(0, 5)
    },
    async fetchBeer(id) {
      console.log('fetch beer')
      const res = await _fetch(`https://api.punkapi.com/v2/beers/${id}`)
      const json = (await res.json())[0]
      this.beer = json
    }
  }
})

export default beerStore
