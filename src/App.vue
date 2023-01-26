<template>
  <main class="main" :style="{ ...sizes }">
    <header class="header">
      <h2>Бюджет: {{ money }} $</h2>
      <h3>Прирост: {{ income }} $</h3>
      <h3>Население: {{ population }} | Еда: {{ food }}</h3>
    </header>
    <router-view v-slot="{ Component, route }">
      <transition :name="transitionName" mode="out-in">
        <div id="page" class="page">
          <component :key="route.name" :is="Component" />
        </div>
      </transition>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import { onMounted, reactive, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app.store";
import Hammer from "hammerjs";
import { routes, transitionName } from "@/router";

const router = useRouter();
const route = useRoute();

// SIZE
const sizes = reactive({
  width: "",
  height: "",
});
const computeSizes = () => {
  const aspectRatio = 1600 / 2560;
  if (window.innerWidth / window.innerHeight > aspectRatio) {
    sizes.width = window.innerHeight * aspectRatio + "px";
    sizes.height = "100vh";
  } else {
    sizes.width = window.innerWidth + "px";
    sizes.height = window.innerWidth / aspectRatio + "px";
  }
};
onMounted(() => {
  computeSizes();
  window.addEventListener("resize", computeSizes);
});

// SWIPE
onMounted(() => {
  const page = document.getElementById("page");
  if (!page) return;
  const manager = new Hammer.Manager(page);
  const Swipe = new Hammer.Swipe();
  manager.add(Swipe);

  manager.on("swipeleft", (e) => {
    const next = routes.find((r) => r.meta.order === route.meta.order + 1);
    if (next) router.push(next.path);
  });
  manager.on("swiperight", (e) => {
    const prev = routes.find((r) => r.meta.order === route.meta.order - 1);
    if (prev) router.push(prev.path);
  });
});

const appStore = useAppStore();
const { money, income, population, food } = storeToRefs(appStore);

setInterval(() => {
  appStore.money += appStore.income;
  appStore.food -= Math.round(appStore.population * 0.03);
}, 1000);
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html {
  font-size: 10px;
  letter-spacing: 1px;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 8px;
  }

  @media (max-width: 480px) {
    font-size: 6px;
  }
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
  background-image: url("./assets/background.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 7%;

    h2,
    h3 {
      margin: 2% 0;
      font-weight: 400;
    }

    h2 {
      color: floralwhite;
      font-size: 3.3rem;
    }

    h3 {
      color: #c1cd32;
      font-size: 2.3rem;
    }
  }

  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 15%;
    padding: 0 12%;
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
