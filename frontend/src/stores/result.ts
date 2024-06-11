import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { computed } from "vue";

import { serializer } from "@/utils/storage-utils";
import type { TYPOLOGIES } from "@/utils/firearms-utils";

type TypologyKey = keyof typeof TYPOLOGIES;

export const useStore = defineStore("result", () => {
  const typology = useLocalStorage<TypologyKey>("typology", null, {
    serializer,
  });
  const confidence = useLocalStorage<number>("confidence", null, {
    serializer,
  });
  const confidenceLevel = useLocalStorage<string>("confidenceLevel", null, {
    serializer,
  });
  const gunLength = useLocalStorage<number>("gunLength", null, { serializer });
  const gunBarrelLength = useLocalStorage<number>("gunBarrelLength", null, {
    serializer,
  });
  const img = useLocalStorage<string>("img", null, { serializer });
  const imgUrl = useLocalStorage<string>("imgUrl", null, { serializer });
  const resultText = useLocalStorage<string>("resultText", null, {
    serializer,
  });
  const securingTutorial = ref(false);

  const selectedOptions = useLocalStorage<Array<string>>("selectedOptions", []);
  const selectedAmmo = useLocalStorage<string | undefined>(
    "selectedAmmo",
    undefined,
    { serializer },
  );
  const selectedAlarmGun = useLocalStorage<string | undefined>(
    "selectedAlarmGun",
    undefined,
    { serializer },
  );
  const tutorialFeedback = useLocalStorage("tutorialFeedback", "");
  const isDummy = useLocalStorage(
    "isDummy",
    computed(() => !!(selectedAmmo.value === "billes")),
    { serializer },
  );
  const isModalTransparentAmmoOpened = useLocalStorage<boolean | undefined>(
    "isModalTransparentAmmoOpened",
    undefined,
    { serializer },
  );

  function $reset() {
    selectedAlarmGun.value = "";
    selectedOptions.value = [];
  }

  return {
    typology,
    confidence,
    confidenceLevel,
    gunLength,
    gunBarrelLength,
    img,
    imgUrl,
    resultText,
    securingTutorial,
    selectedOptions,
    selectedAmmo,
    selectedAlarmGun,
    tutorialFeedback,
    isDummy,
    isModalTransparentAmmoOpened,
    $reset,
  };
});
