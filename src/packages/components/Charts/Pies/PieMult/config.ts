import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { PieMultConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = []

// 直接定义 dataset 变量，用于统一数据源
const dataset = {
  total: dataJson.total,
  series: dataJson.series
}

// 直接从 dataset 中提取值
const total = dataset.total

const highSpeedRailValue = dataset.series.find(i => i.name === '高铁')?.value || 0
const urbanRailValue = dataset.series.find(i => i.name === '城铁')?.value || 0
const locomotiveValue = dataset.series.find(i => i.name === '机车')?.value || 0

// 计算“其他”部分
const highSpeedRailOther = total - highSpeedRailValue
const urbanRailOther = total - urbanRailValue
const locomotiveOther = total - locomotiveValue

const option = {
  grid: {
    left: '5%',
    right: '55%', // 给图例留出空间
    bottom: '10%',
    containLabel: true
  },
  dataset: dataset, // 使用 dataset 变量赋值
  legend: {
    orient: 'vertical',
    icon: 'circle',
    right: '5%',
    top: 'middle',
    itemGap: 20,
    data: ['高铁', '城铁', '机车'],
    textStyle: {
      fontSize: 14,
      color: '#b9c1c7'
    },
    formatter: function (name: string): any {
      const series = option.series.find(s => s.name === name)
      if (!series || !series.data || series.data.length < 1) return name
      const sum = series.data.reduce((acc, d) => acc + d.value, 0)
      const item = series.data.find(d => d.name === name)
      if (!item || sum <= 0) return name
      const percent = ((item.value / sum) * 100).toFixed(0) + '%'
      return `${name} ${item.value} ${percent}`
    }
  },
  series: [
    {
      name: '高铁',
      type: 'pie',
      radius: ['51.5%', '58.5%'],
      center: ['30%', '50%'],
      startAngle: -30,
      color: ['#44d7b6', '#112a3e'],
      data: [
        { value: highSpeedRailValue, name: '高铁', itemStyle: { color: '#44d7b6' } },
        { value: highSpeedRailOther, name: '其他', itemStyle: { color: '#112a3e' } }
      ],
      emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0 } },
      label: {
        normal: {
          formatter: '{value|' + total + '}\n\n{label|总数}',
          rich: {
            value: {
              fontSize: 22,
              fontWeight: 'normal',
              color: '#fff'
            },
            label: {
              fontSize: 12,
              fontWeight: 'normal',
              color: '#fff'
            }
          },
          position: 'center',
          show: true
        }
      }
    },
    {
      name: '城铁',
      type: 'pie',
      radius: ['39.5%', '46.5%'],
      center: ['30%', '50%'],
      startAngle: -30,
      label: { show: false },
      color: ['#9071ff', '#112a3e'],
      data: [
        { value: urbanRailValue, name: '城铁', itemStyle: { color: '#9071ff' } },
        { value: urbanRailOther, name: '其他', itemStyle: { color: '#112a3e' } }
      ],
      emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0 } }
    },
    {
      name: '机车',
      type: 'pie',
      radius: ['28.5%', '35.5%'],
      center: ['30%', '50%'],
      startAngle: -30,
      color: ['#3d7fff', '#112a3e'],
      label: { show: false },
      data: [
        { value: locomotiveValue, name: '机车', itemStyle: { color: '#3d7fff' } },
        { value: locomotiveOther, name: '其他', itemStyle: { color: '#112a3e' } }
      ],
      emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0 } }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = PieMultConfig.key
  public chartConfig = cloneDeep(PieMultConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}