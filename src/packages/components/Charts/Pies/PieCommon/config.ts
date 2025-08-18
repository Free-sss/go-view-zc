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
  color: ["#05546e", "#a06c5d", "#50533f", "#294a72", "#1f5865", "#397363", "#1e5878", "#456579"],
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
      radius: ['40%', '65%'],
      center: ['50%', '60%'],
      roseType: false,
      padAngle: 5,
      avoidLabelOverlap: false,
      itemStyle: {
        show: true,
        borderRadius: 10,
        borderColor: 'transparent',
        borderWidth: 2
      },
      label: {
        show: false,
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
