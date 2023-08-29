<script setup lang="ts">
import { computed } from 'vue';
import { notifications, removeNotification, removeNotifications } from '../composables/useNotifications';

const props = withDefaults(
	defineProps<{
		removeAllMessage?: string | (() => string);
		lightMode?: boolean | (() => boolean);
	}>(),
	{
		removeAllMessage: 'Remove all',
		lightMode: true,
	},
);

const removeAllMessage = computed(() =>
	typeof props.removeAllMessage === 'string' ? props.removeAllMessage : props.removeAllMessage(),
);
const lightMode = computed(() => (typeof props.lightMode === 'boolean' ? props.lightMode : props.lightMode()));
</script>

<template lang="pug">
.v3n-notifications
	transition-group(name='v3n-notification')
		.v3n-notification(
			v-for='notification in notifications',
			:key='notification.id',
			:class='lightMode ? "v3n-notification-type-" + notification.type : ["v3n-notification-dark", "v3n-notification-type-" + notification.type + "-dark"]'
		)
			span(v-text='typeof notification.message === "string" ? notification.message : notification.message()')
			button.v3n-btn-cross(
				type='button',
				:class='{ "v3n-btn-cross-dark": !lightMode }',
				@click='removeNotification(notification.id)'
			) X
		button.v3n-btn-remove-all(
			v-if='notifications.length > 0',
			type='button',
			:class='{ "v3n-btn-remove-all-dark": !lightMode }',
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

	@media (max-width: 720px)
		font-size 1.06rem

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
		font-size 1.03em
		word-break break-word
		word-wrap break-word
		width 20em
		padding 0.8em
		border-left-width 0.6em
		border-left-style solid
		border-radius 0.5em
		margin-bottom 0.6em
		box-shadow var(--v3nNotificationShadow) 0px 0px 5px
		color var(--v3nMain)
		background-color var(--v3nBg)
		display flex
		flex-direction row
		justify-content space-between
		align-items center
		gap 0.6em

		&-dark
			box-shadow var(--v3nNotificationShadowDark) 0px 0px 5px
			color var(--v3nMainDark)
			background-color var(--v3nBgDark)

		&.v3n-notification-type-info
			border-left-color var(--v3nBorderLeftInfo)

			&-dark
				border-left-color var(--v3nBorderLeftInfoDark)

		&.v3n-notification-type-success
			border-left-color var(--v3nBorderLeftSuccess)

			&-dark
				border-left-color var(--v3nBorderLeftSuccessDark)

		&.v3n-notification-type-warning
			border-left-color var(--v3nBorderLeftWarning)

			&-dark
				border-left-color var(--v3nBorderLeftWarningDark)

		&.v3n-notification-type-error
			border-left-color var(--v3nBorderLeftError)

			&-dark
				border-left-color var(--v3nBorderLeftErrorDark)

		.v3n-btn-cross
			cursor pointer
			font-size 1.09em
			border 0
			color var(--v3nBtnCross)
			background-color var(--v3nBg)
			align-self start

			&-dark
				color var(--v3nBtnCrossDark)
				background-color var(--v3nBgDark)

	.v3n-btn-remove-all
		cursor pointer
		font-size 1em
		float right
		padding 0.3em 0.8em
		border 0
		border-radius 0.2em
		color var(--v3nBtnRemoveAll)
		background-color var(--v3nBg)

		&-dark
			color var(--v3nBtnRemoveAllDark)
			background-color var(--v3nBgDark)
</style>
