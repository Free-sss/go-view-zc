<template>
  <div class="content">
    <div class="textContent">
      <div class="textInContent">
        <span class="smallText">报警总数</span>
        <span class="bigText">{{ mockData.data.alarms.toLocaleString() }}</span>
      </div>
      <div class="textInContent">
        <span class="smallText">未处置报警数</span>
        <span class="bigText">{{ mockData.data.unAlarms.toLocaleString() }}</span>
      </div>
      <div class="textInContent">
        <span class="smallText">平均处置时长</span>
        <span class="bigText">{{ mockData.data.average.toLocaleString() }}</span>
      </div>
    </div>
    <div class="chartsContent">
      <!-- <div class="Tips"> -->
      <span class="smallText Tips">报警处置效率</span>
      <!-- </div> -->
      <v-chart ref="vChartRef" :init-options="initOptions" :theme="themeColor" :option="option" :update-options="{
        replaceMerge: replaceMergeArr
      }" autoresize>
      </v-chart>
    </div>

  </div>

</template>

<script setup lang="ts">
import { PropType, computed, watch, ref, nextTick } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import config, { includes, seriesItem } from './config'
import { mergeTheme } from '@/packages/public/chart'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartDataFetch } from '@/hooks'
import { isPreview } from '@/utils'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import isObject from 'lodash/isObject'
const mockData =
  { data: { alarms: 2623, unAlarms: 2623, average: 2623 } }
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

use([DatasetComponent, CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent])

const replaceMergeArr = ref<string[]>()

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

// dataset 无法变更条数的补丁
watch(
  () => props.chartConfig.option.dataset,
  (newData: { dimensions: any }, oldData) => {
    try {
      if (!isObject(newData) || !('dimensions' in newData)) return
      if (Array.isArray(newData?.dimensions)) {
        const seriesArr = []
        for (let i = 0; i < newData.dimensions.length - 1; i++) {
          seriesArr.push(seriesItem)
        }
        replaceMergeArr.value = ['series']
        props.chartConfig.option.series = seriesArr
        nextTick(() => {
          replaceMergeArr.value = []
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  props.chartConfig.option.dataset = newData
})
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
}

.textContent {
  padding-top: 8%;
  /* background-color: brown; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 25%;
  box-sizing: border-box;
}

.textInContent {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chartsContent {
  width: 100%;
  height: 75%;
  /* background-color: blue; */
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.textInContent .smallText {
  font-size: 11px;
  color: #a9a9a9;
}

.textInContent .bigText {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: transparent;

  margin-top: 0.3em;
}

.textContent :nth-child(1) .bigText {
  background: linear-gradient(to right, #ffdc92, #F7BDA7);
  -webkit-background-clip: text;
  /* 将背景裁剪到文字 */
  background-clip: text;
}

.textContent :nth-child(2) .bigText {
  background: linear-gradient(to right, #86D8F3, #6CDEDF);
  -webkit-background-clip: text;
  /* 将背景裁剪到文字 */
  background-clip: text;
}

.textContent :nth-child(3) .bigText {
  background: linear-gradient(to right, #6CDFBE, #A2E9D9);
  -webkit-background-clip: text;
  /* 将背景裁剪到文字 */
  background-clip: text;
}

.Tips {
  font-size: 10px;
  margin-top: 30px;
  margin-left: 10px;
  height: 1.4em;
  /* min-width: 6em; */
  width: 8em;
  padding: 0.2em 0.5em;
  color: rgb(243, 243, 243);
  background-color: #273F40;
  border-radius: 8px;
  letter-spacing: 0.1em;
  text-align: center;
}
</style>