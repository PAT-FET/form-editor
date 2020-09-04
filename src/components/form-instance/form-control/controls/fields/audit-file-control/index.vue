<template>
<el-form-item :label="label" label-width="auto" :prop="def.model" :hidden="options.hidden">
  <audit-mark v-model="value" :value-fn="valueFn">
    <span @click="onPreview">
      <i class="el-icon-paperclip"></i>
      <span>{{name || '-'}}</span>
    </span>
  </audit-mark>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, InjectReactive } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldTextDefinition, FieldTextOptions } from '@/components/type'
import AuditMark from '@/components/common/audit-mark/index.vue'

@Component({
  components: { AuditMark }
})
export default class AuditFileControl extends mixins(FieldMixins) {
  valueFn (value: any) {
    return value && value[0]?.url
  }

  get file () {
    const v = this.value?.value
    return v && v[0]
  }

  get name () {
    return this.file?.name
  }

  onPreview () {
    if (!this.file || !this.file?.url) return
    window.open(this.file?.url, '_blank')
  }
}
</script>
