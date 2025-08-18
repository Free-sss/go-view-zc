<template>
  <collapse-item name="滚动列表一" :expanded="true">
    <SettingItem name="表行数">
        <n-input-number
          v-model:value="optionData.rowNum"
          :min="1"
          size="small"
          placeholder="请输入自动计算"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="轮播时间(s)">
        <n-input-number
          v-model:value="optionData.waitTime"
          :min="0"
          size="small"
          placeholder="请输入轮播时间"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="圆角">
        <n-input-number
          v-model:value="optionData.borderRadius"
          :min="0"
          size="small"
          placeholder="请输入圆角"
        ></n-input-number>
      </SettingItem>
      <!-- <setting-item name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.themeColor"></n-color-picker>
      </setting-item> -->
  </collapse-item>


</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
