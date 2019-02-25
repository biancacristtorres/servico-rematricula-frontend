const webpack = require('webpack');
const configServerClient = require('config-server-client');
const vars = configServerClient.loadSync({ stringify: true, prefix: 'process.env.VUE_APP_' });

module.exports = {
  baseUrl: process.env.BASE_URL || '/',
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin(vars)
    ]
  },
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_API_URL || vars['process.env.VUE_APP_API_URL'],
        changeOrigin: true
      }
    }
  }
}
