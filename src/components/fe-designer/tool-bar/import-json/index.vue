<template>
<div >
<el-dialog title="" :visible.sync="visible" width="780">
  <div>
    <el-input
      v-model.trim='json'
      type="textarea"
      :rows="12"
      placeholder="请输入json数据"></el-input>
  </div>
  <div slot="footer" style="text-align: center;">
    <el-button type="primary" @click="onConfirm">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import FormInstance from '@/components/form-instance/index.vue'
import { FormDefinition } from '@/components/type'
import { copyToClipboard } from '@/components/utils'

@Component({
  components: { FormInstance }
})
export default class GenerateJson extends Vue {
   @Inject() setJSON!: (json: string) => void

  visible = false

  json = ''

  import () {
    this.json = ''
    this.visible = true
  }

  onConfirm () {
    this.setJSON(this.json)
    this.visible = false
  }
}
</script>
