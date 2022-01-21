//const CracoAntDesignPlugin = require('craco-antd');
const CracoLessPlugin = require("craco-less");
const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
  webpack: {
    alias: {
      '@': resolve("src"),
      'components': resolve("src/components")
    }
  },
  plugins: [
    { plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true
          }
        }
      }
    },
  ]
};