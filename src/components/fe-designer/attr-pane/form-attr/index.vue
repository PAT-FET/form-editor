<template>
<el-form label-position="top" size="small" :class="[$style.container]">
  <attr-field label="标签对齐方式">
    <el-radio-group v-model="config.labelPosition">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
  </attr-field>
  <attr-field label="表单标签宽度">
    <el-input-number v-model="config.labelWidth" :min="1"></el-input-number>
  </attr-field>
  <attr-field label="组件尺寸">
    <el-radio-group v-model="config.size">
      <el-radio-button label="medium">medium</el-radio-button>
      <el-radio-button label="small">small</el-radio-button>
      <el-radio-button label="mini">mini</el-radio-button>
    </el-radio-group>
  </attr-field>
</el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue, InjectReactive } from 'vue-property-decorator'
import AttrField from '../atrr-field/index.vue'
import { FormDefinition, FormOptions } from '@/components/type'

@Component({
  components: { AttrField }
})
export default class FormAttr extends Vue {
  @InjectReactive() def!: FormDefinition

  get config (): FormOptions {
    return this.def.config
  }
}
</script>

<style lang="scss" module>
.container {
  padding: 10px;
  :global {
    .attr-field {
      border-bottom: 1px solid #e1e1e1;
      padding-bottom: 10px;
    }
  }
}
</style>
