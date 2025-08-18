import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { COMPONENT_INTERACT_EVENT_KET } from '@/enums/eventEnum'
import { interactActions, ComponentInteractEventEnum } from './interact'
import { TabDialogQYConfig } from './index'

export const option = {
  // 时间组件展示类型，必须和 interactActions 中定义的数据一致
  [COMPONENT_INTERACT_EVENT_KET]: ComponentInteractEventEnum.DATA,
  dataset: '',
  showDialog: false,
  showTabProp: '1',
  titleValue: "",
  showTabScene: true
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TabDialogQYConfig.key
  public attr = { ...chartInitConfig, w: 260, h: 32, zIndex: -1 }
  public chartConfig = cloneDeep(TabDialogQYConfig)
  public interactActions = interactActions
  public option = cloneDeep(option)
}
