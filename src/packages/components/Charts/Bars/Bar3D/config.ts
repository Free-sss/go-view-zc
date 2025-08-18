import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { Bar3DConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid', 'dataZoom']
export const seriesItem = {
  type: 'bar',
  barWidth: 19,
  
  itemStyle: {
    color: {
      type: 'linear',
      x: 0,
      y: 1,
      x2: 0,
      y2: 0,
      colorStops: [
        { offset: 0, color: '#01c5ff' }, // 底部颜色（深蓝）
        { offset: 1, color: '#fbff01ff' }  // 顶部颜色（浅蓝）
      ]
    },
    borderRadius: 2
  },
  
}
export const option = {
  tooltip: {
    show: false,
    trigger: 'axis',
    axisPointer: {
      show: false,
      type: 'shadow'
    }
  },
  legend: {
    show: false // 新增或修改这行，隐藏图例（即“当日作业情况”文字和旁边的小点）
  },
  xAxis: {
    show: false,
    type: 'category'
  },
  yAxis: {
    show: false,
    type: 'value',
    min: 0,
    max: 100,
    interval: 25
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
  series: [seriesItem]
}


export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Bar3DConfig.key
  public chartConfig = cloneDeep(Bar3DConfig)
  public option = echartOptionProfixHandle(option, includes)
}
