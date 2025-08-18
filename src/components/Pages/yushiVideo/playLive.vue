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
      className: 'basic1'
    })
    //@ts-ignore
    .then(e => {
      console.log(e)
    })

  let array = document.getElementsByClassName('go-video')
  //@ts-ignore
  window.imosPlayer.setViewDomByClassName({
    className: 'basic1',
    doms: array
  })

  let divDom = document.getElementById(uuid)
  //@ts-ignore
  divDom.style.width = '100%'
  //@ts-ignore
  divDom.style.height = '100%'
  //@ts-ignore
  divDom.appendChild(videoDom)
  //@ts-ignore
  // window.imosPlayer.setVoidBroadCastRegion({
  //   voidClassName: 'basic2',
  //   region: {
  //     times: 1000,
  //     class: ['go-video']
  //   }
  // })
  //@ts-ignore
  window.imosPlayer.playLive(videoDom.id, {
    camera: props.deviceId,
    //@ts-ignore
    title: props.deviceId,
    stream: 1
  })
  //@ts-ignore

  //@ts-ignore
  // window.imosPlayer.hiddenVideoBtn(window._iframeId, {
  //   type: 1
  // })
})
</script>
