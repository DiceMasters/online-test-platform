<script lang="ts" setup>
import type {PropType} from 'vue'
import {Codemirror} from 'vue-codemirror'
import {html} from '@codemirror/lang-html'
import {css} from '@codemirror/lang-css'
import {oneDark} from '@codemirror/theme-one-dark'

// defines
const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
const extensions = [html(), css(), oneDark]

// methods
function onUpdate (value: string) {
  emit('update:modelValue', value)
}
</script>

<template>
  <codemirror
    placeholder="Code goes here..."
    :modelValue="modelValue"
    :style="{height: '400px'}"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @update:modelValue="onUpdate"
  />
</template>
