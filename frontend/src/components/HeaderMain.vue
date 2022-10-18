<script>

export default {
  
  data() {
    return {
      showModal:false,
      isMobile: undefined,
      isActive:undefined,
    }
  },
  
  mounted() {
    this.checkDevice()
  },


  methods: {

    checkDevice() {
      if (window.innerWidth >= 450) {
        return this.isMobile = false
      } else {
        return this.isMobile= true
      }
    },
  
    openInformations () {
      this.$router.push({ name: 'Informations' }).catch(() => {})
    },
    openModal () {
      this.showModal = true
    },

    clickOnLink () {
      this.showModal = false
    },

    onClose () {
      this.showModal = false
    },
    
  },
}

</script>

<template>
  <header
    role="banner"
    class="fr-header header-main"
  >
    <div class="fr-header__body">
      <div class="fr-container">
        <div class="fr-header__body-row">
          <div class="fr-header__brand fr-enlarge-link">
            <div class="fr-header__brand-top">
              <div class="fr-header__logo">
                <a href="/accueil">
                  <p class="fr-logo">
                    Ministère
                    <br>de l'Intérieur et de l'Outre-mer
                  </p>
                </a>
              </div>
              <div 
                class="fr-header__navbar"
              >
                <button
                  id="fr-btn-menu-mobile"
                  class="fr-btn--menu fr-btn"
                  data-fr-opened="false"
                  aria-controls="modal-833"
                  aria-haspopup="menu"
                  title="Menu"
                >
                  Menu
                </button>
              </div>
            </div>
          </div>
          <div
            v-if="!store.swiper"
            class="fr-header__tools"
          >
            <div class="fr-header__tools-links">
              <ul class="fr-links-group">
                <li>
                  <a
                    class="fr-link fr-fi-information-line"
                    href="/informations"
                  >Informations</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fr-header__tools">
      <div class="fr-header__tools-links">
        <ul class="fr-links-group">
          <li>
            <a
              class="fr-link fr-fi-information-line"
              href="/informations"
            >Informations</a>
          </li>
        </ul>
      </div>
    </div>
    </div>
    </div>
    </div>
    <!-- Navigation principale -->
    <div
      id="modal-833"
      class="fr-header__menu fr-modal d-lg-none"
      aria-labelledby="fr-btn-menu-mobile"
    >
      <div class="fr-container">
        <button
          class="fr-link--close fr-link"
          aria-controls="modal-833"
        >
          Fermer
        </button>
        <div class="fr-header__menu-links" />
        <nav
          id="navigation-832"
          class="fr-nav"
          role="navigation"
          aria-label="Menu principal"
          <div
          class="nav-container"
        >
          <a href="/accueil">
            <h1 class="fr-logo">
              Ministère
              <br>de l'Intérieur
            </h1>
          </a>

          <div class="">
            <div class="fr-header__tools-links">
              <DsfrButton
                class="btn-menu-information  d-none  d-lg-block"
                label="Informations"
                icon="ri-information-line"
                @click="openInformations()"
              />
            </div>
            <div class="fr-header__navbar">
              <DsfrButton
                ref="modalOrigin"
                class="btn-menu-information  d-lg-none  fr-btn--menu fr-btn"
                icon="ri-menu-fill"
                @click="openModal()"
              />
              <DsfrModal
                ref="modal"
                class="d-lg-none d-md-none"
                :opened="showModal"
                :origin="$refs.modalOrigin"
                @close="onClose()"
              >
                <div>
                  <DsfrSideMenuLink
                    class="fr-nav__item  fr-nav__link"
                    :active="active"
                    to="/a-propos"
                    @click="clickOnLink()"
                  >
                    À propos
                  </DsfrSideMenuLink>
                  <DsfrSideMenuLink
                    class="fr-nav__item fr-nav__link"
                    to="/mentions-legales"
                    @click="clickOnLink()"
                  >
                    Mentions Légales
                  </DsfrSideMenuLink>
                  <DsfrSideMenuLink
                    class="fr-nav__item  fr-nav__link"
                    :active="active"
                    to="/Contact"
                    @click="clickOnLink()"
                  >
                    Contact
                  </DsfrSideMenuLink>
                </div>
              </DsfrModal>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>

.nav-container {
  margin: 1em;
  display: flex;
  justify-content: space-around;  
}
  
.fr-modal {
  background-color: white;
  margin: 0;
  position: fixed;
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  margin: 1em;
  padding: 1.5em;
}
.fr-container {
  width: 100%;
  height: 100%;
}

.container-link  {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.fr-nav__link {
  font-size: 1em;
  font-weight: 700;
  text-decoration: none;
}
:deep(.fr-modal__body) {
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 0 0 !important;
}

.btn-menu-information {
  background-color: white;
  margin-top: 1.5em;
}
.btn-menu-information:hover {
  background-color: white;
  
}

</style>
