import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const TreeSelectConfig: ConfigType = {
  key: 'TreeSelect',
  chartKey: 'VTreeSelect',
  conKey: 'VCTreeSelect',
  title: '树形选择器',
  category: ChatCategoryEnum.INPUTS,
  categoryName: ChatCategoryEnumName.INPUTS,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'inputs_select.png'
}
