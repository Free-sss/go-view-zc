<template>
  <n-tabs :class="option.value.style" :type="option.value.tabType" @update:value="onChange" :default-value="option.value.tabLabel">
    <n-tab v-for="(item, index) in option.value.dataset" :name="item.label" :key="index">
      <span v-if="!item.subTitle || item.subTitle === ''" :style="{ color: item.color, fontSize: item.fontSize }">{{ item.label }}</span>
      <div v-else style="display: flex;flex-direction: column;">
        <div :style="{ color: item.color, fontSize: item.fontSize }">{{ item.label }}</div>
        <div style="display: flex;align-items: center;">
          <div>{{ item.subTitle }}</div>
          <div :style="{ color: item.valueColor, fontSize: item.fontSize, marginLeft: '4px' }">{{ item.subValue }}</div>
        </div>
      </div>
    </n-tab>
  </n-tabs>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartDataFetch, useChartInteract } from '@/hooks'
import { InteractEventOn } from '@/enums/eventEnum'
import { ComponentInteractParamsEnum } from './interact'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const option = shallowReactive({
  value: cloneDeep(props.chartConfig.option)
})

// 监听事件改变
const onChange = (v: string) => {
  if (v === undefined) return
  const selectItem = option.value.dataset.find((item: { label: string; value: any }) => item.label === v)
  option.value.selectedValue = v
  // 存储到联动数据
  useChartInteract(
    props.chartConfig,
    useChartEditStore,
    { [ComponentInteractParamsEnum.DATA]: selectItem.value },
    InteractEventOn.CHANGE
  )
}

// 手动更新
watch(
  () => props.chartConfig.option,
  (newData: any) => {
    option.value = newData
  
  },
  {
    immediate: true,
    deep: true
  }
)


</script>
<style lang="scss">
.custom_tabs .n-tabs-rail,
.custom_tabs_3 .n-tabs-rail {
  padding: 0 0;
  background-color: transparent;
}

.custom_tabs .n-tabs-tab,
.custom_tabs_3 .n-tabs-tab {
  padding: 3px 0;
}

.custom_tabs .n-tabs-rail .n-tabs-tab-wrapper .n-tabs-tab {
  border-radius: 0;
  border-top: none;
  background-color: transparent !important;
}

.custom_tabs_3 .n-tabs-rail .n-tabs-tab-wrapper .n-tabs-tab {
  border-radius: 0;
  border: 1px solid #505F76;
  background-color: transparent !important;
  margin-right: 4px;
}

.custom_tabs_3 .n-tabs-rail .n-tabs-tab-wrapper .n-tabs-tab.n-tabs-tab--active {
  background: rgba(27,149,235,0.3) !important;
}

.custom_tabs .n-tabs-rail .n-tabs-tab-wrapper .n-tabs-tab.n-tabs-tab--active {
  border-top: 1px solid #1fc6ff;
  background: linear-gradient(to bottom, #0a5977, #03344a);
}
</style>