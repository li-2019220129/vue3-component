import { PropType, ExtractPropTypes, SetupContext, InjectionKey } from "vue";

export type Key = number | string;

export interface TreeNode extends Required<TreeOptions> {
  level: number;
  rowNode: TreeOptions;
  children: TreeNode[];
  isLeaf: boolean;
  parentKey: Key | undefined;
}
export interface TreeOptions {
  label?: Key;
  children?: TreeOptions[];
  key?: Key;
  isLeaf?: boolean;
  disabled?: boolean;
  [key: string]: unknown;
}

export const TreeProps = {
  data: {
    type: Array as PropType<TreeOptions[]>,
    default: () => [],
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  labelField: {
    type: String,
    default: "label",
  },
  childrenField: {
    type: String,
    default: "children",
  },
  keyField: {
    type: String,
    default: "key",
  },
  onLoad: {
    type: Function as PropType<(node: TreeOptions) => Promise<TreeOptions[]>>,
  },
  selectKeys: {
    type: Array as PropType<Key[]>,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  selectable: {
    type: Boolean,
    default: true,
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  defaultCheckKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
} as const;

export const treeNodeProps = {
  top: {
    type: Number,
  },
  node: {
    type: Object as PropType<TreeNode>,
    require: true,
  },
  expanded: {
    type: Boolean,
    require: true,
  },
  loadingKey: {
    type: Object as PropType<Set<Key>>,
    require: true,
  },
  selectKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  checked: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  indeterminate: {
    type: Boolean,
  },
};

export const treeNodeEmits = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node,
  change: (value: boolean, node: TreeNode) => typeof value && node,
};
export const treeEmits = {
  "update:selectKeys": (keys: Key[]) => keys,
};
export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>;
export type propsType = Partial<ExtractPropTypes<typeof TreeProps>>;

export interface TreeContext {
  slots: SetupContext["slots"];
}

export const treeInjectKey: InjectionKey<TreeContext> = Symbol("treeInjectKey");

export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    require: true,
  },
};
