<template>
  <collapse-item name="配置" :expanded="true">
    <setting-item-box name="提示词" :alone="true">
      <n-input  v-model:value="optionData.placeholder"  placeholder="请选择"/>
    </setting-item-box>
    <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.showPrev" size="small" />
          <n-text>展示返回上级按钮</n-text>
        </n-space>
      </setting-item>
  </collapse-item>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
