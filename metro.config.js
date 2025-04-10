const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

// 👉 Required for SVG support
defaultConfig.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg');
defaultConfig.resolver.sourceExts.push('svg');

module.exports = withNativeWind(
  mergeConfig(defaultConfig, {}),
  {
    input: path.resolve(__dirname, 'global.css'),
    configPath: path.resolve(__dirname, 'tailwind.config.js'),
    projectRoot: __dirname
  }
);
