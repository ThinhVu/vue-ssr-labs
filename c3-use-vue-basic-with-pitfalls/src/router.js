import {createRouter, createMemoryHistory, createWebHistory} from 'vue-router';
import Beer from './pages/beer.js';
import BeerDetail from './pages/beerDetail.js'
// pitfall
import pitfall_hydrationMismatch from './pages/PitfallHydrationMismatch.js';
import crossRequestStatePollution from './pages/PitfallCrossRequestStatePollution.js';
import intervalLeak from './pages/PitfallIntervalLeak.js';
import accessPlatformApi from './pages/PitfallAccessPlatformApi.js';
import {isSSR} from './utils.js';

export default createRouter({
  history: isSSR ? createMemoryHistory() : createWebHistory(),
  routes: [
    { path: '/beer', name: 'beer', component: Beer },
    { path: '/beer/:id', name: 'beer_id', component: BeerDetail },
    { path: '/hydration-mismatch', name: 'hydration-mismatch', component: pitfall_hydrationMismatch },
    { path: '/interval-leak', name: 'interval-leak', component: intervalLeak },
    { path: '/cross-request-state-pollution', name: 'cross-request-state-pollution', component: crossRequestStatePollution },
    { path: '/access-platform-api', name: 'access-platform-api', component: accessPlatformApi },
  ]
})
