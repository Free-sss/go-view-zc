<template>
  <div class="content_box">
    <vue3-seamless-scroll
      class="seamless"
      :list="option.dataset.data"
      :limitScrollNum="2"
      :hover="true"
      :step="0.5"
      :wheel="true"
      :isWatch="true"
    >
      <div v-for="(item, index) in option.dataset.data" class="detail flex_column" :key="index">
        <div class="flex" style="width: 100%;">
          <div class="flex_v title"><span class="title_icon"></span>{{ item.title }}</div>
          <div class="status">{{ item.status }}</div>
        </div>
        <div class="flex_wrap card_body">
          <div v-for="(item1, index) in item.data" key="index" :class='option.dataset.categories[index].isSingle ? "flex_v cardItem" : "flex_v cardHalfItem"'>
            <div>{{ option.dataset.categories[index].name }}: </div>
            <div>{{ item1 }}</div>
          </div>
        </div>
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

const {

} = toRefs(props.chartConfig.option)
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
  .detail {
    color: '#fff';
    position: relative;
    font-size: 14px;
    width: 504px;
    height: 289px;    
    padding: 16px 12px 0 12px;
    background: url(/src/assets/images/chart/tables/card_bg.png) 50% 50%/contain no-repeat;
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

  .cardItem {
    width: 100%;
  }

  .cardHalfItem {
    width: 48%;
  }

  .title {
    color: #40c3ed;
    font-size: 16px;
    margin-bottom: 16px;
  }

  .title .title_icon {
    width: 18px;
    height: 20px;
    margin-right: 12px;
    margin-left: 16px;
    background: url(/src/assets/images/chart/tables/plan.png) 50% 50%/contain no-repeat;
  }

  .status {
    font-size: 12px;
    position: absolute;
    right: 40px;
    top: 36px;
    color: #fff;
    border: 1px solid #40c3ed;
    padding: 4px 12px;
    border-radius: 16px;
  }

  .card_body {
    margin: 0 46px;
    color: #fff;
  }

  .card_body > div {
      margin-bottom: 16px;
  }

  .card_body > div > div:first-child {
    margin-right: 8px;
  }
</style>
