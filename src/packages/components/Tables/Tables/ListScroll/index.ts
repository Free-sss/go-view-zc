import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const ListScrollConfig: ConfigType = {
  key: 'ListScroll',
  chartKey: 'VListScroll',
  conKey: 'VCListScroll',
  title: '滚动列表一',
  category: ChatCategoryEnum.TABLE,
  categoryName: ChatCategoryEnumName.TABLE,
  package: PackagesCategoryEnum.TABLES,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'list_scroll_1.png'
}
