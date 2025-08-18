import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ListScrollThreeConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'


export const option = {
  dataset: dataJson,
  rowNum: 4,
  waitTime: 0.5,
  showRankNum: true
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = ListScrollThreeConfig.key
  public chartConfig = cloneDeep(ListScrollThreeConfig)
  public option = cloneDeep(option)
}
