import {createRouter, createMemoryHistory, createWebHistory} from 'vue-router';
import Home from './pages/home.js';
import About from './pages/about.js';
import {isSSR} from './utils.js';

const router = createRouter({
  history: isSSR ? createMemoryHistory() : createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
  ]
})

export default router
