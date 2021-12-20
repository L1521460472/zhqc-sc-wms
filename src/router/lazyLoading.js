// 生成路由地址的组件 (这里要注意地址和组件的文件位置一定要对应上)
// export default (name) => {return (resolve) => require([`@/${name}`], resolve)}

// export default (name) => import(`@/${name}`)

// export default (name) => () => import('@/' + name [`@/views/${module}/index`])
// export default  (name) => {
//     return (resolve) => require([`@/${name}`], resolve)
// };

export const loadView = (name) => {
  return (resolve) => require([`@/${name}`], resolve)
}
