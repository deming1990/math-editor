<template>
  <div :class="mathEditorCss" :style="mathEditorStyles">
    <div class="math-editor-header">
      <math-toolbar @categoryClick="onMathToolbarCategoryClick">
      </math-toolbar>
    </div>
    <div class="math-editor-body" ref="mathEditorBody">
      <math-textarea 
        ref="mathTextarea" 
        :class="{'fit-panel': panelVisible}"
        :style="mathTextareaStyles"></math-textarea>
      <math-node-panel v-if="panelVisible" 
        :category="currCategory" 
        @mathNodeSelect="onMathNodeSelect"
        @close="onMathNodePanelClose">
      </math-node-panel>
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
      default: 16
    },
    smallFontSize: {
      type: Number,
      default: 12
    },
    textAreaWidth: {
      type: String
    }
  },
  data() {
    return {
      EDITOR_MODES,
      currCategory: '',
      panelVisible: false
    }
  },
  computed: {
    isEditMode() {
      return this.mode === EDITOR_MODES.EDIT
    },
    isPreviewMode() {
      return this.mode === EDITOR_MODES.PREVIEW
    },
    mathEditorCss() {
      return {
        'math-editor': true,
        'edit-mode': this.isEditMode,
        'preview-mode': this.isPreviewMode
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
    return {
      isPreviewMode: this.isPreviewMode,
      _normalFontSize: this.normalFontSize,
      _normalHeight: this.normalFontSize + 2,
      _smallFontSize: this.smallFontSize,
      _smallHeight: this.smallFontSize + 2
    }
  },
  methods: {
    getValue() {
      return this.$refs.mathTextarea.getValue()  
    },
    setValue(str) {
      this.$refs.mathTextarea.setValue(str)
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
    &.preview-mode {
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
