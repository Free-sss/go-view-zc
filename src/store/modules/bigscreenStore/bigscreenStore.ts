import axios from 'axios';
import { defineStore } from 'pinia'

interface TokenState {
  bigscreenToken: string;
}
// 系统数据记录
export const useBigSceenStore = defineStore({
  id: 'useBigSceenStore',
  state: (): TokenState => {
    return { bigscreenToken: '' };
  },
  getters: {
    isAuthenticated: (state) => !!state.bigscreenToken
  },
  actions: {
    setToken(token: string) {
      this.bigscreenToken = token;
    },
    async fetchToken() {
      try {
        // 模拟 API 调用
        //@ts-ignore
        const response = await axios.post(window.htconfig.authUrl, {
          //@ts-ignore
          "username": window.htconfig.authUserName,
          //@ts-ignore
          "password": window.htconfig.authPassWord,
          "captcha": "",
          "captchaId": "",
          //@ts-ignore
          "encryption": window.htconfig.authEncryption,
        }).then(res => {
          this.setToken(res.data.token);
          // return response.data.token;

        }).catch (error => {
          console.error('Failed to fetch token:', error);
        })
      } catch(e) {
        console.error(e)
      }
    }
  }
})