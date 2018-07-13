/* eslint-disable no-path-concat,quotes */
const {copyDir, writeJson} = require('../utils')

module.exports = api => {
  // preset plugins check
  const plugins = [
    "@vue/cli-plugin-babel",
    "@vue/cli-plugin-eslint",
    "@vue/cli-plugin-typescript",
    "@vue/eslint-config-standard",
    "@vue/eslint-config-typescript",
    "node-sass"
  ]
  plugins.forEach(v => {
    if (!api.hasPlugin(v)) throw new Error(`don't have dependency: ${v}, please check these dependencies:` + plugins)
  })

  // warning: I'm not very sure it's appropriate to create files in this stage,
  // but put it before will have git reverted
  api.onCreateComplete(() => {
    const dest = api.resolve('')
    copyDir(__dirname + '/template', dest)

    // write value to tsconfig.json
    writeJson(api.resolve('tsconfig.json'), function (data) {
      data.compilerOptions.strictPropertyInitialization = false
      return data
    })
  })

  const devDependencies = {
    "babel-plugin-transform-decorators-legacy": "^1.3.5",
    "body-parser": "^1.18.3",
    "colors": "^1.3.0",
    "cookie-parser": "^1.4.3",
    "express": "^4.16.3",
    "lokijs": "^1.5.5",
    "require-all": "^3.0.0",
    "svg-sprite-loader": "^3.8.0",
    "babel-core": "^6.26.3",
    "express-session": "^1.15.6",
    "vuex-class": "^0.3.1"
  }
  const dependencies = {
    "axios": "^0.18.0",
    "element-ui": "^2.4.3",
    "js-cookie": "^2.2.0",
    "normalize.css": "^8.0.0",
    "nprogress": "^0.2.0",
    "vue": "^2.5.16",
    "vue-echarts": "^3.0.9"
  }

  api.extendPackage({
    devDependencies,
    dependencies,
    scripts: {
      'mock:server': 'node mock/index.js'
    }
  })
}
