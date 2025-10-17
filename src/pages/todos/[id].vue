<template>
  <v-card :loading>
    <v-toolbar>
      <v-btn
        prepend-icon="mdi-arrow-left"
        @click="router.push({ path: '/todos' })"
      />
      <v-toolbar-title>タスク詳細</v-toolbar-title>
      <v-btn
        text="更新"
        @click="put_todo"
        :loading="updating"
        :disabled="disabled || !todo.name"
      />
      <v-btn
        text="削除"
        @click="delete_todo"
        :loading="deleting"
        :disabled
        color="red"
      />
    </v-toolbar>

    <v-card-text>
      <v-text-field v-model="todo.name" label="タスク名" clearable :disabled />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { z } from "zod";

const route = useRoute();
const router = useRouter();

const routeParamsSchema = z.object({ id: z.coerce.number() }).strict();
const { id } = routeParamsSchema.parse(route.params);

const todo = ref<any>({});

const loading = ref(false);
const updating = ref(false);
const deleting = ref(false);

const disabled = computed(
  () =>
    loading.value ||
    updating.value ||
    deleting.value ||
    !Object.keys(todo.value).length
);

onMounted(async () => {
  loading.value = true;

  try {
    const { data } = await axios.get(`todos/${id}`);
    todo.value = data;
  } catch (e) {
    console.error(e);
    alert("failed to get data, see console for details");
  } finally {
    loading.value = false;
  }
});

async function put_todo() {
  updating.value = true;

  try {
    await axios.patch(`/todos/${id}`, todo.value);

    updating.value = false;
    alert("このタスクを更新しました");
  } catch (e) {
    console.error(e);
    alert("failed to update data, see console for details");
  } finally {
    updating.value = false;
  }
}

async function delete_todo() {
  if (!confirm("このタスクを削除してよろしいですか？")) return;

  deleting.value = true;

  try {
    await axios.delete(`/todos/${id}`);

    deleting.value = false;
    router.push({ path: "/" });
  } catch (e) {
    console.error(e);
    alert("failed to delete data, see console for details");
  } finally {
    deleting.value = false;
  }
}
</script>
