import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Border15Config: ConfigType = {
  key: 'Border15',
  chartKey: 'VBorder15',
  conKey: 'VCBorder15',
  title: '边框-15',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'card_info_bg.png'
}
