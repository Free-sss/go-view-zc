<template>
  <div class="chart-container" :id="htmlRef" ref="chartRef"></div>
</template>

<script setup lang="ts">
import * as Highcharts from 'highcharts'
import 'highcharts/highcharts-3d'
import 'highcharts/modules/cylinder'
import 'highcharts/highcharts-more'
import { PropType, toRefs, watch, ref, shallowReactive, onMounted, toRaw } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import config, { option as configOption } from './config'
import { isPreview } from '@/utils'
Highcharts.setOptions({
  lang: {
    contextButtonTitle: '图表导出菜单',
    decimalPoint: '.',
    downloadJPEG: '下载JPEG图片',
    downloadPDF: '下载PDF文件',
    downloadPNG: '下载PNG文件',
    downloadSVG: '下载SVG文件',
    loading: '加载中',
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    noData: '没有数据',
    numericSymbols: ['千', '兆', 'G', 'T', 'P', 'E'],
    printChart: '打印图表',
    resetZoom: '恢复缩放',
    resetZoomTitle: '恢复图表',
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    thousandsSep: ',',
    weekdays: ['星期一', '星期二', '星期三', '星期三', '星期四', '星期五', '星期六', '星期天']
  }
})
const props = defineProps({
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})
const htmlRef = `chart-${Math.random().toString(36).substr(2, 9)}`
const chartRef = ref<HTMLElement>()

const chartEditStore = useChartEditStore()
// 取配置数据
const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, alpha, beta, depth, type, color, color2, color3, gradientDirection, showLegend } = toRefs(props.chartConfig.option)

// 初始化
const init = (data: any) => {
  const dom: HTMLElement | undefined = chartRef.value
  if (dom) {
    let series = toRaw(data.value) ? toRaw(data.value).data : toRaw(data).data
    series = series.map((item: any) => {
      if (item.color) {
        return item
      } else {
        return {
          data: item.data,
          name: item.seriesName,
          color: {
            linearGradient:
              gradientDirection.value === 'x' ? { x1: 0, x2: 1, y1: 0, y2: 0 } : { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, color.value],
              [0.5, color2.value],
              [1, color3.value]
            ]
          }
        }
      }
    })

    const chartOptions = {
      chart: {
        type: type.value,
        renderTo: isPreview() ? dom.id : htmlRef,
        backgroundColor: 'transparent',
        marginTop: 30,
        options3d: {
          enabled: true,
          alpha: alpha.value,
          beta: beta.value,
          depth: depth.value,
          viewDistance: 40
        }
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: toRaw(data.value) ? toRaw(data.value).categories : toRaw(data).categories,
        // plotLines: [{
        //   color: "#2D3C5C",
        //   width: 1,
        //   value: 0,
        // }],
        gridLineWidth: 0,

        labels: {
          skew3d: true,
          style: {
            color: '#ffffff', // 设置 x 轴标签颜色为蓝色
            fontSize: '12px' // 设置 X 轴标签字体大小为 14 像素
          }
        }
      },
      yAxis: {
        title: {
          align: 'high',
          offset: 0,
          text: '单位： 个',
          rotation: 0,
          y: -20,
          style: {
            color: '#ffffff',
            fontSize: '12px'
          }
        },
        softMax: 1,
        gridLineColor: '#2D3C5C',
        labels: {
          skew3d: true,
          style: {
            color: '#ffffff', // 设置 y 轴标签颜色为蓝色
            fontSize: '12px' // 设置 X 轴标签字体大小为 14 像素
          }
        }
      },
      colors: ['rgba(0,84,152, 0.7)'],
      tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '{series.name}: <b>{point.y}</b> '
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      legend: {
        enabled: showLegend?.value ? showLegend?.value: false,
        itemStyle: {"color": "#fff", "cursor": "pointer", "fontSize": "10px", "fontWeight": "600", "textOverflow": "ellipsis"},
        align: 'right',
        symbolRadius: 0,
        symbolWidth: 8,
        symbolHeight: 8,
        verticalAlign: 'top',
        y: -10
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          depth: 45
        }
      },
      series: series
    }
    Highcharts.chart(chartOptions as any)
  }
}

// 手动更新
watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    init(newData)
  },
  {
    deep: false
  }
)

watch(
  () => props.chartConfig.option.beta,
  () => {
    init(dataset)
  },
  {
    deep: false
  }
)

watch(
  () => props.chartConfig.option.type,
  () => {
    init(dataset)
  },
  {
    deep: false
  }
)

watch(
  () => props.chartConfig.option.alpha,
  () => {
    init(dataset)
  },
  {
    deep: false
  }
)

watch(
  () => props.chartConfig.option.depth,
  () => {
    init(dataset)
  },
  {
    deep: false
  }
)

watch(
  () => props.chartConfig.option.color,
  () => {
    init(dataset)
  },
  {
    deep: false
  }
)

watch(
  () => props.chartConfig.option.color2,
  () => {
    init(dataset)
  },
  {
    deep: false
  }
)

watch(
  () => props.chartConfig.option.color3,
  () => {
    init(dataset)
  },
  {
    deep: false
  }
)

watch(
  () => props.chartConfig.option.gradientDirection,
  () => {
    init(dataset)
  },
  {
    deep: false
  }
)

watch(
  () => props.chartConfig.option.showLegend,
  () => {
    init(dataset)
  },
  {
    immediate: true,
    deep: false
  }
)

// DOM 渲染之后进行初始化
onMounted(() => {
  try {
    if (!isPreview()) {
      init(dataset)
    }
  } catch (error) {
    console.log(error)
  }
})

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  dataset.value = newData
  
})
</script>

<style scoped lang="scss">
.chart-container {
  width: 100%;
  height: v-bind('h + "px"');
}
</style>
