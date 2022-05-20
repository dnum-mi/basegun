<template>
  <div>
    <HeaderMain />
    <div class="content">
        <div class="d-flex align-items-center">
            <a href="/accueil" class="small-link small-text"> Accueil</a>
            <span class="fr-fi-arrow-right-s-line" aria-hidden="true"></span>
            <p class="small-text">Mentions légales</p>
        </div>
        <LegalTextContent />
        
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderMain from '@/components/HeaderMain.vue';
import LegalTextContent from "@/views/text_content/LegalTextContent.vue";

export default {
  name: 'LegalPage',
  components: {
    HeaderMain,
    LegalTextContent
  }
}
</script>

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