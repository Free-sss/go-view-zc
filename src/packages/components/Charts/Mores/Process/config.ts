import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ProcessConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const types = [
  {
    label: '线形',
    value: 'line'
  },
  {
    label: '圆形',
    value: 'circle'
  },
  {
    label: '仪表盘',
    value: 'dashboard'
  },
]

export const indicatorPlacements = [
  {
    label: '内部',
    value: 'inside'
  },
  {
    label: '外部',
    value: 'outside'
  }
]


export enum FontWeightEnum {
  NORMAL = '常规',
  BOLD = '加粗',
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.BOLD]: 'bold',
}

export const option = {
  dataset: 36,
  dataTitle: '', //标题
  // 默认类型
  type: types[2].value,
  // 进行时效果
  processing: true,
  // 主颜色
  color: '#4992FFFF',
  //渐变颜色
  color2: '',
  color3: '',
  // 轨道颜色
  railColor: '#3e3e3f',
  borderRadius: 50,
  // 指标
  unit: '%',
  showIndicator: true,
  // 指标大小
  indicatorTextSize: 16,
  // 标题大小
  titleTextSize: 14,
  // 指标位置（线条时可用）
  indicatorPlacement: 'outside',
  // 指标颜色
  indicatorTextColor: '#FFFFFFFF',
  //标题颜色
  titleTextColor: '#FFFFFFFF',
  //指标粗细
  indicatorFontWeight: 'normal',
  //标题粗细
  titleFontWeight: 'normal',
  //背景圈颜色配置
  indicatorBackground: '',
  indicatorBorderColor: '',
  // 偏移角度
  offsetDegree: 180,
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = ProcessConfig.key
  public attr = { ...chartInitConfig, w: 80, h: 80, zIndex: -1 }
  public chartConfig = cloneDeep(ProcessConfig)
  public option = cloneDeep(option)
}