<template>
<el-form :model="formData" ref="fm" :label-width="config.labelWidth + 'px'" :label-position="config.labelPosition" :size="config.size" :class="[$style.container]">
  <draggable v-model="def.list"
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
import { Component, Prop, Vue, ProvideReactive, Provide } from 'vue-property-decorator'
import { FieldInputDefinition, FormDefinition, ControlDefinition, FormOptions } from '@/components/type'
import FormControl from './form-control/index.vue'
import draggable from 'vuedraggable'

@Component({
  components: { FormControl, draggable }
})
export default class FormInstance extends Vue {
  @Prop() def!: FormDefinition

  @Prop(Boolean) design!: boolean

  formData: Record<string, any> = {}

  @Provide() getDesign () {
    return this.design
  }

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

<style lang="scss" module>
.container {
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
    }
  }
}
</style>
