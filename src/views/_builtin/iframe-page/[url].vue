<script setup lang="ts">
interface Props {
  url: string
}

defineProps<Props>();
</script>

<template>
  <div class="h-full">
    <iframe id="iframePage" class="size-full" :src="url" />
  </div>
</template>

<style scoped></style>
