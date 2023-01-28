import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import MainMenu from '@/components/MainMenu.vue';

createApp(App)
  .component('MainMenu', MainMenu)
  .use(router)
  .use(createPinia())
  .mount('#app');
