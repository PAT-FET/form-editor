<template>
<div >
<el-dialog title="预览" :visible.sync="visible" width="780">
  <form-instance :def="def"></form-instance>
  <div slot="footer">
    <el-button type="primary">获取数据</el-button>
    <el-button>重 置</el-button>
  </div>
</el-dialog>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject, InjectReactive } from 'vue-property-decorator'
import FormInstance from '@/components/form-instance/index.vue'
import { FormDefinition } from '@/components/type'

@Component({
  components: { FormInstance }
})
export default class PreviewForm extends Vue {
  @InjectReactive() def!: FormDefinition

  visible = false

  preview () {
    this.visible = true
  }
}
</script>
