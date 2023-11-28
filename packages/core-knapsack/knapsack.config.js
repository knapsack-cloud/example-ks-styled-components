const { KnapsackReactRenderer } = require('@knapsack/renderer-react');
const { configureKnapsack } = require('@knapsack/app');
const { join } = require('path');
const { version } = require('./package.json');

module.exports = configureKnapsack({
  data: join(__dirname, './data'),
  dist: join(__dirname, './dist'),
  public: join(__dirname, './public'),
  version,
  templateRenderers: [
    new KnapsackReactRenderer({
      demoWrapperPath: join(__dirname, './demo-wrapper.tsx'),
      webpackConfig: {
        module: {
          rules: [],
        },
      },
    }),
  ],
  designTokens: {
    distDir: join(__dirname, '../core-tokens/dist'),
  },
  plugins: [],
  cloud: {
    siteId: 'example-ks-styled-components',
    repoRoot: join(__dirname, '../..'),
  },
});
