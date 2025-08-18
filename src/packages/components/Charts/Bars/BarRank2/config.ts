import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { BarRank2Config } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const option = {
  // 进行时效果
  processing: true,
  // 渐变颜色
  color: '#1b91ff',
  color1: '#43e2ff',  
  color2: '#43e2ff',
  color3: '#43e2ff',
  color4: '#43e2ff',
  color5: '#43e2ff',
  // 轨道颜色
  railColor: '#133341',
  railBorderColor: '',
  borderRadius: 0,
  railWidth: 379,
  dataset: dataJson
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = BarRank2Config.key
  public attr = { ...chartInitConfig, w: 600, h: 600, zIndex: -1 }
  public chartConfig = cloneDeep(BarRank2Config)
  public option = cloneDeep(option)
}