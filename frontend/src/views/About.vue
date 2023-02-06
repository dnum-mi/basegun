<script setup>
import AboutInformationTabs from '@/views/InformationTabs/AboutInformationTabs.vue'
</script>

<template>
  <div>
    <div class="content">
      <h2>À propos</h2>
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
