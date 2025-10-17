<template>
  <v-btn text="新規作成" @click="dialog = true" />

  <v-dialog v-model="dialog" max-width="1000px" :persistent="posting">
    <v-card>
      <v-toolbar>
        <v-toolbar-title text="タスク新規作成" />
        <v-spacer />
        <v-btn icon="mdi-close" @click="dialog = false" :disabled="posting" />
      </v-toolbar>

      <v-form @submit.prevent="post_todo">
        <v-card-text>
          <v-text-field v-model="todo.name" label="タスク名" />
        </v-card-text>
      </v-form>

      <v-card-actions>
        <v-btn text="create" @click="post_todo" :loading="posting" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const dialog = ref(false);
const posting = ref(false);

const router = useRouter();

const todo = ref<any>({ name: "" });

async function post_todo() {
  posting.value = true;

  try {
    const { data } = await axios.post("/todos", todo.value);

    posting.value = false;

    router.push({ path: `todos/${data[0].id}` });
  } catch (e) {
    console.error(e);
    alert("failed to post data, see console for details");
  } finally {
    posting.value = false;
  }
}
</script>
