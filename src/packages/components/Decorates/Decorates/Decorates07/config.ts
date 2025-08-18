import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Decorates07Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from '@/settings/designSetting'

export const option = {
  dataset: '',
  textColor: '#fff',
  textSize: 32,
  colors: ['#9F6914']
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Decorates07Config.key
  public attr = { ...chartInitConfig, w: 10, h: 30, zIndex: 1 }
  public chartConfig = cloneDeep(Decorates07Config)
  public option = cloneDeep(option)
}
