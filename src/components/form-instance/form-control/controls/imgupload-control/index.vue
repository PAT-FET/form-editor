<template>
<el-form-item :label="def.name" :prop="def.model">
  <el-upload
    :action="def.options.action"
    list-type="picture-card"
    :on-preview="onPreview"
    :before-remove="beforeRemove"
    multiple
    :limit="def.options.limit"
    :on-exceed="onExceed"
    :file-list="fileList"
    :on-remove="onRemove">
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog :visible.sync="visible">
    <img width="100%" :src="url" alt="">
  </el-dialog>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FieldImguploadDefinition } from '@/components/type'
import { download } from '@/components/utils'

@Component
export default class ImguploadControl extends Vue {
  @Prop() def!: FieldImguploadDefinition

  get fileList () {
    return []
  }

  visible = false

  url = ''

  onRemove (file: any, fileList: any[]) {
    console.log(file, fileList)
  }

  onPreview (file: any) {
    this.url = file.url
    this.visible = true
  }

  onExceed (files: any[], fileList: any[]) {
    this.$message.warning(`当前限制选择 ${this.def.options.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
  }

  beforeRemove (file: any, fileList: any[]) {
    return this.$confirm(`确定移除 ${file.name}？`)
  }
}
</script>
