<template>
  <div :width="w" :height="h" class="g-inner-title">
    <!-- 需要放置到config.vue中可以配置 -->
    <div class="g-inner-title-text">大连公司-捋顺厂区-环线01</div>
    <div class="g-inner-title-btn">切换</div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, toRefs } from 'vue'
import { CreateComponentType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true,
  },
})

const { w, h } = toRefs(props.chartConfig.attr)

</script>
<style lang="scss" scoped>
.g-inner-title {
  background-color: #1d4964;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 12px;
  .g-inner-title-text {
    font-size: 12px;
    color: #afb7be;
  }
  .g-inner-title-btn {
    width: 60px;
    height: 23px;
    line-height: 23px;
    text-align: center;
    color: #50a8b9;
    font-size: 12px;
    background-color: #1e5676;
    border: 1px solid #3e87a2;
    border-radius: 4px;
  }
}
</style>
