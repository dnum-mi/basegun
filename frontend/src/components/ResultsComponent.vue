<template>
  <div>
    <div class="result">
      <div
        class="result-image"
        :style="{backgroundImage:`url(${store.img})`}"
      />
      <div class="fr-callout custom-callout">
        <div v-if="store.confidence_level == 'low'">
          <div class="callout-head">
            <p class="fr-tag fr-tag--sm error-tag">
              Indice de fiabilité insuffisant
            </p>
          </div>
          <p>Nous n'avons pas suffisamment d'éléments pour fournir une réponse fiable. Nous vous conseillons de faire appel à un expert.</p>
        </div>
        <div v-else>
          <div v-if="store.confidence_level == 'high'">
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
          <p
            class="callout-mention"
            v-html="cleanMention"
          />
        </div>
      </div>
      <div v-if="store.confidence_level != 'low'">
        <div class="feedback">
          <p class="feedback-text">
            Ce résultat vous semble-t-il correct ?
          </p>
          <label
            class="feedback-click"
            @click="sendFeedback(true, $event)"
          >👍</label>
          <label
            class="feedback-click"
            @click="sendFeedback(false, $event)"
          >👎</label>
        </div>
        <p class="fr-text--sm warning-msg">
          Cet avis n'emporte qu'une simple valeur de renseignement. Pour faire référence dans une procédure, il doit impérativement et réglementairement être validé par le biais d'un examen scientifique ou technique prévu par le code de procédure pénale.
        </p>
      </div>
      <div class="blank" />
      <div class="footer-background footer-actions">
        <div
          class="action-group"
          @click="reloadPage"
        >
          <span
            class="fr-fi-refresh-line"
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
    import { store } from '@/store/store.js'
    import axios from 'axios';

    export default {
        name: 'ResultsComponent',
        data() {
            return {
                store,
                results: {
                    revolver: {
                        displayLabel: "revolver",
                        category: "B ou D",
                        mention: "B - Soumise à autorisation<br \>D - Libre d'acquisition et de détention",
                    },
                    pistolet_semi_auto_moderne: {
                        displayLabel: "pistolet semi-automatique moderne",
                        category: "B",
                        mention: "Soumise à autorisation",
                    },
                    pistolet_a_percussion_silex: {
                        displayLabel: "pistolet à mécanisme ancien",
                        category: "D",
                        mention: "Libre d'acquisition et de détention",
                    },
                    autre_pistolet: {
                        displayLabel: "pistolet divers",
                        category: "A, B ou D",
                        mention: "A - Interdite<br \>B - Soumise à autorisation<br \>D - Libre d'acquisition et de détention",
                    },
                    epaule_a_percussion_silex: {
                        displayLabel: "arme d'épaule à mécanisme ancien",
                        category: "D",
                        mention: "Libre d'acquisition et de détention",
                    },
                    epaule_a_un_coup: {
                        displayLabel: "arme d'épaule à un coup par canon",
                        category: "C",
                        mention: "Soumise à déclaration",
                    },
                    epaule_a_levier_sous_garde: {
                        displayLabel: "arme d'épaule à levier de sous-garde",
                        category: "B ou C",
                        mention: "B - Soumise à autorisation<br \>C - Soumise à déclaration",
                    },
                    epaule_a_verrou: {
                        displayLabel: "arme d'épaule à verrou",
                        category: "B ou C",
                        mention: "B - Soumise à autorisation<br \>C - Soumise à déclaration",
                    },
                    epaule_a_pompe: {
                        displayLabel: "arme d'épaule à pompe",
                        category: "B ou C",
                        mention: "B - Soumise à autorisation<br \>C - Soumise à déclaration",
                    },
                    autre_epaule: {
                        displayLabel: "arme d'épaule non manuelle",
                        category: "A, B ou C",
                        mention: "A - Interdite<br \>B - Soumise à autorisation<br \>C - Soumise à déclaration",
                    },
                },
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
            reloadPage() {
                window.location.reload();
            },
            sendFeedback(bool, event) {
                const json = {
                    "image_url": store.imgUrl,
                    "feedback": bool,
                    "confidence": store.confidence,
                    "label": store.label,
                    "confidence_level": store.confidence_level,
                }
                axios.post('/feedback', json)
                    .then(res => {
                        event.target.parentElement.setAttribute('aria-disabled', 'true');
                    })
                    .catch((err) => {
                        console.log(err);
                        alert("Une erreur a eu lieu en enregistrant votre vote.");
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
    @media (min-width: 768px) {
        .result-image {
            max-width: 600px;
        }
        .custom-callout,
        .warning-msg {
            max-width: 600px;
            margin: 12px auto
        }
    }
    @media (max-width: 768px) {
        .custom-callout,
        .warning-msg {
            margin: 12px
        }
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
    .callout-head {
        display: flex;
        align-items: center;
    }
    .warning-msg {
        line-height: 1.3rem!important;
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
        margin: 20px 0;
    }

    .feedback-text {
        margin-bottom: 0;
        margin-right: 4px;
        font-weight: bold;
    }

    .feedback-click {
        color: transparent;
        font-size: 30px;
        text-shadow: 0 0 0 #00c8c8;
    }

    .feedback-click:hover {
        cursor: pointer;
        text-shadow: 0 0 0 #1212ff;
    }

    [aria-disabled="true"] .feedback-click{
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
        font-size: 12px;
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
