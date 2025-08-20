import { ref, onMounted } from "vue"
import type { Ref } from "vue"
import type { ParsedContentv2 } from "@nuxt/content"

export interface Article extends ParsedContentv2 {
  title: string
  description: string
  date: Date
  author: string
}

export function useArticles(): Ref<Article[]> {
  const posts = ref<Article[]>([])

  onMounted(async () => {
    const articles = await queryContent<Article>("articles").sort({ date: -1 }).find()

    // Assign the fetched array directly to the ref's value
    posts.value = articles
  })

  return posts
}
