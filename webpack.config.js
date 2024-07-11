
const path = require("path");

module.exports = {
  mode: 'production',
  target: 'web',
  devtool: "source-map",
  entry: {"contentScript":"./contentScript.js", "popup": "./popup.js"},
  module: {
    rules: [{
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['babel-preset-react-app'],
      },
    },
    ],
  },
  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "out"),
  },
  watchOptions: {
    ignored: /node_modules/,
  }
};
