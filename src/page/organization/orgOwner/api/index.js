import service from '@/utils/server'

const modName = '/organization/orgOwner/'
export const pageInfo = data => {
  return service({
    url: modName + 'pageInfo',
    method: 'post',
    data
  })
}

export const saveData = data => {
  return service({
    url: modName,
    method: 'post',
    data
  })
}

export const editData = data => {
  return service({
    url: modName,
    method: 'put',
    data
  })
}

export const updateNotNullOrgOwner = data => {
  return service({
    url: modName,
    method: 'patch',
    data
  })
}

export const getById = id => {
  return service({
    url: modName + `find/${id}`,
    method: 'get'
  })
}
export const deleteData = id => {
  return service({
    url: modName + `delete/${id}`,
    method: 'delete'
  })
}
