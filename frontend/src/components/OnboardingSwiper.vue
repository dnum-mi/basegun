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
      >
      <div class="swiper-content">
        <ul class="swiper-ul fr-text--md">
          <li class="swiper-li">
            Basegun est une application <span class="swiper-green-highlight">prototype</span> en cours de développement par le Ministère de l’Intérieur et des Outre-Mer.
          </li>
          <li class="swiper-li">
            A ce jour, Basegun <span class="swiper-green-highlight">prend en compte uniquement </span> l'identification d'<span class="swiper-green-highlight">armes à feu létales</span> et d'<span class="swiper-green-highlight">armes factices type airsoft</span>.
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
            Une arme doit toujours être <span class="swiper-red-highlight">considérée comme chargée</span>.
          </li>
          <li class="swiper-li">
            Une arme ne doit <span class="swiper-red-highlight">jamais être dirigée</span> vers quelqu’un.
          </li>
          <li class="swiper-li">
            Avant de manipuler une arme, toujours s’assurer qu’elle est <span class="swiper-red-highlight">mise en sécurité.</span>
          </li>
          <li class="swiper-li">
            Veiller à la préservation des <span class="swiper-red-highlight">traces et indices</span> éventuels lors des manipulations de sécurité.
          </li>
        </ul>
        <router-link
          v-slot="{navigate}"
          :to="{name:'Start'}"
        >
          <button
            id="position-button"
            class="fr-btn fr-btn--sm"
            @click="navigate()"
          >
            J'ai compris
          </button>
        </router-link>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, A11y } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default {
  name: 'OnboardingSwiper',
  components: {
    Swiper,
    SwiperSlide,
  },

  setup () {
    return {
      modules: [Navigation, Pagination, A11y],

    }
  },
}
</script>

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

:deep(.swiper-button-prev) {
  position: fixed;
  top: 45%;
  color: #000091 !important;
}

:deep(.swiper-button-next) {
  position: fixed;
  top: 45%;
  color: #000091 !important;
}

:deep(.swiper-button-prev)::after {
  font-size: 28px;
}

:deep(.swiper-button-next)::after {
  font-size: 28px;
}

:deep(.swiper-button-disabled) {
  display: none;
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

:deep(.swiper-pagination-bullet-active[aria-label="Go to slide 2"]) {
  background: #ff1d1d;
}
</style>
