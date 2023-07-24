// 导入express
const express = require("express");
// 引入路由模块
const router = express.Router();

const pagesHandler = require("../controllers/pages");

//获取样式数据
router.post("/getStyleData", pagesHandler.getStyleData);
// 导出router
module.exports = router;
