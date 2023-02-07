<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import {
  NCard,
  NButton
} from 'naive-ui'

const router = useRouter()

const step = ref(1)
const jokeCleared = ref(false)

onBeforeMount(() => {
  const isIntroSkip = localStorage.getItem('skip-intro')

  if (isIntroSkip && isIntroSkip === 'true') {
    router.push('/menu')
  }
})

function onUpdateStep (s: number, clearJoke?: boolean) {
  step.value = s

  if (clearJoke) {
    jokeCleared.value = true
  }
}

function onSubmit () {
  router.push('/menu')

  localStorage.setItem('skip-intro', 'true')
}
</script>

<template>
  <div class="v-home">
    <div class="v-home__content">
      <div class="v-home__body">
        <transition-group name="list">
          <n-card
            class="v-home__intro"
            title="Приветствую, вы попали!"
            key="step1"
          >
            <n-button @click="onUpdateStep(2)">
              Вау, куда?
            </n-button>
          </n-card>

          <n-card
            v-show="step >= 2"
            class="v-home__intro"
            title="На интерактивное тестирование профессиональных навыков в сфере верстки веб приложений"
            key="step2"
          >
            <n-button @click="onUpdateStep(3)">
              Звучит интригующе...
            </n-button>
          </n-card>

          <n-card
            v-show="step >= 3 && !jokeCleared"
            class="v-home__intro"
            title="А хули ты хотел(а), сейчас мы мигом раскидаем тебя по фактам вопросами про полотенце, два стула и вилку"
            key="step3"
          >
            <n-button @click="onUpdateStep(4)">
              Че за?
            </n-button>
          </n-card>

          <n-card
            v-show="step >= 4 && !jokeCleared"
            class="v-home__intro"
            title="Минуту..."
            key="step4"
          >
            <n-button @click="onUpdateStep(5, true)">
              ...
            </n-button>
          </n-card>

          <n-card
            v-show="step >= 5 && jokeCleared"
            class="v-home__intro"
            title="Тебе предстоит сдать 4 тестировочныых экзамена, которые покажут твой уровень готовности к стажировкам в качестве HTML-верстальщика"
            key="step5"
          >
            <n-button @click="onUpdateStep(6)">
              4 теста, звучит легко
            </n-button>
          </n-card>

          <n-card
            v-show="step >= 6 && jokeCleared"
            class="v-home__intro"
            title="Не раслабляйся, после того, как мыы закончим наш диалог тебе предстоит решить, насколько ты готов(а) к данному тесту, я предоставлю тебе каталог тестов, можешь начинать с любого..."
            key="step6"
          >
            <n-button @click="onUpdateStep(7)">
              Далее
            </n-button>
          </n-card>

          <n-card
            v-show="step >= 7 && jokeCleared"
            class="v-home__intro"
            title="На стартовой странице ты увидишь список ссылок для подготовки к тесту, крайне советую тебе пройтись по каждой ссылке и узнать что то новое, либо вспомнить уже выученное"
            key="step7"
          >
            <n-button @click="onUpdateStep(8)">
              Далее
            </n-button>
          </n-card>

          <n-card
            v-show="step >= 8 && jokeCleared"
            class="v-home__intro"
            title="Также хочу напомнить, что как только тест начнется, запустится таймер, не ограничивающий вас в выполнении, но который так или иначе будет влиять на итоговую оценку вас проверяющим"
            key="step8"
          >
            <n-button @click="onUpdateStep(9)">
              Божечки боже что за таймер?
            </n-button>
          </n-card>

          <n-card
            v-show="step >= 9 && jokeCleared"
            class="v-home__intro"
            title="Ты всегда можешь прервать тестирование и закрыть вкладку, пойти по своим нуждам, однако, не откладывай прохождение теста на следующий день, таймер покажет сколько ты времени ты активно проходил(а) тест и общее время прохождения с учетом всех пауз"
            key="step9"
          >
            <n-button @click="onUpdateStep(10)">
              Кутак баш
            </n-button>
          </n-card>

          <n-card
            v-show="step >= 10 && jokeCleared"
            class="v-home__intro"
            title="Ээээ билят аузына яб нахуй"
            key="step10"
          >
            <n-button @click="onUpdateStep(11)">
              ...
            </n-button>
          </n-card>

          <n-card
            v-show="step >= 11 && jokeCleared"
            class="v-home__intro"
            title="Кх кхм"
            key="step11"
          >
            <n-button @click="onUpdateStep(12)">
              ...
            </n-button>
          </n-card>

          <n-card
            v-show="step >= 12 && jokeCleared"
            class="v-home__intro"
            title="Вобщем, под конец хочу напомнить, что как только мы закончим наш разговор, мы более не встретимся, ты будешь один на один с нейтральной бесчеловечной программой, которая ждет от тебя результатов"
            key="step12"
          >
            <n-button @click="onUpdateStep(13)">
              Будем прощаться?
            </n-button>
          </n-card>

          <n-card
            v-show="step >= 13 && jokeCleared"
            class="v-home__intro"
            title="Желаю тебе удачи в прохождении тестов и советую не волноваться и верить в собственные силы ❤️‍🔥!"
            key="step13"
          >
            <n-button @click="onSubmit">
              Закончить диалог
            </n-button>
          </n-card>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.v-home {
  height: 100vh;

  padding: 24px;

  overflow-y: auto;

  box-sizing: border-box;

  &__intro:not(:last-child) {
    margin-bottom: 24px;

    transition: all 1s;
  }

  &__content {
    display: flex;
    justify-content: center;
  }

  &__body {
    max-width: 100%;
    max-height: calc(100vh / 2 + 100px);

    width: 420px;

    display: flex;
    flex-direction: column;
    justify-content: end;
  }
}
</style>
