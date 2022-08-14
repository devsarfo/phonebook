import i18n from '@/locales/i18n';
import router from '@/router';
import '@/style.css';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).use(router).use(i18n).mount('#app')
