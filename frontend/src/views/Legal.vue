<script setup>
import LegalInformationTabs from '@/views/InformationTabs/LegalInformationTabs.vue'
</script>

<template>
  <div>
    <div class="content">
      <h2>Mentions légales</h2>
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
          Mentions légales
        </p>
      </div> -->
      <LegalInformationTabs />
    </div>
  </div>
</template>

<style scoped>
  .content {
    margin: min(5vw, 10rem);
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
