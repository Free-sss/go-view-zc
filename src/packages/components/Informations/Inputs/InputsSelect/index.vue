<template>
  <n-select
    v-model:value="option.value.selectValue"
    :options="option.value.dataset"
    clearable
    :style="`width:${w}px;`"
    @update:value="onChange"
  />
</template>

<script setup lang="ts">
import { PropType, toRefs, ref, shallowReactive, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartDataFetch, useChartInteract } from '@/hooks'
import { InteractEventOn } from '@/enums/eventEnum'
import { ComponentInteractParamsEnum } from './interact'
import { useRoute } from 'vue-router'
import { fetchPathByName, routerTurnByPath, routerTurnByPath2 } from '@/utils'
import { BigscreenEnum } from '@/enums/pageEnum'

let isSelected = false

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})
const route = useRoute()
const { w, h } = toRefs(props.chartConfig.attr)
const option = shallowReactive({
  value: {
    selectValue: props.chartConfig.option.selectValue,
    dataset: props.chartConfig.option.dataset
  }
})

// 监听事件改变
const onChange = (v: string) => {
  // 存储到联动数据
  isSelected = true
  useChartInteract(
    props.chartConfig,
    useChartEditStore,
    { [ComponentInteractParamsEnum.DATA]: v },
    InteractEventOn.CHANGE
  )

  //跳转路由
  // const path = fetchPathByName(BigscreenEnum.BIGSCREEN_PREVIEW_NAME, 'href')
  // routerTurnByPath2(path, [v], localStorage.getItem('pageId') as string, true, false)
}

// const onSelect = (v: string) => {
//   const path = fetchPathByName(BigscreenEnum.BIGSCREEN_PREVIEW_NAME, 'href')
//   routerTurnByPath(path, [v], undefined, true)
// }

// 手动更新
watch(
  () => props.chartConfig.option,
  (newData: any) => {
    option.value = newData
    if (!isSelected) {
      if (newData.dataset[0]) {
        option.value.selectValue = newData.dataset[0].value
      } else {
        option.value.selectValue = ''
      }

      useChartInteract(
        props.chartConfig,
        useChartEditStore,
        { [ComponentInteractParamsEnum.DATA]: option.value.selectValue },
        InteractEventOn.CHANGE
      )
    } // onChange(newData.selectValue)
  },
  {
    immediate: true,
    deep: true
  }
)

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  isSelected = false
  option.value.dataset = newData
  if (newData[0]) {
    option.value.selectValue = newData[0].value
  }
})
</script>

<style lang="scss" scoped>
@include deep() {
  .n-base-selection-label {
    height: v-bind('h + "px"');
    display: flex;
    align-items: center;
  }
}
</style>
