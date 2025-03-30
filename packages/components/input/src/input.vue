<template>
  <div @mouseenter="handleMouseenter" @mouseleave="handleMouseLeave" style="width: 240px" :class="[bem.b(),bem.is('disabled',disabled)]">
    <div :class="[bem.e('wrapper'), bem.is('focus',isFocus)]">
      <input :maxlength="maxlength" ref="inputRef" 
        v-model="model" 
        :disabled="disabled" 
        :readonly="readonly" 
        @input="handleInput"  
        :placeholder="placeholder" 
        @focus="handleFocus" 
        @blur="handleBlur"
        @change="handleChange"
        :type="typeComputed" 
        :class="bem.e('inner')">
      </input>
      <span v-if="showPassword || clearable"  :class="bem.e('suffix')">
        <span :class="bem.em('suffix','inner')">
         <lzy-icon v-if="slots.suffix" :class="bem.e('icon')" :size="16" color="#a8abb2"
          ><slot name="suffix"></slot>
        </lzy-icon>
          <lzy-icon @click="handleClear"  v-if="showComputed" :class="[bem.e('icon'),bem.e('clear')]" :size="16" color="#a8abb2"
          ><Clear/>
        </lzy-icon>
        <lzy-icon @click="handleCheckStatus" v-if="showPassword&&model" :class="[bem.e('icon'),bem.e('password')]" :size="16" color="#a8abb2"
          >
          <IsPassword v-if="isPassword" />
          <NoPassword v-else />
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
import IsPassword from '@lzy/components/internal-icon/IsPassword'
import NoPassword from '@lzy/components/internal-icon/NoPassword'
import {ref,computed,useSlots,inject} from 'vue'
import { formItemContextKey } from '../../form';
type TargetElement = HTMLInputElement | HTMLTextAreaElement
const bem = createNamespace("input");
const props= defineProps(inputProps);
const emits = defineEmits(inputEmits)
const isFocus = ref(false)
const isHover = ref(false)
const isPassword = ref(true)
const inputRef = ref()
const slots = useSlots()
const model = defineModel()
const formItemContext = inject(formItemContextKey)
defineOptions({
  name:'lzy-input'
})


const showComputed = computed(()=>{
  return  model.value && props.clearable  && !props.disabled  && (isHover.value || isFocus.value)
})
const  typeComputed = computed(()=>{
  return props.type || props.showPassword && isPassword.value ? 'password' : 'text'
})

/**
 * @description 显隐密码切换
 * @param {} 
 * @returns {void} - 无返回值
 */
const handleCheckStatus = ()=>{
  isPassword.value = !isPassword.value
  inputRef.value.focus()
}

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
  formItemContext?.validate('blur').catch(err=>{})
  console.log(blurEvent,'blur');
  isFocus.value = false;
  emits('blur',blurEvent)
}

/**
 * @description input事件处理
 * @param {FocusEvent} blurEvent - input事件对象
 * @returns {void} - 无返回值
 */
const handleInput = (e:Event)=>{
  formItemContext?.validate('change').catch(err=>{})
  emits('input', (e.target as TargetElement).value)
}
const handleChange = (e:Event)=>{
  emits('change',(e.target as TargetElement).value)
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
