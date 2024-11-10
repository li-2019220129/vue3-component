
<template>
  <div @mouseenter="handleMouseenter" @mouseleave="handleMouseLeave" style="width: 240px" :class="[bem.b(),bem.is('disabled',disabled)]">
    <div :class="[bem.e('wrapper'), bem.is('focus',isFocus)]">
      <input v-model="model" :disabled="disabled" @input="handleInput"  :placeholder="placeholder" @focus="handleFocus" @blur="handleBlur" :type="type" :class="bem.e('inner')"></input>
      <span v-if="showComputed" :class="bem.e('suffix')">
        <span @click="handleClear" :class="bem.em('suffix','inner')">
          <lzy-icon :size="16" color="#a8abb2"
          ><Clear/>
        </lzy-icon>
        </span> 
      </span>
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { inputProps,inputEmits } from './input'
import { createNamespace } from "@lzy/utils/create";
import LzyIcon from "@lzy/components/icon";
import Clear from '@lzy/components/internal-icon/Clear'
import {ref,computed} from 'vue'

const bem = createNamespace("input");
const props= defineProps(inputProps);
const emits = defineEmits(inputEmits)
const isFocus = ref(false)
const isHover = ref(false)
const model = defineModel()
defineOptions({
  name:'lzy-input'
})


const showComputed = computed(()=>{
  return  model.value && props.clearable &&!props.disabled  && (isHover.value || isFocus.value)
})
/**
 * @description input获取焦点事件处理
 * @param {FocusEvent} focusEvent - 聚焦事件对象
 * @returns {void} - 无返回值
 */
const handleFocus =(focusEvent: FocusEvent)=>{
  isFocus.value = true
  emits('focus',focusEvent)
}

/**
 * @description input失去焦点事件处理
 * @param {FocusEvent} blurEvent - 失焦事件对象
 * @returns {void} - 无返回值
 */
const handleBlur = (blurEvent:FocusEvent)=>{
  console.log(blurEvent,'blur');
  
  isFocus.value = false;
  emits('blur',blurEvent)
}

/**
 * @description input事件处理
 * @param {FocusEvent} blurEvent - input事件对象
 * @returns {void} - 无返回值
 */
const handleInput = (value:string)=>{
  emits('input',value)
}

const handleMouseenter = ()=>{
  isHover.value = true
}
const handleMouseLeave = () =>{
  isHover.value = false
}
const handleClear  =()=>{
  console.log('clear')
  model.value = ''
}
</script>
<style scoped></style>
