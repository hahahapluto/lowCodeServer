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
        // directory方法是压缩目录，可以传两个参数：第一个参数是源目录路径，第二个参数是文件夹在压缩包
        // 里面的目录路径，如果第二个参数为false的话，则就是压缩包内部不会新建目录
        archive.directory("web/renderer/dist", "lowcode");
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

// //删除文件夹
// function deleteFolder(folderPath) {
//   if (fs.existsSync(folderPath)) {
//     fs.rmSync(folderPath, { recursive: true });
//     console.log(`成功删除文件夹: ${folderPath}`);
//   } else {
//     console.log(`文件夹不存在: ${folderPath}`);
//   }
// }
// exports.getPackage = async (req, res) => {
//   const selectSql = "select * from editData where id=?";
//   db.query(selectSql, req.body.id, (err, results) => {
//     // 执行 selectSql 语句失败
//     if (err) {
//       return res.sendErr(err);
//     }
//     console.log("读取数据成功！");
//     const timeString = new Date().getTime()
//     //复制文件夹并异步删除
//     new Promise((resolve) => {
//       //复制一份项目
//       fs.cp(
//         "./web/renderer",
//         `./web/${timeString}`,
//         { recursive: true },
//         (err) => {
//           if (err) {
//             console.error(`执行复制文件夹命令出错：${err}`);
//             res.sendErr("服务器出问题啦！");
//           }
//           console.log("生成vue项目成功，正在写入数据······");
//           //写入数据
//           fs.writeFileSync(
//             `web/${timeString}/src/data.json`,
//             results[0].jsonData
//           );
//           console.log("文件写入成功！");
//           console.log("开始执行打包命令······");
//           //执行打包命令
//           exec(
//             `cd web/${timeString} && npm run build`,
//             (error, stdout, stderr) => {
//               if (error) {
//                 console.error(`执行打包命令出错：${error}`);
//                 res.sendErr("执行打包命令出错错误！");
//                 return;
//               }
//               console.log(`打包成功：${stdout}`);
//               try {
//                 // 先创建一个可写流，用于传入压缩包数据
//                 const output = fs.createWriteStream(`lowcode${timeString}.zip`);

//                 // 创建一个archive实例，就是一个可读流，可以指定压缩格式和压缩等级：压缩格式支持zip和tar，
//                 // 压缩等级速度最快的为1，即是不压缩，9的话是压缩性能最好。
//                 const archive = archiver("zip", {
//                   zlib: { level: 9 },
//                 });
//                 // 用于监听 `archive` 对象上发生的特定事件。用于监听 `archive` 对象上的 `error` 事件。
//                 archive.on("error", function (err) {
//                   if (err) err;
//                 });
//                 // 使用pipe将两个流连接，开始写压缩包数据
//                 archive.pipe(output);
//                 // directory方法是压缩目录，可以传两个参数：第一个参数是源目录路径，第二个参数是文件夹在压缩包
//                 // 里面的目录路径，如果第二个参数为false的话，则就是压缩包内部不会新建目录
//                 archive.directory(`web/${timeString}/dist`, "lowcode");
//                 // 生成完后将zip文件删除，需要注意的是该监听方法应该写于调用finalize之前
//                 output.on("close", () => {
//                   console.log(`
//                         --------- ---------压缩完毕--------- ---------
//                         生成文件大小${(archive.pointer() / 1024 / 1024).toFixed(
//                           1
//                         )}MB
//                         ---------如需配置生成路径或文件名,请配置output---------
//                         `);
//                   res.download(
//                     `lowcode${timeString}.zip`,
//                     "lowcode.zip",
//                     (err) => {
//                       if (err) {
//                         console.error("下载压缩包出错", err);
//                       }
//                       // 删除生成的压缩包文件
//                       fs.unlinkSync(`lowcode${timeString}.zip`);
//                     }
//                   );
//                   resolve(1);
//                 });
//                 // 最后使用finalize进行压缩
//                 archive.finalize();
//               } catch (error) {
//                 console.error("生成压缩包", error);
//               }
//             }
//           );
//         }
//       );
//     }).then(() => {
//       // //删除文件夹
//       deleteFolder(
//         __dirname.replace(/\\test|\\controllers/g, "") + `/web/${timeString}`
//       );
//     });
//   });
// };
