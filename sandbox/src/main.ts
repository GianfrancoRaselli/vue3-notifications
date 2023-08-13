import { createApp } from 'vue';
import App from './App.vue';

import AppNotifications from '../../package';
import '../../package/dist/style.css';

const app = createApp(App);
app.use(AppNotifications);
app.mount('#app');
