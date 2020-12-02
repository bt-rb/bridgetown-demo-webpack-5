exports.loadImages = ({ limit } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: { dataUrlCondition: { maxSize: limit } },
      },
    ],
  },
});
