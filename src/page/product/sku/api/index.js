import service from '@/utils/server'

const modName = '/product/productSku/'
export const pageInfo = data => {
  return service({
    url: modName + `spu/${data.spuCode}`,
    method: 'get'
  })
}

export const skuProperty = data => {
  return service({
    url: `/product/productSkuProperty/pageInfo`,
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

export const updateNotNullProduct = data => {
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
    url: modName + `code/${id}`,
    method: 'delete'
  })
}
