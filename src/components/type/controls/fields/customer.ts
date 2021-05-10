import { FieldRule, FileData } from '@/components/type/core'
import { genKey } from '@/components/utils'

export class FieldCustomerDefinition {
  type = 'customer'
  key: string = genKey()
  name = '客户信息'
  model: string = 'customer_' + genKey()
  options: FieldCustomerOptions = new FieldCustomerOptions()
  rules?: FieldRule[] = []
}

export class FieldCustomerOptions {
  disabled = false
  hidden = false
  defaultValue = {
    custName: '',
    certCode: '',
    cifId: ''
  }
  url = '/permission/batchRiskLevel'
  tags = ['riskLevel']
  basicInfoUrl = ''
  riskLevelUrl = ''
  required = false
}
