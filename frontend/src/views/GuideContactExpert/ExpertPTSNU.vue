<script lang="ts" setup>
import { DsfrButton } from '@gouvminint/vue-dsfr'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showModal = ref(false)
const showModal2 = ref(false)
const showModal3 = ref(false)
const showModal4 = ref(false)
const showModal5 = ref(false)

function onClose () {
  showModal.value = false
  showModal2.value = false
  showModal3.value = false
  showModal4.value = false
  showModal5.value = false
}

</script>

<template>
  <div class="text-center mt-5">
    <h2>
      <VIcon
        name="ri-arrow-right-line"
        scale="1.5"
      />
      Contact à un expert arme
    </h2>
    <p>
      Vous rencontrez une situation et souhaitez contacter un expert arme ?
    </p> <br>
    <p>
      Sélectionnez ci-dessous votre PTS afin d'avoir son adresse mail
    </p>
    <div class="fr-col-11 fr-col-lg-6 mx-auto">
      <DsfrButton
        class="m-1 flex justify-center w-80"
        label="PTS PARIS"
        @click="showModal = true"
      />
      <DsfrButton
        class="m-1 flex justify-center w-80"
        label="PTS LILLE"
        @click="showModal2 = true"
      />
      <DsfrButton
        class="m-1 flex justify-center w-80"
        label="PTS LYON"
        @click="showModal3 = true"
      />
      <DsfrButton
        class="m-1 flex justify-center w-80"
        label="PTS MARSEILLE"
        @click="showModal4 = true"
      />
      <DsfrButton
        class="m-1 flex justify-center w-80"
        label="PTS TOULOUSE"
        @click="showModal5 = true"
      />
      <Teleport to="body">
        <DsfrModal
          title=""
          :opened="showModal"
          @close="onClose()"
        >
          <div class="modal">
            <div class="modal-content" />
            <h2>
              <VIcon
                name="ri-arrow-right-line"
                scale="1.5"
              />
              Laboratoire PTS PARIS
            </h2>
            <div>
              <div
                class="fr-col-11 fr-col-lg-6 mx-auto"
              >
                <p>
                  Vous trouverez ci-dessous l'adresse mail de la permanence de votre PTS <br>
                </p>
                <p>
                  pts75@mail.com
                </p>
              </div>
            </div>
            <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
              <DsfrButton
                class="m-1 flex justify-center"
                icon="ri-arrow-left-line"
                label="Précédent"
                @click="onClose()"
              />
            </div>
          </div>
        </DsfrModal>
        <DsfrModal
          title=""
          :opened="showModal2"
          @close="onClose()"
        >
          <div class="modal">
            <div class="modal-content" />
            <h2>
              <VIcon
                name="ri-arrow-right-line"
                scale="1.5"
              />
              Laboratoire PTS LILLE
            </h2>
            <div>
              <div
                class="fr-col-11 fr-col-lg-6 mx-auto"
              >
                <p>
                  Vous trouverez ci-dessous l'adresse mail de la permanence de votre PTS <br>
                </p>
                <p>
                  pts59@mail.com
                </p>
              </div>
            </div>
            <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
              <DsfrButton
                class="m-1 flex justify-center"
                icon="ri-arrow-left-line"
                label="Précédent"
                @click="onClose()"
              />
            </div>
          </div>
        </DsfrModal>
        <DsfrModal
          title=""
          :opened="showModal3"
          @close="onClose()"
        >
          <div class="modal">
            <div class="modal-content" />
            <h2>
              <VIcon
                name="ri-arrow-right-line"
                scale="1.5"
              />
              Laboratoire PTS LYON
            </h2>
            <div>
              <div
                class="fr-col-11 fr-col-lg-6 mx-auto"
              >
                <p>
                  Vous trouverez ci-dessous l'adresse mail de la permanence de votre PTS <br>
                </p>
                <p>
                  pts69@mail.com
                </p>
              </div>
            </div>
            <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
              <DsfrButton
                class="m-1 flex justify-center"
                icon="ri-arrow-left-line"
                label="Précédent"
                @click="onClose()"
              />
            </div>
          </div>
        </DsfrModal>
        <DsfrModal
          title=""
          :opened="showModal4"
          @close="onClose()"
        >
          <div class="modal">
            <div class="modal-content" />
            <h2>
              <VIcon
                name="ri-arrow-right-line"
                scale="1.5"
              />
              Laboratoire PTS MARSEILLE
            </h2>
            <div>
              <div
                class="fr-col-11 fr-col-lg-6 mx-auto"
              >
                <p>
                  Vous trouverez ci-dessous l'adresse mail de la permanence de votre PTS <br>
                </p>
                <p>
                  pts13@mail.com
                </p>
              </div>
            </div>
            <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
              <DsfrButton
                class="m-1 flex justify-center"
                icon="ri-arrow-left-line"
                label="Précédent"
                @click="onClose()"
              />
            </div>
          </div>
        </DsfrModal>
        <DsfrModal
          title=""
          :opened="showModal5"
          @close="onClose()"
        >
          <div class="modal">
            <div class="modal-content" />
            <h2>
              <VIcon
                name="ri-arrow-right-line"
                scale="1.5"
              />
              Laboratoire PTS TOULOUSE
            </h2>
            <div>
              <div
                class="fr-col-11 fr-col-lg-6 mx-auto"
              >
                <p>
                  Vous trouverez ci-dessous l'adresse mail de la permanence de votre PTS <br>
                </p>
                <p>
                  pts31@mail.com
                </p>
              </div>
            </div>
            <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
              <DsfrButton
                class="m-1 flex justify-center"
                icon="ri-arrow-left-line"
                label="Précédent"
                @click="onClose()"
              />
            </div>
          </div>
        </DsfrModal>
      </Teleport>
    </div>
  </div>
  <div class="footer">
    <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
      <DsfrButton
        class="m-1 flex justify-center"
        icon="ri-arrow-left-line"
        :secondary="true"
        label="Précédent"
        @click="router.back()"
      />
      <router-link
        v-slot="{navigate}"
        class="navigate"
        :to="{name: 'StartPage'}"
      >
        <DsfrButton
          class="m-1 flex justify-center"
          icon="ri-home-4-line"
          label="Retour à l'accueil"
          @click="navigate()"
        />
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.manipulations {
  background-color: #E3E3FD;
  margin-top: 40px;
  margin-bottom: 24px;
}

p {
  display:flex;
  justify-content: center;
}
</style>
