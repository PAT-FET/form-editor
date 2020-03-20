<template>
<div :class="[$style.container]">
  <control-pane :class="[$style.left]"></control-pane>
  <div :class="[$style.main]">
    <tool-bar></tool-bar>
    <display-zone :class="[$style.zone]" :def="def"></display-zone>
  </div>
  <attr-pane :class="[$style.right]"></attr-pane>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ToolBar from './tool-bar/index.vue'
import ControlPane from './control-pane/index.vue'
import DisplayZone from './display-zone/index.vue'
import AttrPane from './attr-pane/index.vue'
import { FormDefinition } from '@/components/type'
import { genKey } from '@/components/utils'

@Component({
  components: { ToolBar, ControlPane, DisplayZone, AttrPane }
})
export default class FeDesigner extends Vue {
  def: FormDefinition = {
    list: [
      {
        key: genKey(),
        type: 'input',
        model: 'abc',
        name: '单文本',
        options: {
          disabled: false,
          dataType: 'string',
          defaultValue: '',
          required: false,
          pattern: '',
          placeholder: ''
        }
      },
      {
        key: genKey(),
        type: 'input',
        model: 'efg',
        name: '单文本',
        options: {
          disabled: false,
          dataType: 'string',
          defaultValue: '',
          required: false,
          pattern: '',
          placeholder: ''
        }
      }
    ],
    config: {
      disabled: false
    }
  }

  setJSON (json: string) {
    this.def = JSON.parse(json)
  }
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  border: 1px solid #e0e0e0;
  margin: 20px;
  background-color: #fff;
}

.left {
  width: 250px;
  height: 100%;
  overflow: auto;
}

.main {
  flex: 1 1 auto;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.right {
  width: 300px;
  height: 100%;
  overflow: auto;
}

.zone {
  flex: 1 1 auto;
  overflow: auto;
}
</style>
