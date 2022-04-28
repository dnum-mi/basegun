<template>
  <div>
    <HeaderMain />
    <div class="content">
      <div class="d-flex align-items-center">
          <a href="/accueil" class="small-link small-text"> Accueil</a>
          <span class="fr-fi-arrow-right-s-line" aria-hidden="true"></span>
          <p class="small-text">Contact</p>
      </div>
      <p class="title-space">Toute question, remarque ou contribution concernant le projet Basegun est à adresser par email à <span class="dark-blue-highlight">basegun@interieur.gouv.fr</span>.</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderMain from '@/components/HeaderMain.vue';

export default {
  name: 'ContactPage',
  components: {
    HeaderMain
  }
}
</script>

<style scoped>

  .content {
      margin: min(5vw, 10rem);
  }
  .title-space {
      margin-top: 20px;
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

  .dark-blue-highlight {
    font-weight: bold;
    color: #000091;
  }

</style>