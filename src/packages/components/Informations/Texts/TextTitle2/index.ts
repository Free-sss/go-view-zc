import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const TextTitle2Config: ConfigType = {
  key: 'TextTitle2',
  chartKey: 'VTextTitle2',
  conKey: 'VCTextTitle2',
  title: '标题二',
  category: ChatCategoryEnum.TEXT,
  categoryName: ChatCategoryEnumName.TEXT,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'title_bg.png'
}
