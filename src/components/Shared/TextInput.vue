<template>
  <input
    v-model="modelValue"
    type="text"
    class="w-full text-lg font-normal focus:outline-none"
  />
</template>

<script setup lang="ts">
const modelValue = defineModel();
</script>
