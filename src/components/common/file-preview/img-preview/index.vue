<template>
<div :class="[$style.container]">
<img :src="url" alt="" :class="[$style.img]" :style="[imgStyle]" ref="img">

<div :class="[$style.action]">
  <div style="margin-top: 8px;"><el-button type="info" icon="el-icon-rank" circle size="medium" @click="onReset"></el-button></div>
  <div style="margin-top: 8px;"><el-button type="info" icon="el-icon-plus" circle size="medium" @click="onScale(2)"></el-button></div>
  <div style="margin-top: 8px;"><el-button type="info" icon="el-icon-minus" circle size="medium" @click="onScale(.5)"></el-button></div>
</div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, InjectReactive, Emit } from 'vue-property-decorator'

@Component
export default class ImgPreview extends Vue {
  @Prop(String) url!: string

  scale = 1

  isDown = false

  get imgStyle () {
    return {
      transform: `scale(${this.scale})`
    }
  }

  onReset () {
    this.scale = 1
    const dv = this.$refs.img as any
    if (dv) {
      dv.style.left = 0
      dv.style.top = 0
    }
  }

  onScale (unit = 0.5) {
    let ret = this.scale * unit
    const max = 5
    const min = 0.2
    ret = Math.max(min, ret)
    ret = Math.min(max, ret)
    this.scale = ret
  }

  mounted () {
    const dv = this.$refs.img as any
    let x = 0
    let y = 0
    let l = 0
    let t = 0
    let isDown = false
    dv.onmousedown = function (e: any) {
      x = e.clientX
      y = e.clientY

      // 获取左部和顶部的偏移量
      l = dv.offsetLeft
      t = dv.offsetTop
      // 开关打开
      isDown = true
      // 设置样式
      dv.style.cursor = 'move'
    }

    // 鼠标抬起事件
    dv.onmouseup = function () {
      // 开关关闭
      isDown = false
      dv.style.cursor = 'default'
    }

    const moveHandler = (e: any) => {
      e.preventDefault()
      if (isDown === false) {
        return
      }
      // 获取x和y
      const nx = e.clientX
      const ny = e.clientY
      // 计算移动后的左偏移量和顶部的偏移量
      const nl = nx - (x - l)
      const nt = ny - (y - t)

      dv.style.left = nl + 'px'
      dv.style.top = nt + 'px'
    }

    const wheelHandler = (event: any) => {
      const delta = getDelta()
      if (delta > 0) {
        this.onScale(1.25)
      } else {
        this.onScale(0.75)
      }
      function getDelta () {
        let delta = 0
        if (!event) event = window.event
        if (event.wheelDelta) { // IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
          delta = event.wheelDelta / 120
          if ((window as any).opera) delta = -delta // 因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
        } else if (event.detail) { // FF浏览器使用的是detail,其值为“正负3”
          delta = -event.detail / 3
        }
        return delta
      }
    }

    window.addEventListener('mousemove', moveHandler)
    window.addEventListener('mousewheel', wheelHandler)
    this.$once('hook:beforeDestroy', function () {
      window.removeEventListener('mousemove', moveHandler)
      window.removeEventListener('mousewheel', wheelHandler)
    })
  }
}
</script>

<style lang="scss" module>
.container {
  position: relative;
  overflow: hidden;
}

.img {
  height: auto;
  width: 100%;
  position: relative;
  transform-origin: center;
}

.action {
  position: absolute;
  bottom: 4%;
  right: 4%;
}
</style>
