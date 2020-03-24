<template>
<el-form-item :label="def.name" :prop="def.model" :rules="rules" :hidden="options.hidden">
  <el-upload
    :disabled="options.disabled"
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
  <el-dialog :visible.sync="visible" append-to-body>
    <img width="100%" :src="url" alt="">
  </el-dialog>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldImguploadDefinition, FieldImguploadOptions } from '@/components/type'

@Component
export default class ImguploadControl extends mixins(FieldMixins) {
  fileList: any[] = []

  visible = false

  url = ''

  onRemove (file: any, fileList: any[]) {
  }

  onPreview (file: any) {
    this.url = file.url
    this.visible = true
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

  options!: FieldImguploadOptions
}
</script>
