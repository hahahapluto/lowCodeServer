// 导入express
const express = require("express");
// 引入路由模块
const router = express.Router();
// 导入修改用户信息路由的处理函数
const modfiyUserInfoHandler = require("../controllers/modfiyUserInfo");
// 导入验证数据的中间件
const expressJoi = require("@escook/express-joi");
const { password_schema, username_schema } = require("../tools/schema/user");

// 检测原始密码是否正确
router.post("/checkPassword", modfiyUserInfoHandler.checkPassword);

// 修改密码
router.post(
  "/modifyPassword",
  expressJoi(password_schema),
  modfiyUserInfoHandler.modifyPassword
);

// 修改用户名
router.post(
  "/modifyUsername",
  expressJoi(username_schema),
  modfiyUserInfoHandler.modifyUsername
);

// 导出router
module.exports = router;
