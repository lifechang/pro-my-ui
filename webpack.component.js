const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const glob = require('glob')
const list = {}
async function makeList(dirPath, list) {
  const files = glob.sync(`${dirPath}/**/index.js`)
    for (let file of files) {
        const component = file.split(/[/.]/)[2]
        list[component] = `./${file}`
    }
}
makeList('UI/packages', list)
module.exports = {
  entry: list,
  mode: 'development',
  output: {
      filename: '[name].umd.js',
      path: path.resolve(__dirname,'dist'),
      library: 'rui',
      libraryTarget: 'umd'
  },
  plugins: [
      new VueLoaderPlugin()
  ],
  module: {
      rules: [
          {
              test: /\.vue$/,
              use: [
                  {
                      loader: 'vue-loader'
                  }
              ]
          },
          {test: /\.css$/, use: ['css-loader']},
          {test: /\.scss$/, use: ['css-loader','sass-loader',]},
          {test: /\.(jpg|png|gif|bmp|jpeg)$/, loader: 'url-loader'},
          {test: /\.(ttf|eot|svg|woff|woff2)$/,use: 'url-loader'}
      ]
  }
}