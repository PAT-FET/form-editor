<template>
<el-form :model="formData" ref="fm" :label-width="config.labelWidth + 'px'" :label-position="config.labelPosition" :size="config.size">
  <form-control v-for="row in controlDefs" :key="row.key" :def="row" :design="design"></form-control>
</el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue, ProvideReactive, Provide } from 'vue-property-decorator'
import { FieldInputDefinition, FormDefinition, ControlDefinition, FormOptions } from '@/components/type'
import FormControl from './form-control/index.vue'

@Component({
  components: { FormControl }
})
export default class FormInstance extends Vue {
  @Prop() def!: FormDefinition

  @ProvideReactive() @Prop(Boolean) design!: boolean

  formData: Record<string, any> = {}

  @Provide() getFormData () {
    return this.formData
  }

  get controlDefs (): ControlDefinition[] {
    return this.def.list || []
  }

  get config (): FormOptions {
    return this.def.config
  }
}
</script>
