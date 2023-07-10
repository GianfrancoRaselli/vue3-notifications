export type NotificationMessage = string | (() => string);

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export type Notification = {
	id: number;
	message: NotificationMessage;
	type: NotificationType;
	subscription: NodeJS.Timeout;
};

export type Notifications = Notification[];
