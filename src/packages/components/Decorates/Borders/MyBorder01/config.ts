// 公共类型
import { PublicConfigClass } from '@/packages/public'
// 公共类型
import { CreateComponentType } from '@/packages/index.d'
// 获取上面的 index 配置内容
import { MyBorder001Config } from './index'
// 深拷贝
import cloneDeep from 'lodash/cloneDeep'

export const option = {

}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = MyBorder001Config.key
  public chartConfig = cloneDeep(MyBorder001Config)
  public option = cloneDeep(option)
}