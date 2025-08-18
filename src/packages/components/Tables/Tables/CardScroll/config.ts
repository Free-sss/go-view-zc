import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { CardScrollConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'


export const option = {
  dataset: dataJson,
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = CardScrollConfig.key
  public chartConfig = cloneDeep(CardScrollConfig)
  public option = cloneDeep(option)
}
