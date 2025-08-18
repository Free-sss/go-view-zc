<template>
  <div class="go-text-box">
    <n-gradient-text :size="size" :weight="weight" :fontStyle="fontStyle" :gradient="gradient" >
      {{ option.dataset }}
    </n-gradient-text>
  </div>
</template>
<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as configOption } from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const option = shallowReactive({
  dataset: configOption.dataset
})

const { w, h } = toRefs(props.chartConfig.attr)
const { size, gradient, weight, fontStyle, strokeWidth, strokeColor, textAlign } = toRefs(props.chartConfig.option)

watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    option.dataset = newData
  },
  {
    immediate: true,
    deep: false
  }
)

useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  option.dataset = newData
})
</script>

<style lang="scss" scoped>
@include go('text-box') {
  display: flex;
  justify-content: v-bind('textAlign');
  align-items: center;
  .n-gradient-text {
    white-space: initial;
    font-weight: v-bind('weight');
    font-style: v-bind('fontStyle');
    -webkit-text-stroke: v-bind('`${strokeWidth}px ${strokeColor}`');;
  }
}
</style>
