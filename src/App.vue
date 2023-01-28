<template>
  <main
    class="main"
    :style="{ ...sizes, fontSize: `calc(${sizes.height} / 100)` }"
  >
    <ModalForm :width="sizes.width" />
    <header class="header">
      <h2>Бюджет: {{ money.toLocaleString() }} руб.</h2>
      <h3 class="green">
        Прирост: {{ income.toLocaleString() }} руб.
        <span v-if="famine.status !== 0">(-50%, голод!)</span>
      </h3>
      <h3 class="green">
        Население: {{ population.toLocaleString() }} | Еда:
        {{ food.toLocaleString() }}
      </h3>
      <h3 class="page-title">{{ route.meta.title }}</h3>
      <button class="main-menu-btn green" @click="mainMenuHandler">
        Главное меню
      </button>
    </header>
    <div id="page" class="page">
      <router-view v-slot="{ Component }">
        <transition :name="transitionName" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <img
        src="./assets/slider.png"
        alt="slider"
        class="slider"
        :style="{ left: sliderPosition }"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app.store';
import { routes } from '@/router';
import ModalForm from '@/components/ModalForm.vue';
import { decrypt, encrypt } from '@/utils/crypto';
import { useFullSpace } from '@/composable/useFullSpace';
import { usePageSwipe } from '@/composable/usePageSwipe';
import { useModalStore } from '@/store/modal.store';

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const modalStore = useModalStore();
const { sizes } = useFullSpace(1600 / 2560);
const { transitionName } = usePageSwipe(
  'page',
  () => {
    const next = routes.find((r) => r.meta?.order === route.meta.order + 1);
    if (next) router.push(next.path);
  },
  () => {
    const prev = routes.find((r) => r.meta?.order === route.meta.order - 1);
    if (prev) router.push(prev.path);
  }
);

const { money, income, population, food, famine } = storeToRefs(appStore);

const sliderPosition = computed(
  () => ['12%', '25%', '40%', '52%', '66%'][route.meta.order - 1]
);

try {
  const ls = localStorage.getItem('data');
  if (ls) {
    const data = decrypt(ls);
    appStore.$state = JSON.parse(data);
  }
} catch (error) {
  console.error(error);
  localStorage.removeItem('data');
}

setInterval(() => {
  appStore.money += appStore.income;
  appStore.food -= Math.round(appStore.population * 0.03);
  if (appStore.food < 0) famineHandler();
}, 1000);

appStore.$subscribe((mutation, state) => {
  const data = encrypt(JSON.stringify(state));
  localStorage.setItem('data', data);
});

const mainMenuHandler = () => {
  modalStore.openModal({
    header: 'Главное меню',
    content: `<MainMenu />`,
  });
};

const famineHandler = () => {
  const died = Math.round(appStore.population * 0.001);
  appStore.population -= died;
  appStore.stats.populationDiedFromFamine += died;
  if (appStore.famine.status === 0) appStore.famine.status = 1;
  if (!appStore.famine.isNotified) {
    modalStore.openModal({
      header: 'Голод',
      content: `
      <p>В стране перебои с продовольствием, граждане голодают. Производство снижено вдвое, численность населения сокращается.</p>
      <p>Если ситуацию не исправить, поднимется восстание!</p>
    `,
    });
    appStore.famine.isNotified = true;
    return;
  }
  const isNexStep = Math.random() * 200 < 1;
  if (appStore.famine.status === 1 && isNexStep) {
    appStore.famine.status = 2;
    const industryPercentLost = Math.random() * 0.1 + 0.01;
    const populationPercentLost = Math.random() * 0.1 + 0.01;
    appStore.netIncome -= Math.round(appStore.netIncome * industryPercentLost);
    appStore.population -= Math.round(
      appStore.population * populationPercentLost
    );
    appStore.stats.industryLost += Math.round(
      appStore.industry.reduce((acc, cur) => acc + cur, 0) * industryPercentLost
    );
    modalStore.openModal({
      header: 'Ситуация ухудшается',
      content: `
      <p>Ситуация с продовольствием ухудшается.
      По стране идет волна митингов и забастовок, часть производственных мощностей
      (${Math.round(industryPercentLost * 100)}%) уже потеряна безвозвратно.</p>
      <p>Если ситуацию не исправить, в стране начнется гражданская война!</p>
    `,
    });
    return;
  }
  if (appStore.famine.status === 2 && isNexStep) {
    appStore.famine.status = 3;
    const industryPercentLost = Math.random() * 0.3 + 0.2;
    const populationPercentLost = Math.random() * 0.3 + 0.2;
    appStore.netIncome -= Math.round(appStore.netIncome * industryPercentLost);
    appStore.population -= Math.round(
      appStore.population * populationPercentLost
    );
    appStore.stats.industryLost += Math.round(
      appStore.industry.reduce((acc, cur) => acc + cur, 0) * industryPercentLost
    );
    modalStore.openModal({
      header: 'Революция на пороге',
      content: `
      <p>Дальние регионы заявили о выходе из состава государства, их жители больше не намеряны терпеть ситуацию с продовольствием.
      Мы потеряли ${Math.round(populationPercentLost * 100)}% населения и
      ${Math.round(industryPercentLost * 100)}% производственных мощностей.</p>
      <p>Ситуация критическая, страна на пороге революции, сделайте же что-нибудь!</p>
    `,
    });
    return;
  }
  if (appStore.famine.status === 3 && isNexStep) {
    modalStore.openModal({
      header: 'Революция',
      content: `
      <p>Гнев народа не знвет границ, страну охватило пламя революции.
      И это пламя уже не сбить даже армией, республики больше не подчиняются вам.</p>
      <p>Под контролем остался только столичный регион, предприятия проданы в счет погашения долгов и для импорта продовольствия.
      Армия сокращена, все достижения списаны.</p>
    `,
    });
    appStore.$reset();
    return;
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html {
  color: floralwhite;
  font-weight: 400;
  user-select: none;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: black;
  font-family: sans-serif;
}

.main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-image: url('./assets/background.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  .green {
    color: #c1cd32;
  }

  h2,
  h3 {
    font-weight: 400;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 7%;

    h2,
    h3 {
      margin: 0.8% 0;
    }

    h2 {
      font-size: 270%;
    }

    h3 {
      font-size: 210%;
    }

    .page-title {
      position: absolute;
      top: 15.2%;
      left: 10%;
      margin: 2% 0;
      width: 56%;
      font-size: 180%;
      text-align: center;
    }

    .main-menu-btn {
      position: absolute;
      top: 16.2%;
      right: 10.7%;
      width: 22%;
      height: 2.5%;
      border: none;
      border-radius: 10px;
      background: transparent;
      font-size: 140%;
      cursor: pointer;
    }
  }

  .page {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 16%;
    padding: 0 12%;

    .slider {
      position: absolute;
      bottom: 4.5%;
      width: 17%;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
      transition: left 0.2s;
    }
  }
}

// PAGE TRANSITIONS
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.1s;
  transition-property: opacity, transform;
  transition-timing-function: linear;
}

.slide-left-enter-from,
.slide-right-leave-active {
  opacity: 0.5;
  transform: translate(7%, 0);
}

.slide-left-leave-active,
.slide-right-enter-from {
  opacity: 0.5;
  transform: translate(-7%, 0);
}
</style>
