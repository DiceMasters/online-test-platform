<script lang="ts" setup>
import type { PropType, Ref } from 'vue'
import { onBeforeMount, ref, watch } from 'vue'
import { NSpace, NCard, NInput, NH3, NCheckbox, NCheckboxGroup, NRadioGroup, NRadio, NCode, NDivider, NButton } from 'naive-ui'
import CodeInput from './CodeInput.vue'

import type { ITestQuestion, ITestQModel } from './../types'
import type { IAnswers } from '@/services/storage.service'

const props = defineProps({
  data: {
    type: Array,
    default: [] as PropType<ITestQuestion[]>
  },

  initial: {
    type: Array,
    default: [] as PropType<IAnswers[]>
  }
})
const emit = defineEmits(['submit', 'update'])

const preparedData: Ref<ITestQModel[]> = ref([])

onBeforeMount(() => {
  if (props.data.length) {
    if (props.initial.length) {
      preparedData.value = (props.data as ITestQuestion[]).map((val, index) => ({...val, value: (props.initial[index] as IAnswers).answer}))
    } else {
      preparedData.value = (props.data as ITestQuestion[]).map(val => {
        let defaultAnswer

        switch (val.type) {
          case 'checkbox':
            defaultAnswer = []
            break

          case 'radio':
            defaultAnswer = 0

          default:
            defaultAnswer = ''
        }

        return {...val, value: defaultAnswer}
      })
    }
  }
})

watch(preparedData, (newValue) => {
  emit('update', newValue)
}, { deep: true })

function openLink (link: string) {
  if (link) {
    window.open(link, '_blank')
  }
}

function onSubmit () {
  emit('submit')
}
</script>

<template>
  <n-space
    class="c-test"
    style="padding: 24px 0"
    vertical
    :size="24"
  >
    <div v-for="(q, index) in preparedData" :key="index">
      <template v-if="q.type === 'separator'">
        <n-h3>{{ q.description }}</n-h3>

        <n-divider/>
      </template>

      <n-card v-else :title="q.description" small>
        <template v-if="q.type === 'text'">
          <n-input
            v-model:value="(preparedData[index].value as string)"
            type="textarea"
            placeholder="Введите ответ"
          />
        </template>

        <template v-if="q.type === 'checkbox'">
          <n-checkbox-group v-model:value="(preparedData[index].value as number[])" class="c-test__group">
            <n-checkbox
              v-for="(checkbox, yIndex) in preparedData[index].options"
              :key="yIndex"
              :value="yIndex + 1"
              :label="checkbox"
            />
          </n-checkbox-group>
        </template>

        <template v-if="q.type === 'radio'">
          <n-space vertical :size="12">
            <template v-if="q.codes">
              <n-code
                v-for="(code, index) in q.codes"
                :key="index"
                :code="code"
                lang="xml"
              />
            </template>

            <n-radio-group
              v-model:value="(preparedData[index].value as number)"
              class="c-test__group"
              :name="preparedData[index].name"
            >
              <n-radio
                v-for="(radio, yIndex) in preparedData[index].options"
                :key="yIndex"
                :value="yIndex + 1"
                :label="radio"
              />
            </n-radio-group>
          </n-space>
        </template>

        <template v-if="q.type === 'code'">
          <CodeInput v-model="(preparedData[index].value as string)"/>
        </template>

        <template v-if="q.type === 'codepen'">
          <n-space vertical :size="12">
            <n-button style="width:100%" @click="openLink(q.figma as string)">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Figma</title><path d="M336 176a80 80 0 000-160H176a80 80 0 000 160 80 80 0 000 160 80 80 0 1080 80V176z" fill="currentColor"/><circle cx="336" cy="256" r="80" fill="currentColor"/></svg>
              </template>

              Figma
            </n-button>

            <n-input
              v-model:value="(preparedData[index].value as string)"
              placeholder="Введите ответ"
            />
          </n-space>
        </template>
      </n-card>
    </div>

    <n-button style="width: 100%" @click="onSubmit">
      Закончить тест
    </n-button>
  </n-space>
</template>

<style lang="scss">
.c-test {
  &__group {
    display: flex;
    flex-direction: column;
  }

  &__codepen {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
}
</style>
