<template>
  <n-modal
    v-model:show="props.showDialog"
    title="中国中车集团有限公司"
    preset="card"
    :class="['custom-tab-modal']"
    @update:show="handleUpdateShow"
    :draggable="{ bounds: 'none' }"
    :style="{ width: '1200px', height: '700px' }"
  >
    <div>
      <div style="width: 100%; display: flex; justify-content: center; padding: 24px 0" class="custom-tab-modal__tab">
        <n-button
          @click.stop="status.showTab = '1'"
          color="rgba(10,166,254,0.3)"
          text-color="#fff"
          :class="status.showTab === '1' ? 'active-button' : ''"
          style="margin-right: 16px"
          ><div class="button_content">场景智控统计</div></n-button
        >
        <n-button
          @click.stop="status.showTab = '2'"
          color="rgba(10,166,254,0.3)"
          text-color="#fff"
          :class="status.showTab === '2' ? 'active-button' : ''"
          style="margin-right: 16px"
          ><div class="button_content">风险智控统计</div></n-button
        >
        <n-button
          @click.stop="status.showTab = '3'"
          :class="status.showTab === '3' ? 'active-button' : ''"
          color="rgba(10,166,254,0.3)"
          text-color="#fff"
          ><div class="button_content">今日警情</div></n-button
        >
      </div>
      <div v-if="status.showTab === '1'">
        <n-form inline label-placement="left" label-width="auto">
          <n-form-item label="" style="width: 240px">
            <n-tree-select
              v-model:value="status.searchOrg1"
              :options="status.searchOrgOptions"
              placeholder="请选择组织"
              clearable
            />
          </n-form-item>
          <n-form-item label="" style="width: 240px">
            <n-select
              v-model:value="status.searchSceneType"
              value-field="typeCode"
              label-field="typeName"
              :options="status.searchSceneTypeOptions"
              placeholder="请选择场景类型"
              clearable
            />
          </n-form-item>
          <n-button
            type="primary"
            color="rgb(50,108,214)"
            text-color="#fff"
            @click="handleTabOneSearch"
            style="margin: 0 12px 0 0"
            >搜索</n-button
          >
          <n-button
            type="default"
            color="transparent"
            @click="handleTabOneReset"
            text-color="#fff"
            style="border: 1px solid rgb(50, 108, 214)"
            >重置</n-button
          >
        </n-form>
        <div>
          共筛选出<span style="color: #32dcfbff; font-weight: bold"> {{ status.tabOneTableData.length }} </span>项
        </div>
        <n-data-table
          :bordered="false"
          size="small"
          :loading="tabOneLoading"
          :bottom-bordered="true"
          :columns="status.tabOneColumns"
          :data="status.tabOneTableData"
          striped
          class="custom-data-table"
          :pagination="{
            page: status.tabOneTableCurrentPage,
            pageSize: status.tabOneTablePageSize,
            showSizePicker: true,
            showQuickJumper:true,
            pageSizes: [10, 20, 50, 100],
            onChange: (page: number) => {
              status.tabOneTableCurrentPage = page
            },
            onUpdatePageSize: (pageSize: number) => {
              status.tabOneTablePageSize = pageSize
              status.tabOneTableCurrentPage = 1
            },
            itemCount: status.tabOneTableData.length
          }"
        />
      </div>
      <div v-if="status.showTab === '2'">
        <n-form inline label-placement="left" label-width="auto">
          <n-form-item label="" style="width: 240px">
            <n-tree-select
              v-model:value="status.searchOrg2"
              :options="status.searchOrgOptions"
              placeholder="请选择组织"
              clearable
            />
          </n-form-item>
          <n-form-item label="" style="width: 240px">
            <n-select
              multiple
              :max-tag-count="1"
              v-model:value="status.searchRiskLevel"
              placeholder="请选择风险等级"
              :options="status.riskLevelOptions"
            />
          </n-form-item>
          <n-form-item label="" style="width: 240px">
            <n-select
              multiple
              :max-tag-count="1"
              v-model:value="status.searchControlMethod"
              placeholder="请选择智控技术"
              :options="status.controlMethodOptions"
            />
          </n-form-item>
          <n-form-item label="" style="width: 240px">
            <n-select
              v-model:value="status.searchAlgoType"
              placeholder="请选择智控逻辑分类"
              :options="status.algoTypeOptions"
            />
          </n-form-item>
          <n-button
            type="primary"
            color="rgb(50,108,214)"
            text-color="#fff"
            @click="handleTabTwoSearch"
            style="margin: 0 12px 0 0"
            >搜索</n-button
          >
          <n-button
            type="default"
            color="transparent"
            @click="handleTabTwoReset"
            text-color="#fff"
            style="border: 1px solid rgb(50, 108, 214)"
            >重置</n-button
          >
        </n-form>
        <div>
          共筛选出<span style="color: #32dcfbff; font-weight: bold"> {{ status.tabTwoTableData.length }} </span>项
        </div>
        <n-data-table
          :bordered="false"
          size="small"
          :loading="tabTwoLoading"
          :bottom-bordered="true"
          :columns="status.tabTwoColumns"
          :data="status.tabTwoTableData"
          :scroll-x="2765"
          striped
          class="custom-data-table"
          :pagination="{
            page: status.tabTwoTableCurrentPage,
            pageSize: status.tabTwoTablePageSize,
            showSizePicker: true,
            showQuickJumper:true,
            pageSizes: [10, 20, 50, 100],
            onChange: (page: number) => {
              status.tabTwoTableCurrentPage = page
            },
            onUpdatePageSize: (pageSize: number) => {
              status.tabTwoTablePageSize = pageSize
              status.tabTwoTableCurrentPage = 1
            },
            itemCount: status.tabTwoTableData.length
          }"
        />
      </div>
      <div v-else-if="status.showTab === '3'">
        <div style="display: flex; flex-direction: horizontal">
          <div class="info">
            <div class="sub-title">今日报警</div>
            <div class="info-body">
              总数 <span class="info-num">{{ status.todayTotalAlarmNum }}</span> 个
            </div>
          </div>
          <div class="info">
            <div class="sub-title">已处理</div>
            <div class="info-body">
              总数 <span class="info-num">{{ status.todayHandleNum }}</span> 个
            </div>
          </div>
          <div class="info">
            <div class="sub-title">未处理</div>
            <div class="info-body">
              总数
              <span class="info-num">{{ status.todayUnHandleNum }}</span> 个
            </div>
          </div>
        </div>
        <div>
          <n-space vertical size="large">
            <!-- Table -->
            <n-data-table
              :bordered="false"
              size="small"
              :loading="tabThreeLoading"
              :bottom-bordered="true"
              :columns="status.tabThreeColumns"
              :data="status.tabThreeTableData"
              striped
              class="custom-data-table"
              :pagination="{
                page: status.tabThreeTableCurrentPage,
                pageSize: status.tabThreeTablePageSize,
                showSizePicker: true,
                showQuickJumper:true,
                pageSizes: [10, 20, 50, 100],
                onChange: (page: number) => {
                  status.tabThreeTableCurrentPage = page
                },
                onUpdatePageSize: (pageSize: number) => {
                  status.tabThreeTablePageSize = pageSize
                  status.tabThreeTableCurrentPage = 1
                },
              }"
            />
          </n-space>
        </div>
      </div>
    </div>
    <n-modal
      v-model:show="status.showVideoCheckDialog"
      title="视频巡查"
      preset="card"
      :class="['custom-tab-modal']"
      :draggable="{ bounds: 'none' }"
      :style="{ width: '1440px', height: '916px' }"
    >
      <n-grid cols="24" x-gap="12" style="overflow-y: auto; padding-bottom: 12px">
        <!-- 左侧详情 -->
        <n-gi :span="6">
          <div class="detail-item">
            <label>风险描述：</label>
            <span>{{ (status.selectTabTwoRow as any)?.subSceneName }}</span>
          </div>
          <div class="detail-item">
            <label>所属公司：</label>
            <span>{{ (status.selectTabTwoRow as any)?.compName }}</span>
          </div>
          <div class="detail-item">
            <label>智控区域：</label>
            <span>{{ (status.selectTabTwoRow as any)?.region }}</span>
          </div>
          <div class="detail-item">
            <n-collapse arrow-placement="right" :default-expanded-names="['1']">
              <n-collapse-item title="关联相机" name="1">
                <div
                  :class="index == 0 ? 'relatedCameraItem relatedCameraItem_active' : 'relatedCameraItem'"
                  v-for="(item, index) in (status.selectTabTwoRow as any)?.cameras"
                  @click="clickOnCamera(item.camera_code || item.cameraCode, $event)"
                >
                  {{ item.camera_name || item.cameraName }}
                </div>
              </n-collapse-item>
            </n-collapse>
          </div>
        </n-gi>
        <n-gi :span="18">
          <div
            class="playLive-placeholder"
            v-if="(status.selectTabTwoRow as any)?.cameras.length > 0"
            style="width: 98%; height: 825px; padding: 8px"
          >
            <play-live :device-id="status.selectedCamera"></play-live>
          </div>
        </n-gi>
      </n-grid>
    </n-modal>
  </n-modal>
</template>

<script setup lang="ts">
import { onMounted, reactive, h, computed, watch, ref } from 'vue'
import { NTag } from 'naive-ui'
import PlayLive from '@/components/Pages/yushiVideo/playLive.vue'
import axiosInstance from '@/api/axios'

const props = defineProps({
  showDialog: {
    type: Boolean,
    require: true
  },
  showTabProp: {
    type: String,
    require: true
  }
})

const emit = defineEmits(['update:show'])

const handleUpdateShow = (newValue: any) => {
  emit('update:show', newValue) // 通知父组件更新
}

const tabOneLoading = ref(false)
const tabTwoLoading = ref(false)
const tabThreeLoading = ref(false)

const status = reactive({
  showTabDialog: false,
  selectTabTwoRow: null,
  selectedCamera: '',
  searchOrg1: '1674696717063430144',
  searchOrg2: '1674696717063430144',
  searchSceneType: null,
  searchAlgoType: null,
  searchSceneTypeOptions: [],
  algoTypeOptions: [
    {
      value: '劳动防护用品类',
      label: '劳动防护用品类'
    },
    {
      value: '行为类',
      label: '行为类'
    },
    {
      value: '人员特征类',
      label: '人员特征类'
    },
    {
      value: '安全防护设备类',
      label: '安全防护设备类'
    },
    {
      value: '人体入侵类',
      label: '人体入侵类'
    },
    {
      value: '事故结果特征类',
      label: '事故结果特征类'
    },
    {
      value: '传感类',
      label: '传感类'
    }
  ],
  selectedOrg: '',
  showTab: props.showTabProp,
  showVideoCheckDialog: false,
  todayHandleNum: 0,
  todayTotalAlarmNum: 0,
  todayUnHandleNum: 0,
  searchOrg: '',
  searchOrgOptions: [],
  searchRiskLevel: null,
  riskLevelOptions: [
    {
      value: '1',
      label: '重大风险'
    },
    {
      value: '2',
      label: '较大风险'
    },
    {
      value: '3',
      label: '一般风险'
    },
    {
      value: '4',
      label: '低风险'
    }
  ],
  searchControlMethod: null,
  controlMethodOptions: [
    {
      value: '2',
      label: '视觉识别'
    },
    {
      value: '1',
      label: '传感检测'
    },
    {
      value: '0',
      label: '无智控'
    }
  ],
  tabThreeTableData: [],
  tabTwoTableData: [],
  tabOneTableData: [],
  tabOneTableCurrentPage: 1,
  tabTwoTableCurrentPage: 1,
  tabThreeTableCurrentPage: 1,
  tabOneTablePageSize: 10,
  tabTwoTablePageSize: 10,
  tabThreeTablePageSize: 10,
  tabOneColumns: [
    {
      title: '序号',
      key: 'index',
      render(row: any, index: any) {
        return index + 1 + (status.tabOneTableCurrentPage - 1) * status.tabOneTablePageSize
      }
    },
    {
      title: '状态',
      key: 'sceneState',
      render(row: any) {
        const tagStyle = computed(() => {
          if (row.sceneState === '正常') {
            return {
              textColor: '#42c37e',
              backgroundColor: 'rgba(66, 195, 126, 0.15)' // 绿色系浅透明
            }
          } else {
            return {
              textColor: '#ca424b',
              backgroundColor: 'rgba(202, 66, 75, 0.15)' // 红色系浅透明
            }
          }
        })
        return h(
          NTag,
          {
            round: true,
            bordered: false, // 关键！移除边框
            color: {
              color: tagStyle.value.backgroundColor, // 背景色
              textColor: tagStyle.value.textColor // 字体颜色
            },
            style: {
              padding: '0 8px', // 调整内边距
              borderRadius: '16px'
            }
          },
          { default: () => row.sceneState }
        )
      }
    },
    {
      title: '场景类型',
      key: 'sceneType'
    },
    // {
    //   title: '操作',
    //   key: 'operation',
    //   className: 'operation'
    // },
    {
      title: '未处理情况',
      key: 'unhandleSituation',
      render(row: any) {
        const tagStyle = computed(() => {
          if (row.unHandleSituation === '暂无') {
            return {
              textColor: '#fff',
              backgroundColor: 'transparent'
            }
          } else {
            return {
              textColor: '#ca424b',
              backgroundColor: 'transparent'
            }
          }
        })
        return h(
          NTag,
          {
            round: true,
            bordered: false, // 关键！移除边框
            color: {
              color: tagStyle.value.backgroundColor, // 背景色
              textColor: tagStyle.value.textColor // 字体颜色
            }
          },
          { default: () => row.unhandleSituation }
        )
      }
    },
    {
      title: '所属场所',
      key: 'regionName',
      width: 240,
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '智控技术',
      key: 'intellectTech'
    }
  ],
  tabTwoColumns: [
    {
      title: '序号',
      key: 'index',
      width: 90,
      render(row: any, index: any) {
        return index + 1
      }
    },
    {
      title: '风险等级',
      key: 'riskSourceLevel',
      width: 90,
      render(row: any) {
        const tagStyle = computed(() => {
          if (row.riskLevel === '1') {
            return {
              textColor: '#ff5454',
              backgroundColor: 'transparent'
            }
          } else if (row.riskLevel === '2') {
            return {
              textColor: '#ffa854',
              backgroundColor: 'transparent'
            }
          } else if (row.riskLevel === '3') {
            return {
              textColor: '#ca424b',
              backgroundColor: 'transparent'
            }
          } else {
            return {
              textColor: '#ca424b',
              backgroundColor: 'transparent'
            }
          }
        })
        return h(
          NTag,
          {
            round: true,
            bordered: false, // 关键！移除边框
            color: {
              color: tagStyle.value.backgroundColor, // 背景色
              textColor: tagStyle.value.textColor // 字体颜色
            }
          },
          {
            default: () =>
              row.riskLevel == '1'
                ? '重大风险'
                : row.riskLevel == '2'
                ? '较大风险'
                : row.riskLevel == '3'
                ? '一般风险'
                : '低风险'
          }
        )
      }
    },
    {
      title: '智控区域',
      key: 'region',
      width: 300,
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '操作',
      key: 'operation',
      className: 'tabTwo_operation',
      width: 95,
      render(row: any) {
        return h(
          'div',
          {
            onClick: () => {
              handleOnTabTwoOpertionClick(row)
            }
          },
          row.operation
        )
      }
    },
    {
      title: '风险描述',
      key: 'subSceneName',
      width: 475
    },
    {
      title: '智控技术',
      key: 'sceneType',
      width: 150
    },
    {
      title: '智控逻辑',
      key: 'sceneMethod',
      width: 330
    },
    {
      title: '智控逻辑分类',
      key: 'algorithmType',
      width: 190
    },
    {
      title: '智控特征',
      key: 'eigenValue',
      width: 190
    },
    {
      title: '所属公司',
      key: 'compName',
      width: 105
    },
    {
      title: '部位或环节',
      key: 'sceneLink',
      width: 95
    },
    {
      title: '危险源细类',
      key: 'sourceFinal',
      width: 135
    },
    {
      title: '危险源小类',
      key: 'sourceSmall',
      width: 135
    },
    {
      title: '危险源中类',
      key: 'sourceCenter',
      width: 135
    },
    {
      title: '危险源大类',
      key: 'sourceLarge',
      width: 105
    },
    {
      title: '可能导致事故类型',
      key: 'causeAccident',
      width: 145
    }
  ],
  tabThreeColumns: [
    {
      title: '序号',
      key: 'index',
      render(row: any, index: any) {
        return index + 1
      }
    },
    {
      title: '子企业',
      key: 'orgName'
    },
    {
      title: '今日报警总数',
      key: 'total'
    },
    {
      title: '已处置报警数',
      key: 'handled'
    },
    {
      title: '未处置报警数',
      key: 'unhandled'
    },
    {
      title: '处置率',
      key: 'handleRate'
    },
    {
      title: '重大风险报警',
      key: 'impact'
    },
    {
      title: '较大风险报警',
      key: 'import'
    },
    {
      title: '平均处置时长/分钟',
      key: 'handleAverageDuration'
    }
  ]
})

const handleOnTabTwoOpertionClick = (row: any) => {
  status.showVideoCheckDialog = true
  status.selectTabTwoRow = row
  //@ts-ignore
  if (status.selectTabTwoRow && status.selectTabTwoRow.cameras.length > 0) {
    //@ts-ignore
    status.selectedCamera = status.selectTabTwoRow.cameras[0].cameraCode || status.selectTabTwoRow.cameras[0].camera_code
  }
}
const handleTabOnePageChange = () => {}
const handleTabOneSearch = () => {
  getSceneInfoList(status.searchOrg1, status.searchSceneType || '')
}
const handleTabTwoSearch = () => {
  getSubSceneInfoList(
    status.searchOrg1,
    status.searchRiskLevel || '',
    status.searchControlMethod || '',
    status.searchAlgoType || '',
    status.tabTwoTableCurrentPage,
    status.tabTwoTablePageSize
  )
}

const handleTabOneReset = () => {
  status.searchOrg1 = ''
  status.searchSceneType = null
}

const handleTabTwoReset = () => {
  status.searchOrg2 = ''
  status.searchRiskLevel = null
  status.searchControlMethod = null
  status.searchAlgoType = null
}

const tabOneRowClassName = (row: any) => {
  if (row.status === '异常') {
    return 'inormal'
  }
  return ''
}

watch(
  () => props.showTabProp,
  (newData: any) => {
    status.showTab = newData
    if (newData === '3') {
      //今日警情
      getAlarmList()
    }

    if (newData === '2') {
      getOrgList()
      getSubSceneInfoList(
        status.searchOrg1,
        status.searchRiskLevel || '',
        status.searchControlMethod || '',
        status.searchAlgoType || '',
        status.tabTwoTableCurrentPage,
        status.tabTwoTablePageSize
      )
    }

    if (newData === '1') {
      //场景
      getOrgList()
      getSceneTypeList()
      getSceneInfoList(status.searchOrg1, status.searchSceneType || '')
    }
  }
)

watch(
  () => props.showDialog,
  (newData: any) => {
    if (newData) {
      getOrgList()
      getSceneTypeList()
      getSceneInfoList(status.searchOrg1, status.searchSceneType || '')
    }
  }
)

watch(
  () => status.showTab,
  (newData: any, oldData: any) => {
    if (newData === '2') {
      //智控
      getOrgList()
      getSubSceneInfoList(
        status.searchOrg1,
        status.searchRiskLevel || '',
        status.searchControlMethod || '',
        status.searchAlgoType || '',
        status.tabTwoTableCurrentPage,
        status.tabTwoTablePageSize
      )
    }
    if (newData === '1') {
      //场景
      getOrgList()
      getSceneTypeList()
      getSceneInfoList(status.searchOrg1, status.searchSceneType || '')
    }

    if (newData === '3') {
      getAlarmList()
    }
  }
)

const getOrgList = () => {
  axiosInstance({
    method: 'GET',
    //@ts-ignore
    url: `${window.htconfig.API_IP}awjt/base/awOrg/getOrgByDemCode?demCode=awwd&level=2`,

    responseType: 'json'
  }).then((res: any) => {
    //@ts-ignore
    status.searchOrgOptions = getOrgTree(res.value)
  })
}

const clickOnCamera = (cameraCode: any, event: any) => {
  let eles = document.getElementsByClassName('relatedCameraItem')
  for (let i = 0; i < eles.length; i++) {
    //@ts-ignore
    eles[i].classList = 'relatedCameraItem' // 修改样式
  }

  status.selectedCamera = cameraCode

  event.target.classList = 'relatedCameraItem relatedCameraItem_active'
}

const getOrgTree = (originalData: any) => {
  // 创建哈希映射加速节点查找
  const nodeMap = new Map()
  //@ts-ignore
  const tree = []

  // 第一遍遍历：创建基础节点并记录层级关系
  //@ts-ignore
  originalData.forEach(item => {
    nodeMap.set(item.id, {
      label: item.name,
      key: `${item.id}`, // 使用唯一ID生成key
      grade: item.grade,
      parentId: item.parentId,
      children: []
    })
  })

  // 第二遍遍历：构建树形结构
  //@ts-ignore
  originalData.forEach(item => {
    const currentNode = nodeMap.get(item.id)

    if (item.parentId === '0') {
      // 根节点直接加入结果树
      tree.push(currentNode)
    } else {
      // 将当前节点挂载到父节点
      const parentNode = nodeMap.get(item.parentId)
      if (parentNode) {
        // if (parentNode.grade !== '01') {
        //     parentNode.key = parentNode.key.replace('dept-', 'sub-dept-'); // 子节点key前缀处理
        // }
        parentNode.children.push(currentNode)
      }
    }
  })

  //@ts-ignore
  return tree
}

const getSceneTypeList = () => {
  axiosInstance({
    method: 'GET',
    //@ts-ignore
    url: `${window.htconfig.API_IP}awjt/leaderboard/sceneType/list`,

    responseType: 'json'
  }).then((res: any) => {
    console.log('sceneType' + res)

    status.searchSceneTypeOptions = res.value
  })
}

const getSceneInfoList = (searchOrg: any, searchType: any) => {
  tabOneLoading.value = true
  axiosInstance({
    method: 'GET',
    //@ts-ignore
    url: `${window.htconfig.API_IP}awjt/leaderboard/scene/sceneList?compId=${searchOrg}&typeCode=${searchType}`,

    responseType: 'json'
  }).then((res: any) => {
    tabOneLoading.value = false

    status.tabOneTableData = res.value
  })
}

const getAlarmList = () => {
  tabThreeLoading.value = true

  axiosInstance({
    method: 'GET',
    //@ts-ignore
    url: `${window.htconfig.API_IP}awjt/leaderboard/alarm/todayAlarmHeader`,

    responseType: 'json'
  }).then((res: any) => {
    tabThreeLoading.value = false

    status.tabThreeTableData = res.value.subCompanyHeaderData
    status.todayHandleNum = res.value.handled
    status.todayTotalAlarmNum = res.value.total
    status.todayUnHandleNum = res.value.unhandled
  })
}

const getSubSceneInfoList = (
  searchOrg: any,
  riskSourceLevel: any,
  sceneType: any,
  algorithmType: any,
  pageNum: any,
  pageSize: any
) => {
  tabTwoLoading.value = true

  axiosInstance({
    method: 'GET',
    //@ts-ignore
    url: `${window.htconfig.API_IP}awjt/leaderboard/subSceneInfo/SubSceneHeader?orgId=${searchOrg}&riskSourceLevel=${riskSourceLevel}&sceneType=${sceneType}&algorithmType=${algorithmType}&pageNum=${pageNum}&pageSize=${pageSize}`,

    responseType: 'json'
  }).then((res: any) => {
    tabTwoLoading.value = false

    if (res.value) {
      status.tabTwoTableData = res.value.map((item: any) => {
        if (item.cameras && item.cameras.length > 0) {
          return {
            ...item,
            operation: '视频巡查'
          }
        } else {
          return {
            ...item
          }
        }
      })
    }
  })
}

onMounted(async () => {
  // getOrgList()
  // getSceneTypeList()
  // //场景统计列表
  // getSceneInfoList(status.searchOrg1, status.searchSceneType || '')
})
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

.custom-data-table tbody .tabTwo_operation {
  color: rgb(0, 228, 255) !important;
  text-decoration: underline;
  cursor: pointer;
}

.custom-data-table .n-data-table-th__title {
  color: #fff !important;
}

.custom-data-table .n-data-table__pagination {
  margin-bottom: 12px;
  margin-right: 8px;
}

.custom-tab-modal .n-collapse-item__header-main,
.custom-tab-modal .n-collapse-item-arrow {
  color: #32dcfb !important;
}

.custom-tab-modal .n-collapse-item__header-main {
  display: flex;
  justify-content: space-between;
}
</style>
<style lang="scss" scoped>
.info {
  font-size: 0.875rem;
  width: fit-content;
  margin: 0 16px 0 0;
  display: flex;
  align-items: center;
}

.info .sub-title {
  padding: 0 0 0 24px;
  background: url(./second_level.png) 0 50%/425px 31px no-repeat;
}

.info .info-num {
  color: rgb(34 211 238);
  font-size: 0.875rem;
}

.detail-item {
  padding: 8px 0;
  display: flex;
  flex-direction: column;
}

.detail-item label {
  min-width: 90px;
  color: rgb(145 187 242);
}

.detail-item span {
  font-weight: bold;
}

.relatedCameraItem {
  width: 90%;
  background-color: rgba(9, 23, 55, 0.7);
  border: 1px solid rgb(19, 62, 102);
  border-radius: 0.375rem;
  margin-bottom: 8px;
  padding: 8px 12px;
  cursor: pointer;
  color: #fff;
}

.relatedCameraItem:hover {
  border-color: rgb(62 200 244 / 1) !important;
  color: rgb(62 200 244 / 1);
}

.relatedCameraItem_active {
  border-color: rgb(62 200 244 / 1) !important;
  color: rgb(62 200 244 / 1) !important;
}
</style>
