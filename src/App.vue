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
        <math-editor :mode="'preview_simple'" ref="mathEditorB"></math-editor>
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

const result = `[["1"],{"uid":"2","compType":"3","children":"4"},"row-1568700677550","row-container",["5","6","7","8","9","10","11","12","13","14","15","16","17"],{"uid":"18","compType":"19","parent":"1","value":"20"},{"uid":"21","compType":"22","parent":"1","children":"23"},{"uid":"24","compType":"19","parent":"1","value":"25"},{"uid":"26","compType":"27","parent":"1","children":"28"},{"uid":"29","compType":"19","parent":"1","value":"30"},{"uid":"31","compType":"32","parent":"1","children":"33"},{"uid":"34","compType":"19","parent":"1","value":"35"},{"uid":"36","compType":"37","parent":"1"},{"uid":"38","compType":"19","parent":"1","value":"39"},{"uid":"40","compType":"41","parent":"1","children":"42"},{"uid":"43","compType":"19","parent":"1","value":"44"},{"uid":"45","compType":"46","parent":"1","children":"47"},{"uid":"48","compType":"19","parent":"1","value":"49"},"node-1568700677550","text-node","123","node-1568700677555","fractions-node",["50","51"],"node-1568700677557","1","node-1568700677562","nth-sqrt-node",["52","53"],"node-1568700677564"," ","node-1568700677567","sqrt-node",["54"],"node-1568700677569","23123","node-1568700677570","plus-node","node-1568700677576","","node-1568700677575","curly-brace-node",["55"],"node-1568700677585","122323","node-1568700677584","super-script-and-sub-script-node",["56","57","58"],"node-1568700677586","312323",{"uid":"59","compType":"60","parent":"6","slot":"61","children":"62"},{"uid":"63","compType":"60","parent":"6","slot":"64","children":"65"},{"uid":"66","compType":"60","parent":"8","slot":"67","children":"68"},{"uid":"69","compType":"60","parent":"8","slot":"70","children":"71"},{"uid":"72","compType":"60","parent":"10","slot":"67","children":"73"},{"uid":"74","compType":"60","parent":"14","slot":"67","children":"75"},{"uid":"76","compType":"60","parent":"16","slot":"67","children":"77"},{"uid":"78","compType":"60","parent":"16","slot":"79","children":"80"},{"uid":"81","compType":"60","parent":"16","slot":"70","children":"82"},"node-1568700677552","number-node","super_value",["83"],"node-1568700677554","sub_value",["84"],"node-1568700677559","value",["85"],"node-1568700677561","super_script",["86"],"node-1568700677566",["87"],"node-1568700677574",["88"],"node-1568700677579",["89"],"node-1568700677581","sub_script",["90"],"node-1568700677583",["91"],{"uid":"92","compType":"19","parent":"50","slot":"67","value":"20"},{"uid":"93","compType":"19","parent":"51","slot":"67","value":"94"},{"uid":"95","compType":"19","parent":"52","slot":"67","value":"20"},{"uid":"96","compType":"19","parent":"53","slot":"67","value":"20"},{"uid":"97","compType":"19","parent":"54","slot":"67","value":"20"},{"uid":"98","compType":"19","parent":"55","slot":"67","value":"94"},{"uid":"99","compType":"19","parent":"56","slot":"67","value":"20"},{"uid":"100","compType":"19","parent":"57","slot":"67","value":"101"},{"uid":"102","compType":"19","parent":"58","slot":"67","value":"103"},"node-1568700677551","node-1568700677553","123123","node-1568700677558","node-1568700677560","node-1568700677565","node-1568700677573","node-1568700677578","node-1568700677580","2323","node-1568700677582","23"]`

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
      this.$refs.mathEditorB.setValue(this.result)
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
