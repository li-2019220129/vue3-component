<template>
  <div :class="bem.b()">
    <lzy-virtual-list :items="flatterNodes" :remain="8" :size="30.67">
      <template #default="{ node, top }">
        <lzy-tree-node
          :key="node.key"
          :node="node"
          :top="top"
          :expanded="isExpanded(node)"
          @toggle="toggleExpand"
          :loadingKey="loadingKeysSet"
          @select="handleSelect"
          :selectKeys="selectedKeyRef"
          :show-checkbox="showCheckbox"
          :checked="isChecked(node)"
          :disabled="isDisabled(node)"
          :indeterminate="isIndeterminate(node)"
          @change="handleCheckChange"
        >
        </lzy-tree-node>
      </template>
    </lzy-virtual-list>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, useSlots, provide, onMounted, computed } from "vue";
import { TreeProps, TreeNode, TreeOptions, Key, treeInjectKey } from "./tree";
import { createNamespace } from "@lzy/utils/create";
import LzyTreeNode from "./treenode.vue";
import LzyVirtualList from "@lzy/components/virtual-list";
const props = defineProps(TreeProps);
const bem = createNamespace("tree");
defineOptions({ name: "LzyTree" });

const tree = ref<TreeNode[]>([]);

const createOptions = (label: string, key: string, children: string) => {
  return {
    getKey(node) {
      return node[key] as Key;
    },
    getLabel(node) {
      return node[label] as Key;
    },
    getChildren(node) {
      return node[children] as TreeOptions[];
    },
  };
};

const treeOptions = createOptions(
  props.labelField,
  props.keyField,
  props.childrenField
);

//根据用户传递的数据来创建一个自己需要的数据
const createTree = (data: TreeOptions[], parent: TreeNode | null = null) => {
  const traversal = (data: TreeOptions[], parent: TreeNode | null = null) => {
    return data.map((node) => {
      const children = treeOptions.getChildren(node) || [];
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        rowNode: node,
        disabled: node.disabled ?? false,
        level: parent ? parent.level + 1 : 0,
        children: [],
        parentKey: parent?.key || undefined,
        isLeaf: node.isLeaf ?? children.length === 0,
      };
      if (children.length > 0) {
        treeNode.children = traversal(children, treeNode);
      }
      return treeNode;
    });
  };
  const result: TreeNode[] = traversal(data, parent);
  return result;
};

watch(
  () => props.data,
  (value: TreeOptions[]) => {
    tree.value = createTree(value);
  },
  {
    immediate: true,
  }
);

//为了实现虚拟列表功能，所以需要扁平化处理
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys));

const flatterNodes = computed(() => {
  const result: TreeNode[] = [];
  const treeNode = tree.value;
  const stack: TreeNode[] = [];
  for (let i = treeNode.length - 1; i >= 0; i--) {
    stack.push(treeNode[i]);
  }
  while (stack.length) {
    const node: TreeNode = stack.pop() as TreeNode;
    result.push(node);
    if (expandedKeysSet.value.has(node.key)) {
      for (let i = node["children"].length - 1; i >= 0; i--) {
        stack.push(node["children"][i]);
      }
    }
  }
  //递归方法（简单但是考虑性能应该使用迭代方式）
  // const deepNode = (treeNode: TreeNode[], result: TreeNode[]) => {
  //   for (let i = 0; i < treeNode.length; i++) {
  //     const node = treeNode[i];
  //     result.push(node);
  //     if (expandedKeysSet.value.has(node.key)) {
  //       deepNode(node.children, result);
  //     }
  //   }
  // };
  // deepNode(treeNode, result);
  console.log(result);

  return result;
});

const isExpanded = (node: TreeNode) => {
  return expandedKeysSet.value.has(node.key);
};

//折叠处理
const collpase = (node: TreeNode) => {
  expandedKeysSet.value.delete(node.key);
};

const loadingKeysSet = ref(new Set<Key>());

//处理异步加载
const toggleLoading = (node: TreeNode) => {
  if (!node.children.length && !node.isLeaf) {
    if (!loadingKeysSet.value.has(node.key)) {
      loadingKeysSet.value.add(node.key);
      if (props.onLoad) {
        props.onLoad(node.rowNode).then((res) => {
          node.rowNode.children = res;
          node.children = createTree(res, node);
          loadingKeysSet.value.delete(node.key);
        });
      }
    }
  }
};

// 展开处理;
const expand = (node: TreeNode) => {
  expandedKeysSet.value.add(node.key);
  toggleLoading(node);
};

//点击做的处理，需要对展开和收缩做处理
const toggleExpand = (node: TreeNode) => {
  expandedKeysSet.value.has(node.key) && !loadingKeysSet.value.has(node.key)
    ? collpase(node)
    : expand(node);
};

//实现选中节点
const selectedKeyRef = ref<Key[]>([]);

const emit = defineEmits(["update:selectKeys"]);
watch(
  () => props.selectKeys,
  (value) => {
    selectedKeyRef.value = value || [];
  },
  {
    immediate: true,
  }
);

const handleSelect = (node: TreeNode) => {
  let res = Array.from(selectedKeyRef.value);
  if (!props.selectable) return;
  if (props.multiple) {
    const index = res.findIndex((item) => item === node.key);
    if (index !== -1) {
      res.splice(index, 1);
    } else {
      res.push(node.key);
    }
  } else {
    if (res.includes(node.key)) {
      res = [];
    } else {
      res = [node.key];
    }
  }
  emit("update:selectKeys", res);
};
provide(treeInjectKey, {
  slots: useSlots(),
});

const checkedKeysRefs = ref(new Set(props.defaultCheckedKeys));

const isChecked = (node: TreeNode) => {
  return checkedKeysRefs.value.has(node.key);
};
const isDisabled = (node: TreeNode) => {
  return node.disabled;
};

const isIndeterminateRefs = ref(new Set());
const isIndeterminate = (node: TreeNode) => {
  return isIndeterminateRefs.value.has(node.key);
  let children = node.children.filter((item) => !item.disabled);
  if (children) {
    return (
      children.some((item) => {
        return isChecked(item) || isIndeterminate(item);
      }) && !children.every((item) => isChecked(item))
    );
  }
  return false;
};
const deepChildren = (node: TreeNode, type: string) => {
  if (node.children.length && !node.isLeaf) {
    node.children.forEach((item) => {
      if (!item.disabled) {
        checkedKeysRefs.value[type](item.key);
        type === "add" && isIndeterminateRefs.value.delete(item.key);
        deepChildren(item, type);
      }
    });
  }
};

const updateCheck = (node: TreeNode) => {
  if (node.parentKey) {
    let parentNode = findNode(node.parentKey);
    console.log(parentNode);
    while (parentNode) {
      let allCheck = true;
      let hasCheck = false;
      parentNode.children.forEach((node) => {
        if (!node.disabled) {
          if (checkedKeysRefs.value.has(node.key)) {
            hasCheck = true;
            if (!allCheck) return;
            allCheck = true;
          } else if (isIndeterminateRefs.value.has(node.key)) {
            allCheck = false;
            hasCheck = true;
          } else {
            allCheck = false;
          }
        }
      });
      if (allCheck) {
        checkedKeysRefs.value.add(parentNode.key);
        isIndeterminateRefs.value.delete(parentNode.key);
      } else if (hasCheck) {
        isIndeterminateRefs.value.add(parentNode.key);
        checkedKeysRefs.value.delete(parentNode.key);
      } else {
        isIndeterminateRefs.value.delete(parentNode.key);
        checkedKeysRefs.value.delete(parentNode.key);
      }
      parentNode = findNode(parentNode.parentKey!);
    }
  }
};
const handleCheckChange = (val: boolean, node: TreeNode) => {
  if (val) {
    isIndeterminateRefs.value.delete(node.key);
    checkedKeysRefs.value.add(node.key);
    deepChildren(node, "add");
  } else {
    checkedKeysRefs.value.delete(node.key);
    deepChildren(node, "delete");
  }
  updateCheck(node);
};
const findNode = (key: Key) => {
  return flatterNodes.value.find((item) => item.key === key);
};
onMounted(() => {
  props.defaultCheckKeys.forEach((key) => {
    console.log(key, "key");
    const node = findNode(key);
    if (node) {
      checkedKeysRefs.value.add(node.key);
      deepChildren(node, "add");
    }
  });
});
</script>
<style scoped></style>
