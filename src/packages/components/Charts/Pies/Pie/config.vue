<template>
  <!-- 默认展开 -->
  <global-setting :optionData="config"></global-setting>
  <CollapseItem name="柱状图3D" :expanded="true">
    <SettingItemBox name="三维配置">
      <SettingItem name="视距">
        <n-input-number v-model:value="config.grid3D!.viewControl.distance" size="small" :min="0" placeholder="视距"></n-input-number>
      </SettingItem>
      <SettingItem name="Y轴">
        <n-input-number v-model:value="config.grid3D!.viewControl.alpha" size="small" :min="0" placeholder="y轴"></n-input-number>
      </SettingItem>
      <SettingItem name="Z轴">
        <n-input-number v-model:value="config.grid3D!.boxHeight" size="small" :min="0" placeholder="Z轴"></n-input-number>
      </SettingItem>
      <!-- <SettingItem name="饼图大小">
        <n-input-number v-model:value="optionData.size" size="small" :min="0" placeholder="饼图大小"></n-input-number>
      </SettingItem> -->
      <!-- <SettingItem name="透明度">
        <n-input-number v-model:value="optionData.opacity" size="small" :min="0" :max="1" placeholder="透明度"></n-input-number>
      </SettingItem> -->
      <setting-item>
        <n-space>
          <n-switch v-model:value="config.showDataLabels" size="small" />
          <n-text>显示指标线</n-text>
        </n-space>
      </setting-item>
      <setting-item name="指标线颜色" v-if="config.showDataLabels">
        <n-color-picker size="small" :modes="['hex']" v-model:value="config.labelLineColor"></n-color-picker>
      </setting-item>
      <SettingItem name="指标线长度1" v-if="config.showDataLabels">
        <n-input-number v-model:value="config.lableLineLength1" size="small" :min="0" placeholder="指标线长度1"></n-input-number>
      </SettingItem>
      <SettingItem name="指标线长度2" v-if="config.showDataLabels">
        <n-input-number v-model:value="config.lableLineLength2" size="small" :min="0" placeholder="指标线长度2"></n-input-number>
      </SettingItem>
      <setting-item name="指标样式类型">
        <n-select v-model:value="config.labelStyleType" size="small" :options="labelTypeOptions" />
      </setting-item>
      <setting-item name="指标文字颜色1" v-if="config.showDataLabels">
        <n-color-picker size="small" :modes="['hex']" v-model:value="config.labelColor1"></n-color-picker>
      </setting-item>
      <setting-item name="指标文字颜色2" v-if="config.showDataLabels">
        <n-color-picker size="small" :modes="['hex']" v-model:value="config.labelColor2"></n-color-picker>
      </setting-item>
      <setting-item name="指标文字位置1" v-if="config.showDataLabels">
        <n-input v-model:value="config.labelPadding1" type="text" size="small"></n-input>
      </setting-item>
      <setting-item name="指标文字位置2" v-if="config.showDataLabels">
        <n-input v-model:value="config.labelPadding2" type="text" size="small"></n-input>
      </setting-item>
      <setting-item v-if="config.showDataLabels">
        <n-space>
          <n-switch v-model:value="config.showLableLineImage" size="small" />
          <n-text>指标线显示图片</n-text>
        </n-space>
      </setting-item>
      <setting-item>
        <n-space>
          <n-switch v-model:value="config.showLegendValue" size="small" />
          <n-text>图例显示数值</n-text>
        </n-space>
      </setting-item>
      <setting-item>
        <n-space>
          <n-switch v-model:value="config.showLegendPercent" size="small" />
          <n-text>图例显示百分比</n-text>
        </n-space>
      </setting-item>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
// 以下是封装的设置模块布局组件，具体效果可在官网查看

// 获取 option 的数据，便于使用 typeof 获取类型
import { FontWeightEnum, FontWeightObject, LegendOrientEnum, legendOrientObject } from './config'
// 以下是封装的设置模块布局组件，具体效果可在官网查看
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
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

const legendOrients = [
  {
    label: LegendOrientEnum.HORIZONTAL,
    value: legendOrientObject[LegendOrientEnum.HORIZONTAL]
  },
  {
    label: LegendOrientEnum.VERTICAL,
    value: legendOrientObject[LegendOrientEnum.VERTICAL]
  }
]

const labelTypeOptions = [
  { label: '样式一', value: '样式一' },
  { label: '样式二', value: '样式二' },
  { label: '样式三', value: '样式三' },

]

const config = computed(() => {
  return props.optionData
})
</script>
