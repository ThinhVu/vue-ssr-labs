import {createRouter, createMemoryHistory, createWebHistory} from 'vue-router';
import Home from './pages/home.js';
import About from './pages/about.js';
import Beer from './pages/beer.js';
import BeerDetail from './pages/beerDetail.js'
// pitfall
import pitfall_hydrationMismatch from './pages/pitfall_hydrationMismatch.js';
import crossRequestStatePollution from './pages/pitfall_crossRequestStatePollution.js';
import intervalLeak from './pages/pitfall_intervalLeak.js';
import accessPlatformApi from './pages/pitfall_accessPlatformApi.js';
import {isSSR} from './utils.js';

export default createRouter({
  history: isSSR ? createMemoryHistory() : createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/beer', name: 'beer', component: Beer },
    { path: '/beer/:id', name: 'beer_id', component: BeerDetail },
    { path: '/hydration-mismatch', name: 'hydration-mismatch', component: pitfall_hydrationMismatch },
    { path: '/interval-leak', name: 'interval-leak', component: intervalLeak },
    { path: '/cross-request-state-pollution', name: 'cross-request-state-pollution', component: crossRequestStatePollution },
    { path: '/access-platform-api', name: 'access-platform-api', component: accessPlatformApi },
  ]
})
