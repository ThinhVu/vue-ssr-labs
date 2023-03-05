import {defineStore} from 'pinia';
import {_fetch} from '../utils.js';

const beerStore = defineStore('beer', {
  state() {
    return {
      beers: []
    }
  },
  actions: {
    async fetchData() {
      console.log('fetch beer')
      const res = await _fetch('https://api.punkapi.com/v2/beers')
      const json = await res.json()
      this.beers = json.map(beer => ({
            id: beer.id,
            name: beer.name,
            tagline: beer.tagline,
          }))
    }
  }
})

export default beerStore
