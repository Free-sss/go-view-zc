// 公共类型声明
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
// 当前[信息模块]分类声明
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const BarRankConfig: ConfigType = {
  // 唯一key
  key: 'BarRank',
  // 图表组件渲染 Components 格式: V + key
  chartKey: 'VBarRank',
  // 配置组件渲染 Components 格式: VC + key
  conKey: 'VCBarRank',
  // 名称
  title: '柱状图横向排行',
  // 子分类目录
  category: ChatCategoryEnum.BAR,
  // 子分类目录
  categoryName: ChatCategoryEnumName.BAR,
  // 包分类
  package: PackagesCategoryEnum.CHARTS,
  // 图片
  image: 'bar_rank.png'
}