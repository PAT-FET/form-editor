<template>
<el-form-item :label="label" :label-width="labelWidth" :prop="def.model" :rules="rules" :hidden="options.hidden">
  <el-input v-model="value"
    :disabled="disabled"
    :type="options.dataType"
    :placeholder="options.placeholder"></el-input>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, InjectReactive } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldInputDefinition, FieldInputOptions } from '@/components/type'

@Component
export default class InputControl<FieldInputDefinition, FieldInputOptions> extends mixins(FieldMixins) {

}
</script>
