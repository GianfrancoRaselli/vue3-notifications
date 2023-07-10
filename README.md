# Setup

```bash
npm install --save @gianrase/vue3-notifications

yarn add @gianrase/vue3-notifications
```

Add dependencies to your `main.js`:

```javascript
import { createApp } from 'vue';
import AppNotifications from '@gianrase/vue3-notifications';
import "@gianrase/vue3-notifications/style.css";

const app = createApp({...});
app.use(AppNotifications);
```

Add the global component to your `App.vue`:

```vue
<AppNotifications removeAllMessage="Remove all" />
```

| Name             | Type                    | Default      | Description                                                         |
| ---------------- | ----------------------- | ------------ | ------------------------------------------------------------------- |
| removeAllMessage | string / (() => string) | 'Remove all' | The message that the 'Remove All Notifications' button will display |

# Usage

Trigger notifications from any file:

```javascript
import { addNotification } from "@gianrase/vue3-notifications";

addNotification(message, type, timeout);
```

| Name    | Type                                     | Default | Description                                                                                                                |
| ------- | ---------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| message | string / (() => string)                  | none    | The message of the notification                                                                                            |
| type    | 'info' / 'success' / 'warning' / 'error' | 'info'  | 'info' = blue notification / 'success' = green notification / 'warning' = yellow notification / 'error' = red notification |
| timeout | number                                   | 15000   | The amount of time the notification will be displayed on the screen in milliseconds                                        |
