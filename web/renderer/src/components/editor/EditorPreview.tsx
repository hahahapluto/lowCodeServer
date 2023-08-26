import "@/sass/editor/EditorContainer.scss";
import "@/sass/editor/EditorPreview.scss";
import { defineComponent } from "vue";
import { renderer } from "../../hooks/useRender.ts";

export default defineComponent({
  props: {
    EditorData: Object,
  },
  setup(props) {
    return () => {
      return (
        <div class="EditorPreview">
          <div id="body" style={props.EditorData.style}>
          {renderer(props.EditorData.body)}
          </div>
        </div>
      );
    };
  },
});
