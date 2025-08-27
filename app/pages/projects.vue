<template>
  <div>
    <AppHeader />

    <div class="container py-5">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <!-- Projects Header -->
          <header class="mb-5">
            <h1 class="display-4 fw-bold text-dark mb-3">Projects</h1>

            <hr class="my-4" />
          </header>

          <!-- Projects Content -->
          <article class="prose mb-5">
            <p class="lead">This is the projects page. Content will be added here soon.</p>
          </article>

          <!-- Projects Footer -->
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
// Define SEO metadata for the page
useHead({
  title: 'Projects',
  meta: [
    { name: 'description', content: 'View our projects.' }
  ]
});
</script>

<style scoped>
/* Add any page-specific styles here */
</style>
