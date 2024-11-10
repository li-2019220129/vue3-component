<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', isSelected),
      bem.is('disabled', node?.disabled as boolean),
    ]"
    :style="{ top: `${top}px` }"
  >
    <div
      @click="handleSelect"
      :class="[bem.e('content')]"
      :style="{ paddingLeft: `${(node?.level || 0) * 20}px` }"
    >
      <span
        @click.stop="handleClick"
        :class="[
          bem.e('expand-icon'),
          {
            expanded: expanded && !node?.isLeaf,
            'is-leaf': bem.is('leaf', node?.isLeaf as boolean),
          },
        ]"
      >
        <lzy-icon :size="14" color="#a8abb2"
          ><Switcher v-if="!isLoading" /><Loading v-else
        /></lzy-icon>
      </span>
      <lzy-checkbox
        :model-value="checked"
        :disabled="disabled"
        :indeterminate="indeterminate"
        v-if="showCheckbox"
        @change="handleCheckedChange"
      />
      <span :class="bem.e('text')"><lzy-tree-node-content :node="node" /></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { treeInjectKey, treeNodeEmits, treeNodeProps } from "./tree";
import { createNamespace } from "@lzy/utils/create";
import Switcher from "@lzy/components/internal-icon/Switcher";
import Loading from "@lzy/components/internal-icon/Loading";
import LzyTreeNodeContent from "./tree-node-content";

import LzyIcon from "@lzy/components/icon";
import LzyCheckbox from "@lzy/components/checkbox";
import type { Key, TreeNode } from "./tree";
import { computed, watch, onBeforeUpdate } from "vue";

onBeforeUpdate(() => {
  console.log("upload");
});

const bem = createNamespace("tree-node");
const props = defineProps(treeNodeProps);

const emit = defineEmits(treeNodeEmits);

const isLoading = computed(() => {
  return props.loadingKey?.has(props.node?.key as Key);
});
const isSelected = computed(() => {
  return props.selectKeys?.includes(props.node?.key as Key);
});
watch(
  () => isSelected.value,
  () => {
    console.log(isSelected.value, "isSelected");
  }
);

const handleClick = () => {
  if (props.node!.isLeaf) {
    return;
  }
  emit("toggle", props.node as TreeNode);
};
const handleSelect = () => {
  if (props.node?.disabled) {
    return;
  }
  emit("select", props.node as TreeNode);
};

const handleCheckedChange = (value) => {
  emit("change", value, props.node!);
};
// const treeContext = inject(treeInjectKey);
</script>
<style scoped></style>
