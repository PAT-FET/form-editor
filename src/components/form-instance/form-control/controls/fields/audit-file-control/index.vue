<template>
<el-form-item :label="label" label-width="auto" :prop="def.model" :hidden="options.hidden" style="margin-bottom: 0;">
  <audit-mark v-model="value" :disabled="disabled" :markable="markable" :value-fn="valueFn">
    <div @click="onPreview(row)" v-for="(row, i) in files" :key="i">
      <i class="el-icon-paperclip"></i>
      <span>{{row.name || '-'}}</span>
    </div>
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

  get files () {
    return this.value?.value || []
  }

  get file () {
    return this.files && this.files[0]
  }

  get name () {
    return this.file?.name
  }

  get markable () {
    return (this.options as any)?.markable
  }

  onPreview (row: any) {
    if (this.onAuditFilePreview(row)) return
    window.open(row.url, '_blank')
  }

  created () {
    this.addFileControl(this)
  }

  beforeDestroy () {
    this.removeFileControl(this)
  }
}
</script>
