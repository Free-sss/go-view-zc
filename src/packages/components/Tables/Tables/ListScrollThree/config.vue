<template>
  <collapse-item name="滚动列表三" :expanded="true">
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
      <setting-item >
        <n-space>
          <n-switch v-model:value="optionData.showRankNum" size="small" />
          <n-text>显示排行数字</n-text>
        </n-space>
      </setting-item>

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
