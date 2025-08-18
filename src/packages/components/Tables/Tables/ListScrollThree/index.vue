<template>
  <div class="content_box">
    <vue3-seamless-scroll
      class="seamless"
      :list="option.dataset"
      :limitScrollNum="rowNum"
      :hover="true"
      :step="waitTime"
      :wheel="true"
      :isWatch="true"
    >
      <div v-for="(item, index) in option.dataset" class="detail flex_column" :key="index">
        <div class="flex_v cursor" :style="!showRankNum ? { paddingLeft: 0 } : { paddingLeft: '24px' }" @click="handleOpenDialog(item)">
          <div v-if="index === 0 && showRankNum" class="levelOneIcon flex_c">{{ index + 1 }}</div>
          <div v-else-if="index === 1 && showRankNum" class="levelTwoIcon flex_c">{{ index + 1 }}</div>
          <div v-else-if="showRankNum" class="levelOtherIcon flex_c">{{ index + 1 }}</div>
          <div class="item_content">
            <div class="item_header flex">
              <div class="item_level_text">{{ item.level }}</div>
              <div class="item_title_text">{{ item.title }}</div>
            </div>
            <div class="item_footer">
              <div class="item_dept">{{ item.dept }}</div>
              <div class="item_time">{{ item.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </vue3-seamless-scroll>
    <n-modal
      v-model:show="status.showDialog"
      :class="['custom-tab-modal']"
      title="报警详情"
      preset="card"
      @on-after-leave="handleCloseDialog"
      :draggable="{ bounds: 'none' }"
      :style="{ width: '800px', height: '516px' }"
    >
      <div v-if="isLoading" style="display: flex; width: 100%; justify-content: center; margin-top: 16px">
        <n-spin size="large" />
      </div>
      <n-grid v-else cols="24" x-gap="12" style="overflow-y: auto; padding-bottom: 12px">
        <!-- 左侧详情 -->
        <n-gi :span="14">
          <!-- 基础信息 -->
          <div class="detail-item">
            <label>报警时间：</label>
            <span>{{ convertTimestampToTime((status.selectedRow as any).alarmRecord.alarmTime) }}</span>
          </div>
          <div class="detail-item">
            <label>处置状态：</label>
            <span style="color: #ff9100">{{ (status.selectedRow as any).handleStatus  }}</span>
          </div>
          <div class="detail-item">
            <label>风险等级：</label>
            <span :style="{color: ''}">{{
              (status.selectedRow as any).alarmRecord.riskIdentName
            }}</span>
          </div>
          <div class="detail-item">
            <label>报警等级：</label>
            <span class="highlight" style="color: #ff5454">{{ (status.selectedRow as any).alarmRecord.alarmLevel }}</span>
          </div>
          <div class="detail-item">
            <label>风险描述：</label>
            <span class="highlight">{{ (status.selectedRow as any).alarmRecord.alarmDesc  }}</span>
          </div>
          <div class="detail-item">
            <label>报警区域：</label>
            <span>{{ (status.selectedRow as any).pathName.substring(1, (status.selectedRow as any).pathName.length).replaceAll('/', '-') }}</span>
          </div>
          <div
            class="detail-item"
            style="display: flex; flex-direction: column"
            v-if="(status.selectedRow as any).camerainfos.length > 1"
          >
            <label>警情关联设备：</label>
            <div class="screenshot-placeholder">
              <n-tabs type="line" animated>
                <n-tab-pane
                  v-for="(item, index) in (status.selectedRow as any).camerainfos"
                  :name="item.deviceCode"
                  :tab="item.deviceName"
                  :on-update:value="handleChangeDevice"
                >
                  <!-- <div style="display: flex">
                    <img :src="item.originImg" style="width: 180px; margin-right: 16px" />
                    <img :src="item.resultImg" style="width: 180px" />
                  </div> -->
                </n-tab-pane>
              </n-tabs>
              <br />
            </div>
          </div>
          <div
            class="detail-item"
            style="display: flex; flex-direction: column"
          >
            <label>报警截图：</label>
            <div style="display: flex">
              <img :src="(status.selectedRow as any).alarmRecord.originImg" style="width: 180px; margin-right: 16px" />
              <img :src="(status.selectedRow as any).alarmRecord.alarmImg" style="width: 180px" />
            </div>
          </div>
          <div
            class="detail-item"
            style="display: flex; flex-direction: column"
          >
            <label>警情录像回放：</label>
            <div class="screenshot-placeholder playback-placeholder" style="width: 350px; height: 200px">
              <play-back
                :device-id="(status.selectedRow as any)?.cameraId"
                :start="new Date((status.selectedRow as any)?.startTime)"
                :end="new Date((status.selectedRow as any)?.endTime)"
              ></play-back>
            </div>
          </div>
          <div
            class="detail-item"
            style="display: flex; flex-direction: column"
          >
            <label>视频实时画面：</label>
            <div class="screenshot-placeholder playback-placeholder" style="width: 350px; height: 200px">
              <play-live :device-id="(status.selectedRow as any).cameraId"></play-live>
            </div>
          </div>
        </n-gi>
        <n-gi :span="10" style="height: 100%; display: flex; align-items: center">
          <n-timeline size="medium">
            <n-timeline-item
              class="timeLineClass"
              v-for="(item, index) in (status.selectedRow as any)?.taskLogs"
              :key="index"
              type="info"
              :title="item.task_name"
              :content="item.task_detail"
              :time="item.task_begin"
            />
          </n-timeline>
        </n-gi>
      </n-grid>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck

import { PropType, toRefs, shallowReactive, watch, ref, reactive } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as configOption } from './config'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
import PlayBack from '@/components/Pages/yushiVideo/playback.vue'
import PlayLive from '@/components/Pages/yushiVideo/playLive.vue'
import axiosInstance from '@/api/axios'
import VChart from 'vue-echarts'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})
const isLoading = ref(false)
const pointChartOption = ref(null)
const status = reactive({
  showDialog: false,
  selectedRow: null
})
const { rowNum, waitTime, showRankNum } = toRefs(props.chartConfig.option)
const { w, h } = toRefs(props.chartConfig.attr)

const option = shallowReactive({
  dataset: configOption.dataset
})

const handleChangeDevice = (value: string | number) => {
  status.selectedRow.cameraId = value
  // if (status.selectedRow.alarmGroup.find(item => item.cameraId === value)) {
  //   status.selectedRow.startTime = status.alarmGroup.find(item => item.cameraId === value).startTime
  //   status.selectedRow.endTime = status.alarmGroup.find(item => item.cameraId === value).endTime
  // }
}

const handleOpenDialog = async (row: any) => {
  const alarmUUID = row.alarmUUID

  status.showDialog = true
  isLoading.value = true
  //@ts-ignore
  axiosInstance({
    method: 'GET',
    url: `${window.htconfig.API_IP}aw/bigScreen/qisuo/alarmRecordDetail/${alarmUUID}`,

    responseType: 'json'
  }).then((res: any) => {
    //@ts-ignore
    isLoading.value = false
    const result = res.value
    if (result) {
      //@ts-ignore
      status.selectedRow = {
        ...result,
        cameraId: result.camerainfos[0]?.deviceCode,
        startTime: result.alarmRecord.alarmTime - 15 * 1000,
        endTime: result.alarmRecord.alarmTime + 15 * 1000
      }

      // if (status.selectedRow.alarmCategory == 1) {
      //   axiosInstance({
      //     method: 'GET',
      //     url: `${window.htconfig.API_IP}awjt/leaderboard/alarm/deviceRecord/${alarmUUID}`,

      //     responseType: 'json'
      //   }).then(res => {
      //     let pointId = res.value.poindId
      //     let timeList = res.value.timeList
      //     let pointList = res.value.pointList

      //     pointChartOption.value = {
      //       xAxis: {
      //         type: 'category',
      //         boundaryGap: false,
      //         axisTick: {
      //           show: false
      //         },
      //         splitLine: {
      //           show: false
      //         },
      //         axisLine: {
      //           lineStyle: {
      //             color: '#267093'
      //           }
      //         },
      //         axisLabel: {
      //           color: '#fff'
      //         },
      //         data: timeList
      //       },
      //       yAxis: {
      //         axisLine: {
      //           show: false
      //           // onZero: true
      //         },
      //         axisTick: {
      //           show: false
      //         },
      //         axisLabel: {
      //           show: false
      //         },
      //         splitLine: {
      //           show: false
      //         },
      //         type: 'value'
      //       },
      //       grid: {
      //         show: false,
      //         left: '10%',
      //         top: '40',
      //         right: '5%',
      //         bottom: '50'
      //       },
      //       tooltip: {
      //         show: true,
      //         trigger: 'axis',
      //         axisPointer: {
      //           show: true
      //           // type: 'shadow'
      //         }
      //       },
      //       dataZoom: [
      //         {
      //           show: true,
      //           height: 10,
      //           zoomLock: true,
      //           showDetail: false,
      //           start: 0,
      //           end: 25,
      //           bottom: 15
      //         }
      //       ],
      //       series: [
      //         {
      //           name: pointId,
      //           symbol: 'rect',
      //           symbolSize: [40, 18],
      //           // symbolOffset: ['100px', 0],
      //           data: pointList,
      //           type: 'line',
      //           label: {
      //             show: true,
      //             color: '#fff',
      //             position: 'inside'
      //           },
      //           itemStyle: {
      //             color: '#43CAA6',
      //             borderColor: '#7A94A9',
      //             borderWidth: 1
      //           },
      //           areaStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: '#2C7785' // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: '#356080' // 100% 处的颜色
      //                 }
      //               ],
      //               global: false // 缺省为 false
      //             }
      //           }
      //         }
      //       ]
      //     }
      //   })
      // }
    }
  })

  //@ts-ignore
}

// 手动更新
watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    option.dataset = newData
  },
  {
    immediate: true,
    deep: false
  }
)

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  option.dataset = newData
})

const convertTimestampToTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

const convertTimestampToDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const handleCloseDialog = () => {
  status.showDialog = false;
  status.selectedRow = null;
}
</script>

<style lang="scss" scoped>
.content_box {
  width: v-bind('w') + 'px';
  height: v-bind('h') + 'px';
  overflow: hidden;
}

.seamless {
  padding: 0 30px 14px 30px;
}
.detail {
  color: #fff;
  position: relative;
  font-size: 12px;
  width: 100%;
}
.flex_column {
  display: flex;
  flex-direction: column;
}

.flex {
  display: flex;
}

.flex_wrap {
  display: flex;
  flex-wrap: wrap;
}

.flex_v {
  display: flex;
  align-items: center;
}
.item_level_text {
  width: 46px;
  height: 18px;
  border-radius: 9px;
  background: #b10000;
  font-size: 14px;
  text-align: center;
  line-height: 18px;
  margin-right: 20px;
}
.item_title_text {
  color: #b10000;
  font-size: 18px;
}

.flex_c {
  display: flex;
  justify-content: center;
  align-items: center;
}

.levelOneIcon {
  width: 18px;
  height: 18px;
  background: url(/src/assets/images/chart/tables/list_scroll_1_icon.png) 50% 50% / contain no-repeat;
}

.levelTwoIcon {
  width: 18px;
  height: 18px;
  background: url(/src/assets/images/chart/tables/list_scroll_2_icon.png) 50% 50% / contain no-repeat;
}

.levelOtherIcon {
  width: 18px;
  height: 18px;
  background: url(/src/assets/images/chart/tables/list_scroll_3_icon.png) 50% 50% / contain no-repeat;
}
.item_content {
  width: 100%;
}
.item_header {
  margin-left: 20px;
  flex: 1;
  max-width: 350px;
  height: 32px;
  align-items: center;
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}
.item_footer {
  margin-left: 20px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.item_time {
  margin-right: 20px;
  font-size: 18px;
  color: #fff;
}
.item_dept {
  color: #fff;
  font-size: 12px;
}

.detail-item {
  padding: 8px 0;
  display: flex;
}

.cursor {
  cursor: pointer;
}

.detail-item label {
  min-width: 90px;
  color: rgb(145 187 242);
}

.detail-item span {
  font-weight: bold;
}

.info {
  font-size: 1.25rem;
  font-weight: 700;
  width: fit-content;
  margin: 0 16px 0 0;
  display: flex;
  align-items: center;
}

.info .sub-title {
  padding: 0 0 0 24px;
  background: url(./second_level.png) 0 50%/425px 31px no-repeat;
  margin-right: 8px;
}

.info .info-num {
  color: rgb(34 211 238);
  font-size: 1.875rem;
}

.info .info-body {
  padding-bottom: 6px;
}
</style>
<style lang="scss">
.custom-tab-modal > .n-card-header {
  background-color: rgba(26, 56, 113, 1) !important;
  background-image: linear-gradient(to right, rgba(8, 100, 177, 0.7), transparent) !important;
  padding: 16px !important;
  border: 2px solid rgba(62, 200, 244, 1);
  border-bottom-width: 0px !important;
}

.custom-tab-modal > .n-card__content {
  background-color: rgba(26, 56, 113, 1) !important;
  border: 2px solid rgba(62, 200, 244, 1);
  padding-right: 0;
  padding-bottom: 0;
}

::-webkit-scrollbar-thumb {
  background-color: #2461db;
  border-radius: 6px;
}

.custom-tab-modal .timeLineClass > div:last-child {
  padding-left: 8px;
  background: url(./text_bg.png) 0 50%/100% 100% no-repeat;
}
</style>
