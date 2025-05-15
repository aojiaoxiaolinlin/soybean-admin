<script lang="ts" setup>
import { computed } from 'vue';
import { $t } from '@/locales';

const props = defineProps<Props>();

defineOptions({ name: 'PinToggler' });

interface Props {
  pin?: boolean
}

const icon = computed(() => (props.pin ? 'mdi-pin-off' : 'mdi-pin'));
</script>

<template>
  <ButtonIcon
    :tooltip-content="pin ? $t('icon.unpin') : $t('icon.pin')"
    tooltip-placement="bottom-start"
    :z-index="100"
  >
    <SvgIcon :icon="icon" />
  </ButtonIcon>
</template>

<style scoped></style>
