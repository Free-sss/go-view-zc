<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div :class="option.isOldStyle ? 'video_title' : 'video_title video_title_new'" v-if="option.showBtn">
      <div class="title_text" v-if="option.showTree && option.showBtn">{{ option.videoTitle }}</div>
      <n-select
        v-if="!option.showTree"
        class="video_select"
        placement="top-end"
        v-model:value="option.selectedDataSource"
        :options="option.dataSource"
        :style="`width:${w / 2}px;`"
        @update:value="handleSelectDataSource"
      />
      <n-button
        tertiary
        v-else-if="option.showTree && option.showBtn && option.isOldStyle"
        :class="option.isOldStyle ? 'videoChangBtn' : 'videoChangBtn videoChangBtn_new'"
        @click="handleClick"
        >切换</n-button
      >
      <n-button
        tertiary
        v-else-if="option.showTree && option.showBtn && !option.isOldStyle"
        :class="option.isOldStyle ? 'videoChangBtn' : 'videoChangBtn videoChangBtn_new'"
        @click="handleClick"
      ></n-button>

      <n-modal
        v-model:show="showDialog"
        :mask-closable="false"
        preset="card"
        title="选择摄像头"
        :class="['custom-tab-modal']"
        :draggable="{ bounds: 'none' }"
        :style="{ width: '644px', height: '420px' }"
      >
        <n-tree-select
          ref="cameraTree"
          class="cameraTree"
          :menu-props="{
            class: 'custom-dropdown'
          }"
          v-model:value="option.selectedDataSource"
          :options="option.dataset.list"
          clearable
          :default-expanded-keys="option.expandedKeys"
          style="width: 615px; margin-top: 16px"
          :show="isDropdownOpen"
          @update:show="handleShowChange"
          @update:value="handleSelectDataSource"
        />
      </n-modal>
    </div>
    <div ref="vYushiVideoRef" class="go-video" :id="uuid"></div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch, ref, onDeactivated, onMounted, nextTick } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as configOption } from './config'
import { Base64 } from 'js-base64'
import { md5 } from 'js-md5'
import { PageEnum } from '@/enums/pageEnum'
import axios from 'axios'
import { getUUID, isPreview } from '@/utils'

const cameraTree = ref(null)
const uuid = getUUID()
let keepAliveInterval: any = null
// const expandedKeys = ref([]);
const isDropdownOpen = ref(false)
const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
let option = shallowReactive({ ...configOption, expandedKeys: [] })
const showModalRef = ref(false)
//@ts-ignore
const findParentPath = (targetKey, nodes, path = []) => {
  for (const node of nodes) {
    // 当前路径快照
    const currentPath = [...path, { key: node.key, label: node.label }]

    // 找到目标节点时返回完整路径（排除自身）
    if (node.key === targetKey) return [...path, { key: node.key, label: node.label }]

    // 递归搜索子节点
    if (node.children?.length) {
      //@ts-ignore
      const result = findParentPath(targetKey, node.children, currentPath)
      if (result) return result
    }
  }
  return null // 未找到
}

//@ts-ignore
const handleShowChange = value => {
  // Always set the dropdown to be open
  if (!value) {
    isDropdownOpen.value = true
  }
}
const setNode = (treeData: any) => {
  for (let i in treeData) {
    if (treeData[i].grade === 'org') {
      treeData[i].isLeaf = false
      treeData[i].disabled = true
      setNode(treeData[i].children)
    } else {
      treeData[i].isLeaf = true
      treeData[i].disabled = false
    }
  }
}

let showDialog = showModalRef
const handleClick = async () => {
  showModalRef.value = true
  setTimeout(async () => {
    //@ts-ignore
    // cameraTree.value.focus();
    setNode(option.dataset.list)
    isDropdownOpen.value = true
    //@ts-ignore
    if (option.selectedDataSource === '') {
      option.selectedDataSource = option.dataset.defaultValue
    }

    setTimeout(() => {
      scrollIntoView(option.selectedDataSource)
    }, 200)
  }, 0)
}

const scrollIntoView = (key: any) => {
  if (!cameraTree.value) return

  const targetElement = document.getElementsByClassName('v-binder-follower-content')
  if (targetElement) {
    //@ts-ignore
    targetElement[0].style.transform = 'translateX(14px) translateY(104px)'
    // targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

// 预览更新
const vYushiVideoRef = ref(null)
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  option.dataset = newData
})

// 编辑更新
watch(
  () => props.chartConfig.option,
  (newData: any) => {
    option = newData
  },
  {
    immediate: true,
    deep: true
  }
)
//宇视摄像头

const keepalive = (token: any) => {
  let ipaddr = PageEnum.VMIP
  let linkPort = PageEnum.VM_PORT
  let VIIDPort = PageEnum.VIID_PORT

  axios({
    method: 'POST',
    url: `http://${ipaddr}${VIIDPort && ':' + VIIDPort}/VIID/hadesadapter/user/keepalive`,
    headers: {
      'Content-Type': 'application/json; charset=utf8',
      Authorization: token
    },
    responseType: 'json'
  }).then(res => {
    if (res.data.ErrCode === 404) {
      // VM B3351以前的用法
      //@ts-ignore
      const kaCLose = e => {
        console.warn('user dead', e)
      }
      let ws = new WebSocket(`ws://${ipaddr}${VIIDPort && ':' + VIIDPort}/VIID/event`)
      ws.onopen = () => {
        ws.send(token)
      }
      ws.onclose = kaCLose
      ws.onerror = kaCLose
    } else {
      // VM B3351以后的用法
      let reConnect = 0
      let time = setInterval(() => {
        axios({
          method: 'POST',
          url: `http://${ipaddr}${VIIDPort && ':' + VIIDPort}/VIID/hadesadapter/user/keepalive`,
          headers: {
            'Content-Type': 'application/json; charset=utf8',
            Authorization: token
          },
          responseType: 'json'
        }).then(res2 => {
          if (res2.data.ErrCode !== 0) {
            reConnect++
            if (reConnect > 5) {
              clearInterval(time)
              reConnect = 0
              console.warn('user dead')
            }
          } else {
            reConnect = 0
          }
        })
      }, 30000)
    }
  })
}

const getRandom = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

//@ts-ignore
const initplayer = async (newData: any) => {
  const password = PageEnum.VM_PASS
  const username = PageEnum.VM_NAME
  let ipaddr = PageEnum.VMIP
  let linkPort = PageEnum.VM_PORT
  let VIIDPort = PageEnum.VIID_PORT

  let date = new Date()
  let day = ('0' + date.getDate()).slice(-2)
  let month = ('0' + (date.getMonth() + 1)).slice(-2)
  let today = date.getFullYear() + '-' + month + '-' + day

  //@ts-ignore
  let liveNetProtocol = undefined
  //@ts-ignore
  if (liveNetProtocol === undefined) {
    liveNetProtocol = 'tcp'
  }

  //@ts-ignore
  let replayNetProtocol = undefined
  if (replayNetProtocol === undefined) {
    replayNetProtocol = 'tcp'
  }

  //@ts-ignore
  let liveByMS = true

  let nbsp = String.fromCharCode(160)
  //@ts-ignore
  let arr = []
  arr.length = 40
  //@ts-ignore
  let str = arr.fill(nbsp).join('')

  axios({
    method: 'POST',
    url: `http://${ipaddr}${VIIDPort && ':' + VIIDPort}/VIID/login/v2`,
    headers: {
      'Content-Type': 'application/json; charset=utf8'
    },
    responseType: 'json'
  })
    .then(res => {
      const AccessCode = res.data.AccessCode //res.body改为res.data
      let usernameEncrypted = Base64.encode(username)
      let passwordEncrypted = md5(password)
      const loginStr = usernameEncrypted + AccessCode + passwordEncrypted
      const LoginSignature = md5(loginStr)
      axios({
        method: 'POST',
        url: `http://${ipaddr}${VIIDPort && ':' + VIIDPort}/VIID/login/v2`,
        headers: {
          'Content-Type': 'application/json; charset=utf8'
        },
        responseType: 'json',
        data: {
          UserName: username,
          AccessCode,
          LoginSignature
        }
      })
        .then(res => {
          // 悬浮方案要求网页title唯一，参照接口文档【悬浮播放器概念】
          document.title = document.title + str + getRandom()

          const token = res.data.AccessToken
          //@ts-ignore
          window.token = res.data.AccessToken
          keepalive(token)

          // 跨nat映射时，如果对接端口不是一一映射到8093，则本接口必调。
          // 或https代理的对接端口不是443，本接口必调
          // 本接口必须在init之前调用

          //@ts-ignore
          window.imosPlayer.setLinkPort(linkPort)

          //@ts-ignore
          window.imosPlayer
            .init({
              ip: ipaddr, // 必传
              token: token, // 必传
              title: document.title, // 必传
              offset: [0, 0]
            })
            //@ts-ignore
            .then(async res => {
              //@ts-ignore
              if (res.ErrCode === 0) {
                //@ts-ignore
                window.imosPlayer.cssScale(option.sca)
                //@ts-ignore
                window.imosPlayer.setLiveNetLinkMode(liveNetProtocol, liveByMS)
                // 国产电脑坐标计算
                // window.imosPlayer.setWindowParams(windowParams);

                //@ts-ignore
                window.__login = true
                //console.log('登录成功请创建窗格（建议打开F12方便查看运行结果）')

                // await getDataSource(newData)
                //创建视频窗格
                //@ts-ignore
                let videoDom = await window.imosPlayer.createPanelWindow()
                // 窗格默认400*400，通过样式改宽高
                videoDom.style.width = '100%'
                videoDom.style.height = '100%'
                //@ts-ignore
                window.imosPlayer
                  .setVoidClassName(videoDom, {
                    className: 'basic'
                  })
                  //@ts-ignore
                  .then(e => {
                    console.log(e)
                  })
                //@ts-ignore
                //放开后视频播放被覆盖，黑屏看不到
                window.imosPlayer.setVoidBroadCastRegion({
                  voidClassName: 'basic',
                  region: {
                    times: 1000,
                    class: ['n-modal-body-wrapper']
                  }
                })
                // let array = document.getElementsByClassName('go-video')
                //@ts-ignore
                // window.imosPlayer.setViewDomByClassName({
                //   className: 'basic',
                //   doms: array
                // })

                //@ts-ignore
                window['_iframeId' + option.videoIndex] = videoDom.id

                let divDom = document.getElementById(uuid)
                //@ts-ignore
                divDom.style.width = '100%'
                //@ts-ignore
                divDom.style.height = '84%'
                //@ts-ignore
                if (divDom.children.length === 0) {
                  //@ts-ignore
                  divDom.appendChild(videoDom)
                }
                
                //@ts-ignore
                window.imosPlayer.playLive(videoDom.id, {
                  camera: option.dataset.defaultValue,
                  //@ts-ignore
                  title: option.dataset.defaultValue,
                  stream: 1
                })
              } else {
                //console.log(res.ErrMsg)
              }
            })
            //@ts-ignore
            .catch(err => {
              console.error(err)
            })
        })
        .catch(e => {
          console.log('登录失败！！！')
        })
    })
    .catch(() => console.log('登录失败！！！'))
}

const handleSelectDataSource = (v: any) => {
  showModalRef.value = false
  option.selectedDataSource = v
  let path = findParentPath(v, option.dataset.list)
  option.videoTitle = path[1].label + '(' + path[path.length - 1].label + ')'
  option.expandedKeys = path.map((item: any) => {
    return item.key
  })

  //@ts-ignore
  window.imosPlayer.playLive(window['_iframeId' + option.videoIndex], {
      camera: v,
      //@ts-ignore
      title: v,
      stream: 1
  })
}

const getDataSource = (newData: any) => {
  // 查相机编码
  let data = {
    org: 'iccsid',
    condition: {
      ItemNum: 3,
      Condition: [
        {
          QueryType: 256,
          LogicFlag: 0,
          QueryData: '1001'
        },
        {
          QueryType: 257,
          LogicFlag: 0,
          QueryData: '1'
        },
        {
          QueryType: 1,
          LogicFlag: 5,
          QueryData: ''
        }
      ],
      QueryCount: 1,
      PageFirstRowNumber: 0,
      PageRowNum: 200
    }
  }
  let conditionEncodeStr1 = encodeURIComponent(JSON.stringify(data.condition))
  let url = `http://${PageEnum.VMIP}:${PageEnum.VIID_PORT}/VIID/query?org=${data.org}&condition=${conditionEncodeStr1}`

  //@ts-ignore
  axios({
    method: 'GET',
    url: url,
    headers: {
      //@ts-ignore
      Authorization: window.token
    },
    contentType: 'application/json'
  })
    //@ts-ignore
    .then(res => {
      //@ts-ignore
      if (res.data.ErrCode === 0) {
        //@ts-ignore
        let infoList = res.data.Result.InfoList
        console.log(infoList)
        //@ts-ignore
        let arr = []
        //@ts-ignore
        infoList.forEach(info => {
          //@ts-ignore
          if (info.ResItemV1.ResStatus === 1) {
            // 不要离线的
            arr.push({
              //@ts-ignore
              value: info.ResItemV1.ResCode,
              //@ts-ignore
              label: info.ResItemV1.ResName
            })
          }
        })
        //@ts-ignore
        option.dataSource = arr
        //@ts-ignore
        option.selectedDataSource = arr[0] ? arr[0].value : ''
      } else {
        console.log(`查询相机失败:[${res.data.ErrCode}] ${res.data.ErrMsg}`)
      }
    })
}

onMounted(async () => {
  if (isPreview()) {
    await initplayer(props.chartConfig.option.dataset)
    //加载title
    let path = findParentPath(props.chartConfig.option.dataset.defaultValue, props.chartConfig.option.dataset.list)
    props.chartConfig.option.videoTitle = path[1].label + '(' + path[path.length - 1].label + ')'
    props.chartConfig.option.expandedKeys = path.map((item: any) => {
      return item.key
    })
  }
})

onDeactivated(() => {
  //@ts-ignore
  clearInterval(keepAliveInterval)
})

const dataSetHandle = async (newData: any) => {
  await initplayer(newData)
}

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  //加载title
  let path = findParentPath(props.chartConfig.option.dataset.defaultValue, newData.list)
  props.chartConfig.option.videoTitle = path[1].label + '(' + path[path.length - 1].label + ')'
  props.chartConfig.option.expandedKeys = path.map((item: any) => {
    return item.key
  })
  dataSetHandle(newData)
})
</script>

<style lang="scss" scoped>
@include go('video') {
  display: block;
  object-fit: v-bind('option.fit');
  // width: 100%;
  // height: v-bind('h * 0.9');
}

.video_title {
  margin: 8px 8px;
  display: flex;
  color: #fff;
  justify-content: space-between;
}

.video_title_new {
  background: #0d4b61;
  padding: 4px 4px 4px 12px;
  margin: 4px 0;
}

.videoChangBtn {
  padding: 4px 4px;
  border: 1px solid rgb(24, 160, 219);
  background: transparent;
  height: 20px;
}

.videoChangBtn_new {
  width: 52px;
  height: 23px;
  background-repeat: no-repeat;
  background-image: url('data:image/png;base64,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');
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

.custom-dropdown {
  background: transparent !important;
  border: none !important;
  box-shadow: unset !important;
  width: 615px !important;
}
.custom-data-table .v-binder-follower-content {
  transform: translateX(7px) translateY(104px) !important;
}
</style>
