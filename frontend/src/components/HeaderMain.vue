<template>
  <div>
    <DsfrHeader
      v-model="modelValue"
      :home-to="homeTo"
      :quick-links="quickLinks"
      :logo-text="logoText"
      @click="onClickOnLogo"
    />
  </div>
</template>

<script>
export default {

  data () {
    return {
      showModal: false,
      isActive: undefined,
      logoText: [
        'Ministère',
        'de l’intérieur',
        'et de l\'Outre-Mer',
      ],
      quickLinks: [
        {
          label: 'A propos',
          to: '/a-propos',
          // icon: 'ri-information-line',
          iconAttrs: {
            scale: 0.9,
          },
        },
        {
          label: 'Mentions légales',
          to: '/mentions-legales',
          // icon: 'ri-information-line',
          iconAttrs: {
            scale: 0.9,
          },
        },
        {
          label: 'Contact',
          to: '/contact',
          // icon: 'ri-information-line',
          iconAttrs: {
            scale: 0.9,
          },
        },
      ],
    }
  },

  methods: {
    openModal () {
      this.showModal = true
    },

    clickOnLink () {
      this.showModal = false
    },

    onClose () {
      this.showModal = false
    },
    onClickOnLogo () {
      this.$router.push({ name: 'Start' })
    },

  },
}
</script>
