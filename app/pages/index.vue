<script setup lang="ts">
import type { ContentCollectionItem } from "@nuxt/content"

const posts = ref<ContentCollectionItem[]>([])

onMounted(() =>
  queryCollection("content")
    .order("date", "DESC")
    .all()
    .then((res) => (posts.value = res)),
)

const estimateReadingTime = (text: string) => {
  const wordsPerMinute = 200
  const words = text.split(" ").length
  return Math.ceil(words / wordsPerMinute) || 1
}
</script>

<template>
  <div>
    <AppHeader />

    <div class="container py-5">
      <main>
        <!-- Hero Section -->
        <section class="text-center mb-5">
          <h1 class="display-3 fw-bold text-dark mb-3">cognitai.cz</h1>
          <p class="lead text-muted mb-4">
            Exploring the intersection of technology, AI, and innovation
          </p>
          <div class="badge bg-primary-subtle text-primary px-3 py-2">
            {{ posts.length }} {{ posts.length === 1 ? "Article" : "Articles" }} Published
          </div>
        </section>

        <!-- Blog Posts -->
        <section class="row">
          <div class="col-lg-8 mx-auto">
            <article v-for="post of posts" :key="post.id" class="blog-card mb-4">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body p-4">
                  <div class="d-flex align-items-start justify-content-between mb-3">
                    <div class="post-meta">
                      <span v-if="post.author" class="badge bg-light text-dark me-2">
                        {{ post.author }}
                      </span>
                      <small class="text-muted">
                        {{ formatDate(post.date) }}
                      </small>
                    </div>
                    <div class="reading-time">
                      <small class="text-muted">
                        <i class="bi bi-clock me-1" />
                        {{ estimateReadingTime(post.description) }} min read
                      </small>
                    </div>
                  </div>

                  <h2 class="card-title h4 mb-3">
                    <nuxt-link
                      :to="`${post.path}`"
                      class="text-decoration-none text-dark stretched-link"
                    >
                      {{ post.title }}
                    </nuxt-link>
                  </h2>

                  <p class="card-text text-muted mb-3">
                    {{ post.description }}
                  </p>

                  <div class="d-flex align-items-center justify-content-between">
                    <span class="text-primary small fw-medium"> Read more → </span>
                  </div>
                </div>
              </div>
            </article>

            <div v-if="posts.length === 0" class="text-center py-5">
              <div class="text-muted">
                <i class="bi bi-file-text fs-1 mb-3 d-block" />
                <h5>No posts yet</h5>
                <p>Check back soon for new content!</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
.blog-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.blog-card:hover {
  transform: translateY(-2px);
}

.blog-card:hover .card {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.blog-card .stretched-link:hover {
  color: var(--bs-primary) !important;
}

.post-meta .badge {
  font-size: 0.75rem;
  font-weight: 500;
}

.reading-time {
  flex-shrink: 0;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
</style>
