import { reactive } from 'vue';
import defaultOptions from '../default-options';

import type { Notifications, NotificationMessage, NotificationType } from '../types/notifications';

const notifications: Notifications = reactive([]);

let id = 0;

let defaultNotificationTimeout = defaultOptions.defaultNotificationTimeout;
function changeDefaultNotificationTimeout(_defaultNotificationTimeout: number) {
	defaultNotificationTimeout = _defaultNotificationTimeout;
}

function addTimeout(id: number, timeout: number) {
	if (timeout)
		return setTimeout(() => {
			removeNotification(id);
		}, timeout);
}

function addNotification(message: NotificationMessage, type: NotificationType = 'info', timeout = defaultNotificationTimeout) {
	notifications.push({ id, message, type, subscription: addTimeout(id, timeout) });
	id++;
}

function removeNotification(id: number) {
	const index = notifications.findIndex(item => item.id === id);
	if (index >= 0) {
		if (notifications[index].subscription) clearTimeout(notifications[index].subscription);
		notifications.splice(index, 1);
	}
}

function removeNotifications() {
	notifications.forEach(notification => {
		if (notification.subscription) clearTimeout(notification.subscription);
	});
	notifications.splice(0);
}

export { notifications, changeDefaultNotificationTimeout, addNotification, removeNotification, removeNotifications };
