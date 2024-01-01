const openLink = {
  methods: {
    // eslint-disable-next-line no-unused-vars
    openLink (link) {
      console.log(link)
      window.open(link, 'blank')
    }
  }
}

export default openLink
