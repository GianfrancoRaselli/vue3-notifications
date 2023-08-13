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
$main-color = #000000
$main-dark-color = #eeeeee
$bg-color = #D5D5D5
$bg-dark-color = #353643

.v3n-notifications
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
		font-size 1.03rem
		word-break break-word
		word-wrap break-word
		width 25rem
		max-width 100%
		padding 1rem
		border-left-width 0.6rem
		border-left-style solid
		border-radius 0.5rem
		margin-bottom 0.6rem
		box-shadow #0000004d 0px 0px 5px
		color $main-color
		background-color $bg-color
		display flex
		flex-direction row
		justify-content space-between
		align-items center
		gap 0.6rem

		&-dark
			box-shadow #c8c8c84d 0px 0px 5px
			color $main-dark-color
			background-color $bg-dark-color

		&.v3n-notification-type-info
			border-left-color #01579B

			&-dark
				border-left-color #252cf4

		&.v3n-notification-type-success
			border-left-color #1B5E20

			&-dark
				border-left-color #1cd509

		&.v3n-notification-type-warning
			border-left-color #E65100

			&-dark
				border-left-color #e88400

		&.v3n-notification-type-error
			border-left-color #C62828

			&-dark
				border-left-color #f42525

		.v3n-btn-cross
			cursor pointer
			font-size 1.09rem
			border 0
			color #2E2B2B
			background-color $bg-color
			align-self start

			&-dark
				color #E2E2E2
				background-color $bg-dark-color

	.v3n-btn-remove-all
		cursor pointer
		float right
		padding 0.3rem 0.8rem
		border 0
		border-radius 0.2rem
		color #002f88
		background-color $bg-color

		&-dark
			color $main-dark-color
			background-color $bg-dark-color
</style>
