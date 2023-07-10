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
.notifications
	transition-group(name='notification')
		.notification(
			v-for='notification in notifications',
			:key='notification.id',
			:class='`notification-type-${notification.type}`'
		)
			span(v-text='typeof notification.message === "string" ? notification.message : notification.message()')
			button.btn-cross(type='button', @click='removeNotification(notification.id)') X
		button.btn-remove-all(
			v-if='notifications.length > 0',
			type='button',
			@click='removeNotifications',
			v-text='typeof props.removeAllMessage === "string" ? props.removeAllMessage : props.removeAllMessage()'
		)
</template>

<style lang="stylus" scoped>
.notifications
	position fixed
	bottom 0.6rem
	right 0.4rem
	z-index 10000

	.notification-enter-active
	.notification-leave-active
		transition all 0.5s ease

	.notification-enter-from
	.notification-leave-to
		opacity 0
		transform translateX(100%)

	.notification-move
		transition transform 0.8s ease

	.notification
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
		align-items start
		gap 0.6rem

		&.notification-type-info
			border-left-color rgb(1, 87, 155)

		&.notification-type-success
			border-left-color rgb(27, 94, 32)

		&.notification-type-warning
			border-left-color rgb(230, 81, 0)

		&.notification-type-error
			border-left-color rgb(198, 40, 40)

		.btn-cross
			cursor pointer
			font-size 1.1rem
			border 0

	.btn-remove-all
		cursor pointer
		float right
		color #002f88
		background rgb(240, 240, 240)
		padding 0.3rem 0.8rem
		border 0
		border-radius 0.2rem
</style>
