
const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.login.language,
  size: state => state.app.size,
  device: state => state.app.device,
  mybtns: state => state.power.mybtns
}
export default getters
