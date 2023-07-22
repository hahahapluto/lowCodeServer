const joi = require("joi");

/**
 * string()：是否为字符串
 * alphanum()：是否是字母
 * min()：最小长度
 * max()：最大长度
 * required()：是否是必须项
 * pattern()：绑定正则表达式的模式
 */

// 用户名和密码的验证规则
const username = joi.string().pattern(/\S+/).min(3).max(10).required();
const password = joi
  .string()
  .pattern(/^[\S]{6,15}$/)
  .required();

// 用户名和密码的验证规则对象
exports.login_schema = {
  body: { username, password },
};
