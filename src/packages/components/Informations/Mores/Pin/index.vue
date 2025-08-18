<template>
  <div
    :style="{
      borderRadius: `${borderRadius}px`,
      overflow: 'hidden',
      background: 'transparent',
      position: 'relative'
    }"
  >
    <img
      v-for="(item, index) in option.dataset"
      :key="index"
      @click="handleClick(item)"
      :src="(item as any).imgSrc"
      :style="{
        position: 'absolute', 
        cursor: 'pointer',
        top: (item as any).y, 
        left: (item as any).x, 
        width: (item as any).width, 
        height: (item as any).height
      }"
    />
    <n-modal
      v-model:show="status.showDialog"
      :class="['custom-tab-modal']"
      :title="status.selectedItem && (status.selectedItem as any).cameraName"
      preset="card"
      @on-after-leave="handleCloseDialog"
      :draggable="{ bounds: 'none' }"
      :style="{ width: '800px', height: '450px' }"
    >
    <div style="width: 98%;height: 93%;margin-top: 12px;">
      <play-live :device-id="(status.selectedItem as any).cameraCode"></play-live>
    </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs, reactive } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import PlayLive from '@/components/Pages/yushiVideo/playLive.vue'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { borderRadius } = toRefs(props.chartConfig.option)

const status = reactive({
  showDialog: false,
  selectedItem: null
})
const option = shallowReactive({
  dataset: []
})

const handleClick = (item: any) => {
  status.selectedItem = item
  if (item.cameraCode) {
    status.showDialog = true
  }
}

const handleCloseDialog = () => {
  status.showDialog = false;
  status.selectedItem = null;
}

// 编辑更新
watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    //@ts-ignore
    option.dataset = newData
  },
  {
    immediate: true
  }
)

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  //@ts-ignore
  option.dataset = newData
})
</script>
<style lang="scss">
.custom-tab-modal > .n-card-header {
  background-color: rgba(26, 56, 113, 1) !important;
  background-image: linear-gradient(to right, rgba(8, 100, 177, 0.7), transparent) !important;
  padding: 16px !important;
  border: 2px solid rgba(62, 200, 244, 1);
  border-bottom-width: 0px !important;
}

.custom-tab-modal > .n-card__content {
  background-color: rgba(26, 56, 113, 1) !important;
  border: 2px solid rgba(62, 200, 244, 1);
  padding-right: 0;
  padding-bottom: 0;
}

::-webkit-scrollbar-thumb {
  background-color: #2461db;
  border-radius: 6px;
}

.custom-tab-modal .timeLineClass > div:last-child {
  padding-left: 8px;
  background: url(./text_bg.png) 0 50%/100% 100% no-repeat;
}
</style>