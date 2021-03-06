<template>
<div :class="[$style.container, activeCls, layoutCls]" @click.stop="onSelect">
  <div v-if="table">
    <el-table border :data="[def]">
      <el-table-column width="198" :label="def.name">
        <slot></slot>
      </el-table-column>
    </el-table>
  </div>
  <div v-else>
    <slot></slot>
  </div>
  <div :class="[$style.mask]">
    <div :class="[$style.drag]" class="drag-widget"><i class="el-icon-rank"></i></div>
    <div :class="[$style.model]" v-if="def.model">{{def.model}}</div>
    <div :class="[$style.action]">
      <i class="el-icon-document-copy" @click.stop="onCopy"></i>
      <i class="el-icon-delete" @click.stop="onDel"></i>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, InjectReactive, Inject } from 'vue-property-decorator'
import { ControlDefinition } from '@/components/type'
import { isEmbedType } from '@/components/utils'

@Component
export default class ControlMask extends Vue {
  @Prop() def!: ControlDefinition

  @Inject() setActiveControl!: (control: ControlDefinition) => void

  @Inject() getActiveControl!: () => ControlDefinition

  @Inject() delControl!: (control: ControlDefinition) => void

  @Inject() addControl!: (control: ControlDefinition) => void

  @Inject() getTable!: () => any

  get table () {
    return this.getTable()
  }

  get activeControl (): ControlDefinition {
    return this.getActiveControl()
  }

  get isLayout () {
    return isEmbedType(this.def.type)
  }

  get layoutCls () {
    return this.isLayout ? this.$style.layout : ''
  }

  get activeCls () {
    return this.def === this.activeControl ? this.$style.active : ''
  }

  onSelect () {
    this.setActiveControl(this.def)
  }

  onDel () {
    this.delControl(this.def)
  }

  onCopy () {
    this.addControl(this.def)
  }

  $style!: any
}
</script>
<style lang="scss" module>
.layout {
  &>.mask>.drag {
    background-color: #e6a23c;
  }
  &>.mask>.action {
    background-color: #e6a23c;
  }
}
.container {
  padding-bottom: 18px;
  position: relative;
  border: 1px dashed hsla(0,0%,66.7%,.5);
  background-color: rgba(236,245,255,.3);
  margin: 2px;
  overflow: hidden;
  position: relative;

  &.layout {
    background-color: rgba(253,246,236,.3);
  }

  &:hover {
    background-color: #ecf5ff;
    border: #409eff 1px solid;
    &.layout {
      border: #e6a23c 1px solid;
      background-color: #fdf6ec;
    }
  }

  &.active {
    outline: 2px solid #409eff;
    border: 1px solid #409eff;

    &.layout {
      outline: 2px solid #e6a23c;
      border: 1px solid #e6a23c;
    }

    &>.mask {
      &>.drag, &>.model, &>.action {
        display: block;
      }
    }
  }
}

.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0);
}

.drag {
  display: none;
  position: absolute;
  cursor: move;
  left: 0;
  top: 0;
  background-color: #409eff;
  padding: 0 2px;
  color: #fff;
  z-index: 1000;
}

.model {
  display: none;
  position: absolute;
  right: 8px;
  top: 0;
  color: #67c23a;
  font-size: 12px;
  z-index: 1000;
}

.action {
  display: none;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #409eff;
  color: #fff;
  z-index: 1000;

  &>i {
    margin: 0 4px;
    cursor: pointer;
  }
}

</style>
