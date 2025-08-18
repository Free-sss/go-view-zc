<template>
  <div class="dv-scroll-board">
    <div
      class="header"
      v-if="status.header.length && status.mergedConfig"
      :style="`background-color: ${status.mergedConfig.headerBGC};`"
    >
      <div
        class="header-item"
        v-for="(headerItem, i) in status.header"
        :key="`${headerItem}${i}`"
        :style="`
        height: ${status.mergedConfig.headerHeight}px;
        line-height: ${status.mergedConfig.headerHeight}px;
        width: ${status.widths[i]}px;
      `"
        :align="status.aligns[i]"
        v-html="headerItem"
      ></div>
    </div>

    <div
      v-if="status.mergedConfig"
      class="rows"
      :style="`height: ${h - (status.header.length ? status.mergedConfig.headerHeight : 0)}px;`"
    >
      <div
        class="row-item"
        v-for="(row, ri) in status.rows"
        :key="`${row.toString()}${row.scroll}`"
        @click="handleOpenDialog(row.ceils)"
        :style="`
        height: ${status.heights[ri]}px;
        line-height: ${status.heights[ri]}px;
        background-color: ${status.mergedConfig[row.rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC']};
      `"
      >
        <div
          class="ceil"
          v-for="(ceil, ci) in row.ceils.slice(0, 4)"
          :key="`${ceil}${ri}${ci}`"
          :style="`width: ${status.widths[ci]}px;color: ${(ceil as any)?.split('/').length > 1 ? (ceil as any)?.split('/')[1] : '#fff'}`"
          :align="status.aligns[ci]"
          v-html="(ceil as any).split('/')[0]"
        ></div>
      </div>
    </div>
    <n-modal
      v-model:show="status.showDialog"
      :class="['custom-tab-modal']"
      title="报警详情"
      preset="card"
      @on-after-leave="handleCloseDialog"
      :draggable="{ bounds: 'none' }"
      :style="{ width: '800px', height: '916px' }"
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
            <span>{{ (status.selectedRow as any)?.alarmTime }}</span>
          </div>
          <div class="detail-item">
            <label>处置状态：</label>
            <span style="color: #ff9100">未处置</span>
          </div>
          <div class="detail-item">
            <label>风险等级：</label>
            <span :style="{color: (status.selectedRow as any)?.riskLevel?.split('/')[1]}">{{
              (status.selectedRow as any)?.riskLevel?.split('/')[0]
            }}</span>
          </div>
          <div class="detail-item">
            <label>报警等级：</label>
            <span class="highlight" style="color: #ff5454">{{ (status.selectedRow as any)?.alarmLevel }}</span>
          </div>
          <div class="detail-item">
            <label>风险描述：</label>
            <span class="highlight">{{ (status.selectedRow as any)?.riskSourceName }}</span>
          </div>
          <div class="detail-item">
            <label>报警区域：</label>
            <span>{{ (status.selectedRow as any)?.alarmRegion }}</span>
          </div>
          <div
            class="detail-item"
            v-if="(status.selectedRow as any)?.alarmCategory === 1"
            style="display: flex; flex-direction: column"
          >
            <label>关联点位采集走势(最近10条)：</label>
            <div class="point_trend_chart" style="width: 350px; height: 200px" id="point_trend_chart">
              <v-chart ref="vChartRef" :option="pointChartOption" autoresize></v-chart>
            </div>
          </div>
          <div class="detail-item" v-if="(status.selectedRow as any)?.alarmCategory === 2">
            <label>工位区域负责人：</label>
            <span>{{ (status.selectedRow as any)?.groupPersonName || '' }}</span>
          </div>
          <div class="detail-item" v-if="(status.selectedRow as any)?.alarmCategory === 2">
            <label>联系方式：</label>
            <span>{{ (status.selectedRow as any)?.groupPersonPhone || '' }}</span>
          </div>
          <div class="detail-item" v-if="(status.selectedRow as any)?.alarmCategory === 2">
            <label>产线区域负责人：</label>
            <span>{{ (status.selectedRow as any)?.linePersonName || '' }}</span>
          </div>
          <div class="detail-item" v-if="(status.selectedRow as any)?.alarmCategory === 2">
            <label>联系方式：</label>
            <span>{{ (status.selectedRow as any)?.linePersonPhone || '' }}</span>
          </div>
          <div class="detail-item" v-if="(status.selectedRow as any)?.alarmCategory === 2">
            <label>厂房区域负责人：</label>
            <span>{{ (status.selectedRow as any)?.divisionPersonName || '' }}</span>
          </div>
          <div class="detail-item" v-if="(status.selectedRow as any)?.alarmCategory === 2">
            <label>联系方式：</label>
            <span>{{ (status.selectedRow as any)?.divisionPersonPhone || '' }}</span>
          </div>
          <div class="detail-item" v-if="(status.selectedRow as any)?.alarmCategory === 3">
            <label>警情关联设备：</label>
            <span>{{ (status.selectedRow as any)?.deviceName || '' }}</span>
          </div>
          <div
            class="detail-item"
            style="display: flex; flex-direction: column"
            v-if="(status.selectedRow as any)?.alarmCategory === 4"
          >
            <label>警情关联设备：</label>
            <div class="screenshot-placeholder">
              <n-tabs type="line" animated>
                <n-tab-pane
                  v-for="(item, index) in (status.selectedRow as any)?.alarmGroup"
                  :name="item.cameraId"
                  :tab="item.cameraName"
                  :on-update:value="handleChangeDevice"
                >
                  <div style="display: flex">
                    <img :src="item.originImg" style="width: 180px; margin-right: 16px" />
                    <img :src="item.resultImg" style="width: 180px" />
                  </div>
                </n-tab-pane>
              </n-tabs>
              <br />
            </div>
          </div>
          <div
            class="detail-item"
            style="display: flex; flex-direction: column"
            v-if="(status.selectedRow as any)?.alarmCategory === 2"
          >
            <label>报警截图：</label>
            <div style="display: flex">
              <img :src="(status.selectedRow as any)?.originImg" style="width: 180px; margin-right: 16px" />
              <img :src="(status.selectedRow as any)?.resultImg" style="width: 180px" />
            </div>
          </div>
          <div
            class="detail-item"
            style="display: flex; flex-direction: column"
            v-if="(status.selectedRow as any)?.alarmCategory === 2 || (status.selectedRow as any)?.alarmCategory === 4"
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
            v-if="(status.selectedRow as any)?.alarmCategory === 2 || (status.selectedRow as any)?.alarmCategory === 4"
          >
            <label>视频实时画面：</label>
            <div class="screenshot-placeholder playback-placeholder" style="width: 350px; height: 200px">
              <play-live :device-id="(status.selectedRow as any)?.cameraId"></play-live>
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
//@ts-nocheck
import { http } from '@/api/http'
import { RequestHttpEnum } from '@/enums/httpEnum'
import { PropType, onUnmounted, reactive, toRefs, watch, onMounted, nextTick, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import PlayBack from '@/components/Pages/yushiVideo/playback.vue'
import PlayLive from '@/components/Pages/yushiVideo/playLive.vue'
import axiosInstance from '@/api/axios'
import VChart from 'vue-echarts'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

// 这里能拿到图表宽高等
const { w, h } = toRefs(props.chartConfig.attr)
// 这里能拿到上面 config.ts 里的 option 数据
// const { rowNum, headerHeight, index, backgroundColor } = toRefs(props.chartConfig.option)
const isLoading = ref(false)
const pointChartOption = ref(null)
const status = reactive({
  defaultConfig: {
    /**
     * @description Board header
     * @type {Array<String>}
     * @default header = []
     * @example header = ['column1', 'column2', 'column3']
     */
    header: [],
    /**
     * @description Board dataset
     * @type {Array<Array>}
     * @default dataset = []
     */
    dataset: [],
    /**
     * @description Row num
     * @type {Number}
     * @default rowNum = 5
     */
    rowNum: 5,
    /**
     * @description Header background color
     * @type {String}
     * @default headerBGC = '#00BAFF'
     */
    headerBGC: '#00BAFF',
    /**
     * @description Odd row background color
     * @type {String}
     * @default oddRowBGC = '#003B51'
     */
    oddRowBGC: '#003B51',
    /**
     * @description Even row background color
     * @type {String}
     * @default evenRowBGC = '#003B51'
     */
    evenRowBGC: '#0A2732',
    /**
     * @description Scroll wait time
     * @type {Number}
     * @default waitTime = 2
     */
    waitTime: 2,
    /**
     * @description Header height
     * @type {Number}
     * @default headerHeight = 35
     */
    headerHeight: 35,
    /**
     * @description Column width
     * @type {Array<Number>}
     * @default columnWidth = []
     */
    columnWidth: [],
    /**
     * @description Column align
     * @type {Array<String>}
     * @default align = []
     * @example align = ['left', 'center', 'right']
     */
    align: [],
    /**
     * @description Show index
     * @type {Boolean}
     * @default index = false
     */
    index: false,
    /**
     * @description index Header
     * @type {String}
     * @default indexHeader = '#'
     */
    indexHeader: '#',
    /**
     * @description Carousel type
     * @type {String}
     * @default carousel = 'single'
     * @example carousel = 'single' | 'page'
     */
    carousel: 'single',
    /**
     * @description Pause scroll when mouse hovered
     * @type {Boolean}
     * @default hoverPause = true
     * @example hoverPause = true | false
     */
    hoverPause: true,
    selectedRow: null
  },
  mergedConfig: props.chartConfig.option,
  header: [],
  rowsData: [],
  rows: [
    {
      ceils: [],
      rowIndex: 0,
      scroll: 0
    }
  ],
  widths: [],
  heights: [0],
  avgHeight: 0,
  aligns: [],
  animationIndex: 0,
  animationHandler: 0,
  updater: 0,
  needCalc: false,
  showDialog: false,
  showDialog2: false,
  selectedRow: null,
  selectedOrg: '',
  showTab: '1',
  todayHandleNum: 0,
  todayAlarmTableData: [],
  todayAlarmTablecurrentPage: 1,
  todayAlarmPageSize: 10,
  searchOrg: '',
  searchOrgOptions: [],
  searchRiskLevel: '',
  riskLevelOptions: [
    {
      value: '重大风险',
      label: '重大风险'
    },
    {
      value: '较大风险',
      label: '较大风险'
    },
    {
      value: '一般风险',
      label: '一般风险'
    },
    {
      value: '低风险',
      label: '低风险'
    }
  ],
  searchControlMethod: '',
  controlMethodOptions: [],
  tabOneTableData: [],
  tabOneTableCurrentPage: 1,
  tabOneTablePageSize: 10,
  tabOneColumns: [
    {
      title: '序号',
      key: 'index',
      render(row: any, index: any) {
        return index + 1
      }
    },
    {
      title: '区域',
      key: 'area'
    },
    {
      title: '风险区域',
      key: 'riskArea'
    },
    {
      title: '危险源',
      key: 'dangerSource'
    },
    {
      title: '环节/部位',
      key: 'linkPosition'
    },
    {
      title: '安全风险(直白描述)',
      key: 'riskDescription'
    }
  ]
})

const calcData = () => {
  mergeConfig()
  calcHeaderData()
  calcRowsData()
  calcWidths()
  calcHeights()
  calcAligns()
  animation(true)
}

onMounted(() => {
  calcData()
})

const handleChangeDevice = (value: string | number) => {
  status.selectedRow.cameraId = value
  if (status.selectedRow.alarmGroup.find(item => item.cameraId === value)) {
    status.selectedRow.startTime = status.alarmGroup.find(item => item.cameraId === value).startTime
    status.selectedRow.endTime = status.alarmGroup.find(item => item.cameraId === value).endTime
  }
}

const mergeConfig = () => {
  status.mergedConfig = merge(cloneDeep(status.defaultConfig), props.chartConfig.option)
}

const handleCloseDialog = () => {
  status.showDialog = false;
  status.selectedRow = null;
}

const calcHeaderData = () => {
  let { header, index, indexHeader } = status.mergedConfig
  if (!header.length) {
    status.header = []
    return
  }
  header = [...header]
  if (index) header.unshift(indexHeader)
  status.header = header
}

const calcRowsData = () => {
  let { dataset, index, headerBGC, rowNum } = status.mergedConfig
  if (index) {
    dataset = dataset.map((row: any, i: number) => {
      row = [...row]
      const indexTag = `<span class="index" style="background-color: ${headerBGC};border-radius: 3px;padding: 0px 3px;">${
        i + 1
      }</span>`
      row.unshift(indexTag)
      return row
    })
  }
  dataset = dataset.map((ceils: any, i: number) => ({ ceils, rowIndex: i }))
  const rowLength = dataset.length
  if (rowLength > rowNum && rowLength < 2 * rowNum) {
    dataset = [...dataset, ...dataset]
  }
  dataset = dataset.map((d: any, i: number) => ({ ...d, scroll: i }))

  status.rowsData = dataset
  status.rows = dataset
}

const calcWidths = () => {
  const { mergedConfig, rowsData } = status
  const { columnWidth, header } = mergedConfig
  const usedWidth = columnWidth.reduce((all: any, ws: number) => all + ws, 0)
  let columnNum = 0
  if (rowsData[0]) {
    columnNum = (rowsData[0] as any).ceils.length
  } else if (header.length) {
    columnNum = header.length
  }
  const avgWidth = (w.value - usedWidth) / (columnNum - columnWidth.length)
  const widths = new Array(columnNum).fill(avgWidth)
  status.widths = merge(widths, columnWidth)
}

const calcHeights = (onresize = false) => {
  const { mergedConfig, header } = status
  const { headerHeight, rowNum, dataset } = mergedConfig
  let allHeight = h.value
  if (header.length) allHeight -= headerHeight
  const avgHeight = allHeight / rowNum
  status.avgHeight = avgHeight
  if (!onresize) status.heights = new Array(dataset.length).fill(avgHeight)
}

const calcAligns = () => {
  const { header, mergedConfig } = status

  const columnNum = header.length

  let aligns = new Array(columnNum).fill('left')

  const { align } = mergedConfig

  status.aligns = merge(aligns, align)
}

const animation = async (start = false) => {
  const { needCalc } = status

  if (needCalc) {
    calcRowsData()
    calcHeights()
    status.needCalc = false
  }
  let { avgHeight, animationIndex, mergedConfig, rowsData, updater } = status
  const { waitTime, carousel, rowNum } = mergedConfig

  const rowLength = rowsData.length
  if (rowNum >= rowLength) return
  if (start) {
    await new Promise(resolve => setTimeout(resolve, waitTime * 1000))
    if (updater !== status.updater) return
  }
  const animationNum = carousel === 'single' ? 1 : rowNum
  let rows = rowsData.slice(animationIndex)
  rows.push(...rowsData.slice(0, animationIndex))
  status.rows = rows.slice(0, carousel === 'page' ? rowNum * 2 : rowNum + 1)
  status.heights = new Array(rowLength).fill(avgHeight)
  await new Promise(resolve => setTimeout(resolve, 300))
  if (updater !== status.updater) return
  status.heights.splice(0, animationNum, ...new Array(animationNum).fill(0))
  animationIndex += animationNum
  const back = animationIndex - rowLength
  if (back >= 0) animationIndex = back
  status.animationIndex = animationIndex
  status.animationHandler = setTimeout(animation, waitTime * 1000 - 300) as any
}

const stopAnimation = () => {
  status.updater = (status.updater + 1) % 999999
  if (!status.animationHandler) return
  clearTimeout(status.animationHandler)
}

const onRestart = async () => {
  try {
    if (!status.mergedConfig) return
    stopAnimation()
    calcData()
  } catch (error) {
    console.log(error)
  }
}

watch(
  () => w.value,
  () => {
    onRestart()
  }
)

watch(
  () => h.value,
  () => {
    onRestart()
  }
)

// 数据更新
watch(
  () => props.chartConfig.option,
  () => {
    onRestart()
  },
  { deep: true }
)

// 数据更新 (默认更新 dataset，若更新之后有其它操作，可添加回调函数)
useChartDataFetch(props.chartConfig, useChartEditStore, (resData: any[]) => {
  props.chartConfig.option.dataset = resData
  onRestart()
})

onUnmounted(() => {
  stopAnimation()
})

const handleOpenDialog = async (row: any) => {
  const alarmUUID = row[4]

  status.showDialog = true
  isLoading.value = true
  //@ts-ignore
  axiosInstance({
    method: 'GET',
    url: `${window.htconfig.API_IP}awjt/leaderboard/alarm/detail/${alarmUUID}`,

    responseType: 'json'
  }).then(res => {
    //@ts-ignore
    isLoading.value = false
    const result = res.value
    const ALARM_LEVEL_ENUM = {
      1: '一级报警',
      2: '二级报警',
      3: '三级报警',
      4: '四级报警'
    }
    if (result) {
      //@ts-ignore
      status.selectedRow = {
        ...result,
        alarmGroup: result.alarmGroup.map(item => {
          return {
            ...item,
            resultImg: window?.htconfig.imgUrl + result.resultImg,
            originImg: window?.htconfig.imgUrl + result.result.originImg
          }
        }),
        riskLevel: row[0],
        resultImg: window?.htconfig.imgUrl + result.resultImg,
        originImg: window?.htconfig.imgUrl + result.originImg,
        alarmLevel: ALARM_LEVEL_ENUM[result.alarmLevel]
      }

      // if (status.selectedRow.alarmCategory == 1) {
      axiosInstance({
        method: 'GET',
        url: `${window.htconfig.API_IP}awjt/leaderboard/alarm/deviceRecord/${alarmUUID}`,

        responseType: 'json'
      }).then(res => {
        let pointId = res.value.poindId
        let timeList = res.value.timeList
        let pointList = res.value.pointList

        pointChartOption.value = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLine:{
        lineStyle: {
          color: '#267093'
        }
      },
      axisLabel: {
        color: '#fff'
      },
      data: timeList
    },
    yAxis: {
      axisLine: {
        show: false,
        // onZero: true
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      },
      type: 'value'
    },
    grid: {
      show: false,
      left: '10%',
      top: '40',
      right: '5%',
      bottom: '50'
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        show: true,
        // type: 'shadow'
      }
    },
    dataZoom: [
      {
        show: true,
        height: 10,
        zoomLock: true,
        showDetail: false,
        start: 0,
        end: 25,
        bottom: 15
      }
    ],
    series: [
      {
        name: pointId,
        symbol: 'rect',
        symbolSize: [40, 18],
        // symbolOffset: ['100px', 0],
        data: pointList,
        type: 'line',
        label: {
          show: true,
          color: '#fff',
          position: 'inside'
        },
        itemStyle: {
          color: '#43CAA6',
          borderColor: '#7A94A9',
          borderWidth: 1
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#2C7785' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#356080' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  }
      })
    }
    // }
  })

  //@ts-ignore
}
</script>

<style lang="scss" scoped>
.dv-scroll-board {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;

  .text {
    padding: 0 10px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header {
    display: flex;
    flex-direction: row;
    font-size: 15px;

    .header-item {
      transition: all 0.3s;
    }
  }

  .rows {
    overflow: hidden;

    .row-item {
      display: flex;
      font-size: 14px;
      transition: all 0.3s;
      overflow: hidden;
    }
  }
}

.detail-item {
  padding: 8px 0;
  display: flex;
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
