<template>
<div >
<el-dialog title="预览" :visible.sync="visible" width="780">
  <div style="height: 50vh; overflow: auto;">
    <form-instance :def="def" :form-data="formData" :design="false" ref="fi" v-if="visible"></form-instance>
  </div>
  <div slot="footer" style="text-align: center;">
    <el-button type="primary" @click="onGetData">获取数据</el-button>
    <el-button>重 置</el-button>
  </div>
</el-dialog>
<el-dialog title="生成JSON" :visible.sync="jsonVisible" width="780">
  <pre style="height: 50vh; overflow: auto;">{{json}}</pre>
  <div slot="footer" style="text-align: center;">
    <el-button type="primary" @click="onCopy">复制</el-button>
  </div>
</el-dialog>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Inject, InjectReactive } from 'vue-property-decorator'
import FormInstance from '@/components/form-instance/index.vue'
import { FormDefinition } from '@/components/type'
import { copyToClipboard } from '@/components/utils'

@Component({
  components: { FormInstance }
})
export default class PreviewForm extends Vue {
  @InjectReactive() def!: FormDefinition

  @Ref() fi!: any

  visible = false

  jsonVisible = false

  json = ''

  formData: any = {}

  preview () {
    this.visible = true
  }

  onGetData () {
    this.json = JSON.stringify(this.formData, null, 2)
    this.jsonVisible = true
  }

  onCopy () {
    copyToClipboard(this.json)
    this.$message.info('已复制')
  }
}
</script>
