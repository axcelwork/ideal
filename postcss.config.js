module.exports = () => ({
  plugins: {
    'postcss-import': {}
    , 'postcss-mixins': {}
    , 'autoprefixer': {
      browsers: "last 4 versions",
      grid: "autoplace"
    }
    , 'precss': {}
    , 'cssnano': {}
  }
})
