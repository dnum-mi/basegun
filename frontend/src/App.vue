<script lang="ts" setup>
import darkThemeSvg from "@/assets/moon.svg";
import lightThemeSvg from "@gouvfr/dsfr/dist/artwork/light.svg";
import systemThemeSvg from "@gouvfr/dsfr/dist/artwork/pictograms/system/system.svg";

import { ref, onMounted, onBeforeUnmount } from "vue";
import { registerSW } from "virtual:pwa-register";

const online = ref(navigator.onLine);

const updateOnlineStatus = () => {
  online.value = navigator.onLine;
};

onMounted(() => {
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
});

onBeforeUnmount(() => {
  window.removeEventListener("online", updateOnlineStatus);
  window.removeEventListener("offline", updateOnlineStatus);
});

onMounted(useScheme);

registerSW({ immediate: true });

const preferences = reactive<{
  theme: "dark" | "light" | undefined;
  scheme: "dark" | "light" | "system" | undefined;
}>({
  theme: undefined,
  scheme: undefined,
});

onMounted(() => {
  const { theme, scheme, setScheme } = useScheme() as UseSchemeResult;
  preferences.theme = theme.value as "dark" | "light";
  preferences.scheme = scheme.value as "dark" | "light" | "system";

  watchEffect(() => {
    preferences.scheme = preferences.theme as "dark" | "light";
  });

  watchEffect(() =>
    setScheme(preferences.scheme as "dark" | "light" | "system"),
  );
});

const isThemeModalOpen = ref(false);
const options = [
  {
    label: "Thème clair",
    value: "light",
    svgPath: lightThemeSvg,
  },
  {
    label: "Thème sombre",
    value: "dark",
    img: darkThemeSvg,
  },
  {
    label: "Thème système",
    value: "system",
    hint: "Utilise les paramètres système",
    svgPath: systemThemeSvg,
  },
];
</script>

<template>
  <div v-show="online">
    <AppHeader
      :class="{ 'marianne-only': !wholeLogo }"
      v-model="searchQuery"
      :logo-text="logoText"
      :quick-links="quickLinks"
    >
      <template #after-quick-links>
        <DsfrButton
          type="button"
          icon="ri-sun-line"
          label="Paramètres d'affichage"
          @click="isThemeModalOpen = true"
        />
      </template>
    </AppHeader>
    <DsfrModal
      :opened="isThemeModalOpen"
      title="Changer le thème"
      @close="isThemeModalOpen = false"
    >
      <DsfrRadioButtonSet
        v-model="preferences.scheme"
        :options="options"
        name="theme-selector"
        legend="Choisissez un thème pour personnaliser l’apparence du site."
      />
    </DsfrModal>
  </div>
  <router-view v-if="online" />
  <div v-else id="app">
    <AppHeader />
    <div class="text-center relative top-1/6 m-4">
      <h1>Problème de connexion</h1>
      <p>Vous n'avez pas accès à Internet.</p>
    </div>
  </div>
</template>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
