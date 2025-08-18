import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const PieMultConfig: ConfigType = {
  key: 'PieMult',
  chartKey: 'VPieMult',
  conKey: 'VCPieMult',
  title: '多环饼图',
  category: ChatCategoryEnum.PIE,
  categoryName: ChatCategoryEnumName.PIE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'multi-circle-pie.png'
}