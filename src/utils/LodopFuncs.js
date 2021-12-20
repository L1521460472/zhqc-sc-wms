// ==本JS是加载Lodop插件及CLodop服务的综合示例，可直接使用，建议看懂后融进自己页面程序==
/* eslint-disable */
var CreatedOKLodopObject, CLodopIsLocal, CLodopJsState

// ==判断是否需要CLodop(那些不支持插件的浏览器):==
function needCLodop() {
  try {
    var ua = navigator.userAgent
    if (ua.match(/Windows\sPhone/i)) { return true }
    if (ua.match(/iPhone|iPod|iPad/i)) { return true }
    if (ua.match(/Android/i)) { return true }
    if (ua.match(/Edge\D?\d+/i)) { return true }

    var verTrident = ua.match(/Trident\D?\d+/i)
    var verIE = ua.match(/MSIE\D?\d+/i)
    var verOPR = ua.match(/OPR\D?\d+/i)
    var verFF = ua.match(/Firefox\D?\d+/i)
    var x64 = ua.match(/x64/i)
    if ((!verTrident) && (!verIE) && (x64)) { return true } else if (verFF) {
      verFF = verFF[0].match(/\d+/)
      if ((verFF[0] >= 41) || (x64)) { return true }
    } else if (verOPR) {
      verOPR = verOPR[0].match(/\d+/)
      if (verOPR[0] >= 32) { return true }
    } else if ((!verTrident) && (!verIE)) {
      var verChrome = ua.match(/Chrome\D?\d+/i)
      if (verChrome) {
        verChrome = verChrome[0].match(/\d+/)
        if (verChrome[0] >= 41) { return true }
      }
    }
    return false
  } catch (err) {
    return true
  }
}

// ==引用CLodop的主JS,用双端口8000和18000(以防其中一个被占):==
if (needCLodop()) {
  var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement

  var JS1 = document.createElement('script')
  JS1.src = 'http://localhost:8000/CLodopfuncs.js?priority=1'
  head.insertBefore(JS1, head.firstChild)

  var JS2 = document.createElement('script')
  JS2.src = 'http://localhost:18000/CLodopfuncs.js?priority=0'
  head.insertBefore(JS2, head.firstChild)

  CLodopIsLocal = !!((JS1.src + JS2.src).match(/\/\/localho|\/\/127.0.0./i))

  if (JS1.attachEvent) {
    CLodopJsState = 'loading'
    var onChange = function() {
      if (window.event.srcElement.readyState === 'loaded') { CLodopJsState = 'complete' }
    }
    JS1.attachEvent('onreadystatechange', onChange)
    JS2.attachEvent('onreadystatechange', onChange)
  }
}

// ==获取LODOP对象主过程,判断是否安装、需否升级:==
export function getLodop(oOBJECT, oEMBED) {
  var strHtmInstall = "<br><div style='color:#FF00FF'>打印控件未安装!点击这里==><a href='http://wms.zxwcbj.com/download/install_lodop32.exe' style='color:red' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</div>"
  var strHtmUpdate = "<br><div style='color:#FF00FF'>打印控件需要升级!点击这里==><a href='http://wms.zxwcbj.com/download/install_lodop32.exe' style='color:red' target='_self'>执行升级</a>,升级后请重新进入。</div>"
  var strHtm64_Install = "<br>打印控件未安装!点击这里==><a href='http://wms.zxwcbj.com/download/install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。"
  var strHtm64_Update = "<br><div style='color:#FF00FF'>打印控件需要升级!点击这里==><a href='http://wms.zxwcbj.com/download/install_lodop64.exe' style='color:red' target='_self'>执行升级</a>,升级后请重新进入。</div>"
  var strHtmFireFox = "<br><br><div style='color:#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</div>"
  var strHtmChrome = "<br><br><div style='color:#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</div>"
  var strCLodopInstall_1 = "<br><div style='color:#FF00FF'>Web打印服务CLodop未安装启动，请：<a href='http://wms.zxwcbj.com/download/CLodop_Setup_for_Win32NT.exe' style='color:red' target='_self'>下载安装</a>"
  var strCLodopInstall_2 = "<br>（若此前已安装过，请：<a href='http://wms.zxwcbj.com/download/CLodop.protocol:setup'  style='color:red' target='_self'>点击启动</a>）"
  var strCLodopInstall_3 = '，成功后请刷新本页面。</div>'
  var strCLodopUpdate = "<br><div style='color:#FF00FF'>Web打印服务CLodop需升级!点击这里==><a href='http://wms.zxwcbj.com/download/CLodop_Setup_for_Win32NT.exe' style='color:red' target='_self'>执行升级</a>,升级后请刷新页面。</div>"
  var LODOP
  try {
    var ua = navigator.userAgent
    var isIE = !!(ua.match(/MSIE/i)) || !!(ua.match(/Trident/i))
    if (needCLodop()) {
      try {
        LODOP = getCLodop()
      } catch (err) {}
      if (!LODOP && (document.readyState !== 'complete' || (isIE && CLodopJsState === 'loading'))) {
        alert('网页还没下载完毕，请稍等一下再操作.')
        return
      }
      if (!LODOP) {
        document.getElementById('showDown').innerHTML = strCLodopInstall_1 + (CLodopIsLocal ? strCLodopInstall_2 : '') + strCLodopInstall_3
        return
      } else {
        if (CLODOP.CVERSION < '3.0.9.3') {
          document.getElementById('showDown').innerHTML = strCLodopUpdate
        }
        if (oEMBED && oEMBED.parentNode) { oEMBED.parentNode.removeChild(oEMBED) }
        if (oOBJECT && oOBJECT.parentNode) { oOBJECT.parentNode.removeChild(oOBJECT) }
      }
    } else {
      var is64IE = isIE && !!(ua.match(/x64/i))
      // ==如果页面有Lodop就直接使用,否则新建:==
      if (oOBJECT || oEMBED) {
        if (isIE) { LODOP = oOBJECT } else { LODOP = oEMBED }
      } else if (!CreatedOKLodopObject) {
        LODOP = document.createElement('object')
        LODOP.setAttribute('width', 0)
        LODOP.setAttribute('height', 0)
        LODOP.setAttribute('style', 'position:absolute;left:0px;top:-100px;width:0px;height:0px;')
        if (isIE) { LODOP.setAttribute('classid', 'clsid:2105C259-1E0C-4534-8141-A753534CB4CA') } else { LODOP.setAttribute('type', 'application/x-print-lodop') }
        document.documentElement.appendChild(LODOP)
        CreatedOKLodopObject = LODOP
      } else { LODOP = CreatedOKLodopObject }
      // ==Lodop插件未安装时提示下载地址:==
      if ((!LODOP) || (!LODOP.VERSION)) {
        if (ua.indexOf('Chrome') >= 0) { document.getElementById('showDown').innerHTML = strHtmChrome }
        if (ua.indexOf('Firefox') >= 0) { document.getElementById('showDown').innerHTML = strHtmFireFox }
        document.getElementById('showDown').innerHTML = (is64IE ? strHtm64_Install : strHtmInstall)
        return LODOP
      }
    }
    if (LODOP.VERSION < '6.2.2.6') {
      if (!needCLodop()) {
        document.getElementById('showDown').innerHTML = (is64IE ? strHtm64_Update : strHtmUpdate)
      }
    }
    // ===如下空白位置适合调用统一功能(如注册语句、语言选择等):==

    LODOP.SET_LICENSES('深圳市鲸仓科技有限公司', 'BB720FD5AB0D521EB007D05CDE36CE65', '', '')
    // =======================================================
    return LODOP
  } catch (err) {
    alert('getLodop出错:' + err)
  }
}
