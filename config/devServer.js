const { WebpackPluginServe } = require('webpack-plugin-serve')

exports.devServer = () => ({
  watch: true,
  plugins: [
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      static: './output', // Change if you change bridgetown's out folder
      liveReload: true,
      waitForBuild: true
    })
  ]
})
