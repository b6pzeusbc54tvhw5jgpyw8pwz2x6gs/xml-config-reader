module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.css$/,
        use: isServer ? ['css-loader'] : ['style-loader', 'css-loader'],
      },
    ]

    return config
  }
}

