<script setup lang="ts">
import type { ContentCollectionItem } from "@nuxt/content"

const posts = ref<ContentCollectionItem[]>([])

onMounted(async () => (posts.value = await queryCollection("content").all()))
</script>

<template>
  <main>
    <h1>My blog page</h1>
    <section>
      <article v-for="post of posts" :key="post.id">
        <h2>
          <nuxt-link :to="`${post.path}`">
            {{ post.title }}
          </nuxt-link>
        </h2>
        <h3>{{ new Date(post.date).toLocaleString() }}</h3>
        <span>
          {{ post.description }}
        </span>
      </article>
    </section>
  </main>
</template>
