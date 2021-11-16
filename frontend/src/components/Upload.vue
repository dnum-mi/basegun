<template>
    <div>
        <input type="file" @change="onFileSelected">
        <button class="btn btn-primary" @click="onUpload">Upload</button>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Upload',
        data () {
            return {
                selectedFile: null
            }
        },
        methods: {
            onFileSelected(event) {
                this.selectedFile = event.target.files[0]
            },
            onUpload() {
                const fd = new FormData();
                fd.append('image', this.selectedFile, this.selectedFile.name)
                axios.post(
                    '/imageupload',
                    fd,
                    // {onUploadProgress: upLoadEvent => {
                    //     console.log('Upload Progress: ' + (upLoadEvent.loaded / upLoadEvent.total * 100) + '%')
                    //     }
                    // },
                    // { headers: {'Content-Type': 'multipart/form-data'} }
                )
                    .then(res => {
                        console.log(res)
                    })
            }
        }
    }
</script>
