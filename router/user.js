// 导入express
const express = require("express");
// 引入路由模块
const router = express.Router();
// 导入用户路由的处理函数
const userHandler = require("../controllers/user");
// 导入验证数据的中间件
const expressJoi = require("@escook/express-joi");
const { login_schema, username_schema } = require("../tools/schema/user");

// 检测用户名是否存在
router.post(
  "/checkIfUserExist",
  expressJoi(username_schema),
  userHandler.checkIfUserExist
);

// 注册新用户
router.post("/reguser", expressJoi(login_schema), userHandler.regUser);

// 登录
router.post("/login", expressJoi(login_schema), userHandler.login);

// 导出router
module.exports = router;
