import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const TimeWeekConfig: ConfigType = {
  key: 'TimeWeek',
  chartKey: 'VTimeWeek',
  conKey: 'VCTimeWeek',
  title: '星期时间',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'time.png'
}
