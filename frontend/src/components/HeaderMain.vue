<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import basegunLogo from "@/assets/basegun.png";

const route = useRoute();

const wholeLogo = computed(() => route.meta.wholeLogo as boolean);

const isMobile = window.innerWidth <= 640;

const logoText = computed<
  InstanceType<typeof DsfrHeader>["$props"]["logoText"]
>(() => (!isMobile || wholeLogo.value ? ["Ministère", "de l’intérieur"] : []));

const quickLinks: InstanceType<typeof DsfrHeader>["$props"]["quickLinks"] = [
  {
    label: "Informations",
    to: "/",
  },
  {
    label: "À propos",
    to: "/a-propos",
  },
  {
    label: "Mentions légales",
    to: "/mentions-legales",
  },
  {
    label: "Contact",
    to: "/contact",
  },
  {
    label: "Accessibilité : partiellement conforme",
    to: "/accessibilite",
  },
];

const operatorImgStyle: InstanceType<
  typeof DsfrHeader
>["$props"]["operatorImgStyle"] = {
  width: "30%",
};
</script>

<template>
  <DsfrHeader
    :class="{ 'marianne-only': !wholeLogo }"
    :quick-links="quickLinks"
    :operator-img-src="basegunLogo"
    :operator-img-style="operatorImgStyle"
    operator-img-alt="Logo basegun"
    :show-beta="false"
    :home-to="{ name: 'StartPage' }"
    :logo-text="logoText"
  />
</template>

<style scoped>
:deep(.fr-container) {
  position: relative;
}

@screen lt-sm {
  .marianne-only :deep(.fr-logo::after) {
    display: none;
  }
}

:deep(.fr-header__navbar) {
  margin-top: 0 !important;
}

:deep(.fr-header__navbar .fr-btn--menu) {
  color: var(--text-action-high-blue-france);
  box-shadow: none;
}

.marianne-only :deep(.fr-header__logo .fr-logo::before) {
  background-size: cover;
  background-position: inherit;
  height: 1.2rem;
  margin-bottom: 0.25rem;
  width: 3rem;
}

:deep(.fr-badge) {
  position: absolute;
  left: 4.25rem;
  bottom: 1rem;
}
</style>
