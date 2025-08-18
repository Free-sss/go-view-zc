import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const TextGradientStokeConfig: ConfigType = {
  key: 'TextGradientStroke',
  chartKey: 'VTextGradientStroke',
  conKey: 'VCTextGradientStroke',
  title: '渐变文字-描边',
  category: ChatCategoryEnum.TEXT,
  categoryName: ChatCategoryEnumName.TEXT,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.NAIVE_UI,
  image: 'text_gradient.png'
}
