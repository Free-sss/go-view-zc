<template>
    <div :style="getStyle(borderRadius)" class="img_wrapper">
      <div
        v-for="(item, index) in option.dataset"
        :key="index"
        :style="{ position: 'absolute', top: item.pinLocation[0] + '%', left: item.pinLocation[1] + '%' }"
      >
        <img :src="item.pinUrl" @click="handleClick(item)" />
      </div>
      <n-image
        :object-fit="fit"
        preview-disabled
        :src="option.dataset[0].imgUrl"
        :fallback-src="requireErrorImg()"
        :width="w"
        :height="h"
        lazy
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { PropType, shallowReactive, watch, toRefs } from 'vue'
  import { requireErrorImg } from '@/utils'
  import { useChartDataFetch } from '@/hooks'
  import { CreateComponentType } from '@/packages/index.d'
  import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
  import axios from 'axios'
  
  const props = defineProps({
    chartConfig: {
      type: Object as PropType<CreateComponentType>,
      required: true
    }
  })
  
  const { w, h } = toRefs(props.chartConfig.attr)
  const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)
  
  const option = shallowReactive({
    dataset: [
      {
        orgID: '',
        imgUrl: '',
        pinUrl: '',
        parentId: '',
        pinLocation: []
      }
    ]
  })
  
  const getStyle = (radius: number) => {
    return {
      borderRadius: `${radius}px`,
      overflow: 'hidden'
    }
  }
  
  // 编辑更新
  watch(
    () => props.chartConfig.option.dataset,
    (newData: any) => {
      option.dataset = newData
    },
    {
      deep: true,
      immediate: true
    }
  )
  
  const handleClick = (item: any) => {
    const headers = {
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInRlbmFudElkIjoiMTc2MDg5Nzg5ODQxOTA5MzUwNCIsImV4cCI6MTc0NzcwMzcwNywiaWF0IjoxNzQ3NjE3MzA3fQ.FL9NYCLYVFdOkBKM4YKzU6ou9AQsIL-d3G6HH00zZnOEXXE7gWmBhpZZW5OjeKvjAInSwi2nhqHDX_tTJq9_1Q',
      'Content-Type': 'application/json'
    }
    axios
      .get('http://127.0.0.1:8920/aw/bigScreen/imagePinLocation?data=' + item.orgId, {
        headers: headers
      })
      .then((res: any) => {
        if (res.data.value) {
          let child_org_list = []
          let result = []
          let pathLenthList = []
          for (let i in res.data.value) {
            let item = res.data.value[i]
            pathLenthList.push(item.pathName.split('/').length)
          }
  
          pathLenthList = pathLenthList.sort()
          let minPathLength = pathLenthList[0]
  
          if (minPathLength && minPathLength > 0) {
            for (let i in res.data.value) {
              let item = res.data.value[i]
              if (item.pathName.split('/').length === minPathLength) {
                child_org_list.push(item)
              }
            }
          }
  
          for (let i in child_org_list) {
            let item = child_org_list[i]
            result.push({
              orgId: item.id,
              parentId: item.parentId,
              imgUrl: '/src/assets/logo.png',
              pinLocation: [100 * Math.random(), 100 * Math.random()],
              pinUrl: '/src/assets/pin.png'
            })
          }
          //@ts-ignore
          option.dataset = result
        }
      })
  }
  
  // 预览更新
  useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
    option.dataset = newData
  })
  </script>
  
  <style scoped lang="scss">
  .img_wrapper {
    position: relative;
  }
  </style>
  