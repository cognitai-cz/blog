<script setup lang="ts">
alert("loaded vue component in markdown")
</script>

<template>
  <div class="p-2 border bg-white dark:bg-black dark:border-gray-700 rounded">
    <slot />
  </div>
</template>
