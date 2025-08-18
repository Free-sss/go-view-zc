import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const yushiVideoConfig: ConfigType = {
  key: 'yushiVideo',
  chartKey: 'VYushiVideo',
  conKey: 'VCYushiVideo',
  title: '宇视摄像头',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'video.png'
}
