import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { MapChinaConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = []

export const option = {
  dataset: dataJson,
  mapRegion: {
    adcode: 'china',
    showHainanIsLands: true,
    enter: false,
    backSize: 20,
    backColor: '#ffffff'
  },
  tooltip: {
    show: true,
    trigger: 'item'
  },
  geo: {
    show: true,
    type: 'map',
    roam: false,
    map: 'china',
    selectedMode: 'single',
    zoom: 1
  },
  series: [
    {
      name: '区域',
      type: 'map',
      map: 'china',
      data: [
      ],
      selectedMode: false, 
      zoom: 1,
      geoIndex: 1,
      tooltip: {
        show: true,
        backgroundColor: '#00000060',
        borderColor: 'rgba(147, 235, 248, 0.8)',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 12
        }
      },
      label: {
        show: true,
        position: 'inside',
        color: '#fff',
        fontSize: 12,
        formatter: '{b}',
        emphasis: {
          show: true,
          textStyle: {
            color: '#ff0',
            fontWeight: 'bold'
          }
        }
      },
      itemStyle: {
        areaColor: '#0A4864',
        borderColor: '#fff', 
        borderWidth: 1
      }
    },
    {
      name: '大连机车企业',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: [
        {
          name: '大连机车企业',
          value: [121.88,39.09]
        }
      ],
      tooltip: {
        show: true,
        formatter: "大连机车企业"
      },
      symbolSize: 40,
      itemStyle: {
        color: '#ff4500'
      },
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      emphasis: {
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2
        }
      }
    }
  ]
}

// 导出默认配置
export const MapDefaultConfig = { ...option }

// 配置类（供 goview 使用）
export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = MapChinaConfig.key
  public attr = { ...chartInitConfig, w: 750, h: 800, zIndex: -1 }
  public chartConfig = cloneDeep(MapChinaConfig)
  public option = echartOptionProfixHandle(option, includes)
}