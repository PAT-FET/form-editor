<template>
<el-form-item :label="label" :prop="def.model" :rules="rules" :hidden="options.hidden" ref="fi" :class="[disabledCls]">
  <el-upload
    :disabled="disabled"
    :action="def.options.action"
    list-type="picture-card"
    :on-preview="onPreview"
    :before-remove="beforeRemove"
    multiple
    :limit="def.options.limit"
    :on-exceed="onExceed"
    :on-change="onChange"
    :file-list="fileList"
    :on-remove="onRemove">
    <i class="el-icon-plus"></i>
  </el-upload>
  <!-- <el-dialog :visible.sync="visible" append-to-body>
    <img width="100%" :src="url" alt="">
  </el-dialog> -->
  <el-image v-if="visible"
    ref="img"
    style="width: 0px; height: 0px"
    :src="url"
    :preview-src-list="urls">
  </el-image>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldImguploadDefinition, FieldImguploadOptions } from '@/components/type'

@Component
export default class ImguploadControl extends mixins(FieldMixins) {
  @Ref() img!: any

  @Ref() fi: any

  fileList: any[] = []

  visible = false

  url = ''

  urls: string[] = []

  get disabledCls () {
    return this.disabled ? this.$style.disabled : ''
  }

  onRemove (file: any, fileList: any[]) {
    this.onChange(file, fileList)
  }

  onPreview (file: any) {
    this.visible = false
    this.url = (file.response && file.response.url) || file.url
    this.urls = (this.value || []).map((v: any) => v.url)
    this.$nextTick(() => {
      this.visible = true
      this.$nextTick(() => {
        this.img.clickHandler()
      })
    })
  }

  onExceed (files: any[], fileList: any[]) {
    this.$message.warning(`当前限制选择 ${this.options.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
  }

  beforeRemove (file: any, fileList: any[]) {
    return this.$confirm(`确定移除 ${file.name}？`)
  }

  onChange (file: any, fileList: any[]) {
    if (file.status !== 'success') return
    const ret = fileList
      .filter(v => v.status === 'success')
      .map(v => {
        return {
          url: (v.response && v.response.url) || v.url,
          uid: v.uid,
          name: v.name,
          status: v.status
        }
      })
    this.value = ret
    this.$nextTick(() => {
      this.fi.validate('change')
    })
  }

  refresh () {
    this.$nextTick(() => {
      this.fileList = (this.value || []).map((v: any) => {
        return Object.assign({}, v)
      })
    })
  }

  @Watch('formData', { immediate: true }) formDataChange () {
    this.refresh()
  }

  options!: FieldImguploadOptions

  $style: any
}
</script>

<style lang="scss" module>
.disabled {
  :global {
    .el-upload--picture-card {
      cursor: not-allowed !important;
      background: #efefef !important;
      &:hover {
        border: 1px dashed #c0ccda !important;
      }
    }
  }
}
</style>
