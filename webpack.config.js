let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader','less-loader']
    }, {
      test: /\.js?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [ 'es2015' ,'stage-0']
        }
      }
    }, {
      test: /\.(woff|svg|eot|ttf)\??.*$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 50000
        }
      }
    },{
      test: /\.(jpg|png|jpeg)$/,
      use:{
        loader: 'file-loader'
      }
    } 
  ]
  },
  devtool: 'source-map',
  // plugins: [
  //       // 加入 html 模板任务
  //   new HtmlWebpackPlugin({
  //           // 模板文件
  //     template: 'src/index.html',
  //           // 打包后文件名称，会自动放到 output 指定的 dist 目录
  //     filename: 'index.html'
  //   })
  // ]
}
