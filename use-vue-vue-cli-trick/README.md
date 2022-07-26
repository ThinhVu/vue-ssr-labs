# use-vue-vue-cli-trick

The project using vue-cli to build both app in CSR & SSR.

When user request a page, the server will serve CSR index.html file & resources but inject div#app with content of a SSR app.

In browser, when CSR script loaded, the div of SSR app will be replaced with CSR content.

## Project setup
```
npm install
```

### Compile Client Side Rendered (CSR) App 
```
npm run buildcsr
```

### Run client Side Rendered (CSR) App 
```
npm run startcsr
```

### Compile Server Side Rendered (CSR) App 
```
npm run build
```

### Run Server Side Rendered (CSR) App 
```
npm run start
```
