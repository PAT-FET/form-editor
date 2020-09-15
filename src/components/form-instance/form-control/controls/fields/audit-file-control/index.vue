<template>
<el-form-item :label="label" label-width="auto" :prop="def.model" :hidden="options.hidden" style="margin-bottom: 0;">
  <audit-mark v-model="value" :disabled="disabled" :markable="markable" :value-fn="valueFn">
    <span @click="onPreview">
      <i class="el-icon-paperclip"></i>
      <span>{{name || '-'}}</span>
    </span>
  </audit-mark>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldAuditFileDefinition, FieldAuditFileOptions } from '@/components/type'
import AuditMark from '@/components/common/audit-mark/index.vue'

@Component({
  components: { AuditMark }
})
export default class AuditFileControl extends mixins(FieldMixins) {
  valueFn (value: any) {
    return value && value[0]?.url
  }

  @Inject({ default: () => () => {} }) addFileControl!: (c: any) => void

  @Inject({ default: () => () => {} }) removeFileControl!: (c: any) => void

  @Inject({ default: () => () => false }) onAuditFilePreview!: (file: any) => boolean

  get file () {
    const v = this.value?.value
    return v && v[0]
  }

  get name () {
    return this.file?.name
  }

  get markable () {
    return (this.options as any)?.markable
  }

  onPreview () {
    if (!this.file || !this.file?.url) return
    if (this.onAuditFilePreview(this.file)) return
    window.open(this.file?.url, '_blank')
  }

  created () {
    this.addFileControl(this)
  }

  beforeDestroy () {
    this.removeFileControl(this)
  }
}
</script>
