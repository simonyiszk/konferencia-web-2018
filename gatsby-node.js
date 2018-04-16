// TODO: Remove this temporary workaround
// Source: https://github.com/gatsbyjs/gatsby/issues/2538#issuecomment-356769913
exports.modifyWebpackConfig = ({ config, stage }) => {
  const timestamp = Date.now();

  // Cache busting
  if (stage === 'build-javascript') {
    config.merge({
      output: {
        filename: `[name]-${timestamp}-[chunkhash].js`,
        chunkFilename: `[name]-${timestamp}-[chunkhash].js`,
      },
    });
  }

  return config;
};
