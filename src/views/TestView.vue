<script lang="ts" setup>
import { NText, NH2, NSpace, NButton, NList, NListItem, NThing, NScrollbar } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, computed, onBeforeMount } from 'vue'
import type {
  ITestData,
  ITestQuestion,
  ITestQModel,
TTestType
} from './../types'
import type { IAnswers } from './../services/storage.service'
import { StorageService } from './../services/storage.service'

import pack from '../data/pack.json'
import Test from '../components/Test.vue'

const router = useRouter()
const route = useRoute()

// data
const briefSkip = ref(false)
const reactiveData = reactive({
  jsonTestData: null as ITestData | null,
  initialTestData: [] as IAnswers[],
  storage: null as null | StorageService
})
const submitButtonText = ref('Начать')

// Computed
const getBriefing = computed(() => reactiveData.jsonTestData?.briefing)
const getTest = computed(() => reactiveData.jsonTestData?.data)

// Before Mount
onBeforeMount(async () => {
  const {type} = route.params

  try {
    const data: ITestData = await import(`../data/${type}.json`)

    reactiveData.jsonTestData = {...data}

    if (localStorage.getItem(`data-${type}`)) {
      submitButtonText.value = 'Продолжить'
    }
  } catch (error) {
    await router.push({
      path: '/menu',
      params: {
        error: 'Ошибка! Данные теста не могут быть импортированы!'
      }
    })

    return
  }
})

// Methods
function onSubmit () {
  const {type} = route.params

  briefSkip.value = true

  /**
   * Начало теста
   * Записываем время старта, а также добавляем первую start в первый activepoint
   * переносим на активный тест, запускаем setInterval с промежутком в минуту
   * для записи в end последднего activepoint.
   * Инициализируем объект ServiceStorage.
   * Парсим все вопросы в формат { index: number, answer: string | number | number[] }.
   * Создаем ls запись вида data-{тип теста}
   */

   /**
    * Если в localStorage существует запись вида data-{тип теста}
    * То загружаем ответы, проверяем finished ли он?
    * Если он еще не закончен, добавляем start в новый activepoint.
    *
    * Если тест закончен (finished), редирект на страницу меню.
    */

  // Абсолютный старт
  const data = reactiveData.jsonTestData
  const test = localStorage.getItem(`data-${type}`)

  if (data) {
    reactiveData.storage = new StorageService({name: String(type)})

    if (!test) {
      reactiveData.storage.answers = data.data.map((q: ITestQuestion, i: number) => {
        let defaultAnswer

        switch (q.type) {
          case 'checkbox':
            defaultAnswer = []
            break

          case 'radio':
            defaultAnswer = 0

          default:
            defaultAnswer = ''
        }

        return {
          index: i,
          answer: defaultAnswer,
          type: q.type as TTestType
        }
      })
    } else {
      reactiveData.storage.answers = (JSON.parse(test) as StorageService).answers.map((q, i) => {
        let defaultAnswer

        switch (q.type) {
          case 'checkbox':
            defaultAnswer = []
            break

          case 'radio':
            defaultAnswer = 0

          default:
            defaultAnswer = ''
        }

        return {
          index: i,
          answer: q.answer ?? defaultAnswer,
          type: q.type
        }
      })
    }

    reactiveData.storage.updateActivePoints({start: Date.now(), end: 0})
    reactiveData.storage.startActivePointTimer()
    reactiveData.storage.update()
    reactiveData.initialTestData = reactiveData.storage.answers
  } else {
    onError()
  }
}

function onLinkClick (link: string) {
  window.open(link, '_blank')
}

function onFinish () {
  if (reactiveData.storage) {
    reactiveData.storage.end = Date.now()
    reactiveData.storage.finished = true
  }

  router.push('/menu')
}

function onError () {
  router.push({
    path: '/menu',
    params: {
      error: 'Данные теста не найдены...'
    }
  })
}

function onUpdate (data: ITestQModel[]) {
  if (reactiveData.storage) {
    reactiveData.storage.answers = data.map((v, i) => ({index: i, answer: v.value, type: v.type as TTestType}))
  }
}
</script>

<template>
  <div class="v-test">
    <div v-if="!briefSkip && getBriefing" class="v-test__briefing">
      <n-scrollbar>
        <n-space class="v-test__scrollbody" vertical>
          <n-h2>
            {{ getBriefing.title }}
          </n-h2>

          <n-text v-html="getBriefing.text"/>

          <n-list hoverable bordered clickable style="margin-top: 10px">
            <n-list-item v-for="link in getBriefing.links">
              <n-thing :title="link.title" content-style="margin-top: 10px;" @click="onLinkClick(link.link)">
                {{ link.link }}
              </n-thing>
            </n-list-item>
          </n-list>

          <n-button @click="onSubmit">
            {{ submitButtonText }}
          </n-button>
        </n-space>
      </n-scrollbar>
    </div>

    <div v-else-if="getTest" class="v-test__test">
      <Test
        :data="getTest"
        :initial="reactiveData.initialTestData"
        @submit="onFinish"
        @update="onUpdate"/>
    </div>
  </div>
</template>

<style lang="scss">
.v-test {
  height: 100vh;

  display: flex;
  justify-content: center;

  padding: 24px;
  padding-bottom: 52px;

  box-sizing: border-box;

  &__briefing,
  &__test {
    max-width: 100%;

    width: 420px;

    box-sizing: border-box;
  }

  &__scrollbody {
    padding-right: 12px;
  }
}
</style>
