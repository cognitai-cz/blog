<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData("page-" + route.path, () => {
  return queryCollection("content").path(route.path).first()
})
const { data: pages } = await useAsyncData("page-all", () => {
  return queryCollection("content").all()
})

const nextPagePath = ref<string>()
const previousPagePath = ref<string>()

const contentPageIds = computed(() => pages.value?.map((p) => p.id))
const currentPageIndex = computed(() => contentPageIds.value?.indexOf(page.value!.id))

watch(
  currentPageIndex,
  () => {
    if (!contentPageIds.value || currentPageIndex.value === undefined || !pages.value) return
    if (currentPageIndex.value === 0) {
      nextPagePath.value = undefined
    } else {
      nextPagePath.value = pages.value[currentPageIndex.value - 1]?.path
    }

    if (currentPageIndex.value === contentPageIds.value.length - 1) {
      previousPagePath.value = undefined
    } else {
      previousPagePath.value = pages.value[currentPageIndex.value + 1]?.path
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article class="prose">
          <ContentRenderer v-if="page" :value="page" />
        </article>

        <div v-if="page" class="mt-4 text-muted">
          <small>
            <span v-if="page.author">By {{ page.author }} • </span
            >{{ new Date(page.date).toLocaleString() }}
          </small>
        </div>

        <nav class="d-flex justify-content-between align-items-center mt-4">
          <NuxtLink v-if="previousPagePath" :to="previousPagePath" class="btn btn-outline-primary">
            ← Previous
          </NuxtLink>
          <div v-else />

          <NuxtLink to="/" class="btn btn-primary"> 🏠 Home </NuxtLink>

          <NuxtLink v-if="nextPagePath" :to="nextPagePath" class="btn btn-outline-primary">
            Next →
          </NuxtLink>
          <div v-else />
        </nav>
      </div>
    </div>
  </div>
</template>
