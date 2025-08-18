import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Decorates09Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  color: '#496779',
  bgColor: '#1d4964'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Decorates09Config.key
  public chartConfig = cloneDeep(Decorates09Config)
  public option = cloneDeep(option)
}
