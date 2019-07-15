<template>
  <component :is="dataSet.type" 
    :dataSet="dataSet"></component>
</template>
<script>
import TextNode from './TextNode.vue'
import FractionsNode from './mathSymbolNode/FractionsNode.vue'

export default {
  components: {
    TextNode,
    FractionsNode
  },
  props: {
    dataSet: Object
  }
}
</script>
<style lang="less" scoped>

</style>
