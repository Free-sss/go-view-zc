import { computed, Ref } from 'vue'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

// 获取当前对象数据
export const useTargetData = () => {
  const chartEditStore = useChartEditStore()
  //@ts-ignore
  const targetData: Ref<CreateComponentType | CreateComponentGroupType> = computed(() => {
    const list = chartEditStore.getComponentList
    const targetIndex = chartEditStore.fetchTargetIndex()
    if (list[targetIndex].id !== chartEditStore.getTargetChart.selectId[0]) {
      return list[targetIndex].groupList?.find(item => item.id === chartEditStore.getTargetChart.selectId[0])
    }
    return list[targetIndex]
  })
  return { targetData, chartEditStore }
}
