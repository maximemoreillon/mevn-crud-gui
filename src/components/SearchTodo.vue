<template>
  <v-select
    :items="select_items"
    v-model:model-value="search_params.priority"
    clearable
    @update:model-value="emit_search_params"
  />
  <v-form @submit.prevent="emit_search_params">
    <v-text-field
      v-model:model-value="search_params.name"
      prepend-inner-icon="mdi-magnify"
      clearable
      @click:prepend-inner="emit_search_params"
    />
  </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["search_params"]);

const search_params = ref({
  priority: null,
  name: "",
  ...props.search_params,
});

const emit = defineEmits(["update_search_params"]);
function emit_search_params() {
  // for priority === null or name === ""
  if (!search_params.value.priority) search_params.value.priority = undefined;
  if (!search_params.value.name) search_params.value.name = undefined;

  emit("update_search_params", search_params.value);
}

const select_items = ["1", "2", "3"];
</script>
