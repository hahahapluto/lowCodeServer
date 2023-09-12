import "@/sass/editor/EditorContainer.scss";
import "@/sass/editor/EditorPreview.scss";
import { defineComponent,reactive } from "vue";
import { editorConfig } from "../../utils/editor-config";

export default defineComponent({
  props: {
    EditorData: Object,
  },
  setup(props) {
    interface nodeProps {
      children?: any;
      style: Object;
      childrenList?: Array<Object>;
      [key: string]: any; //动态添加新属性
    }

    const mapRenderer = (key: string): any => {
      let nodes = props.EditorData.get(key)
      if (nodes.children instanceof Array) {
        //判断节点是否为数组
        return nodes.children.map((nodekey:string) => {
          let children = mapRenderer(nodekey); //利用递归获取子节点
          let node = props.EditorData.get(nodekey)
          let nodeprops: nodeProps = reactive({
            node:node,
            id:nodekey,
            style: node.style,
          }); //配置
          if (node.type.includes("container")) {
            nodeprops.children = children;
            nodeprops.childrenList = node.children; //如果为容器就将子组件的数据添加进去
          }
          return editorConfig.componentMap.get(node.type)?.render(nodeprops);
        });
      }
    };


    return () => {
      return (
        <div class="EditorPreview">
          <div id="body" style={props.EditorData.get('page').style}>
          {mapRenderer('page')}
          </div>
        </div>
      );
    };
  },
});
