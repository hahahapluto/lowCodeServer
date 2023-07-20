//导入express
const express = require("express");
const http = require("http");
const server = http.createServer();
//创建web服务器
const app = express();

// 处理普通的键值对格式:Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// 处理JSON格式:Content-Type: application/json;
app.use(express.json());

// 封装 send err 函数
app.use((req, res, next) => {
  res.sendErr = function (err, status = 1) {
    res.send({ status, msg: err instanceof Error ? err.message : err });
  };
  next();
});

// 配置cors中间件，解决接口跨域问题
const cors = require("cors");
app.use(cors());

// 导入并使用用户路由模块
const userRouter = require("./router/user");
app.use("/api", userRouter);

// 导入并使用页面路由模块
const pagesRouter = require("./router/pages");
app.use("/api", pagesRouter);

server.on("request", (req, res) => {
  //1.获取请求的 url 地址
  const url = req.url;
  //2.设置默认的响应内容为404 Not found
  let content = "404 Not found";
  //3.判断用户请求的是否为/或index.html首页
  //4.判断用户请求的是否为/about.html关于页面
  if (url === "/" || url === "/index.html") {
    content = "<h1>首页</h1>";
  } else if (url === "/about.html") {
    content = "<h1>关于页面</h1>";
  }
  //5.设置Content-Type响应头，防止中文乱码
  res.setHeader("Content-Type", "text/html;charset=utf-8");
  //6.使用res.end0把内容响应给客户端
  res.end(content);
});

// 通过app.listen进行服务器的配置，并启动服务器
// 接收两个配置参数，一个是对应的端口号，一个是启动成功的回调函数
app.listen(8081, () => {
  console.log("服务器启动成功 http://127.0.0.1:8081");
});
