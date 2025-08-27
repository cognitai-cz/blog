<script setup lang="ts">
import { GITHUB_LINK } from "~/utils/constants"
</script>

<template>
  <footer class="bg-light mt-5 py-4">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h5 class="fw-bold text-dark mb-3">cognitai.cz</h5>
          <p class="text-muted">Exploring the intersection of technology, AI, and innovation.</p>
        </div>
        <div class="col-md-6">
          <div class="row">
            <div class="col-sm-6">
              <h6 class="fw-semibold text-dark mb-2">Quick Links</h6>
              <ul class="list-unstyled">
                <li><NuxtLink to="/" class="text-muted text-decoration-none">Home</NuxtLink></li>
                <li>
                  <NuxtLink to="/about" class="text-muted text-decoration-none">About</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/projects" class="text-muted text-decoration-none">Projects</NuxtLink>
                </li>
              </ul>
            </div>
            <div class="col-sm-6">
              <h6 class="fw-semibold text-dark mb-2">Connect</h6>
              <div class="d-flex gap-2">
                <a :href="GITHUB_LINK" class="text-muted" title="GitHub">
                  <i class="bi bi-github" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-4" />
      <div class="row align-items-center">
        <div class="col-md-6">
          <p class="text-muted mb-0 small">
            © {{ new Date().getFullYear() }} cognitai.cz. All rights reserved.
          </p>
        </div>
        <div class="col-md-6 text-md-end">
          <p class="text-muted mb-0 small">Built using Nuxt 3</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer a:hover {
  color: var(--bs-primary) !important;
  transition: color 0.2s ease;
}

footer {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
