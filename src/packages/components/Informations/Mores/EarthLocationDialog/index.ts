import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const EarthLocationDialogConfig: ConfigType = {
  key: 'EarthLocationDialog',
  chartKey: 'VEarthLocationDialog',
  conKey: 'VCEarthLocationDialog',
  title: '弹窗(点位)',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'earth_location_dialog.png'
}
