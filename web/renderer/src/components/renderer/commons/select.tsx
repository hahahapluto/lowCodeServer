import { defineComponent } from "vue";
import { ElSelect } from "element-plus";
export default defineComponent({
  props: {
    option: { type: Object },
    events: { type: Object },
  },
  setup(props) {
    return () => {
      return (
        <ElSelect
            style={props.option.style}
            filterable={props.option.filterable ? props.option.filterable : false}
            placeholder={props.option.placeholder ? props.option.placeholder : "请选择"}
            v-model={props.option.defaultValue}
            {...props.events}
          >
            {props.option.selectData &&
              props.option.selectData.map((item: any) => {
                return (
                  <el-option key={item.value} value={item.value}></el-option>
                );
              })}
          </ElSelect>
      );
    };
  },
});
