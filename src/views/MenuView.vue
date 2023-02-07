<script lang="ts" setup>
import { NSpace, NButton, NIcon, useMessage } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'

import Icon from './../components/Icon.vue'
import pack from './../data/pack.json'

const router = useRouter()
const route = useRoute()
const message = useMessage()

onMounted(() => {
  if (route.params.error) {
    message.error(route.params.error as string)
  }
})

function onStart (type: string) {
  router.push(`/test/${type}`)
}
</script>

<template>
  <div class="v-menu">
    <div class="v-menu__content">
      <n-space vertical :size="12">
        <n-button
          v-for="el in pack"
          :key="el.type"
          ghost
          @click="onStart(el.type)"
        >
          <template #icon>
            <n-icon>
              <Icon :icon="el.icon"/>
            </n-icon>
          </template>

          {{ el.title }}
        </n-button>
      </n-space>
    </div>
  </div>
</template>

<style lang="scss">
.v-menu {
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;

  overflow-y: auto;

  box-sizing: border-box;

  &__content {
    max-width: 100%;

    width: 250px;

    .n-button {
      width: 100%;
    }
  }
}
</style>
