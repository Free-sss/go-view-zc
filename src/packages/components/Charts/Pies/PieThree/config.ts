
import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { PieThreeConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend']


export const indicatorPlacements = [
  {
    label: '内部',
    value: 'inside'
  },
  {
    label: '外部',
    value: 'outside'
  }
]

export enum FontWeightEnum {
  NORMAL = '常规',
  BOLD = '加粗',
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.BOLD]: 'bold',
}

export enum LegendOrientEnum {
  HORIZONTAL = '水平',
  VERTICAL = '垂直'
}

export const legendOrientObject = {
  [LegendOrientEnum.HORIZONTAL]: 'horizontal',
  [LegendOrientEnum.VERTICAL]: 'vertical'
}

const option = {
  renderer: 'canvas',
  dataset: dataJson,
  labelStyleType: '样式一',
  labelColor1: '#ffffff',
  labelColor2: '#ffffff',
  labelPadding1: "0,3,0,-5",
  labelPadding2: "0,3,-10,5",
  showDataLabels: true,
  showLegendValue: false,
  showLegendPercent: false,
  showLableLineImage: false,
  labelLineColor: '#ffffff',
  lableLineLength1: 30,
  lableLineLength2: 40,
  series: [],
  legend: {
    itemGap: 10,
    x: 0,
    y: 0,
    orient: 'vertical',
    // top: "center",
    //@ts-ignore
    data: dataJson,
    icon: 'rectangle',
    textStyle: {
      color: '#fff',
      fontSize: 14,
      padding: [5, 0],
    }
  },
  grid3D: {
    show: false,
    boxHeight: 10, //圆环的高度
    //@ts-ignore
    left: '-15%',
    //@ts-ignore
    top: '5%', //3d饼图的位置
    viewControl: {
      //3d效果可以放大、旋转等，请自己去查看官方配置
      alpha: 25, //角度
      distance: 280, //调整视角到主体的距离，类似调整zoom
      rotateSensitivity: 0, //设置为0无法旋转
      zoomSensitivity: 1, //设置为0无法缩放
      panSensitivity: 1, //设置为0无法平移
      autoRotate: false, //自动旋转
    },
  },
}


export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = PieThreeConfig.key

  public chartConfig = cloneDeep(PieThreeConfig)

  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}