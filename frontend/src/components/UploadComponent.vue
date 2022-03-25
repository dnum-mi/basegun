<template>
    <div class="upload">
        <h1>Upload</h1>
        <button class="fr-btn" @click="uploadImage">Upload image</button>
    </div>
</template>

<script>
    export default {
        name: 'UploadComponent',
        data() {
            return {
                imgUploaded: false
            }
        },
        methods: {
            uploadImage() {
                this.imgUploaded = true
                console.log(this.imgUploaded)
            }
        }
    }
</script>
