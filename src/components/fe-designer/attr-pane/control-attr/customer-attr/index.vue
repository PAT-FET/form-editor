<template>
<div>
<attr-field label="数据源">
  <el-input v-model.trim="def.model"></el-input>
</attr-field>
<!-- <attr-field label="标题">
  <el-input v-model.trim="def.name"></el-input>
</attr-field> -->
<attr-field label="客户标签">
  <el-checkbox-group v-model="options.tags">
    <el-checkbox label="riskLevel">风险等级</el-checkbox>
    <el-checkbox label="basicInfo" disabled>基本信息</el-checkbox>
    <el-checkbox label="quotaInfo" disabled>额度信息</el-checkbox>
  </el-checkbox-group>
</attr-field>
<attr-field label="接口地址">
  <el-input v-model.trim="options.url"></el-input>
</attr-field>
<attr-field label="基本信息url">
  <el-input v-model.trim="options.basicInfoUrl"></el-input>
</attr-field>
<attr-field label="风控等级url">
  <el-input v-model.trim="options.riskLevelUrl"></el-input>
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
import { FieldHtmlDefinition, FieldHtmlOptions } from '@/components/type'

@Component
export default class HtmlAttr extends mixins(ControlMixins) {
  get def (): FieldHtmlDefinition {
    return this.activeControl as FieldHtmlDefinition
  }

  get options (): FieldHtmlOptions {
    return this.def.options
  }
}
</script>

<style lang="scss" module>

</style>
