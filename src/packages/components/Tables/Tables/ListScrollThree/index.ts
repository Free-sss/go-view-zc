import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const ListScrollThreeConfig: ConfigType = {
  key: 'ListScrollThree',
  chartKey: 'VListScrollThree',
  conKey: 'VCListScrollThree',
  title: '滚动列表三',
  category: ChatCategoryEnum.TABLE,
  categoryName: ChatCategoryEnumName.TABLE,
  package: PackagesCategoryEnum.TABLES,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'list_scroll_1.png'
}
