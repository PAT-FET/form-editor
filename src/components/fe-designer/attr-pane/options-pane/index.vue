<template>
<div>
  <ul :class="[$style.list]">
    <li :class="[$style.item]" v-for="(row, i) in list" :key="row.value">
      <div :class="[$style.space]">
          <el-radio v-model="actualValue" :label="row.value" v-if="!multiple"></el-radio>
          <el-checkbox v-model="actualValue" :label="row.value" v-else></el-checkbox>
      </div>
      <div>
        <el-input v-model="row.value" size="mini"></el-input>
      </div>
      <div :class="[$style.space]">
          <el-input v-model="row.label" size="mini"></el-input>
      </div>
      <div :class="[$style.space, $style.move]"><i class="el-icon-rank"></i></div>
      <div><el-button type="danger" icon="el-icon-minus" circle size="mini" style="padding: 4px;" @click="onRemove(i)"></el-button></div>
    </li>
  </ul>
  <el-button type="text" @click="onAdd">添加列</el-button>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, InjectReactive } from 'vue-property-decorator'

@Component
export default class OptionsPane extends Vue {
  @Prop(Array) list!: Array<{label: string; value: string}>

  @Prop(Boolean) multiple!: boolean

  @Prop([Array, String]) value!: any[] | string

  @Emit() input (value: any[] | string) {}

  get actualValue () {
    return this.value
  }

  set actualValue (value: any[] | string) {
    this.input(value)
  }

  onAdd () {
    this.list.push({ label: '新选项', value: '新选项' })
  }

  onRemove (i: number) {
    this.list.splice(i, 1)
  }
}
</script>

<style lang="scss" module>
.list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.item {
  display: flex;
  height: 32px;
  align-items: center;

  :global {
    .el-radio__label {
      display: none;
    }
    .el-checkbox__label {
      display: none;
    }
  }
}

.move {
  font-size: 18px;
  cursor: move;
}

.space {
  margin-right: 12px;
}
</style>