import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { MyPie01Config } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'
import { chartInitConfig } from '@/settings/designSetting'
import { width } from 'dom-helpers'

export const includes = ['legend']

export enum PieTypeEnum {
  NORMAL = '常规图',
  RING = '环形图',
  ROSE = '玫瑰图'
}

export const PieTypeObject = {
  [PieTypeEnum.NORMAL]: 'nomal',
  [PieTypeEnum.RING]: 'ring',
  [PieTypeEnum.ROSE]: 'rose'
}

// 其它配置
const otherConfig = {
  // 轮播动画
  isCarousel: false,
}

export const option = { 
  ...otherConfig,
  // tooltip: {
  //   show: true,
  //   trigger: 'item',
  // },
  type: 'ring', // 默认类型为环形图
  legend: {
    show: true,
    orient: 'vertical',
    itemGap: 15,
    itemWidth: 5,
    itemHeight: 5,
    top: 'center',
    left: '50%',
    icon: 'rect',
    formatter: '{name}', // 仅显示名称，动态内容由 index.vue 填充
    textStyle: {
      color: '#ffffff',
      fontSize: 12,
      width: 50,


      rich: {
        a: {
          fontSize: 10,
          color: '#aaa',
          width: 50,
          align: 'left'
        },
        b: {
          color: '#ffffff',
          fontSize: 10,
          width: 50,
          align: 'left',
          padding: [0, 5, 0, 5]
        },
        c: {
          fontSize: 11,
          color: '#ffffff',
          width: 40,
          align: 'right'
        }
      }
    }
  },
  color: ['#D4AF48', '#4188E6', '#51AADD', '#73C7A3', '#4D75CD', '#FF6347', '#3CB371'],
  dataset: { ...dataJson }, 
  series: [
    {
      type: 'pie',
      radius: ['60%', '70%'], // 默认环形图半径
      center: ['30%', '50%'],
      roseType: false, 
      padAngle: 4,
      avoidLabelOverlap: false,
      itemStyle: {
        show: true,
        borderColor: 'transparent',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'center',
        formatter: '{b}', 
        textBorderWidth: 1,
        rich: {
          value: {
            color: '#ffffff',
            fontSize: 15,
            align: 'center',
            verticalAlign: 'middle'
          },
          text: {
            color: '#ffffff',
            fontSize: 8,
            align: 'center',
            verticalAlign: 'middle',
            padding: 5
          }
        }
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: true
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = MyPie01Config.key

  public chartConfig = cloneDeep(MyPie01Config)
  public attr = { ...chartInitConfig, w: 390, h: 220, zIndex: 1 }
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
