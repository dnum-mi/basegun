<template>
  <div>
  <HeaderNoMenu />
  <swiper :navigation="true" :pagination="true" :modules="modules" class="mySwiper">
    <swiper-slide>
      <img src="../assets/basegun_red.png" alt="" class="swiper-logo">
      <div class="swiper-content">
        <ul class="swiper-ul fr-text--md">
          <li class="swiper-li">Une arme doit toujours être <span class="swiper-red-highlight">considérée comme chargée</span>.</li>
          <li class="swiper-li">Une arme ne doit <span class="swiper-red-highlight">jamais être dirigée</span> vers quelqu’un.</li>
          <li class="swiper-li">Avant de manipuler une arme, toujours s’assurer qu’elle est <span class="swiper-red-highlight">mise en sécurité</span></li>
          <li class="swiper-li">Veiller à la préservation des <span class="swiper-red-highlight">traces et indices</span> éventuels lors des manipulations de sécurité</li>          
        </ul>
      </div>
    </swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
  </swiper>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper";

import HeaderNoMenu from '@/components/HeaderNoMenu.vue';


export default {
  components: {
    Swiper,
    SwiperSlide,
    HeaderNoMenu
  },
  setup() {
    return {
      modules: [Navigation, Pagination],
    };
  },
};
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
  }

  .swiper-li {
    margin-bottom: 4px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: #000091;
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 28px;
  }

  .swiper-pagination-bullet-active {
    background: #000091;
  }

  .swiper-red-highlight {
    font-weight: bold;
    color: #FF0000;
  }

</style>