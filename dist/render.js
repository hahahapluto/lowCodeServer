// 将逗号转换为分号
const replaceCommasWithSemicolon = (string) => {
  let pattern = /,/g;
  let replacement = ";";
  return string.replace(pattern, replacement);
};

// 在最后一个花括号前面追加内容
const addContentBeforeCurlyBraces = (sting, addContext) => {
  // const regex = /(?=\})/;
  const regex = /(?=\}(?!.*\}))/;
  return sting.replace(regex, addContext);
};

// 追加内容
const addContentTail = (parentClass, sting, addContext) => {
  return sting + "\n" + `.${parentClass} ` + addContext;
};

// 去除引号
const removeQuotationMarks = (string) => {
  // const regex = /"([^"]+)"(?=:)/g; // 将冒号前的两个冒号去掉
  const regex = /"/g;
  return string.replace(regex, "");
};

// 将大写字母变成小写并且后面追加一个-
const uptoLow = (sting) => {
  return sting.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
};

// 获取json文件数据
const loadData = (name) => {
  let xhr = new XMLHttpRequest();
  //   HTML文档的格式要与流中的读取格式设置一致
  let okStatus = document.location.protocol === "file:" ? 0 : 200;
  xhr.open("GET", name, false);
  xhr.overrideMimeType("text/html;charset=utf-8"); //默认为utf-8
  xhr.send(null);
  return xhr.status === okStatus ? xhr.responseText : null;
};

//获取CSS选择器
const $ = (selectors) => {
  if (document.querySelectorAll(selectors).length != 1)
    return document.querySelectorAll(selectors);
  else return document.querySelector(selectors);
};

// 获取随机唯一值
const getUUID = () => {
  // 每次调用createObjectURL的时候,一个新的URL对象就会被创建
  // new Blob(): 二进制数据
  let url = URL.createObjectURL(new Blob());
  let uuid = url.toString();
  //释放这个url
  URL.revokeObjectURL(url);
  return uuid.substring(uuid.lastIndexOf("/") + 1).slice(0, 10);
};

const formatStyle = (name, style) => {
  let newStyle = replaceCommasWithSemicolon(JSON.stringify(style));
  return `.${name}` + addContentBeforeCurlyBraces(newStyle, ";");
};

let dataStr = loadData("./data.json");
let dataJson = JSON.parse(dataStr);
let nodes = dataJson["body"];

// 生成html字符串
const generateHTmlAndStyle = (nodes) => {
  if (nodes instanceof Array) {
    return nodes.map((node) => {
      let children = generateHTmlAndStyle(node.children);
      console.log(children);
      if (node.type.includes("container")) {
        let fragment = document.createDocumentFragment(); // 创建节点片段对象
        let target = document.createElement(`div`);

        let parentClass = node.type + getUUID(); // 父节点类名
        // let parentUUID = new Date().getTime() + getUUID();
        let parentStyle = formatStyle(parentClass, node.style); // 父节点的样式
        // 设置target的属性
        target.setAttribute("type", `${node.type}`);
        target.setAttribute("class", parentClass);
        children.map((item) => {
          target.appendChild(item[0]);
          parentStyle = addContentTail(parentClass, parentStyle, item[1]);
        });
        fragment.appendChild(target);
        return [fragment, parentStyle, parentClass];
      } else {
        let target = document.createElement(`${node.type}`);
        // 设置target的属性
        target.setAttribute("type", `${node.type}`);
        let childrenClass = node.type + getUUID(); // 子节点类名

        target.setAttribute("class", childrenClass);
        target.innerHTML = node.children;
        return [target, formatStyle(childrenClass, node.style)];
      }
    });
  } else {
    return nodes; // 不是数组直接返回
  }
};

async function generateFile() {
  let htmlAndStyle = generateHTmlAndStyle(dataJson["body"]);
  let id = 0;
  for (let i = 0; i < htmlAndStyle.length; i++) {
    const element = htmlAndStyle[i];
    $("body").appendChild(element[0]);
    await ajax({
      url: "http://127.0.0.1:8081/api/getStyleData",
      type: "post",
      data: JSON.stringify({
        fileName: `container${id++}`,
        style: uptoLow(removeQuotationMarks(element[1])),
      }),
      dataType: "json",
      success: function (req) {
        let msg = JSON.parse(req).msg;
        if (msg === "ok") {
          // 导出成功弹窗
          console.log(msg);
        }
        console.log(msg);
      },
      fail: function (status) {
        console.log(status);
      },
    });
  }
}
generateFile();

// const generateStyle = (nodes) => {
//   if (nodes instanceof Array) {
//     return nodes.map((node) => {
//       let childrenStyle = generateStyle(node.children);
//       console.log(childrenStyle);
//       if (node.type.includes("container")) {
//         let parentStyle = formatStyle(node.type, node.style);
//         childrenStyle.map((item) => {
//           parentStyle = addContentBeforeCurlyBraces(parentStyle, item);
//           console.log(parentStyle);
//         });
//         return parentStyle;
//       } else {
//         return formatStyle(node.type, node.style);
//       }
//     });
//   } else {
//     return nodes; // 不是数组直接返回
//   }
// };

// let aaa = generateStyle(dataJson["body"])[0];
// console.log(uptoLow(removeQuotationMarks(aaa)));
