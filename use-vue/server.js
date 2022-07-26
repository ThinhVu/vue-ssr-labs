import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {renderToString} from 'vue/server-renderer';
import {createApp} from './src/main.js';
import {ssrContextStore} from './src/store/ssrContext.js';

const server = express()
server.use(cors())
server.use(cookieParser())
server.use(express.static('.'))

function getFullHtml(headHtml, appHtml) {
  return `
    <!DOCTYPE html>
    <html>
      <head>${headHtml}</head>
      <body>
        <div id="app">${appHtml}</div>
      </body>
    </html>`
}

const importMaps = {
  'imports': {
    'vue': 'https://unpkg.com/vue@3/dist/vue.esm-browser.js',
    'vue-router': 'https://unpkg.com/vue-router@4.1.2/dist/vue-router.esm-browser.js',
    '@vue/devtools-api': 'https://unpkg.com/@vue/devtools-api@6.2.1/lib/esm/index.js',
    'vue-demi': 'https://unpkg.com/vue-demi@0.8.0/lib/index.esm.mjs',
    'pinia': 'https://unpkg.com/pinia@2.0.16/dist/pinia.esm-browser.js'
  }
}

async function ssr(req, res) {
  const {app, router, store} = createApp()
  // provide app property by app._props to app object
  app._props = { serverRenderTime: Date.now() }

  // custom app context
  // app._context = {}

  // prepare for ssr appropriate route
  await router.push(req)
  await router.isReady()

  // renderToString must be called before getting pinia state data
  // beerStore.fetchData will be called at this place to fill data to pinia store
  const ssrCtx = {...ssrContextStore, uid: req.cookies && req.cookies.uid};

  const appHtml = await renderToString(app, ssrCtx);

  const tags = [
    `<title>Hello Vue SSR</title>`,
    `<meta name="robots" content="index, follow"/>`,
    `<meta name="keywords" content="vue, vuejs, ssr, vue-router, pinia, vuex"/>`,
    `<meta name="description" content="This is an POC project for Vue SSR"/>`,
    `<meta name="subject" content="Hello Vue SSR">`,
    `<meta name="copyright" content="ThinhVu">`,
    `<meta property="og:title" content="Hello Vue SSR"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta property="og:url" content="${req.headers.host + req.originalUrl}"/>`,
    /* Assign pinia data to use in client side later */
    `<script>window.__pinia = ${JSON.stringify(store.state.value)}</script>`,
    /* pinia work-around for accessing process.env.NODE_ENV */
    `<script>window.process = { env: { NODE_ENV: 'browser'} }</script>`,
    /* importmap which define modules we use in the project */
    `<script type="importmap">${JSON.stringify(importMaps)}</script>`,
    /* vue client app for hydration */
    `<script type="module" src="/client.js"> </script>`
  ]
  const headHtml = tags.join('');
  res.send(getFullHtml(headHtml, appHtml));
}
function namedRoute(name) {
  return (req, res, next) => {
    console.log('SSR:serving', name, req.path)
    req.name = name
    next()
  }
}

// auth using cookie
server.get('/api/auth', (req, res) => {
  res.cookie('uid', 'u123456', { httpOnly: true, path: '/'})
  res.end('Authorized');
})
// server.get('/beer/:id', namedRoute('beer_id'), ssr)
server.get('*', ssr);

const PORT = 3000;
server.listen(PORT, () => console.log(`app listen on http://localhost:${PORT}`))
