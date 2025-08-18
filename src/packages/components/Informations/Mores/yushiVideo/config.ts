import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { yushiVideoConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import cameraList from './cameratree.json'

export const option = {
  // 摄像头id
  dataset: {
    defaultValue: '13020000421328100181',
    list: cameraList.value
  },
  showTree: true,
  // 循环播放
  loop: true,
  // 静音
  muted: true,
  // 适应方式
  fit: 'contain',
  // 圆角
  borderRadius: 10,
  dataSource: [],
  selectedDataSource: '',
  videoTitle: '',
  videoIndex: '1',
  /** 外层css缩放比例 */
  sca: 1,
  showBtn: true,
  isOldStyle: true
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = yushiVideoConfig.key
  public chartConfig = cloneDeep(yushiVideoConfig)
  public option = cloneDeep(option)
}
