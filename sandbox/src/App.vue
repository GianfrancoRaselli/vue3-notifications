<script setup lang="ts">
import { addNotification } from '../../package/src/composables/useNotifications';

addNotification('Información', 'info', 300000);
addNotification('Éxito', 'success', 300000);
addNotification('Advertencia', 'warning', 300000);
addNotification('Error', 'error', 300000);
</script>

<template lang="pug">
AppNotifications
</template>
