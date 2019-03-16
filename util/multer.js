let multer = require("multer");
// 读文件  将文件放在指定的区域
// 更改文件的名称


// 配置项
// diskStorage磁盘存储引擎，磁盘存储引擎可以让你控制文件的储存
let storage = multer.diskStorage({
    // 将上传的文件储存在指定位置
    destination: function (req, file, cb){
        cb(null, './public/img')
    },
    // 将上传的文件做名称的修改
    filename: function (req, file, cb){
 
        cb(null , Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage })
// 指定当前字段可以携带多个文件
var cpUpload = upload.fields([{ name: 'logo', maxCount: 1 }])

module.exports = {
    cpUpload
}