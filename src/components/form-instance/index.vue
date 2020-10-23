<template>
<el-form :model="formData" ref="fm" :label-width="config.labelWidth + 'px'" :label-position="config.labelPosition" :size="config.size" :class="[$style.container]">
  <draggable v-model="def.list"
    style="min-height: 100%;"
    v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
    v-if="design">
    <form-control v-for="row in controlDefs" :key="row.key" :def="row" :design="design"></form-control>
  </draggable>
  <template v-else>
    <form-control v-for="row in controlDefs" :key="row.key" :def="row" :design="design"></form-control>
  </template>
</el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue, ProvideReactive, Provide, Ref } from 'vue-property-decorator'
import { FieldInputDefinition, FormDefinition, ControlDefinition, FormOptions } from '@/components/type'
import FormControl from './form-control/index.vue'
import draggable from 'vuedraggable'

@Component({
  components: { FormControl, draggable }
})
export default class FormInstance extends Vue {
  @Ref() fm!: any

  @Prop() def!: FormDefinition

  @Prop(Boolean) design!: boolean

  @Prop() formData!: Record<string, any>

  @Prop({ type: Boolean, default: true }) edit!: any

  @Provide() getEdit (): boolean {
    return this.edit
  }

  @Provide() getDesign () {
    return this.design
  }

  @Provide() getFormData () {
    return this.formData
  }

  @Provide() getRowFormData () {
    return undefined
  }

  @Provide() getTable (): any {
    return null
  }

  validate (cb: (valid: boolean) => void) {
    this.fm.validate(cb)
  }

  get controlDefs (): ControlDefinition[] {
    return this.def.list || []
  }

  get config (): FormOptions {
    return this.def.config
  }
}
</script>

<style lang="scss" module>
.container {
  height: 100%;
  :global {
    .ghost{
      background-color: #F56C6C !important;
      border: 2px solid #F56C6C !important;
      outline-width: 0 !important;
      height: 3px;
      box-sizing: border-box;
      font-size: 0;
      content: '';
      overflow: hidden;
      padding: 0;
      width: 100%;
    }
  }
}
</style>
