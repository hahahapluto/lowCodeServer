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
        <ElInput
          v-model={props.option.value}
          style={props.option.style}
          size={props.option.size}
          type={props.option.inputStyle}
          placeholder={props.option.placeholder}
          showPassword={props.option.showPassword}
          clearable={props.option.clearable}
          show-word-limit={props.option.showWordLimit}
          disabled={props.option.disabled}
          readonly={props.option.readonly}
          // @ts-ignore
          autofocus={props.option.autofocus}
          maxlength={props.option.maxlength}
          minlength={props.option.minlength}
          {...props.events}
        ></ElInput>
      );
    };
  },
});
