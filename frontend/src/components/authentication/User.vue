<script setup>
import { ref } from "vue";
import { mgr } from "@/utils/authentication";

const user = ref(null);

mgr.getUser().then((data) => (user.value = data));
</script>
<template>
  <pre>{{ user }}</pre>
</template>
