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
    const unresizeImage = ref(null);
    const securingTutorial = ref(false);

    const selectedOptions = ref([]);
    const selectedAmmo = ref(undefined);
    const selectedAlarmGun = ref(undefined);
    const alarmModel = ref(null);
    const isAlarmGunMissingText = ref(null);
    const isAlarmGunLowQuality = ref(null);
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
      unresizeImage.value = null;
      securingTutorial.value = false;

      selectedOptions.value = [];
      selectedAmmo.value = undefined;
      selectedAlarmGun.value = undefined;
      alarmModel.value = null;
      isAlarmGunMissingText.value = null;
      isAlarmGunLowQuality.value = null;
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
      unresizeImage,
      securingTutorial,
      selectedOptions,
      selectedAmmo,
      selectedAlarmGun,
      alarmModel,
      isAlarmGunMissingText,
      isAlarmGunLowQuality,
      isDummy,
      isModalTransparentAmmoOpened,
      $reset,
    };
  },
  persist: true,
});
