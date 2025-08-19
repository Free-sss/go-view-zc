import image from './image.png'
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Componentz01: ConfigType = {
  key: 'Componentz01',
  chartKey: 'VComponentz01',
  conKey: 'VCComponentz01',
  title: '曲线图',
  category: 'MyComponents',
  categoryName: '自定义组件',
  package: 'Charts',
  // category: ChatCategoryEnum.LINE,
  chartFrame: ChartFrameEnum.ECHARTS,
  image,
  description: '曲线图组件',
  dataset: null
}

// 默认导出配置对象
// export default Componentz01