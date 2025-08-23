<template>
  <header class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div class="container">
      <NuxtLink to="/" class="navbar-brand fw-bold text-primary"> cognitai.cz </NuxtLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarNav" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/about" class="nav-link">About</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
  letter-spacing: -0.025em;
}

.nav-link {
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--bs-primary) !important;
}

.navbar {
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
