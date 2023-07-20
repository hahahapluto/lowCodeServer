// 导入express
const express = require("express");
// 引入路由模块
const router = express.Router();
const userHandler = require("../routerHandler/user");
// 导入用户路由的处理函数

// 注册新用户
router.post("/reguser", userHandler.regUser);

// 登录
router.post("/login", userHandler.login);

// 导出router
module.exports = router;
