<script setup>
import AboutInformationTabs from '@/views/InformationTabs/AboutInformationTabs.vue'

const links = [
  {
    to: '/',
    text: 'Acceuil',
  },
  {
    text: 'À propos',
  },
]
</script>

<template>
  <div>
    <div class="content">
      <DsfrBreadcrumb
        :links="links"
      />
      <!-- <div class="d-flex align-items-center">
        <router-link
          :to="{name:'Start'}"
          class="small-link small-text"
        >
          Accueil
        </router-link>
        <span
          class="fr-fi-arrow-right-s-line"
          aria-hidden="true"
        />
        <p class="small-text">
          À propos
        </p>
      </div> -->
      <AboutInformationTabs />
    </div>
  </div>
</template>

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
