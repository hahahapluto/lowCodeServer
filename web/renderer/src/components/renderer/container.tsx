import "@/sass/editor/EditorContainer.scss";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  props: {
    style: Object, //样式
    children: Object, //子节点
    childrenList: Array<Object>, //子节点json数据
    text: String, //无组件时显示的文本内容
    class: String, //类名
    events:Object,//事件
    node:Object
  },
  setup(props) {
    let containerRef = ref(null);
    onMounted(() => {
      containerRef.value.attributes.childrenList = props.childrenList;
    });
    return () => {
      return (
        <div
          class={props.class}
          style={props.style}
          ref={containerRef}
          {...props.events}
        >
          {props?.children.length != 0 && props.children}
          {props?.node.children.length == 0 && <span class="nochild">{props.text}</span>}
        </div>
      );
    };
  },
});
