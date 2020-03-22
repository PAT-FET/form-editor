<template>
<div >
<el-dialog title="预览" :visible.sync="visible" width="780">
  <form-instance :def="def" ref="fi"></form-instance>
  <div slot="footer" style="text-align: center;">
    <el-button type="primary" @click="onGetData">获取数据</el-button>
    <el-button>重 置</el-button>
  </div>
</el-dialog>
<el-dialog title="生成JSON" :visible.sync="jsonVisible" width="780">
  <pre>{{json}}</pre>
</el-dialog>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Inject, InjectReactive } from 'vue-property-decorator'
import FormInstance from '@/components/form-instance/index.vue'
import { FormDefinition } from '@/components/type'

@Component({
  components: { FormInstance }
})
export default class PreviewForm extends Vue {
  @InjectReactive() def!: FormDefinition

  @Ref() fi!: any

  visible = false

  jsonVisible = false

  json = ''

  preview () {
    this.visible = true
  }

  onGetData () {
    this.json = JSON.stringify(this.fi.formData, null, 2)
    this.jsonVisible = true
  }
}
</script>
