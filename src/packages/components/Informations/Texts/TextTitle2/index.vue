<template>
  <div class="go-text-box">
    <div class="content">
      {{ option.dataset }}
      <!-- <p></p> -->
    </div>
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
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})

const {
  fontColor,
  fontSize,
  letterSpacing,
  paddingY,
  paddingX,
  textAlign,
  borderWidth,
  borderColor,
  borderRadius,
  writingMode,
  backgroundColor,
  fontWeight,
  fontStyle
} = toRefs(props.chartConfig.option)

const option = shallowReactive({
  dataset: configOption.dataset
})

// 手动更新
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

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: string) => {
  option.dataset = newData
})
</script>

<style lang="scss" scoped>
@include go('text-box') {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: v-bind('textAlign');
  overflow: hidden;

  .content {
    width: 100%;
    position: relative;
    display: flex;
    // border-top: 1px solid transparent;
    // border-image: linear-gradient(red, yellow) 1 1;
    color: v-bind('fontColor');
    padding: v-bind('`0px ${paddingX}px`');
    font-size: v-bind('fontSize + "px"');
    letter-spacing: v-bind('letterSpacing + "px"');
    writing-mode: v-bind('writingMode');
    font-weight: v-bind('fontWeight');
    font-style: v-bind('fontStyle');
    border-style: solid;
    border-width: v-bind('borderWidth + "px"');
    border-radius: v-bind('borderRadius + "px"');
    border-color: v-bind('borderColor');
    background-color: v-bind('backgroundColor');
  }

  .content {
    background: url('/src/assets/images/chart/informations/first_level.png') center left/426px 48px no-repeat;
    white-space: nowrap;
    display: flex;
    align-items: center;
    height: 48px;
    padding: 0 0 8px 30px;
  }

  .content p {
    background: url('/src/assets/images/chart/informations/line2.png') bottom right no-repeat;
    width: 100%;
    height: 40px;
    margin-bottom: 4px;
    opacity: 0.5;
  }
}
</style>
