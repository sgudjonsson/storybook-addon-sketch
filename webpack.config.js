const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  externals: {
    '@storybook/addons': '@storybook/addons',
    react: 'react',
    'react-dom': 'react-dom',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, './src')],
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        include: [path.resolve(__dirname, './src')],
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        include: [/node_modules/, path.resolve(__dirname, './src')],
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
}
