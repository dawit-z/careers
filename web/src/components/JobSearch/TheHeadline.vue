<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import nextElementInList from '@/utils/nextElementInList'

const action = ref('Build')
const interval = ref<ReturnType<typeof setInterval>>()

const actionClass = computed(() => {
  return {
    [action.value.toLowerCase()]: true,
  }
})

onMounted(changeTitle)
onBeforeUnmount(() => clearInterval(interval.value))

function changeTitle() {
  interval.value = setInterval(() => {
    const actions = ['Build', 'Create', 'Design', 'Code']
    action.value = nextElementInList(actions, action.value)
  }, 3000)
}
</script>

<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClass">{{ action }}</span>
      <br>
      for everyone
    </h1>
    <h2 class="text-3xl font-light">
      Find your next job at Bobo Corp.
    </h2>
  </section>
</template>

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
