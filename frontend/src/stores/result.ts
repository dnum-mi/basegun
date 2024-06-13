import { defineStore } from "pinia";
import { computed } from "vue";

export const useStore = defineStore("result", {
  state: () => {
    const typology = ref(null);
    const confidence = ref(null);
    const confidenceLevel = ref(null);
    const gunLength = ref(null);
    const gunBarrelLength = ref(null);
    const img = ref(null);
    const imgUrl = ref(null);
    const securingTutorial = ref(false);

    const selectedOptions = ref([]);
    const selectedAmmo = ref(undefined);
    const selectedAlarmGun = ref(undefined);
    const tutorialFeedback = ref("");
    const isDummy = computed(() => !!(selectedAmmo.value === "billes"));
    const isModalTransparentAmmoOpened = ref(null);

    function $reset() {
      typology.value = null;
      confidence.value = null;
      confidenceLevel.value = null;
      gunLength.value = null;
      gunBarrelLength.value = null;
      img.value = null;
      imgUrl.value = null;
      securingTutorial.value = false;

      selectedOptions.value = [];
      selectedAmmo.value = undefined;
      selectedAlarmGun.value = undefined;
      tutorialFeedback.value = "";
      isModalTransparentAmmoOpened.value = null;
    }

    return {
      typology,
      confidence,
      confidenceLevel,
      gunLength,
      gunBarrelLength,
      img,
      imgUrl,
      securingTutorial,
      selectedOptions,
      selectedAmmo,
      selectedAlarmGun,
      tutorialFeedback,
      isDummy,
      isModalTransparentAmmoOpened,
      $reset,
    };
  },
  persist: true,
});
