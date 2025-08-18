import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ListScrollTwoConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'


export const option = {
  dataset: dataJson,
  rowNum: 4,
  waitTime: 0.5,
  // themeColor: "#225bce",
  borderRadius: 0,
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = ListScrollTwoConfig.key
  public chartConfig = cloneDeep(ListScrollTwoConfig)
  public option = cloneDeep(option)
}
