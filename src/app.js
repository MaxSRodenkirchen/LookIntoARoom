const onxrloaded = () => {
  XR8.XrController.configure({
    allowedDevices: XR8.XrConfig.device().ANY,
    imageTargetData: [
      require('../image-targets/aa-enevelope_3.json')
    ],
  })
}
window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded)
