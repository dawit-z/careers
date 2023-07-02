<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClass">{{ action }}</span>
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Bobo Corp.</h2>
  </section>
</template>

<script setup>
import nextElementInList from "@/utils/nextElementInList";
import { onMounted, onUnmounted, computed, ref } from "vue";

const action = ref("Build");
const interval = ref(null);

const actionClass = computed(() => {
  return {
    [action.value.toLowerCase()]: true,
  };
});

onMounted(() => changeTitle);
onUnmounted(() => clearInterval(interval));

function changeTitle() {
  interval.value = setInterval(() => {
    const actions = ["Build", "Create", "Design", "Code"];
    action.value = nextElementInList(actions, action);
  }, 3000);
}
</script>

<style scoped>
.build {
  color: #1a73e8;
}
.create {
  color: #34a853;
}
.design {
  color: #f9ab00;
}
.code {
  color: #d93025;
}
</style>
