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
        <math-editor :mode="'preview'" ref="mathEditorB" :normalFontSize="22"></math-editor>
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

// const result = {"id":0,"type":"CHOICE_SINGLE","title":{"text":" ","mathText":"[[\"1\"],{\"uid\":\"2\",\"compType\":\"3\",\"children\":\"4\"},\"row-1572849227619\",\"row-container\",[\"5\",\"6\",\"7\"],{\"uid\":\"8\",\"compType\":\"9\",\"parent\":\"1\",\"value\":\"10\"},{\"uid\":\"11\",\"compType\":\"12\",\"parent\":\"1\",\"children\":\"13\"},{\"uid\":\"14\",\"compType\":\"9\",\"parent\":\"1\",\"value\":\"15\"},\"node-1572849228126\",\"text-node\",\"猪八戒去餐厅吃午餐，由于客人太多，小吃只剩下：水晶虾饺、蟹黄汤包、牛肉豆皮、米酒汤圆，主食只剩下：担担面和过桥米线，饮品只剩下：豆浆和可乐．如果猪八戒主食只点一种、但小吃点两种、饮品只点一种，则猪八戒有 \",\"node-1572849228125\",\"bracket-node\",[\"16\"],\"node-1572849228127\",\"种不同的点餐方法．\",{\"uid\":\"17\",\"compType\":\"18\",\"parent\":\"19\",\"slot\":\"20\",\"children\":\"21\"},\"node-1572849228124\",\"number-node\",{\"uid\":\"11\",\"compType\":\"12\",\"parent\":\"1\",\"children\":\"13\"},\"value\",[\"22\"],{\"uid\":\"23\",\"compType\":\"9\",\"parent\":\"24\",\"slot\":\"20\",\"value\":\"25\"},\"node-1572849228123\",{\"uid\":\"17\",\"compType\":\"18\",\"parent\":\"19\",\"slot\":\"20\",\"children\":\"21\"},\"\"]","mathHtml":"","image":"","audio":"","imageSize":null},"items":[{"cid":0,"head":"A","field":{"text":" ","mathText":"[[\"1\"],{\"uid\":\"2\",\"compType\":\"3\",\"children\":\"4\"},\"row-1572849227620\",\"row-container\",[\"5\"],{\"uid\":\"6\",\"compType\":\"7\",\"parent\":\"1\",\"value\":\"8\"},\"node-1572849228128\",\"text-node\",\"2\"]","mathHtml":"","image":"","audio":""}},{"cid":1,"head":"B","field":{"text":" ","mathText":"[[\"1\"],{\"uid\":\"2\",\"compType\":\"3\",\"children\":\"4\"},\"row-1572849227621\",\"row-container\",[\"5\"],{\"uid\":\"6\",\"compType\":\"7\",\"parent\":\"1\",\"value\":\"8\"},\"node-1572849228129\",\"text-node\",\"8\"]","mathHtml":"","image":"","audio":""}},{"cid":2,"head":"C","field":{"text":" ","mathText":"[[\"1\"],{\"uid\":\"2\",\"compType\":\"3\",\"children\":\"4\"},\"row-1572849227622\",\"row-container\",[\"5\"],{\"uid\":\"6\",\"compType\":\"7\",\"parent\":\"1\",\"value\":\"8\"},\"node-1572849228130\",\"text-node\",\"24\"]","mathHtml":"","image":"","audio":""}}],"time":30,"score":10,"answer":2,"analyTxt":"","mathAnalyTxt":"[[\"1\"],{\"uid\":\"2\",\"compType\":\"3\",\"children\":\"4\"},\"row-1572849227623\",\"row-container\",[\"5\"],{\"uid\":\"6\",\"compType\":\"7\",\"parent\":\"1\",\"value\":\"8\"},\"node-1572849228131\",\"text-node\",\"根据猪八戒主食只点一种，但小吃要点两种，饮品只点一种， ①\\t主食只点一种共有2种可能 ②\\t小吃点两种有6种可能 ③\\t饮品只点一种有2种可能 最后运用乘法原理共有2×6×2=24（种）可能.\"]","mathAnalyHtml":"","optionTypeCode":"math_text","subjectId":2,"useMathEditor":true};

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
