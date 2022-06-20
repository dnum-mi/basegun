<template>
    <div id="demarrer" style="display: none">
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

    function randomCoord(num){
                    const max = 0.1;
                    const min = -0.1;
                    return (Math.random() * (max - min) + min) + num;
    }

    function getHash(str, algo = "SHA-256") {
        let strBuf = new TextEncoder().encode(str);
        return crypto.subtle.digest(algo, strBuf)
            .then(hash => {
            window.hash = hash;
            // here hash is an arrayBuffer, 
            // so we'll connvert it to its hex version
            let result = '';
            const view = new DataView(hash);
            for (let i = 0; i < hash.byteLength; i += 4) {
                result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
            }
            return result;
            });
    }

    export default {
        name: 'UploadButton',
        data() {
            return {
                store,
                baseUrl: import.meta.env.BASE_URL,
                labelButton: "Démarrer",
                // supported image types: https://pillow.readthedocs.io/en/stable/handbook/image-file-formats.html
                handledImageTypes: "image/jpeg, image/png, image/tiff, image/webp, image/bmp, image/gif",
            }
        },
        methods: {

            onFileSelected(event) {
                store.uploadMessage='Analyse...';
                const uploadedFile = event.target.files[0];
                // get user ip (not stored)
                axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=17dc6bed199b45ca92d60079686e03f1', { withCredentials: false })
                    .then(res => {
                        const ip = res.data.ip;
                        const hash_input = ip + window.navigator.userAgent + window.navigator.hardwareConcurrency;
                        const latitude = randomCoord(res.data.latitude);
                        const longitude = randomCoord(res.data.longitude);
                        store.geolocation = latitude.toString() + ',' + longitude.toString();
                        startUpload(uploadedFile, hash_input)
                    })
                    .catch((err) => {
                        // if cannot get ip use only userAgent and hardwareConcurrency for user id
                        const hash_input = window.navigator.userAgent + window.navigator.hardwareConcurrency;
                        startUpload(uploadedFile, hash_input)
                    })

                function startUpload(uploadedFile, hash_input) {
                    getHash(hash_input)
                        .then(hash => {
                            store.userId = hash;
                            resizeAndUpload(uploadedFile)
                        });
                }

                function submitUpload(file) {
                    const fd = new FormData();
                    fd.append('image', file, file.name);
                    fd.append('date', Date.now()/1000); //date.now gives the milliseconds timestamp so we convert to seconds
                    fd.append('userId', store.userId);
                    fd.append('geolocation', store.geolocation);

                    axios.post('/upload', fd)
                        .then(res => {
                            store.label = res.data.label
                            store.confidence = res.data.confidence
                            store.confidence_level = res.data.confidence_level
                            store.resultText = "Type d'arme : " + res.data.label + " " + res.data.confidence + "%"
                            store.imgName = res.data.file
                            // store.imgName = import.meta.env.BASE_URL + "temp/" + res.data.file.substring(res.data.file.lastIndexOf("/")+1)
                        })
                        .catch((err) => {
                            console.log(err)
                            window.location.replace("/erreur")
                        });
                    }

                function srcToFile(src, fileName, mimeType){
                    return (fetch(src)
                        .then(function(res){return res.arrayBuffer();})
                        .then(function(buf){return new File([buf], fileName, {type:mimeType});})
                    );
                }

                function resizeAndUpload(uploadedFile) {
                    const fileName = uploadedFile.name

                    const reader = new FileReader();
                    reader.readAsDataURL(uploadedFile);

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
                                submitUpload(newFile)
                            })
                        }

                        imgElement.onerror = function() {
                            alert("Corrupted image file, please try another");
                        };
                    }
                }

            },

        }
    }
</script>

<style scoped>
   
</style>
