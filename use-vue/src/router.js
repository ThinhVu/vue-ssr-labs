import {createRouter, createMemoryHistory, createWebHistory} from 'vue-router';
import Home from './pages/home.js';
import About from './pages/about.js';
import Beer from './pages/beer.js';
import BeerDetail from './pages/beerDetail.js'
import {isSSR} from './utils.js';

export default createRouter({
  history: isSSR ? createMemoryHistory() : createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/beer/', name: 'beer', component: Beer },
    { path: '/beer/:id', name: 'beer_id', component: BeerDetail }
  ]
})
