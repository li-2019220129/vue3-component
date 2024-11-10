import { PropType, ExtractPropTypes } from "vue";

//这里面准备组件相关的属性和ts类型
export const IconProps = {
  size: [Number, String] as PropType<number | string>,
  color: String,
} as const;

export type IconPropsType = ExtractPropTypes<typeof IconProps>;
