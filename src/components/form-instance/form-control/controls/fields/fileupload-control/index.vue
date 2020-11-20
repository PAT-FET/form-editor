<template>
<el-form-item :label="label" :label-width="labelWidth" :prop="def.model" :rules="rules" :hidden="options.hidden" ref="fi">
  <el-upload
    :disabled="disabled"
    :action="options.action"
    :on-preview="onPreview"
    :on-remove="onRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="options.limit"
    :on-exceed="onExceed"
    :on-change="onChange"
    ref="upload"
    :file-list="fileList">
    <el-button size="small" type="primary" :disabled="disabled">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">{{def.options.tip}}</div>
    <template slot="file" slot-scope="{file}">
      <a class="el-upload-list__item-name">
        <i class="el-icon-document"></i>
        <span style="margin-right: 8px;color: #359c67;">{{file.name}}</span>
        <el-link :underline="false" @click="onPreview(file)" v-if="['image', 'pdf', 'word', 'excel', 'ppt'].includes(getContentType(file.name)) && file.status === 'success'" style="margin-left: 8px;" class="el-icon-view"></el-link>
        <el-link :underline="false" v-if="file.status === 'success'" @click="onDownload(file)" style="margin-left: 8px;" class="el-icon-download"></el-link>
        <el-link :underline="false" v-if="!disabled && (file.status === 'success' || file.status === 'fail')" @click="onRemove(file)" style="margin-left: 8px;" class="el-icon-delete"></el-link>
        <label class="el-upload-list__item-status-label">
          <i class="el-icon-upload-success el-icon-circle-check"></i>
        </label>
        <el-progress v-if="file.status === 'uploading'" type="line" :stroke-width="2"  :percentage="file.percentage"></el-progress>
      </a>
    </template>
  </el-upload>
  <div style="height: 0;overflow: hidden;"><el-image style="width: 0px; height: 0px" :preview-src-list="imageUrls" ref="image"></el-image></div>

</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Ref } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldFileuploadDefinition, FieldFileuploadOptions } from '@/components/type'
import { download, downloadFile, genKey, getFileType, previewOffice, previewPdf } from '@/components/utils'

@Component
export default class FileuploadControl extends mixins(FieldMixins) {
  @Ref() fi: any

  @Ref() image!: any

  @Ref() upload!: any

  fileList: any[] = []

  imageUrl = ''

  // visible = false

  get imageUrls () {
    return this.imageUrl ? [this.imageUrl] : []
  }

  onExceed (files: any[], fileList: any[]) {
    this.$message.warning(`当前限制选择 ${(this.options as any).limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
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

  onRemove (file: any) {
    const fileList: any[] = this.upload?.uploadFiles || []
    this.$confirm(`确定移除 ${file.name}？`).then(() => {
      const idx = fileList.findIndex((v: any) => v.uid === file.uid)
      if (idx >= 0) {
        fileList.splice(idx, 1)
        this.onChange(file, fileList)
      }
    })
  }

  onPreview (file: any) {
    const url = file?.response?.url || file?.url
    if (this.getContentType(file.name) === 'pdf') previewPdf(url)
    else if (['word', 'excel', 'ppt'].includes(this.getContentType(file.name))) previewOffice(url)
    else if (this.getContentType(file.name) === 'image') {
      this.imageUrl = url
      // this.visible = true
      this.image.clickHandler()
      this.$nextTick(() => {
        this.image.clickHandler()
      })
    } else {
      this.$message.info('尚不支持预览该类型文件')
    }
  }

  onDownload (file: any) {
    const { name } = file
    const url = file?.response?.url || file?.url
    downloadFile(name, url)
  }

  getContentType (name: string): 'image' | 'pdf' | 'word' | 'excel' | 'ppt' | 'other' {
    return getFileType(name)
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
}
</script>
