// 公共类型声明
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
// 当前[信息模块]分类声明
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const PieThreeConfig: ConfigType = {
  // 唯一key
  key: 'PieThree',
  // 图表组件渲染 Components 格式: V + key
  chartKey: 'VPieThree',
  // 配置组件渲染 Components 格式: VC + key
  conKey: 'VCPieThree',
  // 名称
  title: '饼图3D',
  // 子分类目录
  category: ChatCategoryEnum.PIE,
  // 子分类目录
  categoryName: ChatCategoryEnumName.PIE,
  // 包分类
  package: PackagesCategoryEnum.CHARTS,
  // 图片
  image: 'pie_3d.png'
}