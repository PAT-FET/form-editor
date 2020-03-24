<template>
<el-form-item :label="def.name" :prop="def.model" :rules="rules" :hidden="options.hidden">
  <el-upload
    :disabled="options.disabled"
    :action="options.action"
    :on-preview="onPreview"
    :on-remove="onRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="options.limit"
    :on-exceed="onExceed"
    :on-change="onChange"
    :file-list="fileList">
    <el-button size="small" type="primary" :disabled="options.disabled">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">{{def.options.tip}}</div>
  </el-upload>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldFileuploadDefinition, FieldFileuploadOptions } from '@/components/type'
import { download, genKey } from '@/components/utils'

@Component
export default class FileuploadControl extends mixins(FieldMixins) {
  fileList: any[] = []

  onRemove (file: any, fileList: any[]) {
  }

  onPreview (file: any) {
    const { name } = file
    const url = file.url || (file.response && file.response.url)
    download(url, name)
  }

  onExceed (files: any[], fileList: any[]) {
    this.$message.warning(`当前限制选择 ${this.options.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
  }

  beforeRemove (file: any, fileList: any[]) {
    return this.$confirm(`确定移除 ${file.name}？`)
  }

  onChange (file: any, fileList: any[]) {
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
  }

  created () {
    this.fileList = this.value.map((v: any) => {
      return Object.assign({}, v)
    })
  }

  options!: FieldFileuploadOptions
}
</script>
