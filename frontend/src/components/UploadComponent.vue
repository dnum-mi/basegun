<template>
    <div class="upload">
        <h1>Upload</h1>
        <button class="fr-btn" @click="uploadImage">Upload image</button>
    </div>
</template>

<script>
import { store } from '@/store.js'
export default {
    name: 'UploadComponent',
    data() {
        return {
            store
        }
    },
    methods: {
        uploadImage() {
            store.imgUploaded = true
            console.log(store.imgUploaded)
        }
    }
}
</script>
