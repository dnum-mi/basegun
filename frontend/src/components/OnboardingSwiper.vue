<template>
  <div>
    <div>
      <swiper
        :navigation="true"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide class="flex justify-content-center">
          <img
            src="@/assets/basegun_green.png"
            alt=""
            class="swiper-logo"
          >
          <div class="swiper-content">
            <ul class="swiper-ul fr-text--md">
              <li class="swiper-li">
                Basegun est une application <span class="swiper-green-highlight">prototype</span> en cours de développement par le Ministère de l’Intérieur.
              </li>
              <li class="swiper-li">
                A ce jour, Basegun <span class="swiper-green-highlight">ne prend pas encore en compte</span> l'identification des armes à air comprimé > 2 joules, à blanc ou neutralisées.
              </li>
            </ul>
          </div>
          <div class="swiper-slide-number">
            <span>1/2</span>
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
            <button
              id="position-button"
              class="fr-btn fr-btn--sm"
              @click="redirectToStart"
            >
              J'ai compris
            </button>
          </div>
          <div class="swiper-slide-number-2">
            <span class="">2/2</span>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// import Swiper required modules
import { Navigation } from 'swiper'

export default {
  name: 'OnboardingSwiper',
  components: {
    Swiper,
    SwiperSlide,
  },

  setup () {
    return {
      modules: [Navigation],
    }
  },

  methods: {
    redirectToStart () {
      this.$router.push({ name: 'Start' }).catch(() => {})
    },
  },
}
</script>

<style>

.swiper {
  width: 100%;
  height: 100%;
  position: static;
}

.swiper-slide {
  background: #fff;
}

.swiper-slide-number {
  color: gray;
  margin-top: 4.5em;
  display: flex;
  justify-content: center;
}

.swiper-slide-number-2 {
  color: gray;
  margin-top: 1em;
  display: flex;
  justify-content: center;
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
    color: #000091 !important;
  }
  :deep(.swiper-button-next) {
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

.swiper-button-disabled {
  display: none;
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

</style>
