<template>
  <header
    role="banner"
    class="fr-header"
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
              <div class="fr-header__navbar">
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
        >
          <ul class="fr-nav__list">
            <li class="fr-nav__item">
              <a
                class="fr-nav__link"
                href="/a-propos"
                target="_self"
              >À propos</a>
            </li>
            <li class="fr-nav__item">
              <a
                class="fr-nav__link"
                href="/mentions-legales"
                target="_self"
              >Mentions légales</a>
            </li>
            <li class="fr-nav__item">
              <a
                class="fr-nav__link"
                href="/contact"
                target="_self"
              >Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
    export default {
        name: 'HeaderMain',
    }
</script>