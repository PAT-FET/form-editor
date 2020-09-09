<template>
<div>
<attr-field label="字段标识">
  <el-input v-model.trim="def.model"></el-input>
</attr-field>
<attr-field label="标题">
  <el-input v-model.trim="def.name"></el-input>
</attr-field>
<attr-field label="自动对比">
  <el-checkbox v-model="options.mark">启用</el-checkbox>
</attr-field>
<attr-field label="数据源">
  <options-pane :list="cols" :checkable="false" :add-fn="addColFn">
    <template slot-scope="{row}">
      <div style="margin-right: 12px;">
        <el-input v-model="row.name" size="mini" placeholder="数据源标识"></el-input>
      </div>
      <div style="margin-right: 12px;">
        <el-input v-model="row.label" size="mini" placeholder="数据源名称"></el-input>
      </div>
      <div style="margin-right: 12px;" title="可标记">
        <el-checkbox v-model="row.markable">可标记</el-checkbox>
      </div>
    </template>
  </options-pane>
</attr-field>
<attr-field label="字段列表">
  <options-pane :list="rows" :checkable="false" :add-fn="addRowFn">
    <template slot-scope="{row}">
      <div style="margin-right: 12px;">
        <el-input v-model="row.name" size="mini" placeholder="字段标识"></el-input>
      </div>
      <div style="margin-right: 12px;">
        <el-input v-model="row.label" size="mini" placeholder="字段名称"></el-input>
      </div>
    </template>
  </options-pane>
</attr-field>
<!-- <attr-field label="默认值">
  <el-input v-model.trim="options.defaultValue"></el-input>
</attr-field> -->
<attr-field label="操作属性">
  <el-checkbox v-model="options.hidden">隐藏</el-checkbox>
</attr-field>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import ControlMixins from '../ControlMixins'
import { FieldAuditDiffDefinition, FieldAuditDiffOptions } from '@/components/type'
import OptionsPane from '../../options-pane/index.vue'

@Component({
  components: { OptionsPane }
})
export default class AuditDiffAttr extends mixins(ControlMixins) {
  get def (): FieldAuditDiffDefinition {
    return this.activeControl as FieldAuditDiffDefinition
  }

  get options (): FieldAuditDiffOptions {
    return this.def.options
  }

  get cols () {
    return this.def.cols
  }

  get rows () {
    return this.def.rows
  }

  addColFn (list: any[]) {
    const max = Math.max(...list.map(v => (+(v.name || '').slice(-1) || 1)), 1)
    const name = 'data' + (max + 1)
    const label = '数据源 ' + (max + 1)
    list.push({ name, label, markable: false })
  }

  addRowFn (list: any[]) {
    const max = Math.max(...list.map(v => (+(v.name || '').slice(-1) || 1)), 1)
    const name = 'key' + (max + 1)
    const label = '字段 ' + (max + 1)
    list.push({ name, label })
  }
}
</script>

<style lang="scss" module>

</style>
