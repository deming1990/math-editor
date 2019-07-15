export default {
  methods: {
    $dispatch(compName, evtName, evtData) {
      let curr = this
      let root = this.$root
      if (curr.name === compName) { 
        curr.$emit(evtName, evtData)
      }
      while(curr.name !== compName && curr !== root) {
        curr = curr.$parent
        if (curr.name === compName) {
          curr.$emit(evtName, evtData)
          return
        }
      } 
    }
  }
}
