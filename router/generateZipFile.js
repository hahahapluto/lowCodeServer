// 导入express
const express = require("express");
// 引入路由模块
const router = express.Router();
const controllers = require("../controllers/generateZipFile");

//获取编辑数据
router.post("/generateZipFile", controllers.getPackage);
// 导出router
module.exports = router;
