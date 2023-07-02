<template>
  <CollapsibleAccordion :header="header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="value in uniqueValues" :key="value" class="h-8 w-1/2">
            <input
              :id="value"
              v-model="selectedValues"
              :value="value"
              type="checkbox"
              class="mr-3"
              @change="selectValue"
            />
            <label :for="value">{{ value }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import { ref } from "vue";

const props = defineProps<{
  header: string;
  uniqueValues: Array<string> | Set<string>;
  action: (values: string[]) => void;
}>();

const selectedValues = ref<string[]>([]);
const router = useRouter();

function selectValue() {
  props.action(selectedValues.value);
  router.push({ name: "JobResults" });
}
</script>
