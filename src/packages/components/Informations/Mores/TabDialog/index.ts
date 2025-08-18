import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const TabDialogConfig: ConfigType = {
  key: 'TabDialog',
  chartKey: 'VTabDialog',
  conKey: 'VCTabDialog',
  title: '弹窗(tab切换)',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'tabDialog.png'
}
