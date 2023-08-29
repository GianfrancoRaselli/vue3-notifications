import AppNotifications from './components/AppNotifications.vue';
import { changeDefaultNotificationTimeout, addNotification } from './composables/useNotifications';

import defaultOptions from './default-options';

import type { App } from 'vue';
import type { Options } from './types/options';

function getOptions(userOptions?: Options) {
	const options = defaultOptions;
	if (userOptions) {
		for (const categoryName in defaultOptions) {
			if (userOptions[categoryName]) {
				if (typeof userOptions[categoryName] === 'object') {
					for (const key in userOptions[categoryName]) {
						const value = userOptions[categoryName][key];
						if (value) options[categoryName][key] = value;
					}
				} else {
					const value = userOptions[categoryName];
					if (value) options[categoryName] = value;
				}
			}
		}
	}
	return options;
}

function setDefaultNotificationTimeout(defaultNotificationTimeout: Options['defaultNotificationTimeout']) {
	changeDefaultNotificationTimeout(defaultNotificationTimeout);
}

function setRootColors(colors: Options['colors']) {
	const root = document.querySelector(':root') as HTMLElement;
	for (const key in colors) {
		const colorValue = colors[key];
		root.style.setProperty(`--v3n${key.charAt(0).toUpperCase()}${key.slice(1)}`, colorValue);
	}
}

export default (app: App, userOptions?: Options) => {
	const options = getOptions(userOptions);
	setDefaultNotificationTimeout(options.defaultNotificationTimeout);
	setRootColors(options.colors);
	app.component('AppNotifications', AppNotifications);
};

export { changeDefaultNotificationTimeout, addNotification };
