<template>
<div :class="[$style.container]">
  <el-button type="text" icon="el-icon-delete" @click="onClear">清空</el-button>
  <el-button type="text" icon="el-icon-view" @click="onPreview">预览</el-button>
  <el-button type="text" icon="el-icon-document" @click="onGenJson">生成JSON</el-button>
  <preview-form ref="pf"></preview-form>
  <generate-json ref="gj"></generate-json>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject, Ref } from 'vue-property-decorator'
import PreviewForm from './preview-form/index.vue'
import GenerateJson from './generate-json/index.vue'

@Component({
  components: { PreviewForm, GenerateJson }
})
export default class ToolBar extends Vue {
  @Ref() pf!: PreviewForm

  @Ref() gj!: GenerateJson

  @Inject() clearControl!: () => void

  onClear () {
    this.clearControl()
  }

  onPreview () {
    this.pf.preview()
  }

  onGenJson () {
    this.gj.generate()
  }
}
</script>

<style lang="scss" module>
.container {
  height: 45px;
  border-bottom: 2px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
}
</style>
