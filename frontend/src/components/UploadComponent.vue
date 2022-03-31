<template>
    <div>
        <div>
            <HeaderMain />
            <div class="centered text-center">
                <img src="../assets/basegun.png" alt="">
                <h1 class="accueil-title">Basegun</h1>
                <p class="accueil-subtitle">Identification automatique des armes à feu</p>
                <input 
                    style="display: none"
                    type="file"
                    :accept="handledImageTypes"
                    @change="onFileSelected"
                    ref="fileInput"
                >
                <DsfrButton
                    v-if="!uploadMessage"
                    :label="labelButton"
                    @click="$refs.fileInput.click()"
                />
                <div>
                    <p> {{ uploadMessage }} </p>
                </div>
            </div>
            <div class="footer-background footer-text">
                Basegun est un outil d'aide à la décision. Il ne remplace en aucun cas l'avis d'un expert.
            </div>
        </div>
    </div>
</template>

<script>
    import { store } from '@/store.js';
    import axios from 'axios';
    import HeaderMain from '@/components/HeaderMain.vue';

    export default {
        name: 'UploadComponent',
        components: {
            HeaderMain
        },
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
                        const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
                        srcToFile(srcEncoded, fileName, "image/jpeg").then(res => { 
                            const newFile = res
                            onUpload(newFile)
                        })
                    }
                }
            },

        }
    }
</script>

<style scoped>
    .centered {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%
    }
    .accueil-title {
        font-size: 28px;
        margin-top: -20px;
        margin-bottom: 0;
    }
    .accueil-subtitle {
        font-size: 14px;
    }
    .footer-background {
        position: fixed;
        top: 100%;
        left: 50%;
        transform: translate(-50%, -100%);
        background-color: #f5f5fe;
        width: 100%;
    }
    .footer-text {
        padding: 20px 10px;
        text-align: center;
    }
</style>
