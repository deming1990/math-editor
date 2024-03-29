<template>
  <div :class="mathEditorCss" :style="mathEditorStyles">
    <div class="math-editor-header" v-if="isEditMode">
      <math-toolbar @categoryClick="onMathToolbarCategoryClick">
      </math-toolbar>
    </div>
    <div class="math-editor-body" ref="mathEditorBody">
      <math-textarea
        v-if="!isHtmlMode"
        ref="mathTextarea" 
        :class="{'fit-panel': panelVisible}"
        :style="mathTextareaStyles"></math-textarea>
      <math-node-panel 
        v-if="panelVisible" 
        :category="currCategory" 
        @mathNodeSelect="onMathNodeSelect"
        @close="onMathNodePanelClose">
      </math-node-panel>
      <div class="html-mode" v-if="isHtmlMode" v-html="rawHtml"></div>
    </div>
  </div>  
</template>
<script>
import Vue from 'vue'
import {NODE_TYPES, EDITOR_MODES} from './constants'
import MathTextarea from './components/MathTextarea.vue'
import MathToolbar from './components/MathToolbar.vue'
import MathNodePanel from './components/MathNodePanel.vue'

export default {
  name: 'math-editor',
  components: {
    [MathTextarea.name]: MathTextarea,
    [MathToolbar.name]: MathToolbar,
    [MathNodePanel.name]: MathNodePanel
  },
  props: {
    mode: {
      type: String,
      default: EDITOR_MODES.PREVIEW
    },
    height: {
      type: String
    },
    normalFontSize: {
      type: Number,
      default: 24
    },
    smallFontSize: {
      type: Number,
      default: 20
    },
    textAreaWidth: {
      type: String
    }
  },
  data() {
    return {
      EDITOR_MODES,
      currCategory: '',
      panelVisible: false,
      rawHtml: ''
    }
  },
  computed: {
    isEditMode() {
      return this.mode === EDITOR_MODES.EDIT
    },
    isPreviewMode() {
      return this.mode === EDITOR_MODES.PREVIEW
    },
    isPreviewSimpleMode() {
      return this.mode === EDITOR_MODES.PREVIEW_SIMPLE
    },
    isHtmlMode() {
      return this.mode === EDITOR_MODES.HTML
    },
    isEditLineFeed() {
      return this.mode === EDITOR_MODES.EDIT && !!this.textAreaWidth
    },
    mathEditorCss() {
      return {
        'math-editor': true,
        'edit-mode': this.isEditMode,
        'preview-mode': this.isPreviewMode || this.isPreviewSimpleMode,
        'html-mode': this.isHtmlMode
      }
    },
    mathEditorStyles() {
      const styles = {}
      if(this.height) {
        styles['height'] = this.height
      }
      return styles
    },
    mathTextareaStyles() {
      const styles = {}
      if(this.textAreaWidth) {
        styles['width'] = this.textAreaWidth
        styles['borderRight'] = '1px dashed #d3d3d3'
      }
      return styles
    }
  },
  provide() {
    const data = {
      isPreviewMode: this.isPreviewMode,
      isPreviewSimpleMode: this.isPreviewSimpleMode,
      isEditMode: this.isEditMode,
      isEditLineFeed: this.isEditLineFeed,
      isHtmlMode: this.isHtmlMode,
      _normalFontSize: this.normalFontSize,
      _normalHeight: this.normalFontSize + 2,
      _smallFontSize: this.smallFontSize,
      _smallHeight: this.smallFontSize + 2
    }
    this.globalVM = new Vue({data})
    return data
  },
  destroyed() {
    this.globalVM = null
  },
  methods: {
    getValue() {
      return this.$refs.mathTextarea.getValue()  
    },
    getHtml() {
      return this.$refs.mathTextarea.$el.outerHTML
    },
    setValue(str) {
      this.$refs.mathTextarea.setValue(str)
    },
    setHtml(html) {
      this.rawHtml = html
    },
    isEmpty() {
      return this.$refs.mathTextarea.isEmpty()
    },
    onMathToolbarCategoryClick(code) {
      this.currCategory = code
      this.panelVisible = true
    },
    onMathNodeSelect(compType) {
      this.$refs.mathTextarea.addMathNode(compType)
    },
    onMathNodePanelClose() {
      this.panelVisible = false
    }
  }
}
</script>
<style lang="less">
  @font-face {
    font-family: 'STIX2Text-Italic';
    src: url('./assets/font/STIX2Text-Italic.woff') format('woff'),
         url('./assets/font/STIX2Text-Italic.woff2') format('woff2');
  }
  @font-face {
    font-family: Han;
    font-style: italic;
    src: local("PingFang SC"), local("Microsoft YaHei"), local("Source Han Sans CN");
  }
  .math-editor * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-appearance: none;
    -webkit-touch-callout: none;
    box-sizing: border-box;
  }
  .html-mode {
    .text-node {
      input {
        display: none;
      }
      span {
        visibility: visible!important;
      }
    }  
  }
</style>
<style lang="less" scoped>
  @border-color: #d3d3d3;
  .math-editor {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    &.edit-mode {
      border: 1px solid @border-color;
      border-radius: 4px;
    }
    &.preview-mode, &.html-mode {
      display: block;
      height: auto;
      .math-editor-header {
        display: none;
      }
    }
    .math-editor-header {
      position: relative;
      border-bottom: 1px solid @border-color;
    }
    .math-editor-body {
      position: relative;
      flex: 1 1 0;
      overflow: hidden;
    }
    .fit-panel {
      height: 60%!important;
    }
  }
</style>
