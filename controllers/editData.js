/**
 * 供 /router/editData.js 模块进行使用
 */
const db = require("../config/db/index"); // 导入数据库操作模块
// 获取所有数据
exports.getEditData = (req, res) => {
  const selectSql = "select * from editData where uId=?";
  db.query(selectSql, req.user.id, (err, results) => {
    // 执行 selectSql 语句失败
    if (err) {
      return res.sendErr(err);
    }
    res.send({
      code: 200,
      msg: "获取成功",
      editData: results,
    });
  });
};

// 删除数据
exports.delEditData = (req, res) => {
  const selectSql = "delete from editData where id=?";
  db.query(selectSql, req.body?.id, (err, results) => {
    if (err) {
      return res.sendErr(err);
    }
    if (results.affectedRows === 1) {
      console.log("删除页面成功");
      res.send({ code: 200, msg: "删除页面成功" });
    } else {
      console.log("删除页面失败");
      res.send({ code: 200, msg: "删除页面失败" });
    }
  });
};
//添加数据
exports.addEditData = (req, res) => {
  const selectSql = "insert into editData set ?";
  let data = { ...req.body, uId: req.user.id };
  db.query(selectSql, data, (err, results) => {
    if (err) {
      return res.sendErr(err);
    }
    if (results.affectedRows === 1) {
      console.log("添加页面成功");
      res.send({ code: 200, msg: "添加页面成功" });
    } else {
      console.log("添加页面失败");
      res.send({ code: 200, msg: "添加页面失败" });
    }
  });
};
