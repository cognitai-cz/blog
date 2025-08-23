<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter((l) => l.code !== locale.value)
})

const currentLanguage = computed(() => {
  const current = locales.value.find((l) => l.code === locale.value)
  return current?.name || "English"
})

const currentFlag = computed(() => {
  return getFlag(locale.value)
})

const getFlag = (localeCode: string) => {
  const flags: Record<string, string> = {
    en: "🇺🇸",
    cz: "🇨🇿",
  }
  return flags[localeCode] || "🌐"
}

const switchLanguage = (localeCode: string) => {
  setLocale(localeCode)
}
</script>

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
        :aria-label="$t('navigation.toggleNavigation')"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div id="navbarNav" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <NuxtLink to="/" class="nav-link">{{ $t("navigation.home") }}</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/about" class="nav-link">{{ $t("navigation.about") }}</NuxtLink>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle d-flex align-items-center"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="flag-icon me-2">{{ currentFlag }}</span>
              {{ currentLanguage }}
            </a>
            <ul class="dropdown-menu">
              <li v-for="locale in availableLocales" :key="locale.code">
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="#"
                  @click.prevent="switchLanguage(locale.code)"
                >
                  <span class="flag-icon me-2">{{ getFlag(locale.code) }}</span>
                  {{ locale.name }}
                </a>
              </li>
            </ul>
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

.flag-icon {
  font-size: 1.2em;
  display: inline-block;
}

.dropdown-menu {
  min-width: 150px;
}

.dropdown-item {
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: var(--bs-primary);
  color: white;
}
</style>
