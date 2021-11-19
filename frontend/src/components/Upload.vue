<template>
    <div>
        <input type="file" @change="onFileSelected">
        <button class="btn btn-primary" @click="onUpload">Upload</button>
        <div v-if="url !== null">
            <p>{{ label }}</p>
            <img :src="require(`../assets/temp/` + url)" alt="">
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
        }
    }
</script>
