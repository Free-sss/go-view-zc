import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Decorates08Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  color: '#3faacb'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Decorates08Config.key
  public chartConfig = cloneDeep(Decorates08Config)
  public option = cloneDeep(option)
}
