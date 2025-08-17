<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData("page-" + route.path, () => {
  return queryCollection("content").path(route.path).first()
})
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article class="prose">
          <ContentRenderer v-if="page" :value="page" />
        </article>
      </div>
    </div>
  </div>
</template>
