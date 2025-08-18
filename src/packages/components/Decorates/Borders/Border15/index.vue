<template>
  <div class="go-border-box"></div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { colors, backgroundColor } = toRefs(props.chartConfig.option)
</script>

<style lang="scss" scoped>
@include go('border-box') {
  width: 392px;
  height: 130px;
  background: url(/src/assets/images/chart/decorates/card_info_bg.png) 50% 50%/392px 130px no-repeat;
}
</style>
