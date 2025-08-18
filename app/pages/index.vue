<script setup lang="ts">
import type { ContentCollectionItem } from "@nuxt/content"

const posts = ref<ContentCollectionItem[]>([])

onMounted(() =>
  queryCollection("content")
    .all()
    .then((res) => (posts.value = res)),
)
</script>

<template>
  <div class="container mt-5">
    <main>
      <h1 class="display-2 text-center mb-5">cognitai.cz</h1>
      <section class="row">
        <div class="col-lg-8 mx-auto">
          <article v-for="post of posts" :key="post.id" class="card mb-4">
            <div class="card-body">
              <h2 class="card-title">
                <nuxt-link :to="`${post.path}`" class="text-decoration-none">
                  {{ post.title }}
                </nuxt-link>
              </h2>
              <h6 class="card-subtitle mb-2 text-muted">
                <span v-if="post.author">By {{ post.author }} • </span>{{ new Date(post.date).toLocaleString() }}
              </h6>
              <p class="card-text">
                {{ post.description }}
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>
