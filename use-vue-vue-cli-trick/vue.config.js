const ManifestPlugin = require('webpack-manifest-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  chainWebpack: (webpackConfig) => {
    webpackConfig.module.rule('vue').uses.delete('cache-loader');
    webpackConfig.module.rule('js').uses.delete('cache-loader');
    webpackConfig.module.rule('ts').uses.delete('cache-loader');
    webpackConfig.module.rule('tsx').uses.delete('cache-loader');

    if (!process.env.SSR) {
      // This is required for repl.it to play nicely with the Dev Server
      webpackConfig.devServer.disableHostCheck(true);

      webpackConfig.entry('app').clear().add('./src/main.js');
      return;
    }

    webpackConfig.entry('app').clear().add('./src/main-server.js');

    webpackConfig.target('node');
    webpackConfig.output.libraryTarget('commonjs2');

    webpackConfig.plugin('manifest').use(new ManifestPlugin({ fileName: 'ssr-manifest.json' }));

    webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }));

    webpackConfig.optimization.splitChunks(false).minimize(false);

    webpackConfig.plugins.delete('hmr');
    webpackConfig.plugins.delete('preload');
    webpackConfig.plugins.delete('prefetch');
    webpackConfig.plugins.delete('progress');
    webpackConfig.plugins.delete('friendly-errors');

    // console.log(webpackConfig.toConfig())
  },
};
