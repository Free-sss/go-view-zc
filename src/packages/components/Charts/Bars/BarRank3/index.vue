<template>
  <div class="flex_column wrapper">
    <div v-for="(item, index) in dataset" :key="index" class="flex_v chart_item">
      <div class="name" :title="item.name">{{ item.name }}</div>
      <div class="bar_wrapper">
        <div
          class="bar_body"
          :style="{
            width: (item.total !== 0 ? (item.value / item.total) * 100 : 0) + '%',
            height: '12px',
            borderRadius: borderRadius + 'px'
          }"
        ></div>
      </div>
      <div class="value">
        {{ item.value }}/{{ item.total }}
        {{ item.total !== 0 ? ((item.value / item.total) * 100).toFixed(1) + '%' : '0%' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, watch, shallowReactive, onMounted } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import config, { option as configOption } from './config'
import { toNumber } from '@/utils'
import { height } from 'dom-helpers'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

// 取配置数据
const { w, h } = toRefs(props.chartConfig.attr)
const { color, color2, railColor, railBorderColor, borderRadius, railWidth, dataset } = toRefs(props.chartConfig.option)

// 手动更新
watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    try {
      dataset.value = newData
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)
// 预览更新
useChartDataFetch(
  props.chartConfig,
  useChartEditStore,
  (newData: Array<{ name: string; value: number; total: number }>) => {
    dataset.value = newData
  }
)
</script>

<style scoped lang="scss">
.flex_v {
  display: flex;
  align-items: center;
}

.flex_column {
  display: flex;
  flex-direction: column;
}

.flex_c {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  width: v-bind('w') + 'px';
  height: v-bind('h') + 'px';
}

.levelOneIcon {
  width: 28px;
  height: 28px;
  background: url('/src/assets/images/chart/charts/levelOneBg.png') 50% 50% / contain no-repeat;
}

.levelTwoIcon {
  width: 28px;
  height: 28px;
  background: url('/src/assets/images/chart/charts/level2Bg.png') 50% 50% / contain no-repeat;
}

.levelThreeIcon {
  width: 28px;
  height: 28px;
  background: url('/src/assets/images/chart/charts/level3Bg.png') 50% 50% / contain no-repeat;
}

.levelOtherIcon {
  width: 28px;
  height: 28px;
  background: url('/src/assets/images/chart/charts/levelOtherBg.png') 50% 50% / contain no-repeat;
}

.chart_item {
  padding-bottom: 10px;
  font-size: 12px;
  color: #fff;
}

.name {
  min-width: 80px; /* 容器宽度 */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
  padding: 8px; /* 内边距 */
}

.value {
  margin: 0 0 0 44px;
}

.bar_wrapper {
  min-width: v-bind('railWidth + "px"');
  height: 12px;
  border: 1px solid v-bind('railBorderColor');
  border-radius: v-bind('borderRadius + "px"');
  background-color: v-bind('railColor');
  position: relative;
  z-index: 0;
}

.bar_body {
  background: linear-gradient(to right, v-bind('color'), v-bind('color2'));
}

.progressClass {
  position: absolute;
  z-index: 1;
}
</style>
