<template>
<div v-if="activeControl">
  <el-form label-position="top" size="small" :class="[$style.container]">
    <component :is="current"></component>
  </el-form>
</div>
<div v-else :class="[$style.empty]">
  <div>
    <img src="@/assets/empty_at.png"/>
    <p style="color: #666; font-size: 14px;">选中元件编辑属性</p>
  </div>
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
import AuditTextAttr from './audit-text-attr/index.vue'
import AuditFileAttr from './audit-file-attr/index.vue'
import AuditDiffAttr from './audit-diff-attr/index.vue'
import AuditListAttr from './audit-list-attr/index.vue'
import LatticeAttr from './lattice-attr/index.vue'

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
    TableAttr,
    AuditTextAttr,
    AuditFileAttr,
    AuditDiffAttr,
    AuditListAttr,
    LatticeAttr
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
