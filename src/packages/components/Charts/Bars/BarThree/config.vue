<template>
  <!-- 默认展开 -->
  <CollapseItem name="柱状图3D" :expanded="true">
    <SettingItemBox name="三维配置">
      <SettingItem name="形状">
        <n-select v-model:value="optionData.type" :options="types" placeholder="选择形状" />
      </SettingItem>
      <SettingItem name="X轴">
        <!-- 与 config.ts 里的 option 对应 --><!-- n-input-number 是 NaiveUI 的控件 -->
        <n-input-number v-model:value="optionData.beta" size="small" :min="0" placeholder="X轴"></n-input-number>
      </SettingItem>
      <SettingItem name="Y轴">
        <n-input-number v-model:value="optionData.alpha" size="small" :min="0" placeholder="y轴"></n-input-number>
      </SettingItem>
      <SettingItem name="Z轴">
        <n-input-number v-model:value="optionData.depth" size="small" :min="0" placeholder="z轴"></n-input-number>
      </SettingItem>
      <SettingItem name="渐变颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.color"></n-color-picker>
      </SettingItem>
      <SettingItem name="渐变颜色2">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.color2"></n-color-picker>
      </SettingItem>
      <SettingItem name="渐变颜色3">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.color3"></n-color-picker>
      </SettingItem>
      <SettingItem name="渐变方向">
        <n-select v-model:value="optionData.gradientDirection" :options="gradientDirectionOptions" placeholder="选择方向" />
      </SettingItem>
      <SettingItem>
        <n-space>
          <n-switch v-model:value="optionData.showLegend" size="small"></n-switch>
          <n-text>显示图例</n-text>
        </n-space>
      </SettingItem>
      <!-- <SettingItem name="y轴标题位置纵向偏移">
        <n-input-number v-model:value="optionData.yTitlePositionOffsetY" size="small" :min="0" placeholder="y轴标题位置纵向偏移"></n-input-number>
      </SettingItem> -->
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
// 以下是封装的设置模块布局组件，具体效果可在官网查看
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

// 获取 option 的数据，便于使用 typeof 获取类型
import { GradientDirectionEnum, option, radientDirectionObject, types } from './config'

const gradientDirectionOptions = [
  {
    label: GradientDirectionEnum.HORIZONTAL,
    value: radientDirectionObject[GradientDirectionEnum.HORIZONTAL]
  },
  {
    label: GradientDirectionEnum.VERTICAL,
    value: radientDirectionObject[GradientDirectionEnum.VERTICAL]
  }
]

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
