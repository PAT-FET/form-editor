<template>
<div v-if="activeControl">
  <el-form label-position="top" size="small" :class="[$style.container]">
    <component :is="current"></component>
  </el-form>
</div>
<div v-else :class="[$style.empty]">
  <span>请添加字段</span>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { ControlDefinition } from '@/components/type'
import InputAttr from './input-attr/index.vue'
import TextareaAttr from './textarea-attr/index.vue'
import SelectAttr from './select-attr/index.vue'
import TextAttr from './text-attr/index.vue'
import HtmlAttr from './html-attr/index.vue'
import FileuploadAttr from './fileupload-attr/index.vue'
import ImguploadAttr from './imgupload-attr/index.vue'
import GridAttr from './grid-attr/index.vue'
import TabsAttr from './tabs-attr/index.vue'
import BlockAttr from './block-attr/index.vue'
import TableAttr from './table-attr/index.vue'

@Component({
  components: {
    InputAttr,
    TextareaAttr,
    SelectAttr,
    TextAttr,
    HtmlAttr,
    FileuploadAttr,
    ImguploadAttr,
    GridAttr,
    TabsAttr,
    BlockAttr,
    TableAttr
  }
})
export default class ControlAttr extends Vue {
  @Inject() getActiveControl!: () => ControlDefinition

  get activeControl (): ControlDefinition {
    return this.getActiveControl()
  }

  get current () {
    return this.activeControl && this.activeControl.type + '-attr'
  }
}
</script>

<style lang="scss" module>
.container {
  padding: 10px;
}

.empty {
  height: 100%;
  font-size: 20px;
  color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
