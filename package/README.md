# Vue3 Notifications

<p align="center">
  <img src="https://i.postimg.cc/8cYh6PWr/notifications-example.png">
</p>

## Setup

```bash
npm install --save @gianrase/vue3-notifications

yarn add @gianrase/vue3-notifications
```

Add the vue3-notifications dependencies to your `primary.js`:

```javascript
import { createApp } from 'vue';
import AppNotifications from '@gianrase/vue3-notifications';
import '@gianrase/vue3-notifications/style.css';

const app = createApp({...});
app.use(AppNotifications, { colors: { ... } });
```

| Color name             | Default                  |
| ---------------------- | ------------------------ |
| primary                | #000000                  |
| primaryDark            | rgba(255, 255, 255, 0.9) |
| bgPrimary              | #D3D3D3                  |
| bgPrimaryDark          | #373737                  |
| bgHover                | #C3C3C3                  |
| bgHoverDark            | #343434                  |
| notificationShadow     | #0000004d                |
| notificationShadowDark | #a0a0a01a                |
| btnCross               | #000000                  |
| btnCrossDark           | rgba(255, 255, 255, 0.9) |
| btnRemoveAll           | #002f88                  |
| btnRemoveAllDark       | #1B4CA7                  |
| borderLeftInfo         | #01579b                  |
| borderLeftInfoDark     | #252cf4                  |
| borderLeftSuccess      | #1b5e20                  |
| borderLeftSuccessDark  | #1cd509                  |
| borderLeftWarning      | #e65100                  |
| borderLeftWarningDark  | #e88400                  |
| borderLeftError        | #c62828                  |
| borderLeftErrorDark    | #f42525                  |

Add the global component to your `App.vue`:

```vue
<AppNotifications removeAllMessage="Remove all" :isLightMode="true" />
```

| Name             | Type                      | Default      | Description                                                         |
| ---------------- | ------------------------- | ------------ | ------------------------------------------------------------------- |
| removeAllMessage | string / (() => string)   | 'Remove all' | The message that the 'Remove All Notifications' button will display |
| isLightMode      | boolean / (() => boolean) | true         | Choose between light and dark mode                                  |

## Usage

Trigger notifications from any file:

```javascript
import { addNotification } from '@gianrase/vue3-notifications';

addNotification(message, type, timeout);
```

| Name    | Type                                     | Default | Description                                                                                                                |
| ------- | ---------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| message | string / (() => string)                  | none    | The message of the notification                                                                                            |
| type    | 'info' / 'success' / 'warning' / 'error' | 'info'  | 'info' = blue notification / 'success' = green notification / 'warning' = yellow notification / 'error' = red notification |
| timeout | number                                   | 15000   | The amount of time the notification will be displayed on the screen in milliseconds                                        |
