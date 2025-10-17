<template></template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

router.replace({ path: "todos" });
</script>
