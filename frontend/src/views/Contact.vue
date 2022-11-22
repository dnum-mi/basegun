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
          Contact
        </p>
      </div>
      <ContactTextContent />
    </div>
  </div>
</template>

<script>

import ContactTextContent from "@/views/text_content/ContactTextContent.vue";

export default {
  name: 'ContactPage',
  components: {
    ContactTextContent,
  },
}
</script>

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