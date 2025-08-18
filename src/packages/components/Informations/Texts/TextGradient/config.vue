<template>
  <collapse-item name="信息" :expanded="true">
    <setting-item-box name="文字" :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.dataset" type="textarea" size="small"></n-input>
      </setting-item>
    </setting-item-box>
  </collapse-item>
  <collapse-item name="样式" :expanded="true">
    <setting-item-box name="文字">
      <setting-item name="字体大小">
        <n-input-number v-model:value="optionData.size" size="small" placeholder="字体大小"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="文字">
      <setting-item name="字体粗细">
        <n-select v-model:value="optionData.weight" size="small" :options="fontWeightOptions" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="文字">
      <setting-item name="字体风格">
        <n-select v-model:value="optionData.fontStyle" size="small" :options="fontStyleOptions" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="渐变色参数">
      <setting-item name="起始值">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.gradient.from"></n-color-picker>
      </setting-item>
      <setting-item name="结束值">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.gradient.to"></n-color-picker>
      </setting-item>
      <setting-item name="偏移角度">
        <n-input-number v-model:value="optionData.gradient.deg" size="small" placeholder="颜色旋转"></n-input-number>
      </setting-item>
    </setting-item-box>

  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option } from './config'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'
import { FontStyleEnum, FontStyleObject, FontWeightEnum, FontWeightObject } from '../TextGradient/config';

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
const fontWeightOptions = [
  {
    label: FontWeightEnum.NORMAL,
    value: FontWeightObject[FontWeightEnum.NORMAL]
  },
  {
    label: FontWeightEnum.BOLD,
    value: FontWeightObject[FontWeightEnum.BOLD]
  }
]

const fontStyleOptions = [
  {
    label: FontStyleEnum.NORMAL,
    value: FontStyleObject[FontStyleEnum.NORMAL]
  },
  {
    label: FontStyleEnum.ITALIC,
    value: FontStyleObject[FontStyleEnum.ITALIC]
  }
]
</script>
