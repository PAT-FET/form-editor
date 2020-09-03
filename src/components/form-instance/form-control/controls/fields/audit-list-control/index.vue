<template>
<el-form-item :hidden="options.hidden">
<div :class="[$style.content]">
  <div :class="[$style.header]">
    <span>{{def.name}}</span>
  </div>

  <ul :class="[$style.list]">
    <li v-for="(item, i) in value" :key="i" :class="[$style.item, activeCls(i)]" @click="active = i">{{item.name}}</li>
  </ul>
  <div :class="[designCls]">
    <draggable
        v-if="design"
        :value="def.list"
        @input="onInput($event, def)"
        tag="div"
        :class="[$style.col]"
        :no-transition-on-drag="true"
        v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
      >
      <form-control v-for="item in def.list" :key="item.key" :def="item" :design="design"></form-control>
    </draggable>
    <template v-else>
      <template v-if="row">
        <form-control :row-form-data="row" v-for="item in def.list" :key="item.key" :def="item" :design="design"></form-control>
      </template>
    </template>
  </div>

  <div :class="[$style.footer]" v-if="row">
    <el-button type="priamry" size="small">标记无误</el-button>
    <el-button type="danger" size="small">标记有误</el-button>

    <div :class="[$style.pagination]">
      <el-button-group>
        <el-button plain size="small">上一页</el-button>
        <el-button plain size="small">下一页</el-button>
      </el-button-group>
    </div>
  </div>
</div>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { FieldAuditListDefinition, FieldAuditListOptions } from '@/components/type'
import draggable from 'vuedraggable'

@Component({
  components: {
    draggable,
    'form-control': () => import('@/components/form-instance/form-control/index.vue')
  }
})
export default class AuditListControl extends Vue {
  @Prop() def!: FieldAuditListDefinition

  @Inject() getDesign!: () => boolean

  @Inject() getFormData!: () => Record<string, any>

  @Inject() getRowFormData!: () => Record<string, any>

  active = 0

  get design () {
    return this.getDesign()
  }

  get designCls () {
    return this.design ? this.$style.design : ''
  }

  get options (): FieldAuditListOptions {
    return this.def.options
  }

  // get tabs (): Tab[] {
  //   if (this.design) return this.dynamic ? this.def.tabs.slice(0, 1) : this.def.tabs
  //   else {
  //     if (!this.dynamic) return this.def.tabs
  //     const tpl = this.def.tabs[0]
  //     if (!tpl) return []
  //     const data = (this.formData && this.formData[this.model]) || []
  //     const tabs = data.map((v: any) => {
  //       const item: any = JSON.parse(JSON.stringify(tpl))
  //       item.label = getParser(item.label)(v)
  //       return item
  //     })
  //     return tabs
  //   }

  //   function getParser (expr: string) {
  //     const body = 'return ' + '`' + expr + '`'
  //     // eslint-disable-next-line no-new-func
  //     return new Function('ctx', body)
  //   }
  // }

  get model () {
    return this.def.model
  }

  get formData () {
    return this.getRowFormData() || this.getFormData()
  }

  get value () {
    return (this.formData && this.formData[this.model]) || []
  }

  get row () {
    return (this.value[this.active] || {})?.value || null
  }

  activeCls (i: number) {
    return i === this.active ? this.$style.active : ''
  }

  onInput (list: any, row: any) {
    row.list = list || []
  }

  $style!: any
}
</script>

<style lang="scss" module>
.col {
  position: relative;
  z-index: 100;
}

.design {
  margin: 4px;
  & .col {
    min-height: 50px;
    border: 1px dashed #ccc;
    background: #fff;
  }
}

.content {
  background-color: #F3F3F3;
  border-radius: 2px;
  border: 1px solid #EAEAEA;
}

.header {
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  color: #333;
  font-weight: 600;
  position: relative;
  padding-left: 12px;

  &::after {
    content: " ";
    position: absolute;
    width: 4px;
    height: 16px;
    background-color: #359C67;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}

.list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

.item {
  height: 38px;
  line-height: 38px;
  background: #FFFFFF;
  border-radius: 2px;
  border: 1px solid #EAEAEA;
  padding: 0 14px;
  flex: 1 0 120px;

  &.active {
    color: #fff;
    background-color: #359C67;
  }
}

.footer {
  text-align: center;
  position: relative;

  padding: 12px 0;
}

.pagination {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
