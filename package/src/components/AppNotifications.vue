<script setup lang="ts">
import { computed } from 'vue';
import { notifications, removeNotification, removeNotifications } from '../composables/useNotifications';

const props = withDefaults(
	defineProps<{
		removeAllMessage?: string | (() => string);
		isLightMode?: boolean | (() => boolean);
	}>(),
	{
		removeAllMessage: 'Remove all',
		isLightMode: true,
	},
);

const removeAllMessage = computed(() =>
	typeof props.removeAllMessage === 'string' ? props.removeAllMessage : props.removeAllMessage(),
);
const isLightMode = computed(() => (typeof props.isLightMode === 'boolean' ? props.isLightMode : props.isLightMode()));
</script>

<template lang="pug">
.v3n-notifications
	transition-group(name='v3n-notification')
		.v3n-notification(
			v-for='notification in notifications',
			:key='notification.id',
			:class='isLightMode ? "v3n-notification-type-" + notification.type : ["v3n-notification__dark", "v3n-notification-type-" + notification.type + "__dark"]'
		)
			span(v-text='typeof notification.message === "string" ? notification.message : notification.message()')
			button.v3n-cross-btn(
				type='button',
				:class='{ "v3n-cross-btn__dark": !isLightMode }',
				@click='removeNotification(notification.id)'
			) X
		button.v3n-remove-all-btn(
			v-if='notifications.length > 1',
			type='button',
			:class='{ "v3n-remove-all-btn__dark": !isLightMode }',
			@click='removeNotifications',
			v-text='removeAllMessage'
		)
</template>

<style lang="stylus" scoped>
.v3n-notifications
	font-size 1rem
	position fixed
	bottom 0.6rem
	right 0.4rem
	z-index 10000

	.v3n-notification-enter-active
	.v3n-notification-leave-active
		transition all 0.5s ease

	.v3n-notification-enter-from
	.v3n-notification-leave-to
		opacity 0
		transform translateX(100%)

	.v3n-notification-move
		transition transform 0.8s ease

	.v3n-notification
		word-break break-word
		word-wrap break-word
		width 20em
		padding 0.8em
		border-left-width 0.6em
		border-left-style solid
		border-radius 0.5em
		margin-bottom 0.6em
		box-shadow var(--v3nNotificationShadowColor) 0px 0px 5px
		color var(--v3nPrimaryColor)
		background-color var(--v3nBgPrimaryColor)
		display flex
		flex-direction row
		justify-content space-between
		align-items center
		gap 0.6em

		&__dark
			box-shadow var(--v3nNotificationShadowDarkColor) 0px 0px 5px
			color var(--v3nPrimaryDarkColor)
			background-color var(--v3nBgPrimaryDarkColor)

		&.v3n-notification-type-info
			border-left-color var(--v3nBorderLeftInfoColor)

			&__dark
				border-left-color var(--v3nBorderLeftInfoDarkColor)

		&.v3n-notification-type-success
			border-left-color var(--v3nBorderLeftSuccessColor)

			&__dark
				border-left-color var(--v3nBorderLeftSuccessDarkColor)

		&.v3n-notification-type-warning
			border-left-color var(--v3nBorderLeftWarningColor)

			&__dark
				border-left-color var(--v3nBorderLeftWarningDarkColor)

		&.v3n-notification-type-error
			border-left-color var(--v3nBorderLeftErrorColor)

			&__dark
				border-left-color var(--v3nBorderLeftErrorDarkColor)

		.v3n-cross-btn
			cursor pointer
			font-size 1.1em
			border 0
			color var(--v3nBtnCrossColor)
			background-color var(--v3nBgPrimaryColor)
			align-self start

			&__dark
				color var(--v3nBtnCrossDarkColor)
				background-color var(--v3nBgPrimaryDarkColor)

	.v3n-remove-all-btn
		cursor pointer
		float right
		padding 0.3em 0.8em
		border 0
		border-radius 0.2em
		color var(--v3nBtnRemoveAllColor)
		background-color var(--v3nBgPrimaryColor)

		&:hover
			background-color var(--v3nBgHoverColor)

		&__dark
			color var(--v3nBtnRemoveAllDarkColor)
			background-color var(--v3nBgPrimaryDarkColor)

			&:hover
				background-color var(--v3nBgHoverDarkColor)
</style>
