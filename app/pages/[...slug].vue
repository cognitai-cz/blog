<script setup lang="ts">
import { formatDate } from "../utils"

const route = useRoute()

const { data: page } = await useAsyncData("page-" + route.path, () => {
  return queryCollection("content").path(route.path).first()
})
const { data: pages } = await useAsyncData("page-all", () => {
  return queryCollection("content").order("date", "DESC").all()
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

// eslint-disable-next-line
const estimateReadingTime = (content: any) => {
  if (!content) return 1
  const wordsPerMinute = 200
  let text = ""

  // eslint-disable-next-line
  const extractText = (node: any): string => {
    if (typeof node === "string") return node
    if (node.value) return node.value
    if (node.children) {
      return node.children.map(extractText).join(" ")
    }
    return ""
  }

  if (Array.isArray(content)) {
    text = content.map(extractText).join(" ")
  } else {
    text = extractText(content)
  }

  const words = text.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute) || 1
}
</script>

<template>
  <div>
    <AppHeader />

    <div class="container py-5">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <!-- Article Header -->
          <header v-if="page" class="mb-5">
            <h1 class="display-4 fw-bold text-dark mb-3">{{ page.title }}</h1>

            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
              <div class="post-meta d-flex align-items-center gap-3">
                <div v-if="page.author" class="d-flex align-items-center">
                  <div
                    class="avatar bg-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                    style="width: 40px; height: 40px"
                  >
                    <!-- Avatar -->
                    <span class="text-white fw-bold">{{
                      page.author.charAt(0).toUpperCase()
                    }}</span>
                  </div>
                  <!-- Autor name & date -->
                  <div>
                    <div class="fw-semibold text-dark">{{ page.author }}</div>
                    <small class="text-muted">{{ formatDate(page.date) }}</small>
                  </div>
                </div>
                <div v-else class="text-muted">
                  <i class="bi bi-calendar3 me-1" />
                  {{ formatDate(page.date) }}
                </div>
              </div>

              <div class="reading-meta d-flex align-items-center gap-3 text-muted small">
                <span>
                  <i class="bi bi-clock me-1" />
                  {{ estimateReadingTime((page.body as any)?.children) }} min read
                </span>
                <span>
                  <i class="bi bi-eye me-1" />
                  Published
                </span>
              </div>
            </div>

            <hr class="my-4" />
          </header>

          <!-- Article Content -->
          <article class="prose mb-5">
            <ContentRenderer v-if="page" :value="page" />
          </article>

          <!-- Article Footer -->
          <footer class="mt-5">
            <div class="card bg-light border-0 mb-4">
              <div class="card-body p-4">
                <div class="row align-items-center">
                  <div class="col-md-8">
                    <h5 class="card-title mb-2">Enjoyed this article?</h5>
                    <p class="card-text text-muted mb-0">
                      Share your thoughts and connect with me on social media.
                    </p>
                  </div>
                  <div class="col-md-4 text-md-end mt-3 mt-md-0">
                    <div class="d-flex gap-2 justify-content-md-end">
                      <!-- TODO: Add links -->
                      <a href="#" class="btn btn-outline-primary btn-sm">
                        <i class="bi bi-twitter me-1" />Share
                      </a>
                      <a href="#" class="btn btn-outline-secondary btn-sm">
                        <i class="bi bi-linkedin me-1" />Share
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation -->
            <nav class="d-flex justify-content-between align-items-center">
              <NuxtLink
                v-if="previousPagePath"
                :to="previousPagePath"
                class="btn btn-outline-primary"
              >
                <i class="bi bi-arrow-left me-1" />
                Previous Article
              </NuxtLink>
              <div v-else />

              <NuxtLink to="/" class="btn btn-primary">
                <i class="bi bi-house me-1" />
                All Articles
              </NuxtLink>

              <NuxtLink v-if="nextPagePath" :to="nextPagePath" class="btn btn-outline-primary">
                Next Article
                <i class="bi bi-arrow-right ms-1" />
              </NuxtLink>
              <div v-else />
            </nav>
          </footer>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>
