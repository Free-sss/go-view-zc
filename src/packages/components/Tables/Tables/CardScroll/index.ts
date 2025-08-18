import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const CardScrollConfig: ConfigType = {
  key: 'CardScroll',
  chartKey: 'VCardScroll',
  conKey: 'VCCardScroll',
  title: '卡片滚动列表',
  category: ChatCategoryEnum.TABLE,
  categoryName: ChatCategoryEnumName.TABLE,
  package: PackagesCategoryEnum.TABLES,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'card_scroll.png'
}
