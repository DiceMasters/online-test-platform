<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import {
  darkTheme,
  NConfigProvider,
  NSpace,
  NLayout,
  NLayoutContent,
  NBadge,
  NAvatar,
  NText,
  NMessageProvider
} from 'naive-ui'

hljs.registerLanguage('javascript', xml)

const avatarUri = ref('https://sun2.ufanet.userapi.com/s/v1/ig2/zn4cBh-bV-lumd4N81Y7u0Ua0z-pVwoq5fc9zbiNfDoN0Awu1WX65Dy7NQzVjPMwi7Qt83JESNfuZHyQVhPvlYZF.jpg?size=200x200&quality=95&crop=76,111,282,282&ava=1')

function onNoticeClick () {
  window.open('https://vk.com/dicem', '_blank')
}
</script>

<template>
  <n-config-provider :theme="darkTheme" :hljs="hljs">
    <n-message-provider>
      <n-space class="app">
        <n-layout class="app__layout">
          <n-layout-content>
            <RouterView />
          </n-layout-content>

          <n-space class="app__notice" :size="12" align="center" @click="onNoticeClick">
            <n-badge dot type="info">
              <n-avatar size="small" :src="avatarUri"/>
            </n-badge>

            <n-text depth="3">
              albertos
            </n-text>
          </n-space>
        </n-layout>
      </n-space>
    </n-message-provider>
  </n-config-provider>
</template>

<style lang="scss">
.app {
  overflow-y: auto;

  position: relative;

  &, &__layout {
    width: 100vw;
    height: 100vh;
  }

  &__notice {
    position: absolute;
    bottom: 12px;
    left: 12px;

    transition: transform .16s;

    cursor: pointer;

    backface-visibility: hidden;
    -webkit-font-smoothing: subpixel-antialiased;

    &:hover {
      @media (any-hover: hover) {
        transform: scale(1.1) translateZ(0);
      }
    }
  }
}
</style>
