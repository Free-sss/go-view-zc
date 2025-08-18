import { RouteRecordRaw } from 'vue-router'
import { BigscreenEnum } from '@/enums/pageEnum'

// 引入路径
const importPath = {
  'BigscreenEnum.BIGSCREEN_PREVIEW_NAME': () => import('@/views/bigscreen/index.vue')
}

const bigscreenRoutes: RouteRecordRaw = {
  path: BigscreenEnum.BIGSCREEN_PREVIEW,
  name: BigscreenEnum.BIGSCREEN_PREVIEW_NAME,
  component: importPath['BigscreenEnum.BIGSCREEN_PREVIEW_NAME'],
  meta: {
    title: '安网数智智控平台',
    requiresAuth: false
  }
}

export default bigscreenRoutes
