//列表区显示所有物料
//type对应组件的映射关系
import { ElButton } from "element-plus";
import Container from "../components/renderer/container";
import {
  RdInput,
  RdSelect,
  RdtextBox,
  RdmultilineText,
} from "../components/renderer/index";
import { eventConfig } from "./event-config.tsx";
import IconConfig from "./IconConfig";
const componentsConfig = [
  {
    label: "容器",
    icon: "icon iconfont icon-checkbox",
    type: "container-ordinary",
    category: "container",
    render(props: any) {
      const { children, childrenList } = props;
      props = {
        node: props.node,
        children: children || [],
        childrenList: childrenList,
        style: props.node.style,
        text: "容器",
        class: "container-ordinary",
        "data-key": props.id,
        events: props.node?.events
          ? eventConfig.getRenderEvents(props.node.events)
          : {},
      };
      return <Container {...props}></Container>;
    },
    defaultData: {
      type: "container-ordinary",
      style: {
        position: "relative",
        width: "100%",
        zIndex: 1,
      },
      children: [],
    },
  },
  {
    label: "自由容器",
    icon: "icon iconfont icon-zidingyibuju",
    type: "container-free",
    category: "container",
    render(props: any) {
      const { children, childrenList } = props;
      props = {
        node: props.node,
        children: children || [],
        childrenList: childrenList,
        style: props.node.style,
        text: "自由容器",
        class: "container-free",
        "data-key": props.id,
        events: props.node?.events
          ? eventConfig.getRenderEvents(props.node.events)
          : {},
      };
      return <Container {...props}></Container>;
    },
    defaultData: {
      type: "container-free",
      style: {
        position: "relative",
        width: "100%",
        zIndex: 1,
      },
      children: [],
    },
  },
  {
    label: "文字",
    icon: "icon iconfont icon-font",
    type: "text",
    category: "common",
    render(props: any) {
      let events = props.node?.events
        ? eventConfig.getRenderEvents(props.node.events)
        : {};
      return (
        <div class="cannotPreview" data-key={props.id}>
          <span style={props.node.style} {...events} datatype="text">
            {props.node.children ? props.node.children : "渲染文字"}
          </span>
        </div>
      );
    },
    defaultData: {
      type: "text",
      style: {
        position: "relative",
        fontSize: "16px",
        color: "black",
        zIndex: 1,
      },
      children: "渲染文字",
    },
  },
  {
    label: "按钮",
    icon: "icon iconfont icon-anniu",
    type: "button",
    category: "common",
    render(props: any) {
      let events = props.node?.events
        ? eventConfig.getRenderEvents(props.node.events)
        : {};
      return (
        <div class="cannotPreview" data-key={props.id}>
          <ElButton
            style={props.node.style}
            class="baseButton"
            type={props.node.buttonstyle}
            size={props.node.size}
            disabled={props.node.isDisable}
            {...events}
          >
            <i
              class={["icon iconfont leftIcon", props.node.icon.leftIcon]}
              style={{ "font-size": props.node.icon.leftIconSize }}
            ></i>
            {props.node.children ? props.node.children : "渲染按钮"}
            <i
              class={["icon iconfont rightIcon", props.node.icon.rightIcon]}
              style={{ "font-size": props.node.icon.rightIconSize }}
            ></i>
          </ElButton>
        </div>
      );
    },
    defaultData: {
      type: "button",
      style: {
        position: "relative",
        width: "87px",
        height: "32px",
        zIndex: 1,
      },
      buttonstyle: "", // 按钮类型
      size: "default", // 按钮大小
      icon: {}, // 左右侧图标
      twiceComfire: {}, // 二次确认
      bubblePrompt: {}, // 气泡提示
      isDisable: false, // 是否禁用
      children: "渲染按钮",
    },
  },
  {
    label: "输入框",
    icon: "icon iconfont icon-input",
    type: "input",
    category: "common",
    render(props: any) {
      let events = props.node?.events
        ? eventConfig.getRenderEvents(props.node.events)
        : {};

      return (
        <div class="cannotPreview" data-key={props.id}>
          <RdInput option={props.node} events={events}></RdInput>
        </div>
      );
    },
    defaultData: {
      type: "input",
      value: "", // 默认值
      inputStyle: "text", // 输入框类型
      size: "default", // 输入框尺寸
      placeholder: "请输入", // 占位提示
      showPassword: false, // 是否可以隐藏密码
      clearable: false, // 是否可以清除
      showWordLimit: false, // 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效
      disabled: false, // 是否可清空
      readonly: false, // 原生属性，是否只读
      autofocus: false, //原生属性，自动获取焦点
      style: {
        position: "relative",
        zIndex: 1,
      },
      children: "",
    },
  },
  {
    label: "下拉框",
    icon: "icon iconfont icon-m-xialacaidan",
    type: "select",
    category: "common",
    render(props: any) {
      let events = props.node?.events
        ? eventConfig.getRenderEvents(props.node.events)
        : {};
      return (
        <div class="cannotPreview" data-key={props.id}>
          <RdSelect option={props.node} events={events}></RdSelect>
        </div>
      );
    },
    defaultData: {
      type: "select",
      style: {
        position: "relative",
        zIndex: 1,
      },
      children: "",
      defaultValue: "",
    },
  },
  {
    label: "文本框",
    icon: "icon iconfont icon-wenben",
    type: "textBox",
    category: "form",
    render(props: any) {
      let events = props.node?.events
        ? eventConfig.getRenderEvents(props.node.events)
        : {};
      return (
        <div
          class="cannotPreview"
          style={props.node.style.box}
          data-key={props.id}
        >
          <RdtextBox option={props.node} events={events}></RdtextBox>
        </div>
      );
    },
    defaultData: {
      value: "",
      type: "textBox",
      title: "文本",
      style: {
        box: {
          display: "block",
        },
        title: {},
        input: {},
      },
      children: "",
    },
  },
  {
    label: "多行文本框",
    icon: "icon iconfont icon-duohangwenben1",
    type: "multilineText",
    category: "form",
    render(props: any) {
      let events = props.node?.events
        ? eventConfig.getRenderEvents(props.node.events)
        : {};
      return (
        <div
          class="cannotPreview"
          style={props.node.style.box}
          data-key={props.id}
        >
          <RdmultilineText
            option={props.node}
            events={events}
          ></RdmultilineText>
        </div>
      );
    },
    defaultData: {
      value: "",
      type: "multilineText",
      title: "多行文本",
      style: {
        box: {
          display: "block",
        },
        title: {},
        input: {},
      },
      children: "",
      autosize: {
        minRows: 2,
        maxRows: 6,
      },
    },
  },
];

interface componentConfig {
  label: String; //标签
  type: string; //类型
  category: String; //类别
  defaultData: Object; //默认数据
  display: boolean; //预览搜索显示
  render: (props: any) => any; //返回渲染组件函数
}

class createEditorConfig {
  public componentList: Array<componentConfig>; //组件数组
  public componentMap: Map<string, componentConfig>; //组件映射表
  public iconList: Array<componentConfig>; //图标数组

  constructor(
    componentList: Array<componentConfig> = [],
    componentMap: Map<string, componentConfig> = new Map(),
    iconList: Array<componentConfig> = []
  ) {
    this.componentList = componentList;
    this.componentMap = componentMap;
    this.iconList = iconList;
  }

  register(component: componentConfig, isIcon: boolean = false) {
    //注册组件
    if (isIcon) {
      this.iconList.push(component);
    } else {
      this.componentList.push(component);
    }

    this.componentMap.set(component.type, component);
  }
}

export const editorConfig = new createEditorConfig();
//注册组件
for (let block of componentsConfig) {
  //遍历声明的组件并注册
  editorConfig.register({
    label: block.label,
    type: block.type,
    category: block.category,
    defaultData: block.defaultData,
    display: true,
    render: (props) => block.render(props),
  });
}
//注册图标
for (let item of IconConfig) {
  editorConfig.register(
    {
      label: item.label,
      type: "icon",
      category: "icon",
      display: true,
      defaultData: {
        icon: item.icon,
        type: "icon",
        style: {
          position: "relative",
          fontSize: "16px",
          color: "black",
          zIndex: 1,
        },
        children: "",
      },
      render: (props: any) => {
        return (
          <div class="cannotPreview" data-key={props.id}>
            <i class={props.node.icon} style={props.node.style}></i>
          </div>
        );
      },
    },
    true
  );
}
