<template>
  <div class="go-text-box">
    <div class="content">
      <span style="white-space: pre-wrap">{{ option.dataset }}</span>
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
  background: url(/src/assets/images/chart/informations/title_bg.png) 0% 50%/307px 33px no-repeat;

  .content {
    width: 100%;
    position: relative;
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

  .content span {
    padding-left: v-bind('paddingX') + 'px';
  }
  .content::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 0;
    top: -3.5px;
    left: 0px;
    border-width: 2px;
    border-color: rgb(66, 117, 210);
    border-style: solid;
    opacity: 0.212;
  }

  .content::after {
    content: '';
    position: absolute;
    width: calc(100% - 247px);
    height: 28px;
    top: -2px;
    right: 0px;
    background-image: -moz-linear-gradient(3.18deg, rgba(32, 59, 86, 0.2) 0%, rgb(30, 74, 111) 100%);
    background-image: -webkit-linear-gradient(3.18deg, rgba(32, 59, 86, 0.2) 0%, rgb(30, 74, 111) 100%);
    background-image: -ms-linear-gradient(3.18deg, rgba(32, 59, 86, 0.2) 0%, rgb(30, 74, 111) 100%);
    opacity: 0.349;
  }
}
</style>
