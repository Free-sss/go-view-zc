import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { MyDecorates01Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from '@/settings/designSetting'

export enum WritingModeEnum {
  HORIZONTAL = '水平',
  VERTICAL = '垂直'
}

export const WritingModeObject = {
  [WritingModeEnum.HORIZONTAL]: 'horizontal-tb',
  [WritingModeEnum.VERTICAL]: 'vertical-rl'
}

export enum FontWeightEnum {
  NORMAL = '常规',
  BOLD = '加粗',
}

export enum FontStyleEnum {
  NORMAL = '常规',
  ITALIC = '斜体',
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.BOLD]: 'bold',
}

export const FontStyleObject = {
  [FontStyleEnum.NORMAL]: 'normal',
  [FontStyleEnum.ITALIC]: 'italic',
}

export const option = {
  dataset: '储罐区监控',
  fontSize: 35,
  fontColor: '#ffffff',
  paddingX: 72,
  paddingY: 8,
  textAlign: 'left', // 水平对齐方式
  fontWeight: 'bold',
  fontStyle: 'italic',
  // 边框
  borderWidth: 0,
  borderColor: '#ffffff',
  borderRadius: 5,

  // 字间距
  letterSpacing: 5,
  writingMode: 'horizontal-tb',
  backgroundColor: '#00000000'
}

// export const option = {
//   colors: ['#ffffff4d', '#ffffff4d'],
//   dur: 3,
//   lineHeight: 3
// }

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = MyDecorates01Config.key
  public chartConfig = cloneDeep(MyDecorates01Config)
  public attr = { ...chartInitConfig, x: 0, y: 0, w: 1920, h: 94, zIndex: 1 }
  public option = cloneDeep(option)
}
