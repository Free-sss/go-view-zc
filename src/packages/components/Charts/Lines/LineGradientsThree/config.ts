import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { LineGradientsThreeConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { graphic } from 'echarts/core'
import { defaultTheme, chartColorsSearch } from '@/settings/chartThemes/index'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid']

const option = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  xAxis: {
    show: true,
    type: 'category'
  },
  yAxis: {
    show: true,
    type: 'value'
  },
  dataset: { ...dataJson },
  series: [
    {
      type: 'line',
      smooth: true,
      symbolSize: 5, //设定实心点的大小
      label: {
        show: true,
        position: 'top',
        color: '#fff',
        fontSize: 12
      },
      lineStyle: {
        width: 3,
        type: 'solid',
        join: 'round',
        color: 'rgba(50,220,251,1)'
      },
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(50,220,251,1)'
          },
          {
            offset: 1,
            color: 'rgba(255,255,255,0)'
          }
        ])
      }
    },
    {
      type: 'line',
      smooth: true,
      label: {
        show: true,
        position: 'top',
        color: '#fff',
        fontSize: 12
      },
      lineStyle: {
        width: 3,
        type: 'solid',
        join: 'round',
        color: 'rgba(244,67,54,1)'
      },
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(244,67,54,1)'
          },
          {
            offset: 1,
            color: 'rgba(255,255,255,0)'
          }
        ])
      }
    },
    {
      type: 'line',
      smooth: true,
      label: {
        show: true,
        position: 'top',
        color: '#fff',
        fontSize: 12
      },
      lineStyle: {
        width: 3,
        type: 'solid',
        join: 'round',
        color: 'rgba(255,152,0,1)'
      },
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(255,152,0,1)'
          },
          {
            offset: 1,
            color: 'rgba(255,255,255,0)'
          }
        ])
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = LineGradientsThreeConfig.key
  public chartConfig = cloneDeep(LineGradientsThreeConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
