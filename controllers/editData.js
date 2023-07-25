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
    res.SendSuccess({
      msg: "获取成功",
      editData: results,
    });
  });
};

// 删除数据
exports.delEditData = (req, res) => {
  const deleteSql = "delete from editData where id=?";
  db.query(deleteSql, req.body?.id, (err, results) => {
    if (err) {
      return res.sendErr(err);
    }
    if (results.affectedRows === 1) {
      res.SendSuccess("删除页面成功");
    } else {
      res.sendErr("删除页面失败");
    }
  });
};
//添加数据
exports.addEditData = (req, res) => {
  const insertSql = "insert into editData set ?";
  let data = { ...req.body, uId: req.user.id };
  db.query(insertSql, data, (err, results) => {
    if (err) {
      return res.sendErr(err);
    }
    if (results.affectedRows === 1) {
      console.log(results);
      res.SendSuccess({msg:"添加页面成功",id:results.insertId});
    } else {
      res.sendErr("添加页面失败");
    }
  });
};
//更新数据
exports.updateEditData = (req, res) => {
  const updateSql = `update editData set title='${req.body.title}',jsonData = ? where id = ${req.body.id}`;
  db.query(updateSql,req.body.jsonData,(err, results) => {
    if (err) {
      return res.sendErr(err);
    }
    if (results.affectedRows === 1) {
      res.SendSuccess("修改页面成功");
    } else {
      res.sendErr("修改页面失败");
    }
  });
};
