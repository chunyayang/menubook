export default {
  methods: {
    formatCategories (store) {
      return store.categories.join("&nbsp;&middot;&nbsp;")
    },
    formatPriceLevel (level) {
      if(level < 1 || level > 4) {
        return ''
      }
      return '$'.repeat(level)
    }
  }
}