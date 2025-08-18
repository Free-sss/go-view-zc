<template>
  <div ref="vYushiVideoRef" class="go-video" :id="uuid"></div>
</template>

<script setup lang="ts">
import { getUUID, isPreview } from '@/utils'
import { nextTick, onMounted } from 'vue'
const uuid = getUUID()
const props = defineProps({
  deviceId: {
    type: String, // 类型校验
    default: '', // 默认值
    required: true // 是否必传
  },
  start: {
    type: Date,
    default: null,
    required: true // 是否必传
  },
  end: {
    type: Date,
    default: null,
    required: true // 是否必传
  }
})

onMounted(async () => {
  //@ts-ignore
  let videoDom = await window.imosPlayer.createPanelWindow()
  // 窗格默认400*400，通过样式改宽高
  videoDom.style.width = '100%'
  videoDom.style.height = '100%'
  //@ts-ignore
  window.imosPlayer
    .setVoidClassName(videoDom, {
      className: 'basic2'
    })
    //@ts-ignore
    .then(e => {
      console.log(e)
    })

  let array = document.getElementsByClassName('go-video1')
  //@ts-ignore
  window.imosPlayer.setViewDomByClassName({
    className: 'basic2',
    doms: array
  })

  //@ts-ignore
  window._iframeId3 = videoDom.id

  let divDom = document.getElementById(uuid)
  //@ts-ignore
  divDom.style.width = '100%'
  //@ts-ignore
  divDom.style.height = '84%'
  //@ts-ignore
  divDom.appendChild(videoDom)
  //@ts-ignore
  // window.imosPlayer.setVoidBroadCastRegion({
  //   voidClassName: 'basic',
  //   region: {
  //     times: 1000,
  //     class: ['go-video']
  //   }
  // })
  //@ts-ignore
  window.imosPlayer.playRecord(window._iframeId3, {
    camera: props.deviceId,
    title: '',
    start: props.start,
    end: props.end,
    searchType: {
      indistincQuery: 3,
      domainLevel: 2,
      type: 3
    },
    speed: 4
  })
  //@ts-ignore
  // window.imosPlayer.hiddenVideoBtn(window._iframeId3, {
  //   type: 1
  // })
})
</script>
