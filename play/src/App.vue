<script setup lang="ts">
import { Key, TreeNode, TreeOptions } from "@lzy/components/tree";
import { GameController } from "@vicons/ionicons5";
import { ref } from "vue";
const createData = (level: number = 4, parentKey: string = ""): any[] => {
  if (!level) return [];
  let arr = new Array(5 - level).fill(0);
  return arr.map((_, index) => {
    const key = `${parentKey}${level}${index}`;
    return {
      disabled: index === 2,
      label: `${level}-${index}`,
      key,
      children: createData(level - 1, key),
    };
  });
};

// function createData() {
//   return [
//     {
//       label: nextLabel(),
//       key: 1,
//       isLeaf: false, // 这里isLeaf 为false 表示
//     },
//     { label: nextLabel(), key: 2, isLeaf: false },
//   ];
// }
// function nextLabel(currentLabel?: Key): string {
//   if (!currentLabel) {
//     return "Out of Tao, One is born";
//   }
//   if (currentLabel === "Out of Tao, One is born") {
//     return "Out of One, Two";
//   }
//   if (currentLabel === "Out of One, Two") {
//     return "Out of Two, Three";
//   }
//   if (currentLabel === "Out of Two, Three") {
//     return "Out of Three, the created universe";
//   }
//   if (currentLabel === "Out of Three, the created universe") {
//     return "Out of Tao, One is born";
//   }
//   return "";
// }

const treeData = ref(createData());

// const handleLoad = (node: TreeOptions) => {
//   return new Promise<TreeOptions[]>((resolve) => {
//     setTimeout(() => {
//       resolve([
//         {
//           label: nextLabel(node.label),
//           key: node.key + "1",
//           isLeaf: false,
//         },
//         {
//           label: nextLabel(node.label),
//           key: node.key + "2",
//           isLeaf: false,
//         },
//       ]);
//     }, 1000);
//   });
// };
console.log(treeData.value);
const value = ref<Key[]>(["40"]);

const checkValue = ref(true);
// const handleChange = (value: boolean) => {
//   console.log(value);
// };

const handleButtonClick = (e: any) => {
  console.log(e, "909099");
};

const handleFocus = (e: FocusEvent) => {
  console.log(e);
};

const handleBlur = (e: FocusEvent) => {
  console.log(e);
};

const handleInput = (value: string) => {
  console.log(value, "input");
};
const inputValue = ref("1212");
</script>
<template>
  <lzy-tree
    :data="treeData"
    label-field="label"
    key-field="key"
    children-field="children"
    v-model:select-keys="value"
    :default-check-keys="['40']"
    selectable
    show-checkbox
  >
  </lzy-tree>
  <lzy-icon color="red" :size="20">
    <GameController></GameController>
  </lzy-icon>
  <lzy-icon color="yellow" :size="20">
    <GameController></GameController>
  </lzy-icon>

  {{ checkValue }}
  <lzy-checkbox :model-value="true" indeterminate label="121212"></lzy-checkbox>
  <lzy-button @click="handleButtonClick">
    <template #icon>
      <lzy-icon :size="20">
        <GameController></GameController>
      </lzy-icon>
    </template>
    121212
  </lzy-button>
  <div style="margin-top: 10px">
    <lzy-input
      v-model="inputValue"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      clearable
      disabled
      placeholder="请输入内容"
    >
    </lzy-input>
  </div>
</template>

<style>
#app {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}
</style>
