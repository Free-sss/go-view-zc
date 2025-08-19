// 公共类型
import { PublicConfigClass } from '@/packages/public'
// 公共类型
import { CreateComponentType } from '@/packages/index.d'
// 获取上面的 index 配置内容
import { MyBorder001Config } from './index'
// 深拷贝
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
  dataset: '实时视频',
  fontSize: 18,
  fontColor: '#ffffff',
  paddingX: 73,
  paddingY: 6,
  textAlign: 'left', // 水平对齐方式
  fontWeight: 'normal',
  fontStyle: 'normal',
  // 边框
  borderWidth: 0,
  borderColor: '#ffffff',
  borderRadius: 5,

  // 字间距
  letterSpacing: 2,
  writingMode: 'horizontal-tb',
  backgroundColor: '#00000000'
}


export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = MyBorder001Config.key
  public chartConfig = cloneDeep(MyBorder001Config)
  public option = cloneDeep(option)
    public attr = { ...chartInitConfig, x: 0, y: 0, w: 450, h: 300, zIndex: 1 }
  
}