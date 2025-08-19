import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { PieCommonConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend']

export enum PieTypeEnum {
  NORMAL = '常规图',
  RING = '环形图',
  ROSE = '玫瑰图'
}

export const PieTypeObject = {
  [PieTypeEnum.NORMAL]: 'nomal',
  [PieTypeEnum.RING]: 'ring',
  [PieTypeEnum.ROSE]: 'rose'
}

// 其它配置
const otherConfig = {
  // 轮播动画
  isCarousel: false,
}

const option = {
  ...otherConfig,
  type: 'ring',
  // tooltip: {
  //   show: true,
  //   trigger: 'item',
  // },
  legend: {
    show: true,
  },
  color: ['#D4AF48', '#4188E6', '#51AADD', '#73C7A3', '#4D75CD', '#FF6347', '#3CB371'], // 增加一些颜色

  // colors: [{
  //   "type": "linear",
  //   "x": 0,
  //   "y": 0,
  //   "x2": 0,
  //   "y2": 1,
  //   "colorStops": [
  //     {
  //       "offset": 0,
  //       "color": "red"
  //     },
  //     {
  //       "offset": 1,
  //       "color": "blue",
  //       "global": false
  //     }
  //   ]
  // }, {
  //   "type": "linear",
  //   "x": 0,
  //   "y": 0,
  //   "x2": 0,
  //   "y2": 1,
  //   "colorStops": [
  //     {
  //       "offset": 0,
  //       "color": "red"
  //     },
  //     {
  //       "offset": 1,
  //       "color": "blue",
  //       "global": false
  //     }
  //   ]
  // },{
  //   "type": "linear",
  //   "x": 0,
  //   "y": 0,
  //   "x2": 0,
  //   "y2": 1,
  //   "colorStops": [
  //     {
  //       "offset": 0,
  //       "color": "red"
  //     },
  //     {
  //       "offset": 1,
  //       "color": "blue",
  //       "global": false
  //     }
  //   ]
  // },{
  //   "type": "linear",
  //   "x": 0,
  //   "y": 0,
  //   "x2": 0,
  //   "y2": 1,
  //   "colorStops": [
  //     {
  //       "offset": 0,
  //       "color": "red"
  //     },
  //     {
  //       "offset": 1,
  //       "color": "blue",
  //       "global": false
  //     }
  //   ]
  // },{
  //   "type": "linear",
  //   "x": 0,
  //   "y": 0,
  //   "x2": 0,
  //   "y2": 1,
  //   "colorStops": [
  //     {
  //       "offset": 0,
  //       "color": "red"
  //     },
  //     {
  //       "offset": 1,
  //       "color": "blue",
  //       "global": false
  //     }
  //   ]
  // }],
  dataset: { ...dataJson },
  series: [
    {
      type: 'pie',
      radius: ['60', '70'],
      center: ['30%', '50%'],
      roseType: false,
      padAngle: 2,
      avoidLabelOverlap: false,
      itemStyle: {
        show: true,
        borderRadius: 10,
        borderColor: 'transparent',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'center',
        formatter: '{b}',
        fontWeight: 'normal',
        fontSize: 14,
        color: '#454E54',
        textBorderColor: '#ffffff',
        textBorderWidth: 1
      },
      emphasis: {
        label: {
          show: false,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = PieCommonConfig.key

  public chartConfig = cloneDeep(PieCommonConfig)

  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
