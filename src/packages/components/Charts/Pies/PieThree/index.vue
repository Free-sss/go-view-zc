<template>
  <v-chart
    ref="vChartRef"
    autoresize
    :init-options="initOptions"
    :theme="themeColor"
    :update-options="{ notMerge: true }"
    :option="option.value"
  ></v-chart>
</template>

<script setup lang="ts">
import 'echarts-gl'
import { toRaw, toReadonly, toRefs } from '@vue/reactivity'
import { isPreview } from '@/utils'
import { computed, onMounted, PropType, reactive, watch } from 'vue'
import VChart from 'vue-echarts'
import * as echarts from 'echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { mergeTheme } from '@/packages/public/chart'
import config, { includes } from './config'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

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

const chartEditStore = useChartEditStore()
use([DatasetComponent, CanvasRenderer, PieChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])
const {
  legend,
  grid3D,
  showDataLabels,
  showLegendValue,
  showLegendPercent,
  showLableLineImage,
  labelLineColor,
  labelColor1,
  labelColor2,
  labelPadding1,
  labelPadding2,
  lableLineLength1,
  lableLineLength2,
  labelStyleType
} = toRefs(props.chartConfig.option)

// const { dataset, alpha, beta, depth, size, showDataLabels, innerSize, opacity } = toRefs(props.chartConfig.option)

const option = reactive({
  value: {}
})

// 字体自适应。
const fontSize = (res: any) => {
  const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (!clientWidth) return
  const fontSize = 40 * (clientWidth / 1920)
  console.log(fontSize)
  return res * fontSize
}

const dataHandle = (newData: any) => {
  if (newData) {
    //@ts-ignore
    getPie3D(newData, newData[0].ratio)
    //是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
    props.chartConfig.option.series.push({
      name: 'pie2d',
      type: 'pie',
      labelLine: {
        show: showDataLabels?.value || false,
        length: lableLineLength1?.value || 30,
        length2: lableLineLength2?.value || 30,
        lineStyle: {
          color: labelLineColor?.value || '#fff',
          width: 2
        }
      },
      label: {
        opacity: showDataLabels.value ? 1 : 0,
        show: true,
        formatter: showLableLineImage?.value
          ? labelStyleType?.value === '样式一'
            ? ' {c|{c}个}\n {img|}\n {a| 占比{d}%}'
            : labelStyleType?.value === '样式二'
            ? ' {style|{c} 个}\n {img|}\n {e|{b}}'
            : ' {style|{d}%}\n {img|}\n {f|{b}}'
          : labelStyleType?.value === '样式一'
          ? ' {c|{c}个}\n {dot|}\n {a| 占比{d}%}'
          : labelStyleType?.value === '样式二'
          ? ' {style|{c} 个}\n {dot|}\n{e|{b}}'
          : ' {style|{d}%}\n {dot|}\n {f|{b}}',
        rich: {
          dot: {
            backgroundColor: '#fff', // 适应颜色
            width: 0,
            height: 0,
            borderRadius: 5, // 保证是圆角
            fontSize: 16,
            padding: [5, -5, 5, -5] // 这里就保证是要给宽高6的正方形
          },
          img: {
            backgroundColor: { image: '/src/assets/images/chart/charts/dot.png' }, // 适应颜色
            width: 24,
            height: 24,
            // borderRadius: 5, // 保证是圆角
            // fontSize: 16,
            padding: [0, -30, 0, -15]
          },
          a: {
            fontSize: 14,
            color: labelColor2?.value || '#fff',
            align: 'left',
            padding: labelPadding2?.value.split(',').map(function (str: any) {
              return parseInt(str)
            }) || [0, 3, 0, -5]
          },
          c: {
            fontSize: 20,
            color: labelColor1?.value || '#41a6fc',
            align: 'left',
            padding: labelPadding1?.value.split(',').map(function (str: any) {
              return parseInt(str)
            }) || [0, 3, -10, 5]
          },
          style: {
            fontSize: 20,
            color: labelColor1?.value || '#b8c276',
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   { offset: 0, color: '#fefefe' }, // 开始颜色
            //   { offset: 1, color: '#e0e98d' } // 结束颜色
            // ]),
            align: 'left',
            padding: labelPadding1?.value.split(',').map(function (str: any) {
              return parseInt(str)
            }) || [0, 3, -10, 5]
          },
          e: {
            fontSize: 14,
            color: labelColor2?.value || '#fff',
            align: 'left',
            padding: labelPadding2?.value.split(',').map(function (str: any) {
              return parseInt(str)
            }) || [0, 0, 0, 23]
          },
          f: {
            fontSize: 14,
            color: labelColor2?.value || '#fff',
            align: 'left',
            padding: labelPadding2?.value.split(',').map(function (str: any) {
              return parseInt(str)
            }) || [0, 0, 0, 3]
          }
        }
      },
      silent: true,
      startAngle: 320, //起始角度，支持范围[0, 360]。
      clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
      //@ts-ignore
      radius: [fontSize(0.6) + '%', fontSize(0.8) + '%'],
      //@ts-ignore
      center: [fontSize(1) + '%', fontSize(1.4) + '%'], //指示线的位置
      data: newData,
      itemStyle: {
        opacity: 0
      }
    })
    option.value = mergeTheme(props.chartConfig.option, props.themeSetting, includes)
    option.value = props.chartConfig.option
  }
}

const getPie3D = (pieData: any, internalDiameterRatio: any) => {
  //internalDiameterRatio:透明的空心占比
  //@ts-ignore
  let series: any[] = []

  let sumValue = 0
  let startValue = 0
  let endValue = 0
  let k = 1 - internalDiameterRatio
  pieData.sort((a: any, b: any) => {
    return b.value - a.value
  })
  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value
    let seriesItem = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      itemStyle: pieData[i].itemStyle,
      pieStatus: {
        selected: false,
        hovered: false,
        k: k
      },
      radius: '20%',
      center: ['0%', '20%']
    }

    series.push(seriesItem)
  }
  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value
    series[i].pieData.startRatio = startValue / sumValue
    series[i].pieData.endRatio = endValue / sumValue
    //@ts-ignore
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      series[i].pieData.isSelected ?? false,
      false,
      k,
      series[i].pieData.value
    )
    startValue = endValue
  }
  // let boxHeight = getHeight3D(series, 15); //通过传参设定3d饼/环的高度，26代表26px
  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  // @ts-nocheck
  //@ts-ignore

  props.chartConfig.option = {
    renderer: 'canvas',
    //   labelLine: {
    //     show: true,
    //     length: 15,
    //     length2: 15,
    //   },
    dataset: pieData,
    showLableLineImage: showLableLineImage?.value || false,
    labelColor1: labelColor1?.value || '',
    labelColor2: labelColor2?.value || '',
    labelPadding1: labelPadding1?.value || '',
    labelPadding2: labelPadding2?.value || '',
    labelStyleType: labelStyleType?.value || '样式一',
    labelLineColor: labelLineColor?.value || '#fff',
    lableLineLength1: lableLineLength1?.value || 30,
    lableLineLength2: lableLineLength2?.value || 30,
    showLegendValue: showLegendValue?.value || false,
    showLegendPercent: showLegendPercent?.value || false,
    showDataLabels: showDataLabels?.value || false,
    legend: {
      show: legend.value.show,
      itemGap: legend.value.itemGap,
      x: legend.value.x,
      y: legend.value.y,
      orient: legend.value.orient,
      // top: "center",
      //@ts-ignore
      data: pieData,
      icon: 'rectangle',
      //@ts-ignore
      itemWidth: fontSize(0.3), //矩形宽度
      //@ts-ignore
      itemHeight: fontSize(0.25), //矩形高度
      //@ts-ignore
      // formatter: res => {
      //   let str = ''
      //   series.forEach(ele => {
      //     if (res == ele.name) {
      //       let bfb = ((ele.pieData.endRatio - ele.pieData.startRatio) * 100).toFixed(2)
      //       str = ele.pieData.name

      //       if (showLegendValue.value) {
      //         str += "    " + ele.pieData.value
      //       }
      //     }
      //   })
      //   return str
      // },
      textStyle: {
        color: '#fff',
        fontSize: legend.value.textStyle.fontSize,
        padding: [5, 0]
      }
    },

    //@ts-ignore
    tooltip: {
      show: true,
      //@ts-ignore
      formatter: params => {
        if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
          //@ts-ignore
          let bfb = (
            (series[params.seriesIndex].pieData.endRatio -
              //@ts-ignore
              series[params.seriesIndex].pieData.startRatio) *
            100
          ).toFixed(2)
          return (
            `${params.seriesName}<br/>` +
            `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
            `${bfb}%`
          )
        }
      }
    },
    xAxis3D: {
      min: -1,
      max: 1
    },
    yAxis3D: {
      min: -1,
      max: 1
    },
    zAxis3D: {
      min: -1,
      max: 1
    },
    grid3D: {
      show: false,
      boxHeight: grid3D.value.boxHeight, //圆环的高度
      //@ts-ignore
      left: '-15%',
      //@ts-ignore
      top: '5%', //3d饼图的位置
      bottom: '5%',
      viewControl: {
        //3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: grid3D.value.viewControl.alpha, //角度
        distance: grid3D.value.viewControl.distance, //调整视角到主体的距离，类似调整zoom
        rotateSensitivity: 0, //设置为0无法旋转
        zoomSensitivity: 1, //设置为0无法缩放
        panSensitivity: 1, //设置为0无法平移
        autoRotate: false //自动旋转
      }
      // postEffect: {
      //         //配置这项会出现锯齿，请自己去查看官方配置有办法解决
      //         enable: true,
      //         bloom: {
      //           enable: true,
      //           bloomIntensity: 0.1,
      //         },
      //         SSAO: {
      //           enable: true,
      //           quality: "medium",
      //           radius: 2,
      //         },
      // },
    },
    series: series
  }
}

const getParametricEquation = (startRatio: any, endRatio: any, isSelected: any, isHovered: any, k: any, h: any) => {
  // 计算
  let midRatio = (startRatio + endRatio) / 2
  let startRadian = startRatio * Math.PI * 2
  let endRadian = endRatio * Math.PI * 2
  let midRadian = midRatio * Math.PI * 2
  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false
  }
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3
  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.cos(midRadian) * 0.2 : 0
  let offsetY = isSelected ? Math.sin(midRadian) * 0.2 : 0
  let offsetZ = isSelected ? Math.sin(midRadian) * 0.5 : 0

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.1 : 1
  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },
    x: function (u: any, v: any) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    y: function (u: any, v: any) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    z: function (u: any, v: any) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u)
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
    }
  }
}
// 配置时
watch(
  () => props.chartConfig.option.dataset,
  newData => {
    try {
      if (!isPreview()) {
        dataHandle(newData)
      } else {
        // option.value = props.chartConfig.option
        // dataHandle(newData)
        dataHandle(newData)
      }
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)

watch(
  () => props.chartConfig.option.grid3D.viewControl.alpha,
  newData => {
    props.chartConfig.option.grid3D.viewControl.alpha = newData
  },
  {
    immediate: true,
    deep: false
  }
)

watch(
  () => props.chartConfig.option.grid3D.viewControl.distance,
  newData => {
    props.chartConfig.option.grid3D.viewControl.distance = newData
  },
  {
    immediate: true,
    deep: false
  }
)

watch(
  () => props.chartConfig.option.grid3D.boxHeight,
  newData => {
    props.chartConfig.option.grid3D.boxHeight = newData
  },
  {
    immediate: true,
    deep: false
  }
)

watch(
  () => props.chartConfig.option.legend.orient,
  newData => {
    props.chartConfig.option.orient = newData
  },
  {
    immediate: true,
    deep: false
  }
)

watch(
  () => props.chartConfig.option.showLableLineImage,
  newData => {
    props.chartConfig.option.showLableLineImage = newData
    if (props.chartConfig.option.series[3] && props.chartConfig.option.series[3].label) {
      props.chartConfig.option.series[3].label.formatter = newData
        ? props.chartConfig.option.labelStyleType === '样式一'
          ? ' {c|{c}个}\n\n {img|}\n\n {a| 占比{d}%}'
          : props.chartConfig.option.labelStyleType === '样式二'
          ? ' {style|{c} 个}\n\n {img|}\n\n {e|{b}}'
          : ' {style|{d}%}\n\n {img|}\n\n {f|{b}}'
        : props.chartConfig.option.labelStyleType === '样式一'
        ? ' {c|{c}个}\n\n {dot|}\n\n {a| 占比{d}%}'
        : props.chartConfig.option.labelStyleType === '样式二'
        ? ' {style|{c} 个}\n\n {dot|}\n\n{e|{b}}'
        : ' {style|{d}%}\n\n {dot|}\n\n {f|{b}}'
    }
  },
  {
    immediate: true,
    deep: false
  }
)

watch(
  () => props.chartConfig.option.labelLineColor,
  newData => {
    props.chartConfig.option.labelLineColor = newData
    if (props.chartConfig.option.series[3] && props.chartConfig.option.series[3].labelLine) {
      props.chartConfig.option.series[3].labelLine.lineStyle.color = newData
    }
  },
  {
    immediate: true,
    deep: false
  }
)

watch(
  () => props.chartConfig.option.labelPadding1,
  newData => {
    props.chartConfig.option.labelPadding1 = newData
    if (props.chartConfig.option.series[3] && props.chartConfig.option.series[3].label && newData) {
      props.chartConfig.option.series[3].label.rich.c.padding = newData.split(',').map(function (str: any) {
        return parseInt(str)
      })
      props.chartConfig.option.series[3].label.rich.style.padding = newData.split(',').map(function (str: any) {
        return parseInt(str)
      })
    }
  },
  {
    immediate: true,
    deep: false
  }
)

watch(
  () => props.chartConfig.option.labelPadding2,
  newData => {
    props.chartConfig.option.labelPadding2 = newData
    if (props.chartConfig.option.series[3] && props.chartConfig.option.series[3].label && newData) {
      props.chartConfig.option.series[3].label.rich.a.padding = newData.split(',').map(function (str: any) {
        return parseInt(str)
      })
      props.chartConfig.option.series[3].label.rich.e.padding = newData.split(',').map(function (str: any) {
        return parseInt(str)
      })
      props.chartConfig.option.series[3].label.rich.f.padding = newData.split(',').map(function (str: any) {
        return parseInt(str)
      })
    }
  },
  {
    immediate: true,
    deep: false
  }
)

watch(
  () => props.chartConfig.option.labelColor1,
  newData => {
    props.chartConfig.option.labelColor1 = newData
    if (props.chartConfig.option.series[3] && props.chartConfig.option.series[3].label) {
      props.chartConfig.option.series[3].label.rich = {
        dot: {
          backgroundColor: '#fff', // 适应颜色
          width: 0,
          height: 0,
          borderRadius: 5, // 保证是圆角
          fontSize: 16,
          padding: [5, -5, 5, -5] // 这里就保证是要给宽高6的正方形
        },
        img: {
          backgroundColor: { image: '/src/assets/images/chart/charts/dot.png' }, // 适应颜色
          width: 24,
          height: 24,
          // borderRadius: 5, // 保证是圆角
          // fontSize: 16,
          padding: [0, -30, 0, -15]
        },
        a: {
          fontSize: 14,
          color: props.chartConfig.option.labelColor2 || '#fff',
          align: 'left',
          padding: [0, 3, 0, -5]
        },
        c: {
          fontSize: 20,
          color: newData || '#41a6fc',
          align: 'left',
          padding: [0, 3, -10, 5]
        },
        style: {
          fontSize: 20,
          color: newData || '#b8c276',
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   { offset: 0, color: '#fefefe' }, // 开始颜色
          //   { offset: 1, color: '#e0e98d' } // 结束颜色
          // ]),
          align: 'left',
          padding: [0, 3, -10, 5]
        },
        e: {
          fontSize: 14,
          color: props.chartConfig.option.labelColor2 || '#fff',
          align: 'left',
          padding: [0, 0, 0, 23]
        },
        f: {
          fontSize: 14,
          color: props.chartConfig.option.labelColor2 || '#fff',
          align: 'left',
          padding: [0, 0, 0, 3]
        }
      }
    }
  },
  {
    immediate: true,
    deep: false
  }
)

watch(
  () => props.chartConfig.option.labelColor2,
  newData => {
    props.chartConfig.option.labelColor2 = newData
    if (props.chartConfig.option.series[3] && props.chartConfig.option.series[3].label) {
    }
  },
  {
    immediate: true,
    deep: false
  }
)

watch(
  () => props.chartConfig.option.lableLineLength1,
  newData => {
    props.chartConfig.option.lableLineLength1 = newData
    if (props.chartConfig.option.series[3] && props.chartConfig.option.series[3].labelLine) {
      props.chartConfig.option.series[3].labelLine.length = newData
    }
  },
  {
    immediate: true,
    deep: false
  }
)

watch(
  () => props.chartConfig.option.lableLineLength2,
  newData => {
    props.chartConfig.option.lableLineLength2 = newData
    if (props.chartConfig.option.series[3] && props.chartConfig.option.series[3].labelLine) {
      props.chartConfig.option.series[3].labelLine.length2 = newData
    }
  },
  {
    immediate: true,
    deep: false
  }
)

watch(
  () => props.chartConfig.option.labelStyleType,
  newData => {
    props.chartConfig.option.labelStyleType = newData
    if (props.chartConfig.option.series[3] && props.chartConfig.option.series[3].label) {
      props.chartConfig.option.series[3].label.formatter = props.chartConfig.option.showLableLineImage
        ? newData === '样式一'
          ? ' {c|{c}个}\n\n {img|}\n\n {a| 占比{d}%}'
          : newData === '样式二'
          ? ' {style|{c} 个}\n\n {img|}\n\n {e|{b}}'
          : ' {style|{d}%}\n\n {img|}\n\n {f|{b}}'
        : newData === '样式一'
        ? ' {c|{c}个}\n\n {dot|}\n\n {a| 占比{d}%}'
        : newData === '样式二'
        ? ' {style|{c} 个}\n\n {dot|}\n\n{e|{b}}'
        : ' {style|{d}%}\n\n {dot|}\n\n {f|{b}}'
    }
  },
  {
    immediate: true,
    deep: false
  }
)

watch(
  () => props.chartConfig.option.showDataLabels,
  newData => {
    if (props.chartConfig.option.series.length > 1) {
      let lastSeries = props.chartConfig.option.series[props.chartConfig.option.series.length - 1]
      if (newData) {
        lastSeries.label.opacity = 1
        lastSeries.labelLine.show = true
      } else {
        lastSeries.label.opacity = 0
        lastSeries.labelLine.show = false
      }
    }
  },
  {
    immediate: true,
    deep: false
  }
)

watch(
  () => props.chartConfig.option.showLegendValue,
  newData => {
    if (newData) {
      props.chartConfig.option.legend.formatter = (name: any) => {
        // 找到与当前名称对应的值
        var value = props.chartConfig.option.dataset.find((item: any) => item.name === name).value
        // 返回格式化的字符串，包括名称和百分比
        if (props.chartConfig.option.showLegendPercent) {
          // 计算所有值的总和
          var total = 0
          for (var i = 0; i < props.chartConfig.option.dataset.length; i++) {
            total += props.chartConfig.option.dataset[i].value
          }
          // 找到与当前名称对应的值
          var value = props.chartConfig.option.dataset.find((item: any) => item.name === name).value
          // 返回格式化的字符串，包括名称和百分比
          return name + '  ' + value + '  ' + ((value / total) * 100).toFixed(1) + '%'
        }
        return name + '  ' + value
        // }
        // return name;
      }
    } else {
      props.chartConfig.option.legend.formatter = (name: any) => {
        if (props.chartConfig.option.showLegendPercent) {
          // 计算所有值的总和
          var total = 0
          for (var i = 0; i < props.chartConfig.option.dataset.length; i++) {
            total += props.chartConfig.option.dataset[i].value
          }
          // 找到与当前名称对应的值
          var value = props.chartConfig.option.dataset.find((item: any) => item.name === name).value
          // 返回格式化的字符串，包括名称和百分比
          return name + '  ' + ((value / total) * 100).toFixed(1) + '%'
        }
        return name
      }
    }
  },
  {
    immediate: true,
    deep: false
  }
)

watch(
  () => props.chartConfig.option.showLegendPercent,
  newData => {
    if (props.chartConfig.option.showLegendValue) {
      props.chartConfig.option.legend.formatter = (name: any) => {
        // 找到与当前名称对应的值
        var value = props.chartConfig.option.dataset.find((item: any) => item.name === name).value
        // 返回格式化的字符串，包括名称和百分比
        if (newData) {
          // 计算所有值的总和
          var total = 0
          for (var i = 0; i < props.chartConfig.option.dataset.length; i++) {
            total += props.chartConfig.option.dataset[i].value
          }
          // 找到与当前名称对应的值
          var value = props.chartConfig.option.dataset.find((item: any) => item.name === name).value
          // 返回格式化的字符串，包括名称和百分比
          return name + '  ' + value + '  ' + ((value / total) * 100).toFixed(1) + '%'
        }
        return name + '  ' + value
      }
    } else {
      props.chartConfig.option.legend.formatter = (name: any) => {
        if (newData) {
          // 计算所有值的总和
          var total = 0
          for (var i = 0; i < props.chartConfig.option.dataset.length; i++) {
            total += props.chartConfig.option.dataset[i].value
          }
          // 找到与当前名称对应的值
          var value = props.chartConfig.option.dataset.find((item: any) => item.name === name).value
          // 返回格式化的字符串，包括名称和百分比
          return name + '  ' + ((value / total) * 100).toFixed(1) + '%'
        }
        return name
      }
    }
  },
  {
    immediate: true,
    deep: false
  }
)

onMounted(() => {
  dataHandle(props.chartConfig.option.dataset)
  if (showLegendValue?.value) {
    props.chartConfig.option.legend.formatter = (name: any) => {
      // 找到与当前名称对应的值
      var value = props.chartConfig.option.dataset.find((item: any) => item.name === name).value
      // 返回格式化的字符串，包括名称和百分比
      if (showLegendPercent?.value) {
        // 计算所有值的总和
        var total = 0
        for (var i = 0; i < props.chartConfig.option.dataset.length; i++) {
          total += props.chartConfig.option.dataset[i].value
        }
        // 找到与当前名称对应的值
        var value = props.chartConfig.option.dataset.find((item: any) => item.name === name).value
        // 返回格式化的字符串，包括名称和百分比
        return name + '  ' + value + '  ' + ((value / total) * 100).toFixed(1) + '%'
      }
      return name + '  ' + value
      // }
      // return name;
    }
  } else {
    props.chartConfig.option.legend.formatter = (name: any) => {
      if (showLegendPercent?.value) {
        // 计算所有值的总和
        var total = 0
        for (var i = 0; i < props.chartConfig.option.dataset.length; i++) {
          total += props.chartConfig.option.dataset[i].value
        }
        // 找到与当前名称对应的值
        var value = props.chartConfig.option.dataset.find((item: any) => item.name === name).value
        // 返回格式化的字符串，包括名称和百分比
        return name + '  ' + ((value / total) * 100).toFixed(1) + '%'
      }
      return name
    }
  }
})

const handleHighlight = (params: any) => {
  if (params.seriesName !== 'mouseoutSeries') {
    let series = vChartRef.value?.getOption().series
    series[params.seriesIndex].parametricEquation = getParametricEquation(
      series[params.seriesIndex].pieData.startRatio,
      series[params.seriesIndex].pieData.endRatio,
      false,
      true, // 设置为高亮状态
      series[params.seriesIndex].pieStatus.k,
      series[params.seriesIndex].pieData.value * 1.05 // 高亮时的高度
    )
    vChartRef.value?.setOption({ series: series })
  }
}

const cancelHighlight = (params: any) => {
  let series = vChartRef.value?.getOption().series
  series[params.seriesIndex].parametricEquation = getParametricEquation(
    series[params.seriesIndex].pieData.startRatio,
    series[params.seriesIndex].pieData.endRatio,
    false,
    false, // 取消高亮状态
    series[params.seriesIndex].pieStatus.k,
    series[params.seriesIndex].pieData.value // 恢复基础高度
  )
  vChartRef.value?.setOption({ series: series })
}

// 预览更新
const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  props.chartConfig.option.dataset = newData
  dataHandle(newData)
})
</script>

<style scoped lang="scss"></style>
