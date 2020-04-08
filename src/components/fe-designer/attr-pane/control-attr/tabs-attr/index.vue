<template>
<div>
<attr-field label="风格类型">
  <el-radio-group v-model="options.type" size="mini">
    <el-radio-button label="">默认</el-radio-button>
    <el-radio-button label="card">选项卡</el-radio-button>
    <el-radio-button label="border-card">卡片</el-radio-button>
  </el-radio-group>
</attr-field>
<attr-field label="选项卡位置">
  <el-radio-group v-model="options.tabPosition" size="mini">
    <el-radio-button label="top">顶部</el-radio-button>
    <el-radio-button label="left">左侧</el-radio-button>
    <el-radio-button label="right">右侧</el-radio-button>
    <el-radio-button label="bottom">底部</el-radio-button>
  </el-radio-group>
</attr-field>
<attr-field label="标签配置项">
  <options-pane :list="tabs" :checkable="false" :add-fn="addFn" add-text="添加标签">
    <template slot-scope="{row}">
      <div style="margin-right: 12px;">
        <el-input v-model="row.label" size="mini"></el-input>
      </div>
    </template>
  </options-pane>
</attr-field>
<attr-field label="操作属性">
  <el-checkbox v-model="options.hidden">隐藏</el-checkbox>
</attr-field>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import ControlMixins from '../ControlMixins'
import { TabsDefinition, TabsOptions, Tab } from '@/components/type'
import OptionsPane from '../../options-pane/index.vue'

@Component({
  components: { OptionsPane }
})
export default class TabsAttr extends mixins(ControlMixins) {
  get def (): TabsDefinition {
    return this.activeControl as TabsDefinition
  }

  get options (): TabsOptions {
    return this.def.options
  }

  get tabs (): Tab[] {
    return this.def.tabs
  }

  addFn (list: Tab[]) {
    const item = new Tab()
    const max = Math.max(...list.map(v => (+(v.label || '').slice(-1) || 1)))
    item.label = 'Tab ' + (max + 1)
    list.push(item)
  }
}
</script>

<style lang="scss" module>

</style>
