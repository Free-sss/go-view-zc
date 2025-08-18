import { ResultEnum } from '@/enums/httpEnum'

export enum ChartEnum {
  // 图表创建
  CHART_HOME = '/chart/home/:id(.*)*',
  CHART_HOME_NAME = 'ChartHome'
}

export enum PreviewEnum {
  //  图表预览
  CHART_PREVIEW = '/chart/preview/:id(.*)*',
  CHART_PREVIEW_NAME = 'ChartPreview'
}

export enum BigscreenEnum {
  //  图表展示
  BIGSCREEN_PREVIEW = '/view',
  BIGSCREEN_PREVIEW_NAME = 'Bigscreen',
  SCENE_PREVIEW = '/viewScene',
  SCENE_PREVIEW_NAME = 'Scene'
}

export enum EditEnum {
  //  图表JSON编辑
  CHART_EDIT = '/chart/edit/:id(.*)*',
  CHART_EDIT_NAME = 'ChartEdit'
}

export enum PageEnum {
  // 登录
  BASE_LOGIN = '/login',
  BASE_LOGIN_NAME = 'Login',

  //重定向
  REDIRECT = '/redirect',
  REDIRECT_NAME = 'Redirect',
  // 未发布
  REDIRECT_UN_PUBLISH = '/redirect/unPublish',
  REDIRECT_UN_PUBLISH_NAME = 'redirect-un-publish',
  // 重载
  RELOAD = '/reload',
  RELOAD_NAME = 'Reload',

  // 首页
  BASE_HOME = '/project',
  BASE_HOME_NAME = 'Project',

  // 我的项目
  BASE_HOME_ITEMS = '/project/items',
  BASE_HOME_ITEMS_NAME = 'Project-Items',

  // 我的模板
  BASE_HOME_TEMPLATE = '/project/my-template',
  BASE_HOME_TEMPLATE_NAME = 'Project-My-Template',

  // 模板市场
  BASE_HOME_TEMPLATE_MARKET = '/project/template-market',
  BASE_HOME_TEMPLATE_MARKET_NAME = 'Project-Template-Market',

  // 错误
  ERROR_PAGE_NAME_403 = 'ErrorPage403',
  ERROR_PAGE_NAME_404 = 'ErrorPage404',
  ERROR_PAGE_NAME_500 = 'ErrorPage500',

  //金蝶接口
  GET_TOKEN = '/ierp/kapi/oauth2/getToken',
  REFRESH_TOKEN = '	/ierp/kapi/oauth2/refreshToken',

  //宇视接口
  //@ts-ignore
  VMIP = window.htconfig.VMIP,
    //@ts-ignore
  VM_NAME = window.htconfig.VM_NAME,
    //@ts-ignore
  VM_PASS = window.htconfig.VM_PASS,
    //@ts-ignore
  VM_PORT = window.htconfig.VM_PORT,
    //@ts-ignore
  VIID_PORT = window.htconfig.VIID_PORT
}

export const ErrorPageNameMap = new Map([
  [ResultEnum.NOT_FOUND, PageEnum.ERROR_PAGE_NAME_404],
  [ResultEnum.SERVER_FORBIDDEN, PageEnum.ERROR_PAGE_NAME_403],
  [ResultEnum.SERVER_ERROR, PageEnum.ERROR_PAGE_NAME_500]
])
