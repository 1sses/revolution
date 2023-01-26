<template>
  <main
    class="main"
    :style="{ ...sizes, fontSize: `calc(${sizes.height} / 100)` }"
  >
    <ModalForm :width="sizes.width" />
    <header class="header">
      <h2>Бюджет: {{ money.toLocaleString() }} руб.</h2>
      <h3 class="green">Прирост: {{ income.toLocaleString() }} руб.</h3>
      <h3 class="green">
        Население: {{ population.toLocaleString() }} | Еда:
        {{ food.toLocaleString() }}
      </h3>
      <h3 class="page-title">{{ route.meta.title }}</h3>
    </header>
    <router-view v-slot="{ Component, route }">
      <transition :name="transitionName" mode="out-in">
        <div id="page" class="page">
          <component :key="route.name" :is="Component" />
          <img
            src="./assets/slider.png"
            alt="slider"
            class="slider"
            :style="{ left: sliderPosition }"
          />
        </div>
      </transition>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app.store';
import Hammer from 'hammerjs';
import { routes, transitionName } from '@/router';
import ModalForm from '@/components/ModalForm.vue';
import { decrypt, encrypt } from '@/utils/crypto';

const router = useRouter();
const route = useRoute();

// SIZE
const sizes = reactive({
  width: '',
  height: '',
});
const computeSizes = () => {
  const aspectRatio = 1600 / 2560;
  if (window.innerWidth / window.innerHeight > aspectRatio) {
    sizes.width = window.innerHeight * aspectRatio + 'px';
    sizes.height = window.innerHeight + 'px';
  } else {
    sizes.width = window.innerWidth + 'px';
    sizes.height = window.innerWidth / aspectRatio + 'px';
  }
};
onMounted(() => {
  computeSizes();
  window.addEventListener('resize', computeSizes);
});

// SWIPE
onMounted(() => {
  const page = document.getElementById('page');
  if (!page) return;
  const manager = new Hammer.Manager(page);
  const Swipe = new Hammer.Swipe();
  manager.add(Swipe);

  manager.on('swipeleft', () => {
    const next = routes.find((r) => r.meta?.order === route.meta.order + 1);
    if (next) router.push(next.path);
    transitionName.value = 'slide-left';
  });
  manager.on('swiperight', () => {
    const prev = routes.find((r) => r.meta?.order === route.meta.order - 1);
    if (prev) router.push(prev.path);
    transitionName.value = 'slide-right';
  });
});

const sliderPosition = computed(() => {
  switch (route.meta.order) {
    case 1:
      return '12%';
    case 2:
      return '23%';
    case 3:
      return '40%';
    case 4:
      return '57%';
    case 5:
      return '66%';
    default:
      return '0%';
  }
});

const appStore = useAppStore();
const { money, income, population, food } = storeToRefs(appStore);

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
}, 1000);

appStore.$subscribe((mutation, state) => {
  const data = encrypt(JSON.stringify(state));
  localStorage.setItem('data', data);
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html {
  color: floralwhite;
  font-weight: 400;
  //letter-spacing: 1px;
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
      position: relative;
      top: 13%;
      right: 20%;
      margin: 2% 0;
      font-size: 180%;
    }
  }

  .page {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 9%;
    padding: 0 12%;

    .slider {
      position: absolute;
      bottom: 4.5%;
      width: 17%;
      transition: left 0.2s;
    }
  }
}

// PAGE TRANSITIONS
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  background: red;
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
