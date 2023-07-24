/**
 * 供 /router/modfiyUserInfo.js 模块进行使用
 */

const db = require("../config/db/index");

// 检测原始密码是否正确处理函数
exports.checkPassword = (req, res) => {
  const oldUserInfo = req.body;
  const userInfo = req.user;
  console.log(userInfo);
  const selectSql = "select * from user where username = ?";
  db.query(selectSql, userInfo.username, (err, results) => {
    if (err) return res.sendErr(err);
    if (oldUserInfo.password !== results[0].password)
      return res.sendErr("原始密码输入错误！");
    res.sendErr("原始密码输入正确！", 0);
  });
};

// 修改密码处理函数
exports.modifyPassword = (req, res) => {
  const newUserInfo = req.body;
  const userInfo = req.user;
  const updateSql = `update user set password = ${newUserInfo.password} where username = ?`;
  db.query(updateSql, userInfo.username, (err, results) => {
    if (err) return res.sendErr(err);
    // 判断影响行数是否为 1
    if (results.affectedRows !== 1) return res.sendErr("修改密码失败");
    res.sendErr("修改密码成功！", 0);
  });
};

// 修改用户名处理函数
exports.modifyUsername = (req, res) => {
  const newUserInfo = req.body;
  const olduserInfo = req.user;
  const updateSql = `update user set username = ${newUserInfo.username} where id = ?`;
  db.query(updateSql, olduserInfo.id, (err, results) => {
    if (err) return res.sendErr(err);
    // 判断影响行数是否为 1
    if (results.affectedRows !== 1) return res.sendErr("修改用户名失败");
    res.sendErr("修改用户名成功！", 0);
  });
};
