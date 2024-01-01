const trimString = {
  methods: {
    // eslint-disable-next-line no-unused-vars
    trimString (value, upper = false) {
      if (value) {
        if (upper) {
          return value.trim().toUpperCase()
        } else {
          return value.trim()
        }
      } else {
        return null
      }
    }
  }
}

export default trimString
