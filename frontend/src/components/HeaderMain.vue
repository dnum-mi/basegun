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
  <nav
    id="navigation-832"
    role="navigation"
    aria-label="Menu principal"
    class="nav-container"
  >
    <a href="/accueil">
      <h1 class="fr-logo">
        Ministère
        <br>de l'Intérieur 
        <br>et de l'Outre-mer
      </h1>
    </a>

    <div>
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
