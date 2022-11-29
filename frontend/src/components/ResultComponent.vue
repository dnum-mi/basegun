<template>
  <div>
    <div class="result col-11 col-lg-6">
      <div
        class="result-image"
        :style="{backgroundImage:`url(${store.img})`}"
      />
      <div class="fr-callout custom-callout">
        <div v-if="store.confidenceLevel == 'low'">
          <div class="callout-head">
            <p class="fr-tag fr-tag--sm error-tag">
              Indice de fiabilité insuffisant
            </p>
          </div>
          <p>Nous n'avons pas suffisamment d'éléments pour fournir une réponse fiable. Nous vous conseillons de faire appel à un expert.</p>
        </div>
        <div v-else>
          <div v-if="store.confidenceLevel == 'high'">
            <div class="callout-head">
              <p class="fr-tag fr-tag--sm success-tag">
                Indice de fiabilité : {{ Math.floor(store.confidence) }}%
              </p>
            </div>
          </div>
          <div v-else>
            <p class="fr-tag fr-tag--sm warning-tag">
              Indice de fiabilité : {{ Math.floor(store.confidence) }}%
            </p>
            <p class="warning-text">
              Nous vous conseillons de faire appel à un expert pour confirmer cette réponse.
            </p>
          </div>
          <p class="fr-callout__title">
            Catégorie {{ cleanCategory }}
          </p>
          <p class="fr-callout__text">
            Type d'arme : {{ cleanLabel }}
          </p>
          
          <div
            class="callout-mention"
          >
            <p
              v-html="cleanMention"
            />

            <RouterLink
              v-slot="{ href }"
              to="/consignes-de-securite"
              custom
            >
              <DsfrButton
                :href="href"
                class="m-1  flex justify-content-center"
                label="Vérifier si l'arme est factice"
                @click="$event => {storeState()}"
              />
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="store.confidenceLevel != 'low'">
        <p class="fr-text--sm warning-msg">
          Le résultat donné par Basegun n'emporte qu'une simple valeur de renseignement. Pour faire référence dans une procédure, il doit impérativement et réglementairement être validé par le biais d'un examen scientifique ou technique prévu par le code de procédure pénale.
        </p>
        <div
          :aria-disabled="isFeedbackDone"
          class="feedback"
        >
          <p class="feedback-text">
            Ce résultat vous semble-t-il correct ?
          </p>
          <div class="feedback-thumb">
            <label
              class="feedback-click"
              @click="sendFeedback(true)"
            >            
              <VIcon 
                v-if="isUp"
                name="ri-thumb-up-fill"
                class="feedback-click"
              />
              <VIcon 
                v-else
                name="ri-thumb-up-line"
                class="feedback-click"
              />
            </label>
            <label
              class="feedback-click"
              @click="sendFeedback(false)"
            >
              <VIcon 
                v-if="isDown"
                name="ri-thumb-down-fill"
                class="feedback-click"
              />
              <VIcon 
                v-else
                name="ri-thumb-down-line"
                class="feedback-click"
              />
            </label>
          </div>
        </div>
      </div>
      <div
        v-if="isFeedbackDone"
        class="snackbar"
      >
        <SnackbarAlert class="text-center" />
      </div>
      <div
        v-else
        class="blank"
      />
      <div class="footer-background  footer-actions">
        <div
          class="action-group"
          @click="resetSearch()"
        >
          <span
            class="fr-fi-refresh-line"
            title="Recommencer" 
            role="img" 
            aria-label="recommencer"
            aria-hidden="true"
          />
          <p class="action-group-text">
            RECOMMENCER
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { store } from '@/store.js'
    import axios from 'axios';
    import SnackbarAlert from '@/components/SnackbarAlert.vue';
    import { results } from '@/utils/firearms-utils';

    import { useSnackbarStore } from '@/stores/snackbar.js'

    const { setMessage } = useSnackbarStore() 

    export default {
      name: 'ResultComponent',
      components: {
        SnackbarAlert,
      },

      data() {
        return {
          store,
          isDisplayHeader:store.isDisplayHeader=false,
          isUp: undefined,
          isDown:undefined,
          isFeedbackDone:undefined,
          results: results,
        } 
      },
      computed: {
          cleanLabel() {
              return this.results[`${store.label}`].displayLabel
          },
          cleanCategory() {
              return this.results[`${store.label}`].category
          },
          cleanMention() {
              return this.results[`${store.label}`].mention
          },
      },
        
        methods: {


          storeState() {
              this.$router.push({name:'SafetyRecommendation'}).catch(() => {})
            },

            resetSearch() {
              // TODO: Réinitialiser les données de la recherche
              window.location.replace('/accueil');
            },


        

            sendFeedback(isCorrect) {
              const json = {
                  "image_url": store.imgUrl,
                  "feedback": isCorrect,
                  "confidence": store.confidence,
                  "label": store.label,
                  "confidence_level": store.confidenceLevel,
              } 
              this.isFeedbackDone= true
              if (isCorrect) {
                this.isUp = true
              } else {
                this.isDown = true
              }
              axios.post('/feedback', json)
                  .then(async res => {
                      console.log(res)
                      setMessage({type: 'success', message: 'Votre vote a été pris en compte'})
                  })
                  .catch(async (err) => {
                      console.log(err);
                      setMessage({ type: 'error', message: 'Une erreur a eu lieu en enregistrant votre vote.'})
                  });
            },
        },
      }
</script>

<style scoped>
.result {
  margin: 0 auto;
  max-width: 1000px;
}

.result-image {
  height: 30vh;
  background-position: center;
  background-size: cover;
  margin: 0 auto;
}

.success-tag {
  color: #297254;
  background-color: #9ef9be;
  margin-left: -4px;
}

.error-tag {
  color: #ce0500;
  background-color: #ffe9e9;
  margin-left: -4px;
}
.warning-tag {
  color: #b34000;
  background-color: #ffe8e5;
  margin-left: -4px;
}

.warning-text {
  font-size: 0.7rem;
  font-style: italic;
  line-height: 1rem;
  margin-bottom: 12px;
}

.warning-msg {
  line-height: 1.3rem !important;
  margin-bottom: 1rem;
}

.callout-head {
  display: flex;
  align-items: center;
}

.callout-mention {
  margin-top: 10px;
  font-style: italic;
  font-size: 0.9rem;
  line-height: 1.3rem;
}
.feedback {
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-text {
  margin-bottom: 0;
  margin-right: 4px;
  font-weight: bold;
}

.feedback-click {
  color: #000091;
  font-size: 35px;
  margin: 0.1em 0.05em;
  text-shadow: 0 0 0 #00c8c8;
}

.feedback-click:hover {
  cursor: pointer;
  text-shadow: 0 0 0 #1212ff;
}

[aria-disabled="true"] .feedback-click {
  pointer-events: none;
  cursor: not-allowed;
  text-shadow: 0 0 0 grey;
}

.footer-actions {
  display: flex;
  justify-content: space-around;
  color: #000091;
  z-index: 1
}

.action-group {
  text-align: center;
  cursor: pointer;
  margin: 8px 0;
}

.action-group:hover {
  color: #1212ff;
}

.action-group-text {
  font-size: 14px;
  font-weight: bold;
  margin: 0
}
.blank {
  height: 80px
}

.footer-background {
  position: fixed;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
  background-color: #f5f5fe;
  width: 100%;
}
</style>
