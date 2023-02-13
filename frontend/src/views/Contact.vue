<script setup>
import ContactInformationTabs from '@/views/InformationTabs/ContactInformationTabs.vue'
</script>

<template>
  <div>
    <div class="content">
      <h2>Contact</h2>
      <ContactInformationTabs />
    </div>
  </div>
</template>

<style scoped>
  .content {
    margin: min(5vw, 10rem);
  }

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
