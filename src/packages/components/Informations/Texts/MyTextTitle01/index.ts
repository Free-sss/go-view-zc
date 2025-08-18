import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const MyTextTitle01Config: ConfigType = {
  key: 'MyTextTitle01',
  chartKey: 'VMyTextTitle01',
  conKey: 'VCMyTextTitle01',
  title: 'MyTextTitle01',
  category: ChatCategoryEnum.TEXT,
  categoryName: ChatCategoryEnumName.TEXT,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: ''
}
