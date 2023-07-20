function ajax(options) {
  // 请求类型
  options.type = (options.type || "GET").toUpperCase();
  let xhr = new XMLHttpRequest();
  //接收
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      let status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  };
  //连接 和 发送
  if (options.type == "GET") {
    xhr.open("GET", options.url);
    xhr.send(null);
  } else if (options.type == "POST") {
    xhr.open("POST", options.url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf8");
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(options.data);
  }
}
