<template>
  <collapse-item name="配置" :expanded="true">
    <setting-item>
        <n-checkbox v-model:checked="optionData.showDialog" size="small">显示弹窗</n-checkbox>
      </setting-item>
  </collapse-item>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
