<template>
  <v-chart :theme="themeColor" :init-options="initOptions" :option="option" autoresize></v-chart>
</template>

<script setup lang="ts">
import { computed,PropType, reactive, ref, watch } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { mergeTheme } from '@/packages/public/chart'
import config, { includes } from './config'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
} from 'echarts/components'

const props = defineProps({
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)


use([
  DatasetComponent,
  CanvasRenderer,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

const buildOption = (newData) => {
  const dataset = {
    total: newData.total,
    series: newData.series
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
  const oldOption = {
    grid: {
      left: '5%',
      right: '55%', // 给图例留出空间
      bottom: '10%',
      containLabel: true
    },
    dataset: newData, // 使用 dataset 变量赋值
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
        const series = oldOption.series.find(s => s.name === name)
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
  return oldOption
}



// 初始化 option
const option = ref({})
option.value = props.chartConfig.option

// 配置时监听
watch(
  () => props.chartConfig.option.dataset,
  newData => {
    try {
      option.value = buildOption(newData)
    } catch (error) {
      console.log(error)
    }
  },
  {
    immediate: true,
    deep: false
  }
)

// 预览时数据获取
// useChartDataFetch(props.chartConfig, useChartEditStore, (resData: number[]) => {
//   resData.forEach((value, index) => {
//     const total = option.value.series[index].data.reduce((sum, d) => sum + d.value, 0)
//     const newValue = parseFloat(`${value}`) * total
//     option.value.series[index].data[0].value = newValue
//     option.value.series[index].data[1].value = total - newValue
//   })
// })
</script>