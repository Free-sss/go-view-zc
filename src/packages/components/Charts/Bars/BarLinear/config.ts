import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { BarLinearConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid']
export const seriesItem = {
  type: 'bar',
  barWidth: 19,
  label: {
    show: true,
    position: 'top',
    color: '#fff',
    fontSize: 12
  },
  itemStyle: {
    color: {
      type: 'linear',
      x: 0,
      y: 1,
      x2: 0,
      y2: 0,
      colorStops: [
        { offset: 0, color: '#8d72ff' }, // 底部颜色（深蓝）
        { offset: 1, color: '#01c5ff' }  // 顶部颜色（浅蓝）
      ]
    },
    borderRadius: 2
  }
}
export const option = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      show: true,
      type: 'shadow'
    }
  },
  xAxis: {
    show: true,
    type: 'category'
  },
  yAxis: {
    show: true,
    type: 'value',
    min: 0,
    max: 100,
    interval: 25
  },
  dataset: { ...dataJson },
  series: [seriesItem]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = BarLinearConfig.key
  public chartConfig = cloneDeep(BarLinearConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
