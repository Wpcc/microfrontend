import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { registerApplication } from 'single-spa'

Vue.config.productionTip = false

// create script tag and load url
function createScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject
    const firstScript = document.querySelector('script')
    firstScript.parentNode.insertBefore(script, firstScript)
  })
}

function loadApp(url, globalVar) {
  return async () => {
    await createScript(url, '/js/chunk-vendor.js')
    await createScript(url, '/js/app.js')

    return window[globalVar]
  }
}

const apps = [
  {
    // 子应用名称
    name: 'app1',
    // 子应用加载函数，是一个promise
    app: loadApp('http://localhost:8081', 'app1'),
    // 当路由满足条件时（返回true），激活（挂载）子应用
    activeWhen: (location) => location.pathname.startsWith('/app1'),
    // 传递给子应用的对象
    customProps: {}
  }
]

// 注册子应用
for (let i = apps.length - 1; i >= 0; i--) {
  registerApplication(apps[i])
}

new Vue({
  router,
  // mounted() {
  //   start()
  // },
  render: (h) => h(App)
}).$mount('#app')
