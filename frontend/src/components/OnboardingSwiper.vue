<script setup>

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, A11y } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const modules = [Navigation, Pagination, A11y]

</script>
<template>
  <swiper
    :navigation="true"
    :modules="modules"
    :pagination="{ clickable: true }"
  >
    <swiper-slide>
      <img
        src="@/assets/basegun_green.png"
        alt=""
        class="swiper-logo"
        data-testid="basegun-logo"
      >
      <div class="swiper-content">
        <ul class="swiper-ul fr-text--md">
          <li class="swiper-li">
            Basegun est une application <span class="swiper-green-highlight">prototype</span> en cours de développement par le Ministère de l’Intérieur et des Outre-Mer.
          </li>
          <li class="swiper-li">
            A ce jour, Basegun <span class="swiper-green-highlight">prend en compte uniquement </span> l'identification d'<span class="swiper-green-highlight">armes à feu létales</span> et d'<span class="swiper-green-highlight">armes factices type airsoft</span>.
          </li>
          <li>
            Basegun propose également de les <span class="swiper-green-highlight">mettre en sécurité</span> grâce à des <span class="swiper-green-highlight">tutoriels personnalisés</span>.
          </li>
        </ul>
      </div>
    </swiper-slide>
    <swiper-slide>
      <img
        src="@/assets/basegun_red.png"
        alt=""
        class="swiper-logo"
      >
      <div class="swiper-content">
        <ul class="swiper-ul fr-text--md">
          <li class="swiper-li">
            Basegun <span class="swiper-red-highlight">n’a pas vocation à donner</span> des instructions sur la préservation des traces et indices.
          </li>
          <li class="swiper-li">
            Basegun est un <span class="swiper-red-highlight">outil d'aide à la décision</span>.
            Il <span class="swiper-red-highlight">ne remplace en aucun cas l'avis d'un expert</span>.
          </li>
        </ul>
        <router-link
          v-slot="{navigate}"
          :to="{name:'StartPage'}"
        >
          <button
            id="position-button"
            class="fr-btn fr-btn--sm"
            @click="navigate()"
          >
            J'ai compris
          </button>
        </router-link>
        <div class="small-blank" />
      </div>
    </swiper-slide>
  </swiper>
</template>
<style scoped>
.swiper {
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
  display: inline-block;
  text-align: left;
  max-width: 700px;
  margin-bottom: 12px !important;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  position: fixed;
  top: 57%;
  right: 3%;
  color: #000091 !important;
}

:deep(.swiper-button-prev)::after,
:deep(.swiper-button-next)::after {
  font-size: 28px;
}

:deep(.swiper-button-disabled) {
  display: none;
}

:deep(.swiper-pagination-bullets) {
  bottom: auto;
}

:deep(.swiper-pagination-bullet-active) {
  background: #00c7c8;
}

.swiper-red-highlight {
  font-weight: bold;
  color: #f00;
}

.swiper-green-highlight {
  font-weight: bold;
  color: #00c7c8;
}

#position-button {
  display: block;
  margin: 0 auto;
}

@media (max-height: 35rem) {
  :deep(.swiper-pagination:has(.swiper-pagination-bullet-active[aria-label="Go to slide 2"])) {
    position: relative;
    z-index: 0;
  }
}

:deep(.swiper-pagination-bullet-active[aria-label="Go to slide 2"]) {
  background: #ff1d1d;
}

</style>
