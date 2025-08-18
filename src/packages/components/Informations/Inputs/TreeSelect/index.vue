<template>
  <div style="display: flex">
    <n-tree-select
      v-model:value="option.value.selectValue"
      :options="option.value.dataset"
      :placeholder="option.value.placeholder"
      @update:value="onChange"
      clearable
    />
    <img
      src="./prev_org.png"
      alt=""
      @click="prevOrg"
      style="margin-left: 12px; width: 20px; height: 20px"
      v-if="option.value.showPrev"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, ref, shallowReactive, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartDataFetch, useChartInteract } from '@/hooks'
import { InteractEventOn } from '@/enums/eventEnum'
import { ComponentInteractParamsEnum } from './interact'
import { useRoute } from 'vue-router'
import { TreeSelectOption } from 'naive-ui'

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
    showPrev: props.chartConfig.option.showPrev,
    dataset: props.chartConfig.option.dataset,
    placeholder: props.chartConfig.option.placeholder
  }
})

// 监听事件改变
const onChange = (v: string | number | Array<string | number> | null) => {
  isSelected = true

  // 存储到联动数据
  useChartInteract(
    props.chartConfig,
    useChartEditStore,
    { [ComponentInteractParamsEnum.DATA]: v },
    InteractEventOn.CHANGE
  )
}

const findParentNode = (nodes: any, targetKey: any): any => {
  for (const node of nodes) {
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        if (child.key === targetKey) {
          return node
        }
        const found = findParentNode(node.children, targetKey)
        if (found) {
          return found
        }
      }
    }
  }
  return null
}

const prevOrg = () => {
  if (!option.value.selectValue) {
    return // 如果没有选中任何节点，则不做处理
  }

  const parentNode = findParentNode(option.value.dataset, option.value.selectValue)
  if (parentNode) {
    option.value.selectValue = parentNode.key
    isSelected = true

    // 存储到联动数据
    useChartInteract(
      props.chartConfig,
      useChartEditStore,
      { [ComponentInteractParamsEnum.DATA]: parentNode.key },
      InteractEventOn.CHANGE
    )
  }
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
    console.log(newData)
    if (!isSelected && newData.dataset[0]) {
      option.value.selectValue = newData.dataset[0].key
      // 存储到联动数据
      useChartInteract(
        props.chartConfig,
        useChartEditStore,
        { [ComponentInteractParamsEnum.DATA]: newData.dataset[0].key },
        InteractEventOn.CHANGE
      )
    }
    // onChange(newData.dataset[0].key, newData.dataset)
  },
  {
    immediate: true,
    deep: true
  }
)

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  option.value.dataset = newData
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
