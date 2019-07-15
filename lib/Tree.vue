<template>
  <div class="tree">
    <div v-for="node in nodes" :key="node.id" class="tree-node">
      <Node :dataSet="node" />
    </div>
  </div>
</template>
<script>
import Node from './Node.vue'

export default {
  components: {
    Node
  },
  data() {
    return {
      name: 'tree',
    }
  },
  props: {
    nodes: Array
  }
}
</script>
<style lang="less" scoped>
  .tree {
    display: flex;
    align-content: center;
  }
  .tree-node {
    margin: 5px 0 0 5px;
  }
</style>
