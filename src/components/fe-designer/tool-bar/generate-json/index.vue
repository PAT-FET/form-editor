<template>
<div >
<el-dialog title="" :visible.sync="visible" width="780">
  <pre v-text="json" style="height: 50vh; overflow: auto;"></pre>
  <div slot="footer" style="text-align: center;">
    <el-button type="primary" @click="onCopy">复 制</el-button>
  </div>
</el-dialog>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject, InjectReactive } from 'vue-property-decorator'
import FormInstance from '@/components/form-instance/index.vue'
import { FormDefinition } from '@/components/type'
import { copyToClipboard } from '@/components/utils'

@Component({
  components: { FormInstance }
})
export default class GenerateJson extends Vue {
  @InjectReactive() def!: FormDefinition

  visible = false

  get json () {
    return JSON.stringify(this.def, null, 2)
  }

  generate () {
    this.visible = true
  }

  onCopy () {
    copyToClipboard(this.json)
    this.$message.info('已复制')
  }
}
</script>
