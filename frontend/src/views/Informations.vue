<template>
  <div class="fr-container">
    <div class="content">
      <DsfrTabs
        tab-list-name="liste d'onglets"
        :tab-titles="tabTitles"
        :initial-selected-index="initialSelectedIndex"
        @select-tab="selectTab"
      >
        <DsfrTabContent
          panel-id="tab-content-0"
          tab-id="tab-0"
          :selected="selectedTabIndex === 0"
          :asc="asc"
        >
          <div>
            <AboutInformationTabs />
          </div>
        </DsfrTabContent>

        <DsfrTabContent
          panel-id="tab-content-1"
          tab-id="tab-1"
          :selected="selectedTabIndex === 1"
          :asc="asc"
        >
          <div>
            <LegalInformationTabs />
          </div>
        </DsfrTabContent>

        <DsfrTabContent
          panel-id="tab-content-2"
          tab-id="tab-2"
          :selected="selectedTabIndex === 2"
          :asc="asc"
        >
          <div>
            <ContactInformationTabs />
          </div>
        </DsfrTabContent>
      </DsfrTabs>
    </div>
  </div>
</template>

<script>
import AboutInformationTabs from './InformationTabs/AboutInformationTabs.vue'
import LegalInformationTabs from './InformationTabs/LegalInformationTabs.vue'
import ContactInformationTabs from './InformationTabs/ContactInformationTabs.vue'

export default {
  components: {
    AboutInformationTabs,
    LegalInformationTabs,
    ContactInformationTabs,
  },
  data () {
    return {
      initialSelectedIndex: 0,
      selectedTabIndex: 0,
      asc: undefined,
      tabTitles: [
        {
          title: 'A propos',
        },
        {
          title: 'Mentions légales',
        },
        {
          title: 'Contact',
        },
      ],
    }
  },
  methods: {
    selectTab (idx) {
      this.asc = this.selectedTabIndex < idx
      this.selectedTabIndex = idx
    },
  },
}
</script>

<style scoped>
  .content {
    margin: min(5vw, 10rem);
  }
</style>
