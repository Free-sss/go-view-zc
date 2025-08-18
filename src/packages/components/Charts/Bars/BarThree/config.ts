import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { BarThreeConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const types = [
  {
    label: '圆柱',
    value: 'cylinder'
  },
  {
    label: '方柱',
    value: 'column'
  }
]

export enum GradientDirectionEnum {
  HORIZONTAL = '水平',
  VERTICAL = '垂直'
}

export const radientDirectionObject = {
  [GradientDirectionEnum.HORIZONTAL]: 'x',
  [GradientDirectionEnum.VERTICAL]: 'y'
}

export const option = {
  dataset: dataJson,
  type: 'column',
  beta: 0,
  alpha: 15,
  depth: 0,
  color: '#02CED6FF',
  color2: '#02CED6FF',
  color3: '#02CED6FF',
  gradientDirection: 'x',
  showLegend: false,
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = BarThreeConfig.key
  public attr = { ...chartInitConfig, w: 300, h: 300, zIndex: -1 }
  public chartConfig = cloneDeep(BarThreeConfig)
  public option = cloneDeep(option)
}