<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title text="タスク一覧" />
      <CreateTodoButton />
    </v-toolbar>

    <v-card-text>
      <v-data-table-server
        :headers
        :items
        :items-length="totalItems"
        v-model:page="queryOptions.page"
        v-model:items-per-page="queryOptions.itemsPerPage"
        v-model:sort-by="queryOptions.sortBy"
        :loading
        :items-per-page-options="pageItems"
      >
        <template v-slot:top>
          <SearchTodo
            :search_params="{
              name: queryOptions.name,
              priority: queryOptions.priority,
            }"
            @update_search_params="handleSearchParamsUpdate"
          />
        </template>
        <template v-slot:item.name="{ item }">
          <RouterLink :to="`/todos/${item.id}`">{{ item.name }}</RouterLink>
        </template>
      </v-data-table-server>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import CreateTodoButton from "@/components/CreateTodoButton.vue";

import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { z } from "zod";

const route = useRoute();
const router = useRouter();

const pageItems = [5, 10, 20, 50];

const headers = [
  { title: "id", key: "id" },
  { title: "タスク名", key: "name" },
];

const urlParamsSchema = z.object({
  skip: z.coerce.number().gte(0).catch(0),
  take: z.coerce.number().gte(1).catch(10),
  // if headers have sortable, use filter method for js array
  sort: z.literal(headers.map((header) => header.key)).catch("id"),
  order: z.literal(["asc", "desc"]).catch("asc"),
  priority: z.string().optional(),
  name: z.string().optional(),
});

const queryOptionsSchema = z.object({
  page: z.coerce.number(),
  itemsPerPage: z.coerce.number(),
  sortBy: z.array(
    z.object({
      // if headers have sortable, use filter method for js array
      key: z.literal(headers.map((header) => header.key)).catch("id"),
      order: z.literal(["asc", "desc"]).optional(),
    })
  ),
  priority: z.string().optional(),
  name: z.string().optional(),
});

const totalItems = ref(10);
const loading = ref(false);

const queryOptions = ref(urlParamsToQueryOptions());

const items = ref<any[]>([]);

async function get_items() {
  loading.value = true;

  const params = urlParamsSchema.parse(route.query);

  const { data } = await axios.get("/todos", { params });

  items.value = data.items;
  totalItems.value = data.total;

  loading.value = false;
}

function urlParamsToQueryOptions() {
  const { skip, take, sort, order, priority, name } = urlParamsSchema.parse(
    route.query
  );

  return {
    page: Math.floor(skip / take) + 1,
    itemsPerPage: take,
    sortBy: [{ key: sort, order }],
    priority,
    name,
  };
}

async function queryOptionsToUrlParams() {
  const { page, itemsPerPage, sortBy, priority, name } =
    queryOptionsSchema.parse(queryOptions.value);

  await router.replace({
    query: {
      ...route.query,
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      sort: sortBy[0]?.key,
      order: sortBy[0]?.order,
      priority,
      name,
    },
  });
}

async function handleSearchParamsUpdate(search_params: any) {
  queryOptions.value = { ...queryOptions.value, ...search_params };
  queryOptions.value.page = 1;
}

watch(
  queryOptions,
  async () => {
    // awaitがないとquery更新前の値でデータ更新してしまう
    await queryOptionsToUrlParams();

    get_items();
  },
  { deep: true, immediate: true }
);
</script>
