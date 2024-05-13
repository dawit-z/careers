<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'

defineProps({
  header: {
    type: String,
    required: true,
  },
})

const isOpen = ref(false)

function open() {
  isOpen.value = !isOpen.value
}

const caretIcon = computed(() =>
  isOpen.value ? 'fa6-solid:angle-up' : 'fa6-solid:angle-down',
)
</script>

<template>
  <div class="border-b border-solid border-brand-gray-2 py-5">
    <div
      class="flex cursor-pointer flex-wrap items-center justify-between"
      role="button"
      @click="open"
    >
      <h3 class="text-base font-semibold">
        {{ header }}
      </h3>

      <Icon :icon="caretIcon" />
    </div>

    <div v-if="isOpen" class="mt-5 w-full">
      <slot>
        <p>Populate me!</p>
      </slot>
    </div>
  </div>
</template>
