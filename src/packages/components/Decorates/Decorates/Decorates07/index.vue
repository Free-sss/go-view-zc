<template>
  <div class="go-border-07" :style="`width: ${w}px; height: ${h}px`">
    <span></span>
  </div>
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
const { colors, dataset } = toRefs(props.chartConfig.option)
</script>

<style lang="scss" scoped>
@include go('border-07') {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    text-align: center;
    display: block;
    width: 5px;
    height: 30px;
    background-color: v-bind('colors[0]');
  }
}
</style>
