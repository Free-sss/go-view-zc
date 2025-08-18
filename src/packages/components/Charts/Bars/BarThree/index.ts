// 公共类型声明
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
// 当前[信息模块]分类声明
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const BarThreeConfig: ConfigType = {
  // 唯一key
  key: 'BarThree',
  // 图表组件渲染 Components 格式: V + key
  chartKey: 'VBarThree',
  // 配置组件渲染 Components 格式: VC + key
  conKey: 'VCBarThree',
  // 名称
  title: '柱状图3D',
  // 子分类目录
  category: ChatCategoryEnum.BAR,
  // 子分类目录
  categoryName: ChatCategoryEnumName.BAR,
  // 包分类
  package: PackagesCategoryEnum.CHARTS,
  // 图片
  image: 'column_3d.png'
}