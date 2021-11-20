<template>
    <div>
        <img src="../assets/basegun.png" alt="">
        <div class="file-input" v-if="url == null">
            <h4>Choisir une image :</h4>
            <input type="file" @change="onFileSelected">
            <div v-if="selectedFile" class="upload-btn">
                <button class="btn btn-primary" @click="onUpload">Lancer l'analyse</button>
            </div>
        </div>
        <div v-if="url !== null">
            <p class="result">Type d'arme : {{ label }}</p>
            <img :src="require(`../assets/temp/` + url)" alt="">
            <div>
                <button class="btn btn-primary" @click="reloadPage">Recommencer</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Upload',
        data () {
            return {
                selectedFile: null,
                label: null,
                url: null
            }
        },
        methods: {
            onFileSelected(event) {
                this.selectedFile = event.target.files[0]
            },
            onUpload() {
                const fd = new FormData();
                fd.append('image', this.selectedFile, this.selectedFile.name)
                axios.post('/upload', fd)
                    .then(res => {
                        this.label = res.data.label
                        this.url = res.data.file_name.slice(-40)
                        // console.log(this.url)
                    })
            },
            reloadPage() {
                window.location.reload();
            }
        }
    }
</script>

<style scoped>
    /* .file-input {
        margin: 20px auto;
    } */
    .upload-btn {
        margin: 10px 0;
    }
</style>
