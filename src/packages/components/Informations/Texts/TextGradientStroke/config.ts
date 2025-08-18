import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TextGradientStokeConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'


export enum FontWeightEnum {
  NORMAL = '常规',
  MEDIUM = '适中',
  BOLD = '加粗',
}

export enum FontStyleEnum {
  NORMAL = '常规',
  ITALIC = '斜体',
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.MEDIUM]: '600',
  [FontWeightEnum.BOLD]: 'bold',
}

export const FontStyleObject = {
  [FontStyleEnum.NORMAL]: 'normal',
  [FontStyleEnum.ITALIC]: 'italic',
}

export const option = {
  dataset: '我是渐变文本',
  size: 20,
  weight: 'normal',
  textAlign: 'start',
  fontStyle: 'normal',
  strokeWidth: 1,
  strokeColor: '#000',
  gradient: {
    from: '#0000FFFF',
    to: '#00FF00FF',
    deg: 90
  }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TextGradientStokeConfig.key
  public chartConfig = cloneDeep(TextGradientStokeConfig)
  public option = cloneDeep(option)
}
