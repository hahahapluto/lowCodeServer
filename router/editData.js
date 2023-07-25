// 导入express
const express = require("express");
// 引入路由模块
const router = express.Router();
const controllers = require("../controllers/editData");

//获取编辑数据
router.get("/getEditData", controllers.getEditData);
router.post("/delEditData", controllers.delEditData);
router.post("/addEditData", controllers.addEditData);
router.post("/updateEditData", controllers.updateEditData);
// 导出router
module.exports = router;
