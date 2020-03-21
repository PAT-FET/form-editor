<template>
<div :class="[$style.container]">
  <control-pane :class="[$style.left]" :def="def"></control-pane>
  <div :class="[$style.main]">
    <tool-bar></tool-bar>
    <display-zone :class="[$style.zone]" :def="def"></display-zone>
  </div>
  <attr-pane :class="[$style.right]"></attr-pane>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, ProvideReactive, Provide } from 'vue-property-decorator'
import ToolBar from './tool-bar/index.vue'
import ControlPane from './control-pane/index.vue'
import DisplayZone from './display-zone/index.vue'
import AttrPane from './attr-pane/index.vue'
import { FormDefinition, ControlDefinition } from '@/components/type'
import { genKey } from '@/components/utils'

@Component({
  components: { ToolBar, ControlPane, DisplayZone, AttrPane }
})
export default class FeDesigner extends Vue {
  def: FormDefinition = new FormDefinition()

  @ProvideReactive() activeControl: ControlDefinition | null = null

  @Provide() setActiveControl (control: ControlDefinition) {
    this.activeControl = control
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
