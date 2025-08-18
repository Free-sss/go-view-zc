<template>
  <!-- 默认展开 -->
  <CollapseItem name="柱状图横向排行" :expanded="true">
    <SettingItemBox name="柱状图">
      <!-- 颜色粗细等等... -->
      <SettingItem name="进度条渐变颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.color"></n-color-picker>
      </SettingItem>
      <SettingItem name="进度条渐变颜色1">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.color1"></n-color-picker>
      </SettingItem>
      <SettingItem name="进度条渐变颜色2">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.color2"></n-color-picker>
      </SettingItem>
      <SettingItem name="进度条渐变颜色3">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.color3"></n-color-picker>
      </SettingItem>
      <SettingItem name="进度条渐变颜色4">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.color4"></n-color-picker>
      </SettingItem>
      <SettingItem name="进度条渐变颜色5">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.color5"></n-color-picker>
      </SettingItem>
      <SettingItem name="轨道颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.railColor"></n-color-picker>
      </SettingItem>
      <SettingItem name="轨道长度">
        <n-input-number v-model:value="optionData.railWidth" size="small"></n-input-number>
      </SettingItem>
      <SettingItem name="圆角">
        <n-input-number v-model:value="optionData.borderRadius" size="small"></n-input-number>
      </SettingItem>
      <SettingItem name="轨道边框颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.railBorderColor"></n-color-picker>
      </SettingItem>
      <!-- <SettingItem name="文本颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.textColor"></n-color-picker>
      </SettingItem>
       <setting-item name="文本大小">
        <n-input-number v-model:value="optionData.textSize" size="small"></n-input-number>
      </setting-item>
      <setting-item name="文本粗细">
        <n-select v-model:value="optionData.fonteight" size="small" :options="fontWeightOptions" />
      </setting-item> -->
      <!-- <SettingItem>
        <n-space>
          <n-switch v-model:value="optionData.processing" size="small" />
          <n-text>进行时动画</n-text>
        </n-space>
      </SettingItem> -->
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
// 以下是封装的设置模块布局组件，具体效果可在官网查看
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

// 获取 option 的数据，便于使用 typeof 获取类型
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
