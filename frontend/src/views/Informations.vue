<template>
  <div>
    <HeaderMain />
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
        <AboutTextContent/>
        </div>
      </DsfrTabContent>

      <DsfrTabContent
        panel-id="tab-content-1"
        tab-id="tab-1"
        :selected="selectedTabIndex === 1"
        :asc="asc"
      >
        <div>
          <LegalTextContent/>
        </div>
      </DsfrTabContent>

      <DsfrTabContent
        panel-id="tab-content-2"
        tab-id="tab-2"
        :selected="selectedTabIndex === 2"
        :asc="asc"
      >
         <div>
         <ContactTextContent/>
        </div>
      </DsfrTabContent>
    </DsfrTabs>
    </div>
  </div>
</template>

<script>
import HeaderMain from '../components/HeaderMain.vue';
import AboutTextContent from './text_content/AboutTextContent.vue';
import LegalTextContent from './text_content/LegalTextContent.vue';
import ContactTextContent from './text_content/ContactTextContent.vue';


 export default {
   components: {
    HeaderMain,
    AboutTextContent,
    LegalTextContent,
    ContactTextContent,
},
   data () {
     return {
      initialSelectedIndex: 0,
      selectedTabIndex:0,
      asc:undefined,
      tabTitles: [
      {
        "title": "A propos",
      },
      {
        "title": "Mentions légales",
      },
      {
        "title": "Contact",
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
<style>
    .content {
      margin: min(5vw, 10rem);
  }
</style>