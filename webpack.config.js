const webpack = require('webpack');

module.exports = {
  // Other configurations...

  resolve: {
    fallback: {
      "crypto": false,
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "url": require.resolve("url/"),
      "vm": require.resolve("vm-browserify"),
      "vm": false
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
  ],
};
