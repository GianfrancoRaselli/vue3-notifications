import { createApp } from 'vue';
import App from './App.vue';

import AppNotifications from '../../package';

const app = createApp(App);
app.use(AppNotifications);
app.mount('#app');

import '../../package/dist/style.css';
