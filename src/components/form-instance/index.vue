<template>
<el-form ref="fm" label-width="100px">
  <form-control v-for="row in controlDefs" :key="row.key" :def="row" :design="design"></form-control>
</el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue, ProvideReactive } from 'vue-property-decorator'
import { FieldInputDefinition, FormDefinition, ControlDefinition } from '@/components/type'
import FormControl from './form-control/index.vue'

@Component({
  components: { FormControl }
})
export default class FormInstance extends Vue {
  @Prop() def!: FormDefinition

  @ProvideReactive() @Prop(Boolean) design!: boolean

  get controlDefs (): ControlDefinition[] {
    return this.def.list || []
  }
}
</script>
