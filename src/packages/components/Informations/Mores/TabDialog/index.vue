<template>
  <tab-dialog :showDialog="option.value.showDialog" :showTabProp="option.value.showTabProp"></tab-dialog>
</template>

<script setup lang="ts">
import { PropType, toRefs, ref, shallowReactive, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartDataFetch, useChartInteract } from '@/hooks'
import { InteractEventOn } from '@/enums/eventEnum'
import { ComponentInteractParamsEnum } from './interact'
import { useRoute } from 'vue-router'
import  tabDialog from '@/components/Pages/Dialogs/tabDialog.vue'


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
    dataset: props.chartConfig.option.dataset,
    showDialog: props.chartConfig.option.showDialog,
    showTabProp: props.chartConfig.option.showTabProp
  }
})

// 监听事件改变
const onChange = (v: string) => {
  // 存储到联动数据
  useChartInteract(
    props.chartConfig,
    useChartEditStore,
    { [ComponentInteractParamsEnum.DATA]: v },
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

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
 
  option.value.dataset = newData
})

</script>

<style lang="scss" scoped>

</style>
