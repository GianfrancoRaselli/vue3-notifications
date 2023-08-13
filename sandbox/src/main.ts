import { createApp } from 'vue';
import App from './App.vue';

import AppNotifications from '../../package/src/components/AppNotifications.vue';

const app = createApp(App);

app.component('AppNotifications', AppNotifications);

app.mount('#app');
