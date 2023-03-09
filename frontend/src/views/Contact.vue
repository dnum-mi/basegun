<script setup>
import ContactInformationTabs from '@/views/InformationTabs/ContactInformationTabs.vue'
</script>

<template>
  <div>
    <div class="fr-container mt-4">
      <h2>Contact</h2>
      <ContactInformationTabs />
    </div>
  </div>
</template>

<style scoped>
  .title-space {
    margin-top: 20px;
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
