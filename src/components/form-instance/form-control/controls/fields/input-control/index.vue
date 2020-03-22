<template>
<el-form-item :label="def.name" :prop="def.model" :hidden="options.hidden">
  <el-input v-model="value"
    :disabled="options.disabled"
    :type="options.dataType"
    :placeholder="options.placeholder"></el-input>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, InjectReactive } from 'vue-property-decorator'
import { FieldInputDefinition, FieldInputOptions } from '@/components/type'

@Component
export default class InputControl extends Vue {
  @Prop() def!: FieldInputDefinition

  @InjectReactive() formData!: Record<string, any>

  get options (): FieldInputOptions {
    return this.def.options
  }

  get defaultValue () {
    return this.options.defaultValue
  }

  get model () {
    return this.def.model
  }

  get value (): string {
    return this.formData[this.def.model]
  }

  set value (val) {
    this.formData[this.def.model] = val
  }

  @Watch('defaultValue') defaultValueChange () {
    this.value = this.defaultValue
  }

  @Watch('model') modelChange (newVal: string, oldVal: string) {
    this.$set(this.formData, newVal, this.formData[oldVal])
    delete this.formData[oldVal]
  }

  created () {
    if (this.formData[this.def.model] === undefined) this.$set(this.formData, this.def.model, this.defaultValue)
  }

  beforeDestroy () {
    delete this.formData[this.def.model]
  }
}
</script>
