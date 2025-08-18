<template>
  <n-config-provider
    :theme="darkTheme"
    :hljs="hljsTheme"
    :locale="locale"
    :date-locale="dateLocale"
    :theme-overrides="overridesTheme"
  >
    <go-app-provider>
      <I18n></I18n>
      <router-view></router-view>
    </go-app-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider } from 'naive-ui'
import { GoAppProvider } from '@/components/GoAppProvider'
import { I18n } from '@/components/I18n'
import { useSystemInit, useDarkThemeHook, useThemeOverridesHook, useCode, useLang } from '@/hooks'
import { onMounted } from 'vue'
import { PageEnum } from './enums/pageEnum'
import { useRouter } from 'vue-router'
import { useBigSceenStore } from './store/modules/bigscreenStore/bigscreenStore'

// 暗黑主题
const darkTheme = useDarkThemeHook()

// 主题配置
const overridesTheme = useThemeOverridesHook()

// 代码主题
const hljsTheme = useCode()

const router = useRouter()

// 系统全局数据初始化
useSystemInit()

// 全局语言
const { locale, dateLocale } = useLang()
onMounted(async () => {
  let ipaddr = PageEnum.VMIP
  let linkPort = PageEnum.VM_PORT
  let VIIDPort = PageEnum.VIID_PORT
  let script = document.createElement('script')
  // ***必须动态引入播放器库文件，以免第三方运维成本上升***
  script.src = `http://${ipaddr}${linkPort && ':' + linkPort}/static/imosPlayer.min.js`

  // **B3358P100H50以后可用以下url，方便第三方进行网络代理**
  // script.src = `http://${ipaddr}${linkPort && ":" + linkPort}/vdapi/static/imosPlayer.min.js`
  document.body.appendChild(script)

  const bigscreenStore = useBigSceenStore()
  //@ts-ignore
  // let token = window.location.href.split(window.htconfig.redirectParam + '=')[1]
  // if (token && token !== '') {
  if (!bigscreenStore.isAuthenticated) {
    try {
      await bigscreenStore.fetchToken()
    } catch (error) {}
  }
  // } else {
  // router.push('/error/404')
  // }
})
</script>
