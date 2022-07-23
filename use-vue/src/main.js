// main.js shared between client (for hydration) & server (for ssr)
import {createSSRApp} from 'vue';
import App from './app.js'
export const createApp = () => createSSRApp(App);
