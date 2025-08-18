<template>

  <div>
    <teleport to="body">
      <div class="popup" id="popup-map">
        <div class="pop-header">
          <div class="pop-header-left">
            <h5>大连公司</h5>
            <div @click="toNewPage">前往>></div>
          </div>
          <div class="pop-header-close" @click="handlePopClose">
            X
          </div>
        </div>
        <div class="pop-content">
            <div class="pop-content-item">
              <div class="item-label">线路总数</div>
              <div class="item-num">4</div>
            </div>
            <div class="pop-content-item">
              <div class="item-label">今日动调次数</div>
              <div class="item-num">2</div>
            </div>
            <div class="pop-content-item">
              <div class="item-label">司机总数</div>
              <div class="item-num">22</div>
            </div>
            <div class="pop-content-item">
              <div class="item-label">年度动调次数</div>
              <div class="item-num">376</div>
            </div>
        </div>
        <div class="pop-main-title">
          <h4>当前动调</h4>
          <span>2025-06-15 12:36更新</span>
        </div>
        <div class="pop-main-info">
          <div class="info-title">内环环线</div>
          <div class="info-list">
            <div class="info-item">hxn30001(本务)</div>
            <div class="info-item">hxn30001(本务)</div>
            <div class="info-item">hxn30001(本务)</div>
          </div>
          <div class="info-more">查看</div>
        </div>
      </div>
    </teleport>
    <div class="back-icon" v-if="(enter && levelHistory.length !== 0) || (enter && !isPreview())" @click="backLevel">
      <n-icon :color="backColor" :size="backSize * 1.1">
        <ArrowBackIcon />
      </n-icon>
      <span
        :style="{
          'font-weight': 200,
          color: backColor,
          'font-size': `${backSize}px`
        }"
      >
        返回上级
      </span>
    </div>
    <v-chart
      ref="vChartRef"
      :init-options="initOptions"
      :theme="themeColor"
      :option="option.value"
      :manual-update="isPreview()"
      autoresize
      @click="chartPEvents"
    >
    </v-chart>
  </div>
</template>

<script setup lang="ts">
import { PropType, reactive, watch, ref, nextTick, toRefs,onMounted } from 'vue'
import config, { includes } from './config'
import VChart from 'vue-echarts'
import { icon } from '@/plugins'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use, registerMap } from 'echarts/core'
import { EffectScatterChart, MapChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { useChartDataFetch } from '@/hooks'
import { mergeTheme, setOption } from '@/packages/public/chart'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
import mapJsonWithoutHainanIsLands from './mapWithoutHainanIsLands.json'
import mapChinaJson from './mapGeojson/china.json'
import { DatasetComponent, GridComponent, TooltipComponent, GeoComponent, VisualMapComponent } from 'echarts/components'

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

const showPopup = ref(false)

const { ArrowBackIcon } = icon.ionicons5
let levelHistory: any = ref([])

const { backColor, backSize, enter } = toRefs(props.chartConfig.option.mapRegion)
const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([
  MapChart,
  DatasetComponent,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  GeoComponent,
  EffectScatterChart,
  VisualMapComponent
])


const option = reactive({
  value: mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})
const vChartRef = ref<typeof VChart>()

//动态获取json注册地图
const getGeojson = (regionId: string) => {
  return new Promise<boolean>(resolve => {
    import(`./mapGeojson/${regionId}.json`).then(data => {
      registerMap(regionId, { geoJSON: data.default as any, specialAreas: {} })
      resolve(true)
    })
  })
}

//异步时先注册空的 保证初始化不报错
registerMap(`${props.chartConfig.option.mapRegion.adcode}`, { geoJSON: {} as any, specialAreas: {} })

// 进行更换初始化地图 如果为china 单独处理
const registerMapInitAsync = async () => {
  await nextTick()
  const adCode = `${props.chartConfig.option.mapRegion.adcode}`
  if (adCode !== 'china') {
    await getGeojson(adCode)
  } else {
    await hainanLandsHandle(props.chartConfig.option.mapRegion.showHainanIsLands)
  }
  vEchartsSetOption()
}
registerMapInitAsync()

// 手动触发渲染
const vEchartsSetOption = () => {
  option.value = props.chartConfig.option
  setOption(vChartRef.value, props.chartConfig.option)
}

// 更新数据处理
const dataSetHandle = async (dataset: any) => {
  props.chartConfig.option.series.forEach((item: any) => {
    if(item.type === 'map' && dataset.map){
      item.data = dataset.map
    }
  })
  if (dataset.pieces) props.chartConfig.option.visualMap.pieces = dataset.pieces

  isPreview() && vEchartsSetOption()
}
// 处理海南群岛
const hainanLandsHandle = async (newData: boolean) => {
  if (newData) {
    await getGeojson('china')
  } else {
    registerMap('china', { geoJSON: mapJsonWithoutHainanIsLands as any, specialAreas: {} })
  }
}
const handlePopClose = () => {
  document.getElementById('popup-map')?.classList.remove('show');
}

// 点击区域
const chartPEvents = (e: any) => {
  if (e.componentSubType === 'effectScatter') {
    document.getElementById('popup-map')?.classList.add('show');
  }
  if (!props.chartConfig.option.mapRegion.enter) {
    return
  }
  // mapChinaJson.features.forEach(item => {
  //   var pattern = new RegExp(e.name)
  //   if (pattern.test(item.properties.name)) {
  //     let code = String(item.properties.adcode)
  //     levelHistory.value.push(code)
  //     checkOrMap(code)
  //   }
  // })
}

// 返回上一级
const backLevel = () => {
  levelHistory.value = []
  if (levelHistory.value.length > 1) {
    levelHistory.value.pop()
    const code = levelHistory[levelHistory.value.length - 1]
    checkOrMap(code)
  } else {
    checkOrMap('china')
  }
}

// 切换地图
const checkOrMap = async (newData: string) => {
  if (newData === 'china') {
    if (props.chartConfig.option.mapRegion.showHainanIsLands) {
      // 显示南海
      hainanLandsHandle(true)
      vEchartsSetOption()
    } else {
      // 隐藏南海
      hainanLandsHandle(false)
      vEchartsSetOption()
    }
  } else {
    await getGeojson(newData)
  }
  props.chartConfig.option.geo.map = newData
  props.chartConfig.option.series.forEach((item: any) => {
    if (item.type === 'map') item.map = newData
  })
  vEchartsSetOption()
}
//点击跳转新地址
const toNewPage = () => {
  window.open(window.htconfig.bigScreenUrl, '_blank')
}
//监听 dataset 数据发生变化
watch(
  () => props.chartConfig.option.dataset,
  newData => {
    dataSetHandle(newData)
  },
  {
    immediate: true,
    deep: false
  }
)



//监听是否显示南海群岛
if (!isPreview()) {
  watch(
    () => props.chartConfig.option.mapRegion.showHainanIsLands,
    async newData => {
      try {
        await hainanLandsHandle(newData)
        vEchartsSetOption()
      } catch (error) {
        console.log(error)
      }
    },
    {
      deep: false
    }
  )
}
//监听地图展示区域发生变化
watch(
  () => `${props.chartConfig.option.mapRegion.adcode}`,
  newData => {
    try {
      checkOrMap(newData)
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)

// 预览
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  dataSetHandle(newData)
})
</script>

<style scope lang="scss">
.back-icon {
  z-index: 50;
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  gap: 2px;
}
.popup {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 394px;
  height: 279px;
  transform: translate(-197px, -140px);
  background-image: url('/pop/pop_01.png');
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, visibility 0s;
  z-index: 999;
  .pop-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 358px;
    height: 36px;
    line-height: 36px;
    margin-left: 34px;
    margin-right: 2px;
    overflow: hidden;
    .pop-header-left {
      display: flex;
      align-items: center;
      height: 34px;
      h5 {
        width: 85px;
        height: 34px;
        background-color: #1b8cac;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: normal;
        letter-spacing: 2px;
        margin-right: 7px;
      }
      div {
        width: 57px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        color: #f8f202;
        font-size: 12px;
        border-radius: 13px;
        border: 1px solid #f8f202;
        background-color: #49864d;
        cursor: pointer;
      }
    }
    .pop-header-close {
      width: 20px;
      height: 20px;
      margin-right: 4px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      border: 1px solid #fff;
      color: #fff;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .pop-content {
    position: relative;
    width: 363px;
    height: 88px;
    margin-left: 14px;
    margin-top: 16px;
    .pop-content-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      width: 120px;
      height: 26px;
      &:nth-of-type(1) {
        width: 110px;
        left: 75px;
        top: 9px;
      }
      &:nth-of-type(2) {
        right: -5px;
        top: 9px;
      }
      &:nth-of-type(3) {
        width: 110px;
        left: 75px;
        top: 50px;
      }
      &:nth-of-type(4) {
        right: -5px;
        top: 50px;
      }
      color: #fff;
      .item-num {
        text-align: right;
      }
    }
  }
  .pop-main-title {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 28px;
    margin-left: 20px;
    margin-right: 20px;
    h4 {
      color: #fff;
      font-size: 14px;
    }
    span {
      font-size: 12px;
      color: #4d5e63;
    }
  }
  .pop-main-info {
    position: relative;
    width: 373px;
    height: 62px;
    margin-top: 12px;
    margin-left: 10px;
    overflow: hidden;
    .info-title {
      position: absolute;
      left: 20px;
      top: 20px;
      font-size: 14px;
      color: #fff;
    }
    .info-list {
      position: absolute;
      left: 140px;
      top: 10px;
      width: 190px;
      height: 50px;
      display: flex;
      flex-wrap: wrap;
      .info-item {
        width: 92px;
        font-size: 12px;
        margin-right: 3px;
        color: #fff;
      }
    }
    .info-more {
      position: absolute;
      top: 20px;
      right: 12px;
      font-size: 14px;
      color: #1da1ce;
    }
  }
}
.popup.show {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.5s ease;
}
</style>
