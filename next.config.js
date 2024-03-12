/** @type {import('next').NextConfig} */

const webpack = require('webpack')
const WebpackConfig = require('./dfx.webpack.config.js')
WebpackConfig.initCanisterIds()

const envPlugin = new webpack.EnvironmentPlugin({
    DFX_NETWORK: 'local',
})

const nextConfig = {
    devIndicators: {
        buildActivity: false,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(envPlugin)
        return config
    },
    output: 'export',
}

module.exports = nextConfig
