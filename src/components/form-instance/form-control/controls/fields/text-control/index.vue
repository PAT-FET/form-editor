<template>
<el-form-item :label="label" :label-width="labelWidth" :prop="def.model" :hidden="options.hidden">
  <span>{{value}}</span>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, InjectReactive } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldTextDefinition, FieldTextOptions } from '@/components/type'

@Component
export default class TextControl extends mixins(FieldMixins) {

}
</script>
