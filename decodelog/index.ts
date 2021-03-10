const kmdor = require('kmdor')
 
let decodePath = "C:\\Users\\kfmechen\\Desktop\\wor\\wxwork_local_destop\\tools"
 
kmdor.Do(['decode_wework_log.bat ' + 'C:\\Users\\kfmechen\\AppData\\Roaming\\Tencent\\WXWorkLocal\\Log'], decodePath, function () {
  console.info('end function ')
})