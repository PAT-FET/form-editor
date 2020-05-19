<template>
<div>
  <draggable
      :class="[$style.list]"
      :value="list"
      @input="onInput($event)"
      tag="ul"
      :no-transition-on-drag="true"
      v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
    >
    <li :class="[$style.item]" v-for="(row, i) in list" :key="row.value">
      <div :class="[$style.space]" v-if="checkable">
          <el-radio v-model="actualValue" :label="row.value" v-if="!multiple"></el-radio>
          <el-checkbox v-model="actualValue" :label="row.value" v-else></el-checkbox>
      </div>
      <slot :row="row" :index="i">
        <div>
          <el-input v-model="row.value" size="mini"></el-input>
        </div>
        <div :class="[$style.space]">
            <el-input v-model="row.label" size="mini"></el-input>
        </div>
      </slot>
      <div :class="[$style.space, $style.copy]" @click="onCopy(row, i)" v-if="copy"><i class="el-icon-document-copy"></i></div>
      <div :class="[$style.space, $style.move]" class="drag-widget"><i class="el-icon-rank"></i></div>
      <div><el-button type="danger" icon="el-icon-minus" circle size="mini" style="padding: 4px;" @click="onRemove(i)"></el-button></div>
    </li>
  </draggable>
  <el-button type="text" @click="onAdd">{{addText}}</el-button>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, InjectReactive } from 'vue-property-decorator'
import draggable from 'vuedraggable'

@Component({
  components: { draggable }
})
export default class OptionsPane extends Vue {
  @Prop(Array) list!: Array<any>

  @Prop(Boolean) multiple!: boolean

  @Prop([Array, String]) value!: any[] | string

  @Prop({ type: Boolean, default: true }) checkable!: boolean

  @Prop() addFn!: (list: any[]) => void

  @Prop({ type: String, default: '添加列' }) addText!: string

  @Prop({ type: Boolean }) copy!: boolean

  @Emit() input (value: any[] | string) {}

  get actualValue () {
    return this.value
  }

  set actualValue (value: any[] | string) {
    this.input(value)
  }

  onAdd () {
    if (this.addFn) {
      this.addFn(this.list)
    } else {
      this.list.push({ label: '新选项', value: '新选项' })
    }
  }

  onInput (list: any) {
    this.list.splice(0, this.list.length, ...list)
  }

  onRemove (i: number) {
    this.list.splice(i, 1)
  }

  onCopy (row: any, i: number) {
    const newRow = JSON.parse(JSON.stringify(row))
    if (newRow.label) {
      newRow.label += '_copy'
    }
    this.list.splice(i + 1, 0, newRow)
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

.copy {
  font-size: 18px;
  cursor: pointer;
}

.space {
  margin-right: 12px;
}
</style>
