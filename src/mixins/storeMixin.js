export default {
  methods: {
    formatTags (tags) {
      return tags.join("&nbsp;&middot;&nbsp;")
    },
    formatPriceLevel (level) {
      if(level < 1 || level > 4) {
        return ''
      }
      return '$'.repeat(level)
    }
  }
}
