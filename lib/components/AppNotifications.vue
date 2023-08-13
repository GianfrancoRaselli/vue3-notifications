<script setup lang="ts">
import { notifications, removeNotification, removeNotifications } from "../composables/useNotifications";

const props = withDefaults(
  defineProps<{
    removeAllMessage?: string | (() => string);
  }>(),
  {
    removeAllMessage: "Remove all",
  }
);
</script>

<template lang="pug">
.v3n-notifications
	transition-group(name='v3n-notification')
		.v3n-notification(
			v-for='notification in notifications',
			:key='notification.id',
			:class='`v3n-notification-type-${notification.type}`'
		)
			span(v-text='typeof notification.message === "string" ? notification.message : notification.message()')
			button.v3n-btn-cross(type='button', @click='removeNotification(notification.id)') X
		button.v3n-btn-remove-all(
			v-if='notifications.length > 0',
			type='button',
			@click='removeNotifications',
			v-text='typeof props.removeAllMessage === "string" ? props.removeAllMessage : props.removeAllMessage()'
		)
</template>

<style lang="stylus" scoped>
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
		font-size 1.1rem
		word-break break-word
		word-wrap break-word
		width 25rem
		max-width 100%
		padding 1rem
		border-left-width 0.6rem
		border-left-style solid
		border-radius 0.5rem
		margin-bottom 0.6rem
		box-shadow rgba(0, 0, 0, 0.3) 0px 0px 5px
		background rgb(240, 240, 240)
		display flex
		flex-direction row
		justify-content space-between
		align-items center
		gap 0.6rem

		&.v3n-notification-type-info
			border-left-color rgb(1, 87, 155)

		&.v3n-notification-type-success
			border-left-color rgb(27, 94, 32)

		&.v3n-notification-type-warning
			border-left-color rgb(230, 81, 0)

		&.v3n-notification-type-error
			border-left-color rgb(198, 40, 40)

		.v3n-btn-cross
			cursor pointer
			font-size 1.1rem
			border 0
			align-self start

	.v3n-btn-remove-all
		cursor pointer
		float right
		color #002f88
		background rgb(240, 240, 240)
		padding 0.3rem 0.8rem
		border 0
		border-radius 0.2rem
</style>
