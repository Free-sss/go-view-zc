import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const ImagePinConfig: ConfigType = {
  key: 'ImagePin',
  chartKey: 'VImagePin',
  conKey: 'VCImagePin',
  title: '图片(打点)',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'photo.png'
}
