import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import i18n from '@/locales/i18n';
import '@/style.css';
import AuthService from './services/auth';

AuthService.startup().then(ok => {
    if (ok) {
      const app = createApp(App).use(router)
      app.config.globalProperties.$oidc = AuthService
      app.use(router).use(i18n).mount('#app');
    } else {
      console.log('Startup was not ok')
    }
});
