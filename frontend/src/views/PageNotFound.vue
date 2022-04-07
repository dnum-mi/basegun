<template>
    <div>       
        <HeaderMain />
        <div class="text-center m-4">
            <h1>Page non trouvée</h1>
            <p>Vous avez saisi ou suivi un lien vers une page qui n'existe pas.</p>
            <DsfrButton
            :label="labelButton"
             @click="homeRedirect"
            />
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HeaderMain from '@/components/HeaderMain.vue';

export default {
  name: 'PageNotFound',
  components: {
    HeaderMain
  },
  data() {
      return {
          labelButton: "Retour"
      }
  },
  methods: {
      homeRedirect() {
          window.location.replace("/")
      }
  }
}
</script>
