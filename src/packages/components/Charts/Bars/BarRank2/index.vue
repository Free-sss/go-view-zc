<template>
  <div class="flex_column wrapper">
    <div v-for="(item, index) in dataset" :key="index" class="flex_v chart_item">
      <div class="levelOtherIcon flex_c">0{{ index + 1 }}</div>
      <div class="flex_column item_body">
        <div class="flex_v item_label">
          <div class="name" :title="item.name">{{ item.name }}</div>
          <div class="label_line"></div>
          <div class="value">{{ item.value }}</div>
        </div>
        <div class="bar_wrapper">
          <div
            class="bar_body"
            :style="{
              width: item.percentage + '%',
              height: '9px',
              borderRadius: borderRadius + 'px',
              background: colorBackgroundImage(index) 
            }"
          ></div>
          <div class="bar_body_divider">
            <div v-for="n in Math.ceil(railWidth / 8.5)" :key="n"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, watch, shallowReactive, onMounted } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import config, { option as configOption } from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

// 取配置数据
const { w, h } = toRefs(props.chartConfig.attr)
const { color, color1, color2, color3, color4, color5, railColor, railBorderColor, borderRadius, railWidth, dataset } = toRefs(props.chartConfig.option)


const colorBackgroundImage = (index: any) => {
  if (index == '0') {
    return 'linear-gradient(to right,' +  color.value + ',' +  color1.value + ')'
  } else if (index == '1') {
    return 'linear-gradient(to right,' +  color2.value + ',' +  color3.value + ')'
  } else if (index == '2') {
    return 'linear-gradient(to right,' +  color4.value + ',' +  color5.value + ')'
  } else {
    return 'linear-gradient(to right, #1b91ff, #43e2ff)'
  }
}
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
    immediate: true,
    deep: true
  }
)
// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  dataset.value = newData
})
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

.levelOtherIcon {
  width: 42px;
  height: 42px;
  background: url('/src/assets/images/chart/charts/rankIconBg2.png') 50% 50% / contain no-repeat;
  font-size: 16px;
  font-weight: bold;
  font-style: italic;
  padding-right: 1px;
}

.chart_item {
  padding-bottom: 10px;
  font-size: 12px;
  color: #fff;
}

.item_body {
  height: 100%;
}

.item_label {
  padding: 2px 8px 4px 8px;
}

.name {
  max-width: 150px; /* 容器宽度 */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
  font-size: 12px;
}

.value {
  font-size: 13px;
  font-weight: bold;
}

.bar_wrapper {
  width: v-bind('railWidth + "px"');
  height: 9px;
  border: 1px solid v-bind('railBorderColor');
  border-radius: v-bind('borderRadius + "px"');
  background-color: v-bind('railColor');
  position: relative;
  z-index: 0;
  margin-left: 6px;
}

.bar_body_divider {
  position: absolute;
  z-index: 2;
  display: flex;
  top: 0;
  height: 9px;
  width: calc(100% - 7px);
  align-items: center;
}

.bar_body_divider > div {
  width: 2px;
  height: 100%;
  margin-left: 8px;
  background: #091e2b;
}

.progressClass {
  position: absolute;
  z-index: 1;
}

.label_line {
  width: auto;
  flex: 1;
  margin: 0 4px 4px 4px;
  height: 2px; /* 虚线的粗细 */
  border-bottom: 2px dashed #143a48; /* 虚线颜色和样式 */
}
</style>
