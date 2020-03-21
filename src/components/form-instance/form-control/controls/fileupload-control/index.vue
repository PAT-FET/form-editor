<template>
<el-form-item :label="def.name" :prop="def.model">
  <el-upload
    :action="def.options.action"
    :on-preview="onPreview"
    :on-remove="onRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="def.options.limit"
    :on-exceed="onExceed"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">{{def.options.tip}}</div>
  </el-upload>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FieldFileuploadDefinition } from '@/components/type'
import { download } from '@/components/utils'

@Component
export default class FileuploadControl extends Vue {
  @Prop() def!: FieldFileuploadDefinition

  get fileList () {
    return []
  }

  onRemove (file: any, fileList: any[]) {
    console.log(file, fileList)
  }

  onPreview (file: any) {
    const { url, name } = file
    download(url, name)
  }

  onExceed (files: any[], fileList: any[]) {
    this.$message.warning(`当前限制选择 ${this.def.options.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
  }

  beforeRemove (file: any, fileList: any[]) {
    return this.$confirm(`确定移除 ${file.name}？`)
  }
}
</script>
