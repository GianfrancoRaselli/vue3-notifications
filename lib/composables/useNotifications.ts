import { reactive } from 'vue';

import type { Notifications, NotificationMessage, NotificationType } from '@/types/Notifications';

const notifications: Notifications = reactive([]);

let id = 0;

const addNotification = (message: NotificationMessage, type: NotificationType = 'info', timeout = 15000) => {
	notifications.push({ id, message, type, subscription: addTimeout(id, timeout) });
	id++;
};

function addTimeout(id: number, timeout: number) {
	if (timeout)
		return setTimeout(() => {
			removeNotification(id);
		}, timeout);
}

const removeNotification = (id: number) => {
	const index = notifications.findIndex(item => item.id === id);
	if (index >= 0) {
		if (notifications[index].subscription) clearTimeout(notifications[index].subscription);
		notifications.splice(index, 1);
	}
};

const removeNotifications = () => {
	notifications.forEach(notification => {
		if (notification.subscription) clearTimeout(notification.subscription);
	});
	notifications.splice(0);
};

export { notifications, addNotification, removeNotification, removeNotifications };
