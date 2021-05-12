<template>
<el-form-item :label="label" :label-width="labelWidth" :prop="def.model" :hidden="options.hidden">
  <span>
      <span style="margin-right: 8px;" v-if="custName">{{custName}}</span>
      <span style="margin-right: 8px;" v-if="hasBasic">
        <el-button size="mini" type="primary" plain :class="[$style.tag]" @click="onGoBasic"> <i class="el-icon-s-custom"></i> 基本信息</el-button>
      </span>
     <span v-if="hasRisk">
       <el-button size="mini" type="danger" plain :class="[$style.tag]" @click="onGoRisk" v-if="riskLevel === 3"> <i class="el-icon-lightning"></i> 高风险</el-button>
       <el-button size="mini" type="warning" plain :class="[$style.tag]" @click="onGoRisk" v-if="riskLevel === 2"> <i class="el-icon-lightning"></i> 中风险</el-button>
       <el-button size="mini" type="info" :class="[$style.tag, $style.info]" @click="onGoRisk" v-if="riskLevel === 1"> <i class="el-icon-lightning"></i> 低风险</el-button>
       <el-button size="mini" type="success" plain :class="[$style.tag]" @click="onGoRisk" v-if="riskLevel === 0"> 无风险</el-button>
       <el-button size="mini" :class="[$style.tag]" @click="onGoRisk" v-if="data && String(data.monitorStatus) != '1'"> 未监控</el-button>
     </span>
  </span>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, InjectReactive, Inject } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldCustomerDefinition, FieldCustomerOptions } from '@/components/type'

@Component
export default class CustomerControl extends mixins(FieldMixins) {
  @Inject() getHttp!: () => any

  options!: FieldCustomerOptions

  data: any = {
    certCode: '',
    cifId: '',
    commonRiskLevel: '',
    monitorStatus: '',
    personalRiskLevel: '',
    riskLevel: ''
  }

  get hasBasic () {
    return this.options.tags.includes('basicInfo')
  }

  get hasRisk () {
    return this.options.tags.includes('riskLevel')
  }

  get riskLevel () {
    return Math.max(this.data?.commonRiskLevel || -1, this.data?.personalRiskLevel || -1)
  }

  get custName () {
    return this.value?.custName
  }

  get certCode () {
    return this.value?.certCode
  }

  get cifId () {
    return this.value?.cifId
  }

  onGoBasic () {
    if (!this.options.basicInfoUrl) return
    const url = this.getUrl(this.options.basicInfoUrl)
    window.open(url)
  }

  onGoRisk () {
    if (!this.options.riskLevelUrl) return
    const url = this.getUrl(this.options.riskLevelUrl)
    window.open(url)
  }

  getUrl (expr: string) {
    // eslint-disable-next-line no-new-func
    return new Function('ctx', 'return `' + expr + '`')(this.data)
  }

  loadData () {
    if (!this.value) return
    const req: any = { certCodeList: [this.certCode] }

    const http = this.getHttp()
    if (http) {
      http.post(this.options.url, req).then((data: any) => {
        const ret = data && data[0]
        if (ret) this.data = ret
      })
    } else {
      fetch(this.options.url, {
        method: 'post',
        body: JSON.stringify(req)
      }).then((response) => {
        const data: any = response.json()
        if (String(data?.code) === '200') {
          const ret = data?.data && data?.data[0]
          if (ret) this.data = ret
        }
      })
    }
  }

  @Watch('value', { immediate: true }) valueChange () {
    this.loadData()
  }
}
</script>

<style lang="scss" module>
.tag {
  padding: 5px 8px;
}

.info {
  color: rgba(249, 199, 46, 1);
  background-color: rgba(249, 199, 46, 0.1);
  border-color: rgba(249, 199, 46, 1);

  &:hover, &:focus, &:active {
    background: #F9C72E;
    border-color: #F9C72E;
    color: #FFF;
  }
}
</style>
