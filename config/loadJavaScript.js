const path = require('path');

const FRONTEND_SOURCE = path.join(__dirname, 'frontend/javascript');

exports.loadJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: FRONTEND_SOURCE,
        loader: 'babel-loader',
      },
    ],
  },
});
