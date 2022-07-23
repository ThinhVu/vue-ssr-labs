import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { renderToString } from 'vue/server-renderer';
import { createApp } from './main.js';
import {ssrContextStore} from './appStore.js';

const server = express()
server.use(cors())
server.use(cookieParser())
server.use(express.static('.'))

function getFullHtml(appHtml) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">
          {
            "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js",
              "vue-router": "https://unpkg.com/vue-router@4.1.2/dist/vue-router.esm-browser.js",
              "@vue/devtools-api": "https://unpkg.com/@vue/devtools-api@6.2.1/"
            }
          }
        </script>
        <script type="module" src="/client.js"></script>
      </head>
      <body>
        <div id="app">${appHtml}</div>
      </body>
    </html>
    `
}

// auth using cookie
server.get('/', (req, res, next) => {
  res.cookie('uid', '123456', { httpOnly: true, path: '/'})
  next();
});

server.get('/', async (req, res) => {
  const {app, router} = createApp()
  await router.push({path: '/'})
  await router.isReady()
  const ctx = {...ssrContextStore, uid: req.cookies && req.cookies.uid}
  const appHtml = await renderToString(app, ctx)
  const fullHtml = getFullHtml(appHtml)
  res.send(fullHtml);
});

server.get('/about', async (req, res) => {
  const {app, router} = createApp()
  app._props = { ssrProps: 'Inject ssr props here' }
  await router.push({path: '/about'})
  await router.isReady()
  renderToString(app, {...ssrContextStore, uid: req.cookies && req.cookies.uid}).then(appHtml => res.send(getFullHtml(appHtml)))
})

const PORT = 3000;
server.listen(PORT, () => console.log('app listen on port' + PORT))
