<template>
<form-instance :def="def" :form-data="formData"></form-instance>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { FormDefinition } from '@/components/type'
import FormInstance from '@/components/form-instance/index.vue'
import { genKey } from '@/components/utils'

@Component({
  components: { FormInstance }
})
export default class FeGenerator extends Vue {
  @Prop() data!: any

  @Prop() value!: any

  def: FormDefinition = new FormDefinition()

  formData: any = {}

  @Watch('data', { immediate: true }) dataChange () {
    if (!this.data) return
    this.def = this.data
  }

  @Watch('value', { immediate: true }) valueChange () {
    if (!this.value) return
    this.formData = this.value
  }
}
</script>
