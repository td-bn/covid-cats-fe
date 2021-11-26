// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.externals.push({ canvas: {} })
    return config
  },
};
