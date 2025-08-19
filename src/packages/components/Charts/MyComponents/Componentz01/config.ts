import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { Componentz01 } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from '@/settings/designSetting'

import { average } from '@visactor/vchart/esm/util'
// import dataJson from './data.json'
const mockData = {

  timeDataSource: [
    ['时间', '数值'],
    ['13:00', 99],
    ['14:00', 19],
    ['15:00', 75],
    ['16:00', 26],
    ['17:00', 35],
    ['18:00', 20],
    ['19:00', 10]
  ]
}

export const includes = ['legend', 'xAxis', 'yAxis', 'grid']
export const seriesItem = {
  type: 'line',
  smooth: true,
  symbol: 'none',

  label: {
    show: false,
    position: 'top',
    color: '#fff',
    fontSize: 12
  },
  itemStyle: {
    color: null,
    borderRadius: 0
  },
  lineStyle: {
    type: 'solid',
    width: 2,
    color: '#50BB9A'
  },
  areaStyle: {
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: 'rgba(80,187,154,0.6)' // 替换为你线条的实际颜色，并添加50%透明度
      }, {
        offset: 1,
        color: 'rgba(80,187,154,0.3)' // 同色但完全透明
      }]
    }
  }
}
export const option = {
  dataset: {
    source: mockData.timeDataSource
  },
  grid: {
    left: '15%',
    right: '15%',
    top: '9%',
    bottom: '20%'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false

    }
  },

  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}s'
    },

    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  },
  legend: {
    show: false
  },
  series: [seriesItem]
};
// export const option = {
//   xAxis: {
//     type: 'category',
//     boundaryGap: false,
//     data: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00']
//   },
//   yAxis: {
//     type: 'value',
//     axisLabel: {
//       formatter: '{value}s' 
//     }
//   },
//   series: [
//     {
//       data: [105, 19, 75, 26, 35, 20, 10],
//       type: 'line',
//       smooth: true,
//       symbol: 'none'
//     }
//   ]
// };


export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = Componentz01.key
  public chartConfig = cloneDeep(Componentz01)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
  public attr = { ...chartInitConfig, x: 0, y: 0, w: 434, h: 263, zIndex: 1 }
}

