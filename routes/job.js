var express = require('express');
var router = express.Router();
const cpUpload = require("../util/multer").cpUpload;
const jobController = require("../controller/job");

// 增加职位
router.post("/addjob",cpUpload,jobController.addjob)
// 获取职位
router.post("/joblist",jobController.pagejob)
// 删除职位
router.post("/removejob",jobController.removejob)
// 获取修改时职位的信息
router.post("/rejob",jobController.rejob)
// 修改信息
router.post("/rejobBtn",cpUpload,jobController.rejobBtn)
// 获取数据总条数
router.post("/sumjob",jobController.sumjob)
module.exports = router;