<template>
  <div class="content_box">
    <vue3-seamless-scroll
      class="seamless"
      :list="option.dataset"
      :limitScrollNum="rowNum"
      :hover="true"
      :step="waitTime"
      :wheel="true"
      :isWatch="true"
    >
      <div v-for="(item, index) in option.dataset" class="detail flex_v" :key="index">
        <div class="item_title">{{ item.title }}</div>
        <div class="bar_wrapper">
          <div class="bar_body" :style="{ width: item.percentage + '%',
            height: '5px', borderRadius: borderRadius + 'px' }">
          </div>
        </div>      
        <div class="item_num">{{ item.count }}次</div>
      </div>
    </vue3-seamless-scroll>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'    
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as configOption } from './config'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})

const { rowNum, waitTime, borderRadius } = toRefs(props.chartConfig.option)
const { w, h } = toRefs(props.chartConfig.attr)

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
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  option.dataset = newData
})
</script>

<style lang="scss" scoped>
.content_box {
  width: v-bind('w') + 'px';
  height: v-bind('h') + 'px';
  overflow: hidden;
  
}

.seamless {
  padding: 0 30px 14px 30px;
}
.detail {
  color: #fff;
  position: relative;
  font-size: 12px;
  width: 100%;
  height: 22px;
  background: url(/src/assets/images/chart/tables/list_scroll_2_bg.png) 0% 50% / 100% 100% no-repeat;
  margin-bottom: 28px;
  padding-top: 1px;
}
.flex_column {
  display: flex;
  flex-direction: column;
}

.flex {
  display: flex;
}

.flex_wrap {
  display: flex;
  flex-wrap: wrap;
}

.flex_v {
  display: flex;
  align-items: center;
}

.flex_betwwen {
  justify-content: space-between;
}

.flex_c {
  display: flex;
  justify-content: center;
  align-items: center;
}
.item_title {
  margin-left: 20px;
  flex: 1;
  max-width: 70px;
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}

.item_num {
  width: 50px;
  height: 22px;
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
  margin-left: 14px;
  line-height: 22px;
  text-align: center;
}

.bar_wrapper {
  width: 243px;
  height: 5px;
  background: #24376f;
  position: relative;
  z-index: 1;
  margin-bottom: 2px;
  margin-left: 18px;
}

.bar_body {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: #225bce;
}
</style>
