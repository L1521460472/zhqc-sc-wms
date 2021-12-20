export default (routers, data) => {
  // 这里之所以要重新遍历一下，是因为，通常我们动态路由的时候，是获取服务端数据，这个component属性是一个字符串，或者可能连字段名都是其他的key
  // 所以这里要做一些转换
  generaMenu(routers, data)
}
function generaMenu(routers, data) {
  data.forEach((item) => {
    let menu = Object.assign({}, item)
    let path = item.path
    if (!path) {
      path = dealPath(item.menuNameNick)
    }
    menu = {
      icon: item.icon,
      index: path,
      title: item.menuName
    }
    if (item.childMenus && item.childMenus.length > 0) {
      menu.subs = []
      generaMenu(menu.subs, item.childMenus)
    }
    routers.push(menu)
  })
}
function dealPath(menuNameNick) {
  while (menuNameNick.indexOf('/') > -1) {
    menuNameNick = menuNameNick.replace('/', '_')
  }
  return menuNameNick
}
