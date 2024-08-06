<template>
  <swiper-container :navigation="true" :pagination="{ clickable: true }">
    <swiper-slide>
      <img
        src="@/assets/basegun_green.png"
        alt="Logo Basegun"
        height="250"
        class="swiper-logo"
        data-testid="basegun-logo"
      />
      <div class="swiper-content">
        <ul class="swiper-ul fr-text--md">
          <li class="swiper-li">
            Basegun est une application
            <strong
              ><span class="swiper-green-highlight">prototype</span></strong
            >
            en cours de développement par le Ministère de l’Intérieur.
          </li>
          <li class="swiper-li">
            A ce jour, Basegun
            <strong
              ><span data-v-f74c6fe1="" class="swiper-green-highlight"
                >prend en compte uniquement
              </span></strong
            >
            l'identification d'<strong
              ><span data-v-f74c6fe1="" class="swiper-green-highlight"
                >armes à feu létales</span
              ></strong
            >, d'<strong
              ><span data-v-f74c6fe1="" class="swiper-green-highlight"
                >armes d'alarme</span
              ></strong
            >
            et d'<strong
              ><span data-v-f74c6fe1="" class="swiper-green-highlight"
                >armes factices type airsoft</span
              >.</strong
            >
          </li>
          <li>
            Basegun propose également de les
            <strong
              ><span class="swiper-green-highlight"
                >mettre en sécurité</span
              ></strong
            >
            grâce à des
            <strong
              ><span class="swiper-green-highlight"
                >tutoriels personnalisés</span
              >.</strong
            >
          </li>
        </ul>
      </div>
    </swiper-slide>
    <swiper-slide>
      <img
        src="@/assets/basegun.png"
        alt="Logo Basegun"
        height="250"
        class="swiper-logo"
      />
      <div class="swiper-content">
        <ul class="swiper-ul fr-text--md">
          <li class="swiper-li">
            Basegun
            <strong
              ><span class="swiper-red-highlight"
                >n’a pas vocation à donner</span
              ></strong
            >
            des instructions sur la préservation des traces et indices.
          </li>
          <li class="swiper-li">
            Basegun est un
            <strong
              ><span class="swiper-red-highlight"
                >outil d'aide à la décision</span
              >.</strong
            >
            Il
            <strong
              ><span class="swiper-red-highlight"
                >ne remplace en aucun cas l'avis d'un expert</span
              >.</strong
            >
          </li>
        </ul>
        <router-link v-slot="{ navigate }" :to="{ name: 'StartPage' }">
          <DsfrButton
            id="agree-button"
            class="fr-btn fr-btn--sm mt-5"
            @click="navigate()"
          >
            J'ai compris
          </DsfrButton>
        </router-link>
        <div class="small-blank" />
      </div>
    </swiper-slide>
  </swiper-container>
</template>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
  position: static;
}

.swiper-slide {
  background: #fff;
}

.swiper-logo {
  display: block;
  margin: 0 auto;
}

.swiper-content {
  width: 75%;
  margin: 0 auto;
  text-align: center;
}

.swiper-ul {
  list-style-position: inside;
  text-indent: -1em;
  padding-left: 1em;
  text-align: left;
  max-width: 700px;
  margin: auto;
  margin-bottom: 12px !important;
}

swiper-container::part(button-prev),
swiper-container::part(button-next) {
  position: fixed;
  top: 57%;
  right: 3%;
  color: var(--blue-france-sun-113-625) !important;
  width: 1rem;
}

.swiper-button-prev {
  background-color: #f00 !important;
}

.swiper-button-disabled {
  display: none;
}

.swiper-button-prev {
  background-color: yellow !important;
}

swiper-container::part(pagination) {
  bottom: -0.35rem;
}

swiper-container::part(bullet-active) {
  background: var(--blue-france-sun-113-625);
}

.swiper-red-highlight {
  font-weight: bold;
  color: #f00;
}

.swiper-green-highlight {
  font-weight: bold;
  color: #00c7c8;
}
</style>
