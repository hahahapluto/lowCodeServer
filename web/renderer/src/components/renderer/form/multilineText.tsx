import { defineComponent } from "vue";
import { ElInput } from "element-plus";

export default defineComponent({
  props: {
    option: { type: Object },
    events: { type: Object },
  },
  setup(props) {
    return () => {
      return (
        <>
          <div style={props.option.style.title}>
            {props.option.title ? props.option.title : "多行文本"}
          </div>
          <ElInput
            v-model={props.option.value}
            style={props.option.style.input}
            type="textarea"
            placeholder={
              props.option.inputBoxPlaceholder
                ? props.option.inputBoxPlaceholder
                : ""
            }
            clearable={props.option.clearable ? props.option.clearable : false}
            // @ts-ignore
            rows={props.option.autosize.minRows}
            {...props.events}
          ></ElInput>
        </>
      );
    };
  },
});
