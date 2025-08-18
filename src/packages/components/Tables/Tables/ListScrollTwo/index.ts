import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const ListScrollTwoConfig: ConfigType = {
  key: 'ListScrollTwo',
  chartKey: 'VListScrollTwo',
  conKey: 'VCListScrollTwo',
  title: '滚动列表二',
  category: ChatCategoryEnum.TABLE,
  categoryName: ChatCategoryEnumName.TABLE,
  package: PackagesCategoryEnum.TABLES,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'list_scroll_2.png'
}
