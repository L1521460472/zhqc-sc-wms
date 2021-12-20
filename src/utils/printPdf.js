const prefixBase64 = 'data:image/png;base64,'

const printPdf = {
  dataURLtoBlob: (dataurl) => {
    dataurl = prefixBase64 + dataurl
    const arr = dataurl.split(','); const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1]); let n = bstr.length; const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  },
  print: (printIframe) => {
    if (Array.isArray(printIframe)) {
      printIframe.forEach(element => {
        element.contentWindow.print()
      })
    } else {
      printIframe.contentWindow.print()
    }
  }
}

export default printPdf
