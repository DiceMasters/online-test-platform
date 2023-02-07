<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div v-html="icon" class="c-icon"/>
</template>

<style lang="scss">
.c-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
