import { h, defineComponent, inject } from "vue";
import { treeInjectKey, treeNodeContentProps } from "./tree";
export default defineComponent({
  name: "LzyTreeNodeContent",
  props: treeNodeContentProps,
  setup(props) {
    const treeContext = inject(treeInjectKey);
    return () => {
      return treeContext?.slots.default
        ? treeContext?.slots.default({ node: props.node })
        : props.node?.label;
    };
  },
});
