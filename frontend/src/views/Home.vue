<template>
  <div class="home">
    <ResultsComponent v-if="imgUploaded" />
    <UploadComponent v-else />
  </div>
</template>

<script>
// @ is an alias to /src
import UploadComponent from '@/components/UploadComponent.vue';
import ResultsComponent from '@/components/ResultsComponent.vue'

export default {
  name: 'HomePage',
  components: {
    UploadComponent,
    ResultsComponent
  }
}
</script>