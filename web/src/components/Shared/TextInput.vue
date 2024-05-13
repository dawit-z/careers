<script setup lang="ts">
const model = defineModel()
</script>

<template>
  <input
    v-model="model"
    type="text"
    class="w-full text-lg font-normal focus:outline-none"
  >
</template>
