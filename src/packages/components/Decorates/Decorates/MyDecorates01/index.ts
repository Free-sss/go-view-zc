import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const MyDecorates01Config: ConfigType = {
  key: 'MyDecorates01',
  chartKey: 'VMyDecorates01',
  conKey: 'VCMyDecorates01',
  title: 'MyDecorates01',
  category: ChatCategoryEnum.DECORATE,
  categoryName: ChatCategoryEnumName.DECORATE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'MyDecorates01.png'
}
