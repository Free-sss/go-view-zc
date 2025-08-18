import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { PinConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  // 网站路径
  dataset: [],
  // 圆角
  borderRadius: 0
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  public key = PinConfig.key
  public attr = { ...chartInitConfig, w: 500, h: 500, zIndex: -1 }
  public chartConfig = cloneDeep(PinConfig)
  public option = cloneDeep(option)
}       
