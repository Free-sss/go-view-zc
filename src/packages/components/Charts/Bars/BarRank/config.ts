import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { BarRankConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const option = {
  // 进行时效果
  processing: true,
  // 渐变颜色
  color: '#23ffe2',
  color2: '#0f86eb',
  // 轨道颜色
  railColor: '#09222e',
  railBorderColor: '#0d5f68',
  borderRadius: 50,
  railWidth: 267,
  dataset: dataJson
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = BarRankConfig.key
  public attr = { ...chartInitConfig, w: 600, h: 600, zIndex: -1 }
  public chartConfig = cloneDeep(BarRankConfig)
  public option = cloneDeep(option)
}