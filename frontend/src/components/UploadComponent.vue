<template>
    <div>
        <div>
            <HeaderMain />
            <div class="centered text-center">
                <img src="../assets/basegun.png" alt="">
                <h1 class="accueil-title">Basegun</h1>
                <p class="accueil-subtitle">Identification automatique des armes à feu</p>
                <UploadButton />
                <div>
                    <p> {{ store.uploadMessage }} </p>
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
    import HeaderMain from '@/components/HeaderMain.vue';
    import UploadButton from '@/components/UploadButton.vue'

    export default {
        name: 'UploadComponent',
        components: {
            HeaderMain,
            UploadButton
        },
        data() {
            return {
                store,
            }
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
