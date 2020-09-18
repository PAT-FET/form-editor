<template>
<el-form-item :label="label" label-width="auto" :prop="def.model" :hidden="options.hidden" style="margin-bottom: 0;">
  <audit-mark v-model="value" :disabled="disabled" :markable="markable" :diff="diff" :value-fn="valueFn">
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

  get oldFiles () {
    return this.value?.oldValue || []
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

  get diff () {
    if (this.oldFiles === undefined || !Array.isArray(this.oldFiles)) return false
    const tip = '文件已更改，暂无描述'
    if (this.oldFiles.length !== this.files.length) return tip
    if (this.files.length === 0) return false
    const d = this.files.some((v: any) => !this.oldFiles.some((w: any) => w.url === v.url))
    return d ? tip : false
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
