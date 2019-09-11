<template>
  <div class="container">
    <div class="tab-head">
      <div v-for="item in tabs" 
        :class="'tab-head-item'"
        :key="item.id">
        {{item.name}}
      </div>
    </div>
    <div class="tab-body">
      <div class="tab-body-item">
        <math-editor 
          :mode="'edit'"
          ref="mathEditorA">
        </math-editor>
      </div>
      <div class="tab-body-item">
        <math-editor :mode="'preview'" ref="mathEditorB"></math-editor>
      </div>
      <div class="tab-body-item">
        <math-editor :mode="'html'" ref="mathEditorC"></math-editor>
      </div>
    </div>
    <ul class="action-group">
      <li class="action">
        <button @click="handleOutput">导出数据</button>
      </li>
      <li class="action">
        <button @click="handleInput">导入数据</button>
      </li>
      <li class="action">
        <button @click="handleHtml">导出\导入HTML</button>
      </li>
    </ul>
    <div class="result-section">
      <div class="section-title">
        数据
      </div>
      <div class="section-content">
        {{result}}
      </div>
    </div>
  </div>
</template>
<script>

const TABS = [
  {id: 1, name: '编辑模式'},
  {id: 2, name: '预览模式'},
  {id: 3, name: 'HTML模式'}
]

const result = `[["1"],{"uid":"2","compType":"3","children":"4"},"row-1568167399462","row-container",["5","6","7","8","9","10","11","12","13"],{"uid":"14","compType":"15","parent":"1","value":"16"},{"uid":"17","compType":"18","parent":"1"},{"uid":"19","compType":"15","parent":"1","value":"20"},{"uid":"21","compType":"22","parent":"1","children":"23"},{"uid":"24","compType":"15","parent":"1","value":"25"},{"uid":"26","compType":"18","parent":"1"},{"uid":"27","compType":"15","parent":"1","value":"20"},{"uid":"28","compType":"29","parent":"1","children":"30"},{"uid":"31","compType":"15","parent":"1","value":"32"},"node-1568167399468","text-node","1231","node-1568167399470","minus-node","node-1568167399472","","node-1568167399467","fractions-node",["33","34"],"node-1568167399474","2","node-1568167399473","node-1568167399481","node-1568167399480","square-node",["35","36"],"node-1568167399475","3",{"uid":"37","compType":"38","parent":"8","slot":"39","children":"40"},{"uid":"41","compType":"38","parent":"8","slot":"42","children":"43"},{"uid":"44","compType":"38","parent":"12","slot":"45","children":"46"},{"uid":"47","compType":"38","parent":"12","slot":"48","children":"49"},"node-1568167399464","number-node","super_value",["50"],"node-1568167399466","sub_value",["51"],"node-1568167399477","value",["52"],"node-1568167399479","super_script",["53"],{"uid":"54","compType":"15","parent":"33","slot":"45","value":"55"},{"uid":"56","compType":"15","parent":"34","slot":"45","value":"55"},{"uid":"57","compType":"15","parent":"35","slot":"45","value":"58"},{"uid":"59","compType":"15","parent":"36","slot":"45","value":"58"},"node-1568167399463","123","node-1568167399465","node-1568167399476","23","node-1568167399478"]`

export default {
  data() {
    return {
      tabs: TABS,
      currTab: TABS[0].id,
      result: ''
    }
  },
  methods: {
    switchTab(id) {
      this.currTab = id
    },
    handleOutput() {
      this.result = this.$refs.mathEditorA.getValue()
    },
    handleInput() {
      this.$refs.mathEditorB.setValue(result)
    },
    handleHtml() {
      const html = this.$refs.mathEditorA.getHtml()
      this.$refs.mathEditorC.setHtml(html)
    }
  }
}
</script>
<style lang="less" scoped>
@border-color: #d3d3d3;
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.container {
  position: relative;
  width: 1000px;
  height: 700px;
  display: flex;
  flex-direction: column;
  border: 1px solid @border-color;
  border-radius: 4px;
  .tab-head {
    height: 30;
    display: flex;
    border-bottom: 1px solid @border-color;
    .tab-head-item {
      flex: 1;
      line-height: 30px;
      font-size: 16px;
      color: #333;
      text-align: center;
      border-right: 1px solid @border-color;
      cursor: pointer;
      &:last-child {
        border-right: none;
      }
    }
  }
  .tab-body {
    flex: 1;
    display: flex;
    .tab-body-item {
      flex: 1;
      overflow: hidden;
      padding: 5px;
    }
  }
  .action-group {
    height: 30px;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    .action {
      flex: 1;
      padding-left: 10px;
    }
  }
  .result-section {
    .section-title {
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      text-align: center;
      color: #333;
      border-top: 1px solid #d3d3d3;
      border-bottom: 1px solid #d3d3d3;
    }
    .section-content {
      height: 150px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
</style>
