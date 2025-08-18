<template>
  <collapse-item name="点位" :expanded="true">
    <setting-item-box v-for="(item, index) in optionData.dataset" :key="index" :name="'点位' + index" :alone="true">
      <setting-item name="X">
        <n-input v-model:value="(item as any).x" size="small"></n-input>
      </setting-item>
      <setting-item name="Y">
        <n-input v-model:value="(item as any).y" size="small"></n-input>
      </setting-item>
      <setting-item name="图片源">
        <n-input v-model:value="(item as any).imgSrc" size="small"></n-input>
      </setting-item>
      <setting-item name="摄像头编码" v-if="(item as any).cameraCode">
        <n-input v-model:value="(item as any).cameraCode" size="small"></n-input>
      </setting-item>
      <setting-item name="摄像头名称" v-if="(item as any).cameraName">
        <n-input v-model:value="(item as any).cameraName" size="small"></n-input>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { option } from "./config";
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from "@/components/Pages/ChartItemSetting";

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
});
</script>
