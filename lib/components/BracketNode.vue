<template>
  <div class="bracket-container">
    <div :id="model.uid" :class="bracketStyles" v-if="!isCurlyBrace">
      <div class="bracket-wrapper">
        <basic-node v-for="item in model.children" :model="item" :key="item.uid" />
      </div>
    </div>
    <div :id="model.uid" class="brace-node" v-if="isCurlyBrace">
      <div class="curly-brace">
        <div class="brace top-half"></div>
        <div class="brace bottom-half"></div>
      </div>
      <div style="margin-right: -6px;">
        <basic-node v-for="item in model.children" :model="item" :key="item.uid" />
      </div>
      <div class="curly-brace right">
        <div class="brace top-half"></div>
        <div class="brace bottom-half"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {NODE_TYPES} from '../constants'

export default {
  name: NODE_TYPES.BRACKET_NODE,
  props: {
    model: Object
  },
  computed: {
    isBracket() {
      return NODE_TYPES.BRACKET_NODE === this.model.compType
    },
    isAbsolute() {
      return NODE_TYPES.ABSOLUTE_NODE === this.model.compType
    },
    isSquareBracket() {
      return NODE_TYPES.SQUARE_BRACKET_NODE === this.model.compType
    },
    isCurlyBrace() {
      return NODE_TYPES.CURLY_BRACE_NODE === this.model.compType
    },
    bracketStyles() {
      return {
        'bracket-node': true,
        'bracket': this.isBracket,
        'absolute': this.isAbsolute,
        'square-bracket': this.isSquareBracket
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variables.less';
  .bracket-container {
    position: relative;
    height: fit-content;
  }
  .bracket-node {
    position: relative;
    margin: 0 8px;
    display: inline-flex;
    align-items: center;
    &.bracket:before, 
    &.bracket:after,
    &.absolute:before,
    &.absolute:after,
    &.square-bracket:before,
    &.square-bracket:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 6px;
    }
    &.bracket:before, 
    &.absolute:before,
    &.square-bracket:before {
        left: -6px;
        border-left: 2px solid #000;
        border-radius: 50% 0 0 50%;
    }
    &.bracket:after,
    &.absolute:after,
    &.square-bracket:after {
        right: -6px;
        border-right: 2px solid #000;
        border-radius: 0 50% 50% 0;
    }
    &.bracket:before, 
    &.bracket:after {
      width: 10px;
    }
    &.absolute:before,
    &.absolute:after,
    &.square-bracket:before,
    &.square-bracket:after {
      border-radius: 0;
    }
    &.square-bracket:before,
    &.square-bracket:after {
      border-top: 2px solid #000;
      border-bottom: 2px solid #000;
    }
    .bracket-wrapper {
      position: relative;
      padding: 0 4px;
    }
  }
  .brace-node {
    position: relative;
    display: inline-flex;
    align-items: stretch;
    .curly-brace {
      position: relative;
      width: 10px;
      flex: 1;
      -webkit-writing-mode: vertical-rl;
      writing-mode: tb-rl;
    }
    .curly-brace.right {
      margin-left: 5px;
      transform: rotate(180deg)
    }
    .brace {
      margin: 10% 0;
      height: 30%;
      width: 5px;
      &.top-half {
        border-left: 2px solid #000;
        margin-left: -2px;
      }
      &.top-half:before {
        top: 0;
        left: 5px;
        border-left: 2px solid #000;
        border-top-left-radius: 20px;
      }
      &.top-half:after {
        left: 0px;
        bottom: 50%;
        border-right: 2px solid #000;
        border-bottom-right-radius: 20px;
      }
      &.bottom-half {
        margin-top: 60%;
        border-right: 2px solid #000;
      }
      &.bottom-half:before {
        left: 0px;
        bottom: 40%;
        border-right: 2px solid #000;
        border-top-right-radius: 20px;
      }
      &.bottom-half:after {
        left: 5px;
        bottom: 0;
        border-left: 2px solid;
        border-bottom-left-radius: 20px;
      }
    }
    .brace:before,
    .brace:after {
      content: "";
      height: 10%;
      width: 5px;
      position: absolute;
      display: block;
    }
  }
</style>
