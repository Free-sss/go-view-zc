import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { BarCommonConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid', 'dataZoom']
export const seriesItem = {
  type: 'bar',
  barWidth: 15,
  color1: '',
  color2: '',
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
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0, color: '#891fd3FF'// 0% 处的颜色
      }, {
        offset: 1, color: '#e89eefFF' // 100% 处的颜色
      }],
      global: false // 缺省为 false
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
  grid: {
    top: 60,
    bottom: 70,
    left: '10%',
    right: '10%'
  },
  xAxis: {
    show: true,
    type: 'category'
  },
  yAxis: {
    show: true,
    type: 'value'
  },
  dataZoom: [
    {
      show: false,
      height: 15,
      start: 0,
      end: 100
    },
    {
      show: false,
      yAxisIndex: 0,
      filterMode: 'empty',
      width: 15,
      height: 200,
      showDataShadow: false,
      left: '93%',
      start: 0,
      end: 100
    },
  ],
  dataset: { ...dataJson },
  series: [seriesItem, seriesItem]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = BarCommonConfig.key
  public chartConfig = cloneDeep(BarCommonConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
