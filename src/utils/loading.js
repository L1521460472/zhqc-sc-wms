import { Loading } from 'element-ui'

let loadingCount = 0
let loading

const startLoading = (value = '努力加载中……') => {
  loading = Loading.service({
    lock: true,
    text: value,
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

const endLoading = () => {
  loading.close()
}

export const showLoading = (value) => {
  if (loadingCount === 0) {
    startLoading(value)
  }
  loadingCount += 1
}

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount -= 1
  if (loadingCount === 0) {
    endLoading()
  }
}
