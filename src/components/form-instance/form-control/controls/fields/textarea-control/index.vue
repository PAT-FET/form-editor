<template>
<el-form-item :label="def.name" :prop="def.model" :rules="rules" :hidden="options.hidden">
  <el-input type="textarea" :rows="3" v-model="value"
    :disabled="disabled"
    :placeholder="options.placeholder">
</el-input>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldTextareaDefinition } from '@/components/type'

@Component
export default class TextareaControl extends mixins(FieldMixins) {
}
</script>
