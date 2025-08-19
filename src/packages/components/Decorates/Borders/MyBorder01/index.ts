// 公共类型声明
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
// 当前[信息模块]分类声明
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const MyBorder001Config: ConfigType = {
  // 唯一key，注意！！！文件夹名称需要修改成与当前组件一致！！！
  key: 'MyBorder01',
  // 图表组件渲染 Components 格式: V + key
  chartKey: 'VMyBorder01',
  // 配置组件渲染 Components 格式: VC + key
  conKey: 'VCMyBorder01',
  // 名称
  title: 'MyBorder01',
  // 子分类目录
  category: ChatCategoryEnum.BORDER,
  // 子分类目录
  categoryName: ChatCategoryEnumName.BORDER,
  // 包分类
  package: PackagesCategoryEnum.DECORATES,
  // 图表类型
  chartFrame: ChartFrameEnum.COMMON,
  // 图片 (注意！图片存放的路径必须在 src/assets/images/chart/包分类名称/*)
  // 文件夹名称需要和包分类名称一致: PackagesCategoryEnum.INFORMATIONS
  image: 'myborder001.png'
}
// export { default as MyBorder01 } from './index.vue'
// export * from './config' // 导出配置类型或常量（可选）