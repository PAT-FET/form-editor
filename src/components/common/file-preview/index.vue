<template>
<div :class="[$style.container]">
  <template v-if="list && list.length > 0">
    <div :class="[$style.header]">
      <span></span>
      <span>{{current && current.name}}</span>
      <span></span>
    </div>
    <div :class="[$style.body]">
      <iframe :src="current && current.url" border="0" :class="[$style.iframe]"></iframe>
    </div>
    <div :class="[$style.footer]">
      <div :class="[$style.footerHeader]">
        <span :class="[$style.footerHeaderToggle]">
          <span @click="expand = false" v-if="expand"><span>隐藏所有文件</span><i class="el-icon-arrow-down"></i></span>
          <span @click="expand = true" v-else><span>显示所有文件</span><i class="el-icon-arrow-up"></i></span>
        </span>

        <el-button-group>
          <el-button icon="el-icon-arrow-left" size="mini" :class="[$style.pageBtn]" :disabled="index <= 0" @click="onGo(-1)"></el-button>
          <el-button icon="el-icon-arrow-right" size="mini" :class="[$style.pageBtn]" :disabled="index >= list.length - 1" @click="onGo(1)"></el-button>
        </el-button-group>
      </div>
      <ul :class="[$style.list]" v-show="expand">
        <li v-for="(item, i) in list" :key="i" @click="index = i" :class="[$style.item, activeCls(i)]" :title="item.name">
          <div :class="[$style.thumbnail]">
            <img :src="item.url" alt="" v-if="!isPdf(item.url)">
            <img src="@/assets/pdf.svg" alt="" v-else>
          </div>
          <div :class="[$style.itemText]">{{item.name}}</div>
        </li>
      </ul>
    </div>
  </template>
  <div style="text-align:center; margin-top: 50%;" v-else>
    无可预览文件
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, InjectReactive, Emit } from 'vue-property-decorator'

@Component
export default class FilePreview extends Vue {
  @Prop(Array) list!: any[]

  index = 0

  expand = true

  get current () {
    return this.list && this.list[this.index]
  }

  activeCls (i: number) {
    return i === this.index ? this.$style.active : ''
  }

  isPdf (url = '') {
    return url.toLowerCase().endsWith('.pdf')
  }

  onGo (i: number) {
    let num = i + this.index
    const min = 0
    const max = (this.list && this.list.length) || 0
    num = Math.min(max, num)
    num = Math.max(min, num)
    this.index = num
  }

  $style!: any
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #333333;
  color: #FFFFFF;
}

.header {
  flex: 0 0 auto;
  text-align: center;
}

.body {
  flex: 1 1 auto;
}

.footer {
  flex: 0 0 auto;
  margin: 20px;
}

.iframe {
  width: 100%;
  height: 100%;
}

.list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  overflow-x: auto;
}

.item {
  margin: 0 4px;
  padding: 4px;
  width: 80px;
  &:hover {
    cursor: pointer;
    opacity: .8;
  }
  &.active > .thumbnail {
    border-color: #e2e2e2;
  }
}

.thumbnail {
  height: 100px;
  border-radius: 2px;
  border: 2px solid #666;
  color: #666;

  &>img {
    height: 100%;
    width: 100%;
  }
}

.itemText {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
}

.footerHeader {
  display: flex;
  justify-content: space-between;
  line-height: 36px;
  align-items: center;
}

.footerHeaderToggle {
  &:hover {
    opacity: .8;
    cursor: pointer;
  }
}

.pageBtn {
  padding: 0;
  height: 20px;
  width: 20px;
  text-align: center;
  border-radius: 2px;
}
</style>
