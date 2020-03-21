<template>
<div :class="[$style.container, activeCls]" @click="onSelect">
  <slot></slot>
  <div :class="[$style.mask]">
    <div :class="[$style.drag]"><i class="el-icon-rank"></i></div>
    <div :class="[$style.model]" v-if="def.model">{{def.model}}</div>
    <div :class="[$style.action]">
      <i class="el-icon-document-copy"></i>
      <i class="el-icon-delete"></i>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, InjectReactive, Inject } from 'vue-property-decorator'
import { ControlDefinition } from '@/components/type'

@Component
export default class ControlMask extends Vue {
  @Prop() def!: ControlDefinition

  @InjectReactive() activeControl!: ControlDefinition

  @Inject() setActiveControl!: (control: ControlDefinition) => void

  onSelect () {
    this.setActiveControl(this.def)
  }

  get activeCls () {
    return this.def === this.activeControl ? this.$style.active : ''
  }

  $style!: any
}
</script>
<style lang="scss" module>
.container {
  padding-bottom: 18px;
  position: relative;
  border: 1px dashed hsla(0,0%,66.7%,.5);
  background-color: rgba(236,245,255,.3);
  margin: 2px;
  overflow: hidden;
  position: relative;

  &:hover {
    background-color: #ecf5ff;
    border-color: #409eff;
  }

  &.active {
    outline: 2px solid #409eff;
    border: 1px solid #409eff;

    & .drag, & .model, & .action {
      display: block;
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
}

.model {
  display: none;
  position: absolute;
  right: 8px;
  top: 0;
  color: #67c23a;
  font-size: 12px;
}

.action {
  display: none;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #409eff;
  color: #fff;

  &>i {
    margin: 0 4px;
    cursor: pointer;
  }
}
</style>
