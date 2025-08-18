<template>
  <n-modal
    v-model:show="props.showDialog"
    :title="props.titleProp"
    preset="card"
    :class="['custom-tab-modal']"
    @update:show="handleUpdateShow"
    :draggable="{ bounds: 'none' }"
    :style="{ width: '644px', height: '420px' }"
  >
    <div style="position: relative">
      <div class="enterBtn" @click="handleEnterBtnClick">进入</div>
      <div class="content_body">
        <div>
          <div class="info">
            <div class="sub-title">安全生产信息</div>
            <div class="info_body">
              <div style="margin-right: 36%">安全生产天数：{{ status.secDayNum }}</div>
              <div>上次事故时间：{{ status.lastAccidentTime }}</div>
            </div>
          </div>
          <div class="info">
            <div class="sub-title">智控信息汇总</div>
            <div class="info_body" style="justify-content: space-between">
              <div style="display: flex; align-items: center">
                <img src="./control.png" style="width: 72px; height: 66px" />
                <div style="display: flex; flex-direction: column">
                  <div
                    style="
                      background-image: linear-gradient(
                        to right,
                        rgb(54 123 201 / 0.1),
                        rgb(54 123 201 / 0.3),
                        rgb(54 123 201 / 0.1)
                      );
                    "
                  >
                    <div
                      style="
                        background: linear-gradient(to bottom, white, #acddff);
                        -webkit-background-clip: text;
                        background-clip: text;
                        color: transparent;
                      "
                    >
                      已智控风险
                    </div>
                  </div>
                  <div>
                    已智控：<span class="info-num">{{ status.controlNum }}</span>
                  </div>
                </div>
              </div>
              <div style="display: flex; align-items: center">
                <img src="./greatControl.png" style="width: 72px; height: 66px" />
                <div style="display: flex; flex-direction: column">
                  <div
                    style="
                      background-image: linear-gradient(
                        to right,
                        rgb(54 123 201 / 0.1),
                        rgb(54 123 201 / 0.3),
                        rgb(54 123 201 / 0.1)
                      );
                    "
                  >
                    <div
                      style="
                        background: linear-gradient(to bottom, white, #acddff);
                        -webkit-background-clip: text;
                        background-clip: text;
                        color: transparent;
                      "
                    >
                      重大风险
                    </div>
                  </div>
                  <div>
                    已智控：<span class="info-num">{{ status.greatControlNum }}</span>
                  </div>
                </div>
              </div>
              <div style="display: flex; align-items: center">
                <img src="./largerControl.png" style="width: 72px; height: 66px" />
                <div style="display: flex; flex-direction: column">
                  <div
                    style="
                      background-image: linear-gradient(
                        to right,
                        rgb(54 123 201 / 0.1),
                        rgb(54 123 201 / 0.3),
                        rgb(54 123 201 / 0.1)
                      );
                    "
                  >
                    <div
                      style="
                        background: linear-gradient(to bottom, white, #acddff);
                        -webkit-background-clip: text;
                        background-clip: text;
                        color: transparent;
                      "
                    >
                      较大风险
                    </div>
                  </div>
                  <div>
                    已智控：<span class="info-num">{{ status.bigControlNum }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="info">
            <div class="sub-title">警情概览</div>
            <div class="info_body" style="justify-content: space-between">
              <div style="width: 58%; justify-content: space-between; display: flex">
                <div style="display: flex; align-items: center">
                  <img src="./disposed3.png" style="width: 48px; height: 48px" />
                  <div style="display: flex; flex-direction: column">
                    <div>
                      <div style="">
                        {{ status.alarmTotal }}
                      </div>
                    </div>
                    <div>总数</div>
                  </div>
                </div>
                <div style="display: flex; align-items: center">
                  <img src="./disposed.png" style="width: 48px; height: 48px" />
                  <div style="display: flex; flex-direction: column">
                    <div>
                      <div style="">
                        {{ status.handled }}
                      </div>
                    </div>
                    <div>已处置</div>
                  </div>
                </div>
                <div style="display: flex; align-items: center">
                  <img src="./disposed2.png" style="width: 48px; height: 48px" />
                  <div style="display: flex; flex-direction: column">
                    <div>
                      <div style="">
                        {{ status.unhandled }}
                      </div>
                    </div>
                    <div>未处置</div>
                  </div>
                </div>
              </div>
              <div style="width: 36%; display: flex; flex-direction: column">
                <div style="display: flex; justify-content: flex-end">
                  <span style="margin-right: 8px">已处置数</span><span>未处置数</span>
                </div>
                <div class="alarm-handle-info alarm-handle-info-major">
                  <div class="alarm-handle-decoration-major"></div>
                  <div style="display: flex; align-items: center; padding-left: 12px">
                    <span>重大风险报警</span>
                    <span class="alarm-handle-num" style="margin-left: 3%">{{ status.majorAlarmHandleNum }}</span>
                    <span class="alarm-handle-divider"></span>
                    <span class="alarm-handle-num">{{ status.majorAlarmUnHandleNum }}</span>
                  </div>
                </div>
                <div class="alarm-handle-info alarm-handle-info-big">
                  <div class="alarm-handle-decoration-big"></div>
                  <div style="display: flex; align-items: center; padding-left: 12px">
                    <span>较大风险报警</span>
                    <span class="alarm-handle-num" style="margin-left: 3%">{{ status.bigAlarmHandleNum }}</span>
                    <span class="alarm-handle-divider"></span>
                    <span class="alarm-handle-num">{{ status.bigAlarmUnHandleNum }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </n-modal>
</template>
<script setup lang="ts">
import { onMounted, reactive, h, computed, watch } from 'vue'
import axiosInstance from '@/api/axios'

const props = defineProps({
  showDialog: {
    type: Boolean,
    require: true
  },
  titleProp: {
    type: String,
    require: true
  },
  orgId: {
    type: String,
    require: true
  }
})

const emit = defineEmits(['update:show'])

const handleUpdateShow = (newValue: any) => {
  emit('update:show', newValue) // 通知父组件更新
}

const handleEnterBtnClick = () => {
  //@ts-ignore
  window.open(window.htconfig.subUrl[props.orgId], '_blank')
}

const status = reactive({
  secDayNum: 0, //安全生产天数
  lastAccidentTime: '', //上次事故时间
  controlNum: 0, //已智控数
  greatControlNum: 0, //重大风险已智控数
  bigControlNum: 0, //较大风险已智控数
  alarmTotal: 0,
  handled: 0,
  unhandled: 0,
  majorAlarmHandleNum: 0,
  majorAlarmUnHandleNum: 0,
  bigAlarmHandleNum: 0,
  bigAlarmUnHandleNum: 0
})

const safetyDays = () => {
  axiosInstance({
    method: 'GET',
    //@ts-ignore
    url: `${window.htconfig.API_IP}awjt/base/awOrg/safetyDays?orgId=${props.orgId}`,
    
    responseType: 'json'
  }).then((res: any) => {
    //@ts-ignore
    status.secDayNum = res.value?.safeProductionDay
    status.lastAccidentTime = res.value?.productionDate
  })
}

const summary = () => {
  axiosInstance({
    method: 'GET',
    //@ts-ignore
    url: `${window.htconfig.API_IP}awjt/leaderboard/subSceneInfo/summary`,
    
    responseType: 'json'
  }).then((res: any) => {
    status.controlNum = res.value.total
    status.greatControlNum = res.value.impact
    status.bigControlNum = res.value.important
  })
}

const todayAlarmOverview = () => {
  axiosInstance({
    method: 'GET',
    //@ts-ignore
    url: `${window.htconfig.API_IP}awjt/leaderboard/alarm/todayAlarmOverview/${props.orgId}`,
    
    responseType: 'json'
  }).then((res: any) => {
    let data = res.value;
    status.alarmTotal = data.total
    status.handled = data.handled
    status.unhandled = data.unhandled
    status.majorAlarmHandleNum = data.major_handle
    status.majorAlarmUnHandleNum = data.major_unhandle
    status.bigAlarmHandleNum = data.big_handle
    status.bigAlarmUnHandleNum = data.big_unhandle
  })
}

watch(
  () => props.showDialog,
  (newData: any, oldData: any) => {
    if (newData) {
      safetyDays()
      summary()
      todayAlarmOverview()
    }
  }
)

onMounted(async () => {})
</script>
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
  padding-left: 12px;
}

.custom-tab-modal__tab .n-button {
  --normal-border: #115f8c;
  border-radius: 0;
  background: linear-gradient(to left, var(--normal-border), var(--normal-border)) left top no-repeat,
    linear-gradient(to bottom, var(--normal-border), var(--normal-border)) left top no-repeat,
    linear-gradient(to left, var(--normal-border), var(--normal-border)) right top no-repeat,
    linear-gradient(to bottom, var(--normal-border), var(--normal-border)) right top no-repeat,
    linear-gradient(to left, var(--normal-border), var(--normal-border)) left bottom no-repeat,
    linear-gradient(to bottom, var(--normal-border), var(--normal-border)) left bottom no-repeat,
    linear-gradient(to left, var(--normal-border), var(--normal-border)) right bottom no-repeat,
    linear-gradient(to left, var(--normal-border), var(--normal-border)) right bottom no-repeat;
  background-size: 0.1rem 0.5rem, 0.5rem 0.1rem, 0.1rem 0.5rem, 0.5rem 0.1rem;
  padding: 0;
}

.custom-tab-modal__tab .n-button:hover {
  --active-border: #00e4ff;
  font-weight: 700;
  background: linear-gradient(to left, var(--active-border), var(--active-border)) left top no-repeat,
    linear-gradient(to bottom, var(--active-border), var(--active-border)) left top no-repeat,
    linear-gradient(to left, var(--active-border), var(--active-border)) right top no-repeat,
    linear-gradient(to bottom, var(--active-border), var(--active-border)) right top no-repeat,
    linear-gradient(to left, var(--active-border), var(--active-border)) left bottom no-repeat,
    linear-gradient(to bottom, var(--active-border), var(--active-border)) left bottom no-repeat,
    linear-gradient(to left, var(--active-border), var(--active-border)) right bottom no-repeat,
    linear-gradient(to left, var(--active-border), var(--active-border)) right bottom no-repeat;
  background-size: 0.1rem 0.5rem, 0.5rem 0.1rem, 0.1rem 0.5rem, 0.5rem 0.1rem;
}

.custom-tab-modal__tab .active-button {
  --active-border: #00e4ff;
  font-weight: 700;
  background: linear-gradient(to left, var(--active-border), var(--active-border)) left top no-repeat,
    linear-gradient(to bottom, var(--active-border), var(--active-border)) left top no-repeat,
    linear-gradient(to left, var(--active-border), var(--active-border)) right top no-repeat,
    linear-gradient(to bottom, var(--active-border), var(--active-border)) right top no-repeat,
    linear-gradient(to left, var(--active-border), var(--active-border)) left bottom no-repeat,
    linear-gradient(to bottom, var(--active-border), var(--active-border)) left bottom no-repeat,
    linear-gradient(to left, var(--active-border), var(--active-border)) right bottom no-repeat,
    linear-gradient(to left, var(--active-border), var(--active-border)) right bottom no-repeat;
  background-size: 0.1rem 0.5rem, 0.5rem 0.1rem, 0.1rem 0.5rem, 0.5rem 0.1rem;
}

.custom-tab-modal__tab .button_content {
  width: 126px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  background-color: rgba(10, 166, 254, 0.3) !important;
}

.custom-tab-modal__tab .n-button:hover .button_content {
  background-color: rgba(0, 228, 255, 0.3) !important;
}

.custom-tab-modal__tab .active-button .button_content {
  background-color: rgba(0, 228, 255, 0.3) !important;
}

.custom-data-table .n-data-table-th,
.custom-data-table .n-data-table-thead,
.custom-data-table .n-data-table-table,
.custom-data-table .n-data-table-tr:not(.n-data-table-tr--summary):hover {
  background-color: rgba(60, 124, 211, 0.15) !important;
}

.custom-data-table tbody td:nth-child(odd),
.custom-data-table .n-data-table-td {
  background-color: rgba(60, 124, 211, 0.05) !important;
}

.custom-data-table .n-data-table-tr.n-data-table-tr--striped {
  background-color: rgba(60, 124, 211, 0.15) !important;
}

.custom-data-table .operation {
  color: rgb(0, 228, 255) !important;
}

.custom-data-table .n-data-table-th__title {
  color: #fff !important;
}
</style>
<style lang="scss" scoped>
.info {
  font-size: 0.875rem;
  width: fit-content;
  margin: 0 16px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info .sub-title {
  height: 31px;
  width: 580px;
  padding: 5px 0 0 30px;
  background: url(./second_level.png) 0 50%/100% 31px no-repeat;
}

.info .info_body {
  width: 97.5%;
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
}

.info img {
  margin-right: 4px;
}

.info .info-num {
  color: rgb(34 211 238);
  font-size: 0.875rem;
}

.enterBtn {
  color: rgb(62 200 244);
  text-decoration: underline;
  cursor: pointer;
  font-size: 1.25rem;
  position: absolute;
  left: 87%;
  top: -45px;
}

.alarm-handle-info {
  font-size: 0.75rem;
  .alarm-handle-num {
    font-weight: 700;
    width: 30%;
    display: flex;
    justify-content: center;
  }

  .alarm-handle-decoration-major {
    --tw-gradient-stops: var(--tw-gradient-from), #7e414e, var(--tw-gradient-to);
    --tw-gradient-from: #bb6a6c;
    --tw-gradient-to: rgb(24 28 57 / 0);
    height: 0.25rem;
    background-image: linear-gradient(to right, var(--tw-gradient-stops));
  }

  .alarm-handle-decoration-big {
    --tw-gradient-stops: var(--tw-gradient-from), rgb(246 191 71 / 0.6), var(--tw-gradient-to);
    --tw-gradient-from: #f6bf47;
    --tw-gradient-to: rgb(24 28 57 / 0);
    height: 0.25rem;
    background-image: linear-gradient(to right, var(--tw-gradient-stops));
  }

  .alarm-handle-divider {
    background-color: rgb(228 240 255 / 0.5);
    width: 1px;
    height: 0.75rem;
  }
}

.alarm-handle-info-major {
  --tw-gradient-stops: var(--tw-gradient-from), #461b32, var(--tw-gradient-to);
  --tw-gradient-to: rgb(24 28 57 / 0);
  --tw-gradient-from: #881a2c;
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.alarm-handle-info-big {
  --tw-gradient-to: rgb(24 28 57 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), rgb(228 156 0 / 0.6), var(--tw-gradient-to);
  --tw-gradient-from: #e49c00;
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
</style>
