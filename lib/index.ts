import AppNotifications from "./components/AppNotifications.vue";
import { addNotification } from "./composables/useNotifications";

import type { App } from "vue";

export default (app: App) => {
  app.component("AppNotifications", AppNotifications);
};

export { addNotification };
