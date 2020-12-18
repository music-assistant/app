module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    },
    cordovaPath: 'src-cordova'
  },
  devServer: {
    https: false
  },
  pwa: {
    name: 'Music Assistant',
    themeColor: '#424242',
    msTileColor: '#424242',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black'
  },
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: 'docs',
  publicPath: ''
}
