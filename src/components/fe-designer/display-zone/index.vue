<template>
<div :class="[$style.container]">
  <div :class="[$style.content]">
    <form-instance :def="def" :form-data="formData" design></form-instance>
    <div :class="[$style.empty]" v-show="empty">
      <img src="@/assets/pic_hb.png"/>
      <p style="color: #666; font-size: 14px;">从右侧元件组中拖拽到这里开始自定义表单</p>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FormInstance from '@/components/form-instance/index.vue'
import { FormDefinition, ControlDefinition } from '@/components/type'

@Component({
  components: { FormInstance }
})
export default class DisplayZone extends Vue {
  @Prop() def!: FormDefinition

  formData: any = {}

  get empty () {
    return this.def?.list?.length < 1
  }
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  align-items: stretch;
}

.content {
  position: relative;
  width: 100%;
  margin: 10px;
  border: 1px dashed #999;
  margin: 10px;
  overflow: auto;
}

.icon {
  font-size: 96px;
}

.empty {
  text-align: center;
  position: absolute;
  width: 280px;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
