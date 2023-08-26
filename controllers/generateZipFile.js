const fs = require("fs");
const archiver = require("archiver");
const { exec } = require("child_process");
const db = require("../config/db/index"); // 导入数据库操作模块

exports.getPackage = async (req, res) => {
  const selectSql = "select * from editData where id=?";
  db.query(selectSql, req.body.id, (err, results) => {
    // 执行 selectSql 语句失败
    if (err) {
      return res.sendErr(err);
    }
    fs.writeFileSync("web/renderer/src/data.json", results[0].jsonData);
    console.log("文件写入成功");

    exec("cd web/renderer && npm run build", (error, stdout, stderr) => {
      if (error) {
        console.error(`执行打包命令出错：${error}`);
        res.sendErr("执行打包命令出错错误！");
        return;
      }
      console.log(`打包成功：${stdout}`);
      try {
        const timeString = new Date().toLocaleDateString().replace(/\//g, "-");
        // 压缩刚刚创建的代码文件
        const filePaths = ["web/renderer/dist"];

        // 先创建一个可写流，用于传入压缩包数据
        const output = fs.createWriteStream(`lowcode${timeString}.zip`);

        // 创建一个archive实例，就是一个可读流，可以指定压缩格式和压缩等级：压缩格式支持zip和tar，
        // 压缩等级速度最快的为1，即是不压缩，9的话是压缩性能最好。
        const archive = archiver("zip", {
          zlib: { level: 9 },
        });

        // 用于监听 `archive` 对象上发生的特定事件。用于监听 `archive` 对象上的 `error` 事件。
        archive.on("error", function (err) {
          if (err) err;
        });

        // 使用pipe将两个流连接，开始写压缩包数据
        archive.pipe(output);
        for (const i of filePaths) {
          // directory方法是压缩目录，可以传两个参数：第一个参数是源目录路径，第二个参数是文件夹在压缩包
          // 里面的目录路径，如果第二个参数为false的话，则就是压缩包内部不会新建目录
          archive.directory(i, "lowcode");
        }
        // 生成完后将zip文件删除，需要注意的是该监听方法应该写于调用finalize之前
        output.on("close", () => {
          console.log(`
                  --------- ---------压缩完毕--------- ---------
                  生成文件大小${(archive.pointer() / 1024 / 1024).toFixed(1)}MB
                  ---------如需配置生成路径或文件名,请配置output---------
                  `);
          res.download(`lowcode${timeString}.zip`, "lowcode.zip", (err) => {
            if (err) {
              console.error("下载压缩包出错", err);
            }
            // 删除生成的压缩包文件
            fs.unlinkSync(`lowcode${timeString}.zip`);
          });
        });
        // 最后使用finalize进行压缩
        archive.finalize();
      } catch (error) {
        console.error("生成压缩包", error);
      }
    });
  });
};
