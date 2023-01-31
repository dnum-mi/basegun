<script setup>
import ContactInformationTabs from '@/views/InformationTabs/ContactInformationTabs.vue'

const links = [
  {
    to: '/',
    text: 'Acceuil',
  },
  {
    text: 'Contact',
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
          Contact
        </p>
      </div> -->
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
