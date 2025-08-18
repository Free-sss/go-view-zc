import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const TabDialogQYConfig: ConfigType = {
  key: 'TabDialogQY',
  chartKey: 'VTabDialogQY',
  conKey: 'VCTabDialogQY',
  title: '弹窗(tab切换)QY',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'tabDialog.png'
}
