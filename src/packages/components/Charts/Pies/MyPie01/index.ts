import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const MyPie01Config: ConfigType = {
  key: 'MyPie01',
  chartKey: 'VMyPie01',
  conKey: 'VCMyPie01',
  title: 'MyPie01',
  category: ChatCategoryEnum.PIE,
  categoryName: ChatCategoryEnumName.PIE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'MyPie01.png'
}
