import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ImagePinConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import logo from '@/assets/logo.png'
import pin from '@/assets/pin.png'

export const option = {
  // 图片路径
  dataset: [{
    orgId: '',
    imgUrl: logo,
    pinUrl: pin,
    parentId: '',
    pinLocation: [10, 20]
  }],
  // 适应方式
  fit: 'contain',
  // 圆角
  borderRadius: 0
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = ImagePinConfig.key
  public chartConfig = cloneDeep(ImagePinConfig)
  public option = cloneDeep(option)
}
