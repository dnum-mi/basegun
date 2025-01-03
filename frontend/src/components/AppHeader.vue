<script lang="ts" setup>
import { computed, ref, useSlots } from "vue";
import { useRoute } from "vue-router";

import {
  DsfrLogo,
  DsfrSearchBar,
  DsfrHeaderMenuLinks,
  type DsfrHeaderProps,
} from "@gouvminint/vue-dsfr";

const route = useRoute();
import basegunLogo from "@/assets/basegun.png";

const wholeLogo = computed(() => route.meta.wholeLogo as boolean);
const isMobile = window.innerWidth <= 640;

const logoText = computed<
  InstanceType<typeof DsfrHeader>["$props"]["logoText"]
>(() => (!isMobile || wholeLogo.value ? ["Ministère", "de l’Intérieur"] : []));

const props = withDefaults(defineProps<DsfrHeaderProps>(), {
  operatorImgAlt: "Logo Basegun",
  operatorImgSrc: basegunLogo,
  operatorImgStyle: () => ({ width: "30%" }),
  quickLinks: () => [
    {
      label: "Informations",
      to: "/",
      icon: "ri-information-2-line",
    },
    {
      label: "À propos",
      to: "/a-propos",
      icon: "ri-question-line",
    },
    {
      label: "Mentions légales",
      to: "/mentions-legales",
      icon: "ri-scales-3-line",
    },
    {
      label: "Contact",
      to: "/contact",
      icon: "ri-customer-service-2-line",
    },
    {
      label: "Accessibilité : partiellement conforme",
      to: "/accessibilite",
      icon: "ri-accessibility-line",
    },
  ],
});
const menuOpened = ref(false);
const searchModalOpened = ref(false);
const modalOpened = ref(false);
const hideModal = () => {
  modalOpened.value = false;
  menuOpened.value = false;
  searchModalOpened.value = false;
  document.getElementById("button-menu")?.focus();
};
const showMenu = () => {
  modalOpened.value = true;
  menuOpened.value = true;
  searchModalOpened.value = false;
  document.getElementById("close-button")?.focus();
};
const showSearchModal = () => {
  modalOpened.value = true;
  menuOpened.value = false;
  searchModalOpened.value = true;
};
const onQuickLinkClick = hideModal;
const slots = useSlots();
const isWithSlotOperator = computed(
  () => Boolean(slots.operator?.().length) || !!props.operatorImgSrc,
);
const isWithSlotNav = computed(() => Boolean(slots.mainnav));
// eslint-disable-next-line func-call-spacing
defineEmits<{
  (e: "update:modelValue", payload: string): void;
  (e: "search", payload: string): void;
}>();
</script>

<template>
  <header role="banner" class="fr-header">
    <div class="fr-header__body">
      <div class="fr-container width-inherit">
        <div class="fr-header__body-row">
          <div class="fr-header__brand fr-enlarge-link">
            <div class="fr-header__brand-top">
              <div class="fr-header__logo">
                <DsfrLogo :logo-text="logoText" data-testid="header-logo" />
                <RouterLink :to="{ name: 'StartPage' }" />
              </div>
              <div v-if="isWithSlotOperator" class="fr-header__operator">
                <!-- @slot Slot nommé operator pour le logo opérateur. Sera dans `<div class="fr-header__operator">` -->
                <slot name="operator">
                  <img
                    v-if="operatorImgSrc"
                    class="fr-responsive-img"
                    :src="operatorImgSrc"
                    :alt="operatorImgAlt"
                    :style="operatorImgStyle"
                  />
                </slot>
              </div>
              <div
                v-if="showSearch || isWithSlotNav || quickLinks?.length"
                class="fr-header__navbar"
              >
                <button
                  v-if="showSearch"
                  class="fr-btn fr-btn--search"
                  aria-controls="header-search"
                  aria-label="Recherche"
                  title="Recherche"
                  :data-fr-opened="searchModalOpened"
                  @click.prevent.stop="showSearchModal()"
                />
                <button
                  v-if="isWithSlotNav || quickLinks?.length"
                  id="button-menu"
                  class="fr-btn--menu fr-btn"
                  :data-fr-opened="showMenu"
                  aria-controls="header-navigation"
                  aria-haspopup="menu"
                  aria-label="Menu"
                  title="Menu"
                  data-testid="open-menu-btn"
                  @click.prevent.stop="showMenu()"
                />
              </div>
            </div>
            <div v-if="serviceTitle" class="fr-header__service">
              <RouterLink
                :to="homeTo"
                :title="`Accueil - ${serviceTitle}`"
                v-bind="$attrs"
              >
                <p class="fr-header__service-title">
                  {{ serviceTitle }}
                  <span
                    v-if="showBeta"
                    class="fr-badge fr-badge--sm fr-badge--green-emeraude"
                  >
                    BETA
                  </span>
                </p>
              </RouterLink>
              <p v-if="serviceDescription" class="fr-header__service-tagline">
                {{ serviceDescription }}
              </p>
            </div>
            <div v-if="!serviceTitle && showBeta" class="fr-header__service">
              <p class="fr-header__service-title">
                <span class="fr-badge fr-badge--sm fr-badge--green-emeraude"
                  >BETA</span
                >
              </p>
            </div>
          </div>
          <div class="fr-header__tools">
            <div v-if="quickLinks?.length" class="fr-header__tools-links">
              <slot name="before-quick-links" />
              <nav role="navigation">
                <DsfrHeaderMenuLinks
                  v-if="!menuOpened"
                  :links="quickLinks"
                  :nav-aria-label="quickLinksAriaLabel"
                />
              </nav>
              <slot name="after-quick-links" />
            </div>
            <div v-if="showSearch" class="fr-header__search fr-modal">
              <DsfrSearchBar
                :label="searchLabel"
                :model-value="modelValue"
                :placeholder="placeholder"
                style="justify-content: flex-end"
                @update:model-value="$emit('update:modelValue', $event)"
                @search="$emit('search', $event)"
              />
            </div>
          </div>
        </div>
        <div
          v-if="
            showSearch || isWithSlotNav || (quickLinks && quickLinks.length)
          "
          id="header-navigation"
          class="fr-header__menu fr-modal"
          :class="{ 'fr-modal--opened': modalOpened }"
          aria-label="Menu modal"
          role="dialog"
          aria-modal="true"
        >
          <div class="fr-container">
            <button
              id="close-button"
              class="fr-btn fr-btn--close"
              aria-controls="header-navigation"
              data-testid="close-modal-btn"
              @click.prevent.stop="hideModal()"
            >
              Fermer
            </button>
            <div class="fr-header__menu-links">
              <slot name="before-quick-links" />
              <nav role="navigation">
                <DsfrHeaderMenuLinks
                  v-if="menuOpened"
                  role="navigation"
                  :links="quickLinks"
                  :nav-aria-label="quickLinksAriaLabel"
                  @link-click="onQuickLinkClick"
                />
              </nav>
              <slot name="after-quick-links" />
            </div>
            <template v-if="modalOpened">
              <slot name="mainnav" :hidemodal="hideModal" />
            </template>
            <div
              v-if="searchModalOpened"
              class="flex justify-center items-center"
            >
              <DsfrSearchBar
                :model-value="modelValue"
                :placeholder="placeholder"
                @update:model-value="$emit('update:modelValue', $event)"
                @search="$emit('search', $event)"
              />
            </div>
          </div>
        </div>
        <div
          v-if="isWithSlotNav && !modalOpened"
          class="fr-hidden fr-unhidden-lg"
        >
          <!-- @slot Slot nommé mainnav pour le menu de navigation principal -->
          <slot name="mainnav" :hidemodal="hideModal" />
        </div>
        <!-- @slot Slot par défaut pour le contenu du fieldset (sera dans `<div class="fr-header__body-row">`) -->
        <slot />
      </div>
    </div>
  </header>
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
