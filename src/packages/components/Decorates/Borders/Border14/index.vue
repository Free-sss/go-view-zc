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
  width: v-bind('w') + 'px';
  height: v-bind('h') + 'px';
  border-radius: 6px;
  background-image: -moz-linear-gradient(90deg, rgba(13, 50, 76, 0.87843) 0%, rgba(66, 119, 252, 0.10196) 100%);
  background-image: -webkit-linear-gradient(90deg, rgba(13, 50, 76, 0.87843) 0%, rgba(66, 119, 252, 0.10196) 100%);
  background-image: -ms-linear-gradient(90deg, rgba(13, 50, 76, 0.87843) 0%, rgba(66, 119, 252, 0.10196) 100%);
}
</style>
