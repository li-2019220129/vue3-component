<script setup lang="ts">
import { Key, TreeNode, TreeOptions } from "@lzy/components/tree";
import { GameController } from "@vicons/ionicons5";
import { Values } from "async-validator";
import { ref, reactive } from "vue";
import type { FormInstance } from "@lzy/components/form";
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
const state = reactive({
  name: "",
  password: "",
});
const formRef = ref<FormInstance>();

const handleSubmit = () => {
  formRef.value!.validate((validate, errors) => {
    console.log(validate, errors);
  });
};
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
    <lzy-form
      ref="formRef"
      :model="state"
      :rules="{
        name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur'],
          },
        ],
      }"
    >
      <lzy-form-item
        label="用户名"
        prop="name"
        :rules="[
          {
            min: 6,
            max: 10,
            message: '用户名至少6到10位',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <lzy-input
          v-model="state.name"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
          maxlength="10"
          placeholder="请输入内容"
        >
        </lzy-input>
      </lzy-form-item>
      <lzy-form-item
        label="密码"
        prop="password"
        :rules="[
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur'],
          },
        ]"
      >
        <lzy-input
          show-password
          v-model="state.password"
          placeholder="请输入内容"
        >
        </lzy-input>
      </lzy-form-item>
    </lzy-form>
    <lzy-button @click="handleSubmit">提交</lzy-button>
  </div>
</template>

<style>
#app {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}
</style>
