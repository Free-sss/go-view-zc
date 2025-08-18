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
      <div v-for="(item, index) in option.dataset" class="detail flex_column" :key="index">
        <div class="flex_v" :style="!showRankNum ? {paddingLeft: 0} : {paddingLeft: '24px'}">
          <div v-if="index === 0 && showRankNum" class="levelOneIcon flex_c">{{ index + 1 }}</div>
          <div v-else-if="index === 1 && showRankNum" class="levelTwoIcon flex_c">{{ index + 1 }}</div>
          <div v-else-if="showRankNum" class="levelOtherIcon flex_c">{{ index + 1 }}</div>
          <div class="item_title">{{ item.title }}</div>
          <div class="item_time" :style="item.timeColor ? { color: item.timeColor } : {}">{{ item.time }}</div>
        </div>
        <div class="item_body flex_v" :style="!showRankNum ? { paddingLeft: '18px'} : {}">{{ item.dept }}</div>
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

const { rowNum, waitTime, showRankNum } = toRefs(props.chartConfig.option)
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

.levelOneIcon {
  width: 18px;
  height: 18px;
  background: url(/src/assets/images/chart/tables/list_scroll_1_icon.png) 50% 50% / contain no-repeat;
}

.levelTwoIcon {
  width: 18px;
  height: 18px;
  background: url(/src/assets/images/chart/tables/list_scroll_2_icon.png) 50% 50% / contain no-repeat;
}

.levelOtherIcon {
  width: 18px;
  height: 18px;
  background: url(/src/assets/images/chart/tables/list_scroll_3_icon.png) 50% 50% / contain no-repeat;
}

.item_title {
  margin-left: 20px;
  flex: 1;
  max-width: 150px;
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}

.item_time {
  position: absolute;
  right: 1%;
}

.item_body {
  width: 100%;
  height: 32px;
  margin-top: 4px;
  padding-left: 62px;
  color: #406c90;
  background: url(/src/assets/images/chart/tables/list_scroll_body_bg.png) 0% 50% / 389px 100% no-repeat;

}
</style>
