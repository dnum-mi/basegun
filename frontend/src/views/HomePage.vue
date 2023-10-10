<script setup>
import OnboardingSwiper from '@/components/OnboardingSwiper.vue'
</script>

<template>
  <div class="text-center relative top-1/6 <md:top-4">
    <OnboardingSwiper />
  </div>
</template>

<style scoped>
.homepage {
  width: 100%;
  height: 100%;
  position: static;
}

.homepage-content {
  width: 75%;
  margin: 1rem auto;
  text-align: center;
}

.homepage-ul {
  list-style-position: inside;
  text-indent: -1em;
  padding-left: 1em;
  display: inline-block;
  text-align: left;
  max-width: 700px;
  margin-bottom: 12px !important;
}

.homepage-green-highlight {
  font-weight: bold;
  color: #00c7c8;
}

#agree-button {
  display: block;
  margin: 0 auto;
}

</style>
