/**
 * 供 /router/pages.js 模块进行使用
 */
const write = require("../dist/css/wirte");

exports.getStyleData = (req, res) => {
  const jsonData = req.body; // 拿到请求体中的数据
  console.log(jsonData);
  let isWirte = false;
  if (write.judgeFileExists(`/${jsonData.fileName}.css`)) {
    write.additionalContent(`/${jsonData.fileName}.css`, jsonData.style);
    console.log("插入成功");
    isWirte = true;
  } else {
    write.writeFile(`/${jsonData.fileName}.css`, jsonData.style);
    console.log("写入成功");
    isWirte = true;
  }
  if (isWirte) {
    if (jsonData.fileName.endsWith("0")) {
      write.writeFile(
        "/index.css",
        `@import url(./${jsonData.fileName}.css);` + "\n"
      );
    } else {
      write.additionalContent(
        "/index.css",
        `@import url(./${jsonData.fileName}.css);` + "\n"
      );
    }
  }
  res.sendErr("ok", 0);
};
