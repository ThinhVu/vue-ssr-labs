// main.js shared between client (for hydration) & server (for ssr)
import {createSSRApp} from 'vue';
import {createRouter, createWebHistory, createMemoryHistory} from 'vue-router';
import App from './app.js'
import Home from './pages/home.js';
import About from './pages/about.js';

export const createApp = () => {
  const app = createSSRApp(App)
  const router = createRouter({
    history: typeof window === 'undefined' ? createMemoryHistory() : createWebHistory(),
    routes: [
      { path: '/', component: Home },
      { path: '/about', component: About },
    ]
  })
  app.use(router)
  return {app, router}
};
