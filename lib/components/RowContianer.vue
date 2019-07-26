<template>
  <div class="row-container"
    :id="model.uid"
    @click="onRowContainerClick" 
    ref="rowContainer">
    <basic-node 
      v-for="child in model.children"
      :model="child"
      :key="child.uid" />
  </div>
</template>
<script>
import compMixin from './component-mixin'
import NodeManager from '../models/NodeManager'

export default {
  name: 'row-container',
  mixins: [compMixin],
  props: {
    model: Object
  },
  methods: {
    onRowContainerClick(evt) {
      if(!evt.target.matches('.row-container')) return
      this.focusContainer(this.model)
    }
  }
}
</script>
<style lang="less" scoped>
  .row-container {
    padding: 2.5px 5px 2.5px 5px;
    font-size: 15px;
    display: flex;
    align-items: center;
  }
</style>
