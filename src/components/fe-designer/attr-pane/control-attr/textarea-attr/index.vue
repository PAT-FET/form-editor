<template>
<div>
<attr-field label="数据源">
  <el-input v-model.trim="def.model"></el-input>
</attr-field>
<attr-field label="标题">
  <el-input v-model.trim="def.name"></el-input>
</attr-field>
<attr-field label="占位内容">
  <el-input v-model.trim="options.placeholder"></el-input>
</attr-field>
<attr-field label="默认值">
  <el-input type="textarea" :rows="2" v-model.trim="options.defaultValue"></el-input>
</attr-field>
<attr-field label="操作属性">
  <el-checkbox v-model="options.hidden">隐藏</el-checkbox>
  <el-checkbox v-model="options.disabled">禁用</el-checkbox>
</attr-field>
<attr-field label="校验">
  <el-checkbox v-model="options.required">必填</el-checkbox> <br/>
  <el-select v-model="options.dataType">
    <el-option label="字符串" value="string"></el-option>
    <el-option label="邮箱地址" value="email"></el-option>
  </el-select>
  <el-input v-model.trim="options.pattern" placeholder="填写正则表达式" style="margin-top: 10px;"></el-input>
</attr-field>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import ControlMixins from '../ControlMixins'
import { FieldTextareaDefinition, FieldTextareaOptions } from '@/components/type'

@Component
export default class TextareaAttr extends mixins(ControlMixins) {
  get def (): FieldTextareaDefinition {
    return this.activeControl as FieldTextareaDefinition
  }

  get options (): FieldTextareaOptions {
    return this.def.options
  }
}
</script>

<style lang="scss" module>

</style>
