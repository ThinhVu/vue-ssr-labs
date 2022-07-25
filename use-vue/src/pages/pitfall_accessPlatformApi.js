import {h} from 'vue'

export default {
  setup() {
    // 2. Access to Platform-Specific APIs
    // Universal code cannot assume access to platform-specific APIs,
    // so if your code directly uses browser-only globals like window or document,
    // they will throw errors when executed in Node.js, and vice-versa.
    // NOTE: Everything in browser must be run on onX() lifecycle hooks
    const access_token = localStorage.getItem('access_token')

    return () => h('div', [
      h('p', `You can access this page from another page in browser`),
      h('p', [
        h('span', `But you cannot access this page directly from url `),
        h('button', { onClick: () => window.location.reload() }, 'reload'),
      ]),
      h('p', `Access token: ${access_token}`),
    ])
  }
}
