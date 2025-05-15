<script setup lang="ts">
import type { Align, TableColumnCheck } from '@/types/naive-ui';
import { $t } from '@/locales';

defineProps<Props>();

const emit = defineEmits<Emits>();

defineOptions({
  name: 'TableHeaderOperation',
});

interface Props {
  itemAlign?: Align
  disabledDelete?: boolean
  loading?: boolean
}

interface Emits {
  (_e: 'add'): void
  (_e: 'delete'): void
  (_e: 'refresh'): void
}

const columns = defineModel<TableColumnCheck[]>('columns', {
  default: () => [],
});

function add() {
  emit('add');
}

function batchDelete() {
  emit('delete');
}

function refresh() {
  emit('refresh');
}

defineSlots<{
  default: () => unknown
  prefix: () => unknown
  suffix: () => unknown
}>();
</script>

<template>
  <NSpace :align="itemAlign" wrap justify="end" class="lt-sm:w-200px">
    <slot name="prefix" />
    <slot name="default">
      <NButton size="small" ghost type="primary" @click="add">
        <template #icon>
          <icon-ic-round-plus class="text-icon" />
        </template>
        {{ $t('common.add') }}
      </NButton>
      <NPopconfirm @positive-click="batchDelete">
        <template #trigger>
          <NButton size="small" ghost type="error" :disabled="disabledDelete">
            <template #icon>
              <icon-ic-round-delete class="text-icon" />
            </template>
            {{ $t('common.batchDelete') }}
          </NButton>
        </template>
        {{ $t('common.confirmDelete') }}
      </NPopconfirm>
    </slot>
    <NButton size="small" @click="refresh">
      <template #icon>
        <icon-mdi-refresh class="text-icon" :class="{ 'animate-spin': loading }" />
      </template>
      {{ $t('common.refresh') }}
    </NButton>
    <TableColumnSetting v-model:columns="columns" />
    <slot name="suffix" />
  </NSpace>
</template>

<style scoped></style>
