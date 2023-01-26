import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import StatisticsView from '@/views/StatisticsView.vue';
import IndustryView from '@/views/IndustryView.vue';
import FoodView from '@/views/FoodView.vue';
import MilitaryView from '@/views/MilitaryView.vue';
import EnemyView from '@/views/EnemyView.vue';
import { ref } from 'vue';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    order: number;
  }
}

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/stats',
    name: 'stats',
    component: StatisticsView,
    meta: { title: 'Статистика', order: 1 },
  },
  {
    path: '/industry',
    name: 'industry',
    component: IndustryView,
    meta: { title: 'Промышленность', order: 2 },
  },
  {
    path: '/food',
    name: 'food',
    component: FoodView,
    meta: { title: 'Продовольствие', order: 3 },
  },
  {
    path: '/military',
    name: 'military',
    component: MilitaryView,
    meta: { title: 'Вооруженные силы', order: 4 },
  },
  {
    path: '/enemy',
    name: 'enemy',
    component: EnemyView,
    meta: { title: 'Потенциальный противник', order: 5 },
  },
  {
    path: '/',
    redirect: '/stats',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export const transitionName = ref('slide-right');
router.beforeEach((to, from, next) => {
  if (to.meta.order < from.meta.order) {
    // transitionName.value = "slide-left";
  } else {
    // transitionName.value = "slide-right";
  }
  next();
});

export default router;
