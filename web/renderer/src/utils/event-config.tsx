import { ElMessage } from "element-plus";
interface handlerConfig {
  type: string; //动作类型
  instructions: string; //动作描述
  defaultData: any;
  handler?: (val: any) => any; //执行事件
}

interface eventsConfig {
  type: string; //事件类型
  name: string; //事件名
  execute: (handler: any) => any; //事件执行
}

const handlerConfigList: handlerConfig[] = [
  {
    type: "跳转连接",
    instructions: "跳转到指定连接的页面",
    handler: (item) => {
      return () => {
        window.open(item.content, "_blank");
      };
    },
    defaultData: {
      label: "页面地址",
      value: "",
    },
  },
  {
    type: "刷新页面",
    instructions: "触发浏览器刷新页面",
    handler: () => {
      return () => {
        location.reload();
      };
    },
    defaultData: {
      value: "刷新页面",
    },
  },
  {
    type: "回退页面",
    instructions: "触发浏览器回退",
    handler: () => {
      return () => {
        history.go(-1);
      };
    },
    defaultData: {
      value: "回退页面",
    },
  },
  {
    type: "打开弹窗",
    instructions: "打开弹窗",
    handler: () => {
      console.log("打开弹窗");
    },
    defaultData: {
      label: "页面地址",
      value: "",
    },
  },
  {
    type: "关闭弹窗",
    instructions: "关闭弹窗",
    handler: () => {
      console.log("关闭弹窗");
    },
    defaultData: {
      label: "页面地址",
      value: "",
    },
  },
  {
    type: "消息提醒",
    instructions: "出现消息提醒框",
    handler: (item:any) => {
      return () => {
        ElMessage({
          type:item.messageType,
          message:item.messageContent,
          duration:item.duration
        });
      };
    },
    defaultData: {
      messageType: {
        label: "消息类型",
        list: [
          { label: "成功", value: "success" },
          { label: "警告", value: "warning" },
          { label: "提示", value: "info" },
          { label: "错误", value: "error" },
        ],
        value: "success",
      },
      duration: {
        label: "持续时间",
        min: 0,
        value: 3000,
      },
      messageContent: {
        label: "消息内容",
        value: "",
      },
      value: "",
    },
  },
  {
    type: "发送请求",
    instructions: "发送请求",
    handler: () => {
      console.log("发送请求");
    },
    defaultData: {
      label: "页面地址",
      value: "",
    },
  },
  {
    type: "提交表单",
    instructions: "提交表单",
    handler: () => {
      console.log("提交表单");
    },
    defaultData: {
      label: "页面地址",
      value: "",
    },
  },
  {
    type: "重置表单",
    instructions: "重置表单",
    handler: () => {
      console.log("重置表单");
    },
    defaultData: {
      label: "页面地址",
      value: "",
    },
  },
  {
    type: "校验表单",
    instructions: "校验表单",
    handler: () => {
      console.log("事件执行了");
    },
    defaultData: {
      label: "页面地址",
      value: "",
    },
  },
];

const eventsConfigList: eventsConfig[] = [
  {
    type: "onclick",
    name: "鼠标点击",
    execute: (handlers: Function[]) => {
      return {
        onClick: () => {
          handlers.forEach((fn) => fn && fn());
        },
      };
    },
  },
  {
    type: "mouseenter",
    name: "鼠标移入",
    execute: (handlers: Function[]) => {
      return {
        onMouseenter: () => {
          handlers.forEach((fn) => fn && fn());
        },
      };
    },
  },
  {
    type: "mouseleave",
    name: "鼠标移出",
    execute: (handlers: Function[]) => {
      return {
        onmouseleave: () => {
          handlers.forEach((fn) => fn && fn());
        },
      };
    },
  },
  {
    type: "onfocus",
    name: "获取焦点",
    execute: (handlers: Function[]) => {
      return {
        onFocus: () => {
          handlers.forEach((fn) => fn && fn());
        },
      };
    },
  },
  {
    type: "onblur",
    name: "失去焦点",
    execute: (handlers: Function[]) => {
      return {
        onBlur: () => {
          handlers.forEach((fn) => fn && fn());
        },
      };
    },
  },
  {
    type: "onchange",
    name: "值改变",
    execute: (handlers: Function[]) => {
      return {
        onChange: () => {
          handlers.forEach((fn) => fn && fn());
        },
      };
    },
  },
];

class createEventConfig {
  public handlerMap: Map<string, handlerConfig>; //执行动作映射表
  public eventMap: Map<string, eventsConfig>; //事件映射表

  constructor(
    handlerMap: Map<string, handlerConfig> = new Map(),
    eventMap: Map<string, eventsConfig> = new Map()
  ) {
    this.handlerMap = handlerMap;
    this.eventMap = eventMap;
  }

  //获取渲染的事件函数
  getRenderEvents(events: any) {
    return events.reduce((pre: any, cur: any) => {
      return Object.assign(
        pre, 
        this.eventMap.get(cur.type).execute(
          cur.list.map((item: any) => {
            return this.handlerMap.get(item.title).handler(item);
          })
        )
      );
    }, {});
  }

  register(item: any, isEvent: boolean = false) {
    //注册事件
    if (isEvent) {
      this.eventMap.set(item.type, item);
    } else {
      this.handlerMap.set(item.type, item);
    }
  }
}

export const eventConfig = new createEventConfig();

//注册执行动作
for (let handler of handlerConfigList) {
  //遍历声明的执行动作并注册
  eventConfig.register({
    type: handler.type,
    instructions: handler.instructions,
    defaultData: handler.defaultData,
    handler: handler.handler,
  });
}

//注册事件
for (let event of eventsConfigList) {
  //遍历声明的事件并注册
  eventConfig.register(
    {
      type: event.type,
      name: event.name,
      execute: event.execute,
    },
    true
  );
}
