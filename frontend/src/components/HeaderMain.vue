<script>

export default {
  
  data() {
    return {
      showModal:false,
      isActive:undefined,
    }
  },


  methods: {
  
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
    class="fr-header"
  >
    <div class="fr-header__body">
      <div class="fr-container">
        <nav
          id="navigation-832"
          role="navigation"
          aria-label="Menu principal"
          class="nav-container flex-lg-row-reverse"
        >
          <div class="fr-header__logo ">
            <a href="/accueil">
              <p class="fr-logo">
                Ministère
                <br>de l'Intérieur 
                <br>et de l'Outre-mer
              </p>
            </a>
          </div>
          <div class="fr-header__tools  d-none  d-lg-block">
            <div class="fr-header__tools-links">
              <ul class="fr-links-group">
                <li>
                  <a
                    class="fr-link  fr-fi-information-line  btn-menu-information"
                    href="/informations"
                  >Informations
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="fr-header__navbar">
            <DsfrButton
              ref="modalOrigin"
              class="btn-open-modal  d-lg-none  fr-btn--menu  fr-btn"
              icon="ri-menu-fill"
              icon-right="true"
              @click="openModal()"
            />
          </div>
        </nav>
      </div>
    </div>
    <DsfrModal
      ref="modal"
      class="fr-header__menu d-lg-none d-md-none"
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
  </header>
</template>

<style scoped>

header {
    -webkit-box-shadow: none;
	-moz-box-shadow: none;
	box-shadow: none;
}

.nav-container {
  margin: .2em auto;
  display: flex;
  justify-content: space-between;
}

:deep(.fr-header__logo) {
    padding: .75rem 0 !important;
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

:deep(.fr-nav__link) {
  font-size: 1em;
  font-weight: 700;
  text-decoration: none;
}

:deep(.fr-header__navbar) {
    padding: 0 !important;
    margin-right: -10px;
}

:deep(.fr-modal__body) {
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 0 0 !important;
}

:deep(.fr-modal__header) {
    padding: 0 1rem;
}

.btn-open-modal {
  background-color: white;
}

.btn-menu-information {
  border-radius: 1rem;
  margin-top: 2.5em !important;
}

.btn-menu-information:hover {
    color: #1660CB !important;
}

</style>
