import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { renderToString } from 'vue/server-renderer';
import { createApp } from './app.js';
import {ssrContextStore} from './appStore.js';

const server = express()
server.use(cors())
server.use(cookieParser())
server.use(express.static('.'))

const app = createApp();
function getFullHtml(appHtml) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">
          {
            "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
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

server.get('/', (req, res, next) => {
  res.cookie('uid', '123456', { httpOnly: true, path: '/'})
  next();
});
server.get('/', (req, res) => {
  renderToString(app, {...ssrContextStore, uid: req.cookies && req.cookies.uid}).then(appHtml => res.send(getFullHtml(appHtml)))
});

const PORT = 3000;
server.listen(PORT, () => console.log('app listen on port' + PORT))
