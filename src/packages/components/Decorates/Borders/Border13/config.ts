import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Border13Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  colors: ['#091F2D', '#091F2D'],
  backgroundColor: '#091F2D'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Border13Config.key
  public chartConfig = cloneDeep(Border13Config)
  public option = cloneDeep(option)
}
