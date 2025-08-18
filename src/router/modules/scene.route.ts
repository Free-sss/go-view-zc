import { RouteRecordRaw } from 'vue-router'
import { BigscreenEnum } from '@/enums/pageEnum'

// 引入路径
const importPath = {
  'BigscreenEnum.SCENE_PREVIEW_NAME': () => import('@/views/scene/index.vue')
}

const sceneRoutes: RouteRecordRaw = {
  path: BigscreenEnum.SCENE_PREVIEW,
  name: BigscreenEnum.SCENE_PREVIEW_NAME,
  component: importPath['BigscreenEnum.SCENE_PREVIEW_NAME'],
  meta: {
    title: '安网数智智控平台',
    requiresAuth: false
  }
}

export default sceneRoutes
