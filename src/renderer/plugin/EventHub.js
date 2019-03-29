const eventHub = {
  install: function (Vue, options) {
    Vue.prototype.$eventHub = new Vue()
  }
}
export default eventHub