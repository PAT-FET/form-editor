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
import { FormDefinition, ControlDefinition, GridDefinition } from '@/components/type'
import { genKey, cloneControlDef, findList } from '@/components/utils'

@Component({
  components: { ToolBar, ControlPane, DisplayZone, AttrPane }
})
export default class FeDesigner extends Vue {
  @ProvideReactive() @Prop({ type: Boolean, default: true }) preview!: boolean
  @ProvideReactive() @Prop({ type: Boolean, default: true }) generateJson!: boolean
  @ProvideReactive() @Prop({ type: Boolean, default: true }) clearable!: boolean
  @ProvideReactive() @Prop({ type: Boolean, default: true }) upload!: boolean
  @Prop(String) fileAction!: string
  @Prop(String) imgAction!: string

  @ProvideReactive() def: FormDefinition = new FormDefinition()

  @ProvideReactive() activeControl: ControlDefinition | null = null

  @Provide() getFormDef () {
    return this.def
  }

  @Provide() setActiveControl (control: ControlDefinition) {
    this.activeControl = control
  }

  @Provide() getActiveControl (): ControlDefinition | null {
    return this.activeControl
  }

  @Provide() cloneControl (control: ControlDefinition) {
    const clone = cloneControlDef(control)
    if (clone.type === 'fileupload' && this.fileAction) {
      (clone.options as any).action = this.fileAction
    }
    if (clone.type === 'imgupload' && this.imgAction) {
      (clone.options as any).action = this.imgAction
    }
    return clone
  }

  @Provide() addControl (control: ControlDefinition) {
    const list = this.def.list
    const item = this.cloneControl(control)
    if (!this.activeControl) {
      list.push(item)
    } else {
      const ls = findList(list, this.activeControl) as ControlDefinition[]
      const idx = ls.findIndex(v => v === this.activeControl)
      ls.splice(idx === -1 ? ls.length - 1 : idx + 1, 0, item)
    }
    this.setActiveControl(item)
  }

  @Provide() delControl (control: ControlDefinition) {
    const list = findList(this.def.list, control) as ControlDefinition[]
    const idx = list.findIndex(v => v === control)
    if (idx !== -1) {
      list.splice(idx, 1)
      const next = idx === list.length ? idx - 1 : (idx === 0 ? 0 : idx)
      this.setActiveControl(list[next] || null)
    }
  }

  @Provide() clearControl () {
    this.def.list = []
    this.activeControl = null
  }

  @Provide() setJSON (json: string) {
    if (!json) {
      this.def = new FormDefinition()
    } else {
      this.def = JSON.parse(json)
    }
    this.$nextTick(() => {
      if (this.def.list[0]) this.setActiveControl(this.def.list[0])
    })
  }

  getJSON () {
    return JSON.stringify(this.def)
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
}

.zone {
  flex: 1 1 auto;
  overflow: auto;
}
</style>
