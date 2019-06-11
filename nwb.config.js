module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'Uploods',
      externals: {
        react: 'React'
      }
    }
  }
}
