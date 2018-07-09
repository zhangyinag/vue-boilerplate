const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  chainWebpack: config => {
    // note: it means to take care of the svgs of /icons,
    // these code handle all svgs, should optimize this if you need
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    // add replacement loader(s)
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .tap(options => {
        options = {
          symbolId: 'icon-[name]'
        }
        return options
      })
  }
}
