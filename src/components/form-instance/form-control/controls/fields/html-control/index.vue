<template>
<el-form-item :label="label" :label-width="labelWidth" :prop="def.model" :hidden="options.hidden">
  <span v-html="html"></span>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, InjectReactive } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldHtmlDefinition, FieldHtmlOptions } from '@/components/type'

@Component
export default class HtmlControl extends mixins(FieldMixins) {
  get template () {
    return this.options.template
  }

  get html () {
    if (!this.template) return this.value
    return this.template.replace('<slot></slot>', this.value)
  }

  options!: FieldHtmlOptions
}
</script>
