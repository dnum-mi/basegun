<template>
  <div
    id="demarrer"
    style="display: none"
  >
    <input 
      ref="fileInput"
      style="display: none"
      type="file"
      :accept="handledImageTypes"
      @change="onFileSelected"
    >
    <DsfrButton
      v-if="!store.uploadMessage"
      :label="labelButton"
      @click="$refs.fileInput.click()"
    />
  </div>
</template>

<script>
    import { store } from '@/store/store.js';
    import axios from 'axios';

    function randomCoord(num){
        num = parseFloat(num)
        const max = 0.1;
        const min = -0.1;
        return (Math.random() * (max - min) + min) + num;
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
                // get user geolocation
                axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=17dc6bed199b45ca92d60079686e03f1', { withCredentials: false })
                    .then(res => {
                        const latitude = randomCoord(res.data.latitude);
                        const longitude = randomCoord(res.data.longitude);
                        store.geolocation = latitude.toString() + ',' + longitude.toString();
                        startUpload(uploadedFile)
                    })
                    .catch((err) => {
                        // if geolocation is unavalable or incorrect format
                        resizeAndUpload(uploadedFile)
                    })

                function resizeAndUpload(uploadedFile) {
                    const reader = new FileReader();
                    // convert File object to base64 data
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
                            submitUpload(srcEncoded, uploadedFile.name)
                        }

                        imgElement.onerror = function() {
                            alert("Corrupted image file, please try another");
                        };
                    }
                }

                function srcToFile(src, fileName, mimeType){
                    return (fetch(src)
                        .then(function(res){return res.arrayBuffer();})
                        .then(function(buf){return new File([buf], fileName, {type:mimeType});})
                    );
                }


                function submitUpload(base64, fileName) {
                    srcToFile(base64, fileName, "image/jpeg").then(file => { 
                        const fd = new FormData();
                        fd.append('image', file, file.name);
                        fd.append('date', Date.now()/1000); //date.now gives in milliseconds, convert to seconds
                        fd.append('geolocation', store.geolocation);

                        axios.post('/upload', fd)
                            .then(res => {
                                store.label = res.data.label;
                                store.confidence = res.data.confidence;
                                store.confidence_level = res.data.confidence_level;
                                store.resultText = "Type d'arme : " + res.data.label + " " + res.data.confidence + "%";
                                store.img = base64;
                                store.imgUrl = res.data.path;
                            })
                            .catch((err) => {
                                console.log(err);
                                window.location.replace("/erreur")
                            });
                    })
                }
            },

        },
    }
</script>