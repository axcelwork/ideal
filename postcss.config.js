module.exports = () => ({
  plugins: {
    'postcss-import': {}
    , 'postcss-mixins': {}
    , 'autoprefixer': {
      browsers: "last 1 versions",
      grid: "autoplace"
    }
    , 'precss': {}
    , 'cssnano': {}
  }
})
