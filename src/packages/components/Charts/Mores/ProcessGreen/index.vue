<template>
  <n-progress
    class="progressClass"
    :type="type"
    :height="h"
    :processing="processing"
    :percentage="dataset"
    :show-indicator="showIndicator"
    :indicator-placement="indicatorPlacement"
    :rail-color="railColor"
    :offset-degree="offsetDegree"
  >
  <div class="progressText">
    <span
      :style="{
        color: indicatorTextColor,
        textAlign: 'center',
        fontWeight: `${indicatorFontWeight}`,
        fontSize: `${indicatorTextSize}px`
      }"
      >{{ dataset }} {{ unit }}
    </span>
    <span :style="{
        color: titleTextColor,
        textAlign: 'center',
        fontWeight: `${titleFontWeight}`,
        fontSize: `${titleTextSize}px`
      }">
      {{ dataTitle }}
    </span>
  </div>
    
    

    <!--创建一个svg-->
    <svg style="position: absolute">
      <defs>
        <linearGradient id="gradient1" x1="1" y1="0.4" x2="0.3" y2="1">
          <!-- 设置过度-->
          <stop offset="0%" :style="{ 'stop-color': color2 }" stop-opacity="1"></stop>
          <stop offset="100%" :style="{ 'stop-color': color3 }" stop-opacity="1"></stop>
        </linearGradient>
      </defs>
    </svg>
  </n-progress>
</template>

<script setup lang="ts">
import { PropType, toRefs, watch, shallowReactive, onMounted } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import config, { option as configOption } from './config'
import { toNumber } from '@/utils'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

// 取配置数据
const { w, h } = toRefs(props.chartConfig.attr)
const {
  type,
  unit,
  color,
  color2,
  color3,
  processing,
  railColor,
  showIndicator,
  indicatorTextColor,
  indicatorPlacement,
  indicatorTextSize,
  titleTextColor,
  titleTextSize,
  titleFontWeight,
  indicatorFontWeight,
  indicatorBackground,
  indicatorBorderColor,
  offsetDegree,
  dataset,
  dataTitle
} = toRefs(props.chartConfig.option)

// 手动更新
watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    try {
      dataset.value = toNumber(newData, 2)
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)
// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: number) => {
  dataset.value = toNumber(newData, 2)
})
 
</script>

<style scoped lang="scss">
// 找到第二个path并将他的stroke替换为我们创建的svg
.progressClass {
  position: relative;
  :deep(svg > g:nth-child(2) path) {
    stroke: url('#gradient1') !important;
  }
}

.progressText {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: v-bind('indicatorBackground');
  border:  2px solid v-bind('indicatorBorderColor');
  border-radius: 50%;
  width: v-bind('w * 0.75 + "px"');
  height: v-bind('h * 0.75 + "px"');
}
</style>
