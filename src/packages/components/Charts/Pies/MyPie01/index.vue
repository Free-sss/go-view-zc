<template>
  <v-chart ref="vChartRef" autoresize :init-options="initOptions" :theme="themeColor" :option="option">
  </v-chart>

</template>

<script setup lang="ts">
import { computed, PropType, onMounted, watch } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { mergeTheme } from '@/packages/public/chart'
import config, { includes } from './config'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import dataJson from './data.json'

/**
 * 定义组件接收的属性
 * @property {Object} themeSetting - 主题设置对象
 * @property {Object} themeColor - 主题颜色对象
 * @property {config} chartConfig - 图表配置对象
 */
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
  },

})

/**
 * 初始化图表选项
 */
const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

// 当前高亮的数据索引
let seriesDataNum = -1
// 数据最大长度，用于轮播控制
let seriesDataMaxLength = 0
// 轮播定时器实例
let intervalInstance: any = null

// 注册 ECharts 组件和渲染器
use([DatasetComponent, CanvasRenderer, PieChart, GridComponent, TooltipComponent, LegendComponent])

/**
 * 计算图表配置选项
 * @returns {Object} 合并主题后的图表配置
 */
const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

/**
 * 处理系列数据的高亮与取消高亮
 * 控制当前选中项的切换，实现轮播效果
 */
const handleSeriesData = () => {
  if (seriesDataNum > -1) {
    vChartRef.value?.dispatchAction({
      type: 'downplay',
      dataIndex: seriesDataNum
    })
  }
  seriesDataNum = seriesDataNum >= seriesDataMaxLength - 1 ? 0 : seriesDataNum + 1
  vChartRef.value?.dispatchAction({
    type: 'highlight',
    dataIndex: seriesDataNum
  })
}

/**
 * 添加饼图轮播功能
 * @param {Object} newData - 新的数据源（可选）
 * @param {Boolean} skipPre - 是否跳过预处理步骤
 */
const addPieInterval = (newData?: typeof dataJson, skipPre = false) => {
  if (!skipPre && !Array.isArray(newData?.source)) return
  if (!skipPre) seriesDataMaxLength = newData?.source.length || 0
  clearInterval(intervalInstance)
  intervalInstance = setInterval(() => {
    handleSeriesData()
  }, 1000)
}

/**
 * 清除饼图轮播功能
 * 取消当前高亮并清除定时器
 */
const clearPieInterval = () => {
  vChartRef.value?.dispatchAction({
    type: 'downplay',
    dataIndex: seriesDataNum
  })
  clearInterval(intervalInstance)
  intervalInstance = null
}

/**
 * 鼠标聚焦时的处理函数
 * 清除轮播以避免冲突
 */
const handleHighlight = () => {
  clearPieInterval()
}

/**
 * 鼠标离开时的处理函数
 * 如果开启了轮播且当前没有运行，则恢复轮播
 */
const handleDownplay = () => {
  if (props.chartConfig.option.isCarousel && !intervalInstance) {
    // 恢复轮播
    addPieInterval(undefined, true)
  }
}

/**
 * 监听图表类型变化
 * 根据不同的类型设置对应的 radius 和 roseType 属性
 */
watch(
  () => props.chartConfig.option.type,
  newData => {
    try {
      if (newData === 'nomal') {
        props.chartConfig.option.series[0].radius = '70%'
        props.chartConfig.option.series[0].roseType = false
      } else if (newData === 'ring') {
        props.chartConfig.option.series[0].radius = ['60%', '70%']
        props.chartConfig.option.series[0].roseType = false
      } else {
        props.chartConfig.option.series[0].radius = '70%'
        props.chartConfig.option.series[0].roseType = true
      }
    } catch (error) {
      console.log(error)
    }
  },
  { deep: false, immediate: true }
)

/**
 * 监听是否开启轮播的变化
 * 开启时隐藏图例，关闭时显示图例
 */
watch(
  () => props.chartConfig.option.isCarousel,
  newData => {
    if (newData) {
      // addPieInterval(undefined, true)
      props.chartConfig.option.legend.show = false
    } else {
      props.chartConfig.option.legend.show = true
      // clearPieInterval()
    }
  }
)

/**
 * 监听数据集变化
 * 更新图例格式化函数，显示名称、值和百分比
 */
watch(
  () => props.chartConfig.option.dataset,
  newData => {
    if (newData) {
      props.chartConfig.option.dataset = newData
      props.chartConfig.option.legend.formatter = (name: any) => {
        // 计算所有值的总和
        var total = 0
        for (var i = 0; i < newData.source.length; i++) {
          total += newData.source[i][newData.dimensions[1]]
        }
        // 找到与当前名称对应的值
        var value = newData.source.find((item: any) => item[newData.dimensions[0]] === name)[newData.dimensions[1]]
        // 返回格式化的字符串，包括名称和百分比
        if (value) {
          return name + '\n\n' + value + '  ' + ((value / total) * 100).toFixed(2) + '%'
        }
        return name
      }
    }
  }
)

/**
 * 监听饼图中心位置变化
 * 对非法输入进行修正
 */
watch(
  () => props.chartConfig.option.series[0].center,
  newData => {
    var reg = /^[1-9]{1}\d{2,}\.?\d{0,2}$/
    if (newData) {
      if (newData[0] === '' || newData[0] === '%' || reg.test(newData[0])) {
        newData[0] = '0%'
      }

      if (newData[1] === '' || newData[1] === '%' || reg.test(newData[1])) {
        newData[1] = '0%'
      }

      props.chartConfig.option.series[0].center = newData
    }
  },
  {
    immediate: true,
    deep: true
  }
)

/**
 * 使用数据获取钩子
 * 在数据更新后更新图表配置并控制轮播
 */
const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  props.chartConfig.option.dataset = newData
  // clearPieInterval()
  if (props.chartConfig.option.isCarousel) {
    // addPieInterval(newData)
  }
})

/**
 * 组件挂载后的初始化操作
 * 设置初始数据长度和轮播状态，并初始化图例格式化函数
 */
onMounted(() => {
  // seriesDataMaxLength = dataJson.source.length
  if (props.chartConfig.option.isCarousel) {
    // addPieInterval(undefined, true)
  }

  props.chartConfig.option.legend.formatter = (name: any) => {
    // 计算所有值的总和
    var total = 0
    for (var i = 0; i < props.chartConfig.option.dataset.source.length; i++) {
      total += props.chartConfig.option.dataset.source[i][props.chartConfig.option.dataset.dimensions[1]]
    }
    // 找到与当前名称对应的值
    var value = props.chartConfig.option.dataset.source.find(
      (item: any) => item[props.chartConfig.option.dataset.dimensions[0]] === name
    )[props.chartConfig.option.dataset.dimensions[1]]
    // 返回格式化的字符串，包括名称和百分比
    if (value) {
      return name + '\n\n' + value + '  ' + ((value / total) * 100).toFixed(2) + '%'
    }
    return name
  }
})
</script>