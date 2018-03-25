import axios from 'axios'
import Vue from 'vue'
const vm = new Vue()
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // if (response.data.errno === undefined) return response
  const { data, errmsg, errno } = response.data
  const status = response.status

  if (status === 200) {
    if (errno !== 0) {
      vm.$message.error(errmsg || '操作失败')
      return 1000 // 用于判断是否错误
    } else {
      return data
    }
  } else {
    vm.$message.error('与服务器连接失败')
    return 1000
  }
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 403:
        error.message = '你还未登录'
        // location.href = `http://accounts.meili-inc.com/enter?redirect=${encodeURIComponent(location.href)}`
        break
      case 500:
        error.message = '服务器发生错误了'
        break
      case 502:
        error.message = '连接服务器超时'
        break
      default:
    }
    vm.$message.error(error.message)
  }
  return Promise.reject(error)
})

export default axios
