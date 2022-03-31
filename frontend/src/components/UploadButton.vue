<template>
    <div>
        <input 
            style="display: none"
            type="file"
            :accept="handledImageTypes"
            @change="onFileSelected"
            ref="fileInput"
        >
        <DsfrButton
            v-if="!store.uploadMessage"
            :label="labelButton"
            @click="$refs.fileInput.click()"
        />
    </div>
</template>

<script>
    import { store } from '@/store.js';
    import axios from 'axios';

    export default {
        name: 'UploadButton',
        data() {
            return {
                store,
                selectedFile: null,
                baseUrl: import.meta.env.BASE_URL,
                labelButton: "Démarrer",
                // supported image types: https://pillow.readthedocs.io/en/stable/handbook/image-file-formats.html
                handledImageTypes: "image/jpeg, image/png, image/tiff, image/webp, image/bmp, image/gif",
            }
        },
        methods: {

            onFileSelected(event) {

                function onUpload(file) {
                    const fd = new FormData();
                    fd.append('image', file, file.name);
                    store.uploadMessage='Analyse...';
                    store.selectedFile = null;
    
                    axios.post('/upload', fd)
                        .then(res => {
                            store.label = res.data.label
                            store.confidence = res.data.confidence
                            store.resultText = "Type d'arme : " + res.data.label + " " + res.data.confidence + "%"
                            store.imgName = import.meta.env.BASE_URL + "temp/" +
                                res.data.file_name.substring(res.data.file_name.lastIndexOf("/")+1)
                        })
                        .catch((err) => {
                            if (err.response) {
                                console.log(err.response.status)
                                console.log(err.response.data)
                            } else if (err.request) {
                                // The request was made but no response was received
                                console.log(err.request);
                            } else {
                                // Something happened in setting up the request that triggered an Error
                                console.log('Error', err.message);
                            }
                        });
                    }

                function srcToFile(src, fileName, mimeType){
                    return (fetch(src)
                        .then(function(res){return res.arrayBuffer();})
                        .then(function(buf){return new File([buf], fileName, {type:mimeType});})
                    );
                }

                store.selectedFile = event.target.files[0];
                console.log(store.selectedFile.size)
                const fileName = store.selectedFile.name

                const reader = new FileReader();
                reader.readAsDataURL(store.selectedFile)

                reader.onload = function (event) {
                    const imgElement = document.createElement("img");
                    imgElement.src = event.target.result

                    imgElement.onload = function (e) {
                        const canvas = document.createElement("canvas");
                        const MAX_WIDTH = 600
                        const MAX_HEIGHT = 600
                        let width = imgElement.width
                        let height = imgElement.height
                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }
                        canvas.width = width
                        canvas.height = height
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(e.target, 0, 0, width, height)
                        const srcEncoded = ctx.canvas.toDataURL("image/jpeg");
                        srcToFile(srcEncoded, fileName, "image/jpeg").then(res => { 
                            const newFile = res
                            onUpload(newFile)
                            console.log(newFile.size)
                        })
                    }
                }
            },

        }
    }
</script>

<style scoped>
   
</style>
