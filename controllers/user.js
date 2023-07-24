/**
 * 供 /router/user.js 模块进行使用
 */

const db = require("../config/db/index"); // 导入数据库操作模块
const jwt = require("jsonwebtoken"); // 导入生成 Token 的包
const config = require("../config/jwtConfig"); // 导入配置-密钥

// 检测用户名是否存在处理函数
exports.checkIfUserExist = (req, res) => {
  const userInfo = req.body;
  const selectSql = "select * from user where username = ?";
  db.query(selectSql, userInfo.username, (err, results) => {
    if (err) return res.sendErr(err);
    if (results.length > 0) return res.sendErr("用户名已经被占用!");
    res.sendErr("该用户名可以使用！", 0);
  });
};

// 注册用户的处理函数
exports.regUser = (req, res) => {
  const userInfo = req.body; // 用户提交的信息数据

  const selectSql = "select * from user where username = ?";
  db.query(selectSql, userInfo.username, (err, results) => {
    // 执行 selectSql 语句失败
    if (err) return res.sendErr(err);

    // 判断用户名是否被占用
    if (results.length > 0)
      return res.sendErr("用户名已经被占用,请重新输入一个新的用户名!");

    const user = { ...userInfo, password: "" };

    // 插入用户信息
    const insertUser = "insert into user set ?";
    db.query(
      insertUser,
      { username: userInfo.username, password: userInfo.password },
      (err, results) => {
        // 判断 insertUser 语句有没有执行成功
        if (err) return res.sendErr(err);
        // 判断影响行数是否为 1
        if (results.affectedRows !== 1) return res.sendErr("注册用户失败");
        const usertoken = jwt.sign(user, config.jwtSecreKey, {
          expiresIn: config.expiresIn,
        });
        res.send({
          status: 0,
          msg: "注册成功！",
          token: "Bearer " + usertoken,
          username: userInfo.username,
        }); //响应文本
      }
    );
  });
};

// 登录的处理函数
exports.login = (req, res) => {
  const userInfo = req.body; // 用户提交的信息数据
  const selectSql = "select * from user where username = ?";
  db.query(selectSql, userInfo.username, (err, results) => {
    if (err) return res.sendErr(err);
    if (results.length != 1) return res.sendErr("不存在该用户！登录失败！");
    // 判断密码是否正确
    if (userInfo.password !== results[0].password)
      return res.sendErr("密码不正确！登陆失败！");
    // TODO: 在服务器生成 token 的字符串
    const user = { ...results[0], password: "" };
    const usertoken = jwt.sign(user, config.jwtSecreKey, {
      expiresIn: config.expiresIn,
    });
    res.send({
      status: 0,
      msg: "登录成功！",
      token: "Bearer " + usertoken,
      username: results[0].username,
    }); //响应文本
  });
};