export default {
  formatPriceLevel(level) {
    if (level < 1 || level > 4) {
      return ''
    }
    return '$'.repeat(level)
  }
}
