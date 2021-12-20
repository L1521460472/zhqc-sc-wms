//
import service from '../../utils/server'
import { VUE_APP_WMS_MODEL } from '@/api/api.config.js'
import { VUE_APP_ROOT_MODEL } from '@/api/api.config.js'
const modName = VUE_APP_WMS_MODEL
const vueroot = VUE_APP_ROOT_MODEL
const clientId = 'zhqc-scwl'

export const getPersonInfo = data => {
  return service({
    url: '/fmUser/login',
    method: 'post',
    data
  })
}

export const fmUserChangeUserPwd = data => {
  return service({
    url: 'oauth/editPwd',
    method: 'post',
    data
  })
}

// export const fmRoleUserData = data => {
//     return service({
//         url: '/fmRole/getRoleInfoByName',
//         method: 'post',
//         data
//     })
// };

export const fmRoleUserAddData = data => {
  return service({
    url: '/fmRole/addRole',
    method: 'post',
    data
  })
}

export const fmRoleUpdateData = data => {
  return service({
    url: '/fmRole/updateRole',
    method: 'post',
    data
  })
}

export const fmUserQueryList = data => {
  return service({
    url: '/fmUser/getUsersByNoOrName',
    method: 'post',
    data
  })
}

export const fmUserLogin = data => {
  return service({
    url: '/fmUser/login',
    method: 'post',
    data
  })
}
export const fmUserLoginOut = data => {
  return service({
    url: '/oauth/out',
    method: 'get',
    data
  })
}
export const queryPowerByMenuId = data => {
  return service({
    url: '/fmPageOp/queryPowerByMenuId',
    method: 'post',
    data
  })
}

export const getTokenByCode = data => {
  return service({
    url: '/oauth/code/' + data.code + '/' + clientId + '?from=http://' + window.location.host + vueroot + '/login',
    method: 'get'
  })
}

export const loginInfo = data => {
  return service({
    url: '/login/loginInfo/' + data.platForm,
    method: 'post'
  })
}
export const getSsoUrl = () => {
  return service({
    url: '/oauth/ssoUrl/' + clientId + '?from=http://' + window.location.host + vueroot + '/login',
    method: 'get'
  })
}
export const getClients = () => {
  return service({
    url: '/fm/fmUser/clients',
    method: 'get'
  })
}

export const tokenLogin = () => {
  return service({
    url: '/oauth/loginInfo',
    method: 'get'
  })
}

export const publicKey = data => {
  return service({
    url: '/oauth/publicKey/' + data.userNo,
    method: 'get'
  })
}

export const changeWarehouse = data => {
  return service({
    url: '/oauth/changeWarehouse/' + data.whId,
    method: 'get',
    data
  })
}

export const initPageHome = data => {
  return service({
    url: modName + '/sys/home/initPage',
    method: 'post',
    data
  })
}

export const saveOrUpdate = data => {
  return service({
    url: '/front/dyTable/saveOrUpdate',
    method: 'post',
    data
  })
}
