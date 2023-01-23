<template>
  <div>
    <div class="content">
      <div class="d-flex align-items-center">
        <a
          href="/accueil"
          class="small-link small-text"
        > Accueil</a>
        <span
          class="fr-fi-arrow-right-s-line"
          aria-hidden="true"
        />
        <p class="small-text">
          À propos
        </p>
      </div>
      <AboutInformationTabs />
    </div>
  </div>
</template>

<script>

import AboutInformationTabs from '@/views/InformationTabs/AboutInformationTabs.vue'

export default {
  name: 'AboutPage',
  components: {
    AboutInformationTabs,
  },
}
</script>

<style scoped>
    .content {
      margin: min(5vw, 10rem);
    }

    .contact-list {
      margin-left: 2rem;
    }

    .small-text {
      font-size: 10pt;
      margin-bottom: 0;
    }

    .small-link {
      color: #000091;
    }

    .small-link:hover {
      color: #1212ff
    }

</style>
