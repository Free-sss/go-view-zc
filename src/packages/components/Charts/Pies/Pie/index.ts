// 公共类型声明
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
// 当前[信息模块]分类声明
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const PieConfig: ConfigType = {
  // 唯一key
  key: 'Pie',
  // 图表组件渲染 Components 格式: V + key
  chartKey: 'VPie',
  // 配置组件渲染 Components 格式: VC + key
  conKey: 'VCPie',
  // 名称
  title: '3D环状饼图',
  // 子分类目录
  category: ChatCategoryEnum.PIE,
  // 子分类目录
  categoryName: ChatCategoryEnumName.PIE,
  // 包分类
  package: PackagesCategoryEnum.CHARTS,
  // 图片
  image: 'pie_3d.png'
}