<template>
  <div class="go-decorates-number" :style="`width:${w}px;height:${h}px;`">
    <!-- 时间显示 -->
    <div
      :style="`
        color:${timeColor};
        font-size:${timeSize}px;
        line-height:${timeLineHeight}px;
        letter-spacing:${timeTextIndent}px;
        font-weight:${fontWeight};
        text-shadow: ${boxShadow}
      `"
    >
      {{ nowData }}
    </div>
    <!-- 日期 + 星期显示 -->
    <div
    v-if="showDate"
      :style="`
        color:${timeColor};
        font-size:${timeSize - 2}px;
        line-height:${timeLineHeight}px;
        letter-spacing:${timeTextIndent}px;
        font-weight:${fontWeight};
        text-shadow: ${boxShadow}
      `"
    >
      {{ yearMonthDay }} {{ weekDay }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, ref, watch, onMounted, onUnmounted } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartDataFetch } from '@/hooks'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

// 数据绑定
const { w, h } = toRefs(props.chartConfig.attr)
const { timeColor, timeSize, timeLineHeight, timeTextIndent, fontWeight,showDate, showShadow, hShadow, vShadow, blurShadow, colorShadow } = toRefs(props.chartConfig.option)

// 显示内容
const yearMonthDay = ref('')
const nowData = ref('')
const weekDay = ref('')
const boxShadow = ref('none')
let timer: any = null

// 监听 option 变化，更新阴影样式
watch(
  () => props.chartConfig.option,
  (newVal) => {
    if (newVal.showShadow) {
      boxShadow.value = `${newVal.hShadow}px ${newVal.vShadow}px ${newVal.blurShadow}px ${newVal.colorShadow}`
    } else {
      boxShadow.value = 'none'
    }
  },
  {
    immediate: true
  }
)

// 更新时间函数
function updateTime() {
  const datetime = new Date()
  const year = datetime.getFullYear()
  const month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
  const date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()

  const hh = datetime.getHours().toString().padStart(2, '0')
  const mm = datetime.getMinutes().toString().padStart(2, '0')
  const ss = datetime.getSeconds().toString().padStart(2, '0')

  nowData.value = `${hh}:${mm}:${ss}`
  yearMonthDay.value = `${year}-${month}-${date}`

  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  weekDay.value = weekdays[datetime.getDay()]
}

// 定时器
onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 500)
})
onUnmounted(() => {
  clearInterval(timer)
})

useChartDataFetch(props.chartConfig, useChartEditStore)
</script>

<style lang="scss" scoped>
@include go('decorates-number') {
  text-align: center;
  div {
    margin: 4px 0;
  }
}
</style>