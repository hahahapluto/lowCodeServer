/**
 * 供 /router/user.js 模块进行使用
 */

// 导入数据库操作模块
// const db = require("../db/index");

// 导入 bcryptjs 包用户密码加密
const bcrypt = require("bcryptjs");

// 注册用户的处理函数
exports.regUser = (req, res) => {
  // 获取的用户提交的信息数据
  const userInfo = req.body;
  console.log(userInfo);
  // 对表单中的数据进行合法性的校验
  if (!userInfo.username || !userInfo.password) {
    // return res.send({
    //   status: 1,
    //   msg: "用户名或者密码不合法！",
    // });

    return res.sendErr("用户名或者密码不合法！");
  }

  // 定义sql语句,查询用户名是否被占用
  const sqlStr = "select * from ${表名} where username = ?";
  //   db.query(sqlStr, userInfo.username, (err, results) => {
  //     if (err) {
  //       // return res.send({ status: 1, msg: err.message });
  //       return res.sendErr(err);
  //     }

  //     // 判断用户名是否被占用
  //     if (results.length > 0) {
  //       //   return res.send({
  //       //     status: 1,
  //       //     msg: "用户名已经被占用,请重新输入一个新的用户名!",
  //       //   });
  //       res.sendErr("用户名已经被占用,请重新输入一个新的用户名!");
  //     }

  //     // TODO: 用户名可以使用的操作 ( eg:将其插入数据库; 返回用户提示,该用户名可以使用; 加密密码 )

  //     // 调用 bcrypt.hashSync() 对密码进行加密
  //     // console.log(userInfo.password);
  //     userInfo.password = bcrypt.hashSync(userInfo.password, 10);
  //     // console.log(userInfo.password);

  //     // 定义插入新用户的 sql 语句
  //     const insertUser = "insert into ${表名} set ?";
  //     db.query(
  //       insertUser,
  //       {
  //         username: userInfo.username,
  //         password: userInfo.password,
  //       },
  //       (err, res) => {
  //         // 判断 insertUser 语句有没有执行成功
  //         // if (err) return res.send({ status: 1, msg: err.message });
  //         if (err) res.sendErr(err);

  //         // 判断影响行数是否为 1
  //         if (res.affectedRows !== 1) res.sendErr("注册用户失败");
  //         //   res.send({ status: 1, msg: "注册用户失败" });

  //         // 注册用户成功
  //         res.send({ status: 0, msg: "注册成功" }); //响应文本
  //       }
  //     );
  //   });
  res.sendErr("注册成功", 0); //响应文本
};

// 登录的处理函数
exports.login = (req, res) => {
  res.send("login OK"); //响应文本
};
