<script lang="ts" setup>
import { DsfrTable } from "@gouvminint/vue-dsfr";

const headers = ref(["Date", "Action"]);

const rows = ref([
  ["T1 2024", ""],
  ["", "Mise en place de la rubrique d'accessibilité sur le site basegun"],
  ["", "Publication de la déclaration d'accessibilité"],
  ["", "Publication du Schéma pluriannuel de mise en accessibilité"],
  [
    "",
    "Évaluation du niveau de conformité actuel du site et publication du score",
  ],
  ["T2 2024", ""],
  ["", "Auto audit de notre site avec les outils d'analyse mis à disposition"],
  ["", "Analyse des résultats de l'audit"],
  ["T3 2024", ""],
  ["", "Évaluation des correctifs à mettre en place par critère non respecté"],
  ["", "Mise en place des correctifs"],
  ["", "Ré Evaluation du niveau de conformité du site"],
]);
</script>

<template>
  <div class="fr-container mt-4">
    <h1>Déclaration d’accessibilité</h1>
    <p>
      <strong>Le Ministère de l'Intérieur et des Outre-Mer</strong> s'engage à
      rendre ses sites internet, intranet, extranet, ses progiciels, ses
      applications mobiles et son mobilier urbain numérique accessibles
      conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005. À
      cette fin, il met en œuvre la stratégie et les actions suivantes : <br />
      <strong
        >Schéma pluriannuel 2022-2024 de mise en accessibilité :
        <a
          target="_blank"
          href="https://www.interieur.gouv.fr/sites/minint/files/medias/documents/2023-10/Schema%20pluriannuel%20Accessibilit%C3%A9-ministere-interieur-et-outre-mer-2022%202024-accessible.pdf"
        />Lien</strong
      >
    </p>

    <p>
      Cette déclaration d’accessibilité s’applique à
      <strong>https://basegun.interieur.gouv.fr/</strong>.
    </p>

    <h2>État de conformité</h2>

    <p>
      <strong
        >Basegun <a target="_blank" href="https://basegun.interieur.gouv.fr/"
      /></strong>
      est <strong>partiellement</strong> conforme avec le référentiel général
      d’amélioration de l’accessibilité (RGAA), version 4 en raison des
      non-conformités et des dérogations énumérées ci-dessous.
    </p>

    <h2>Résultats des tests</h2>

    <p>
      L’audit de conformité réalisé par <strong>Basegun</strong> révèle que
      <strong>71%</strong> des critères du RGAA version 4 sont respectés.<br />
      <strong
        >Lien vers le rapport d'audit :
        <a
          target="_blank"
          href="https://ara.numerique.gouv.fr/rapports/LiVL4Hwa_64Cgdaq6Fgpt"
        />Lien</strong
      >
    </p>

    <h4>Contenus non accessibles</h4>

    <h4>Non conformités</h4>

    <ul>
      <li>Titre de page non pertinents</li>
      <li>
        Déclarations CSS de couleurs de fond d’élément et de police mal
        utilisées
      </li>
      <li>Prise de focus non visible sur l'ensemble des pages</li>
      <li>Des pièges au clavier existent sur l'ensemble des pages</li>
      <li>
        Absence de mécanisme permettant le contrôle par l'utilisateur des
        raccourcis clavier n'utilisant qu'une seule touche
      </li>
      <li>
        Absence de plan du site (application web prévue pour un usage sur
        mobile)
      </li>
      <li>
        Absence d'une fonctionnalité unique sur chaque page permettant d'accéder
        au plan du site
      </li>
      <li>
        Absence de moteur de recherche (et donc absence de cette fonctionnalité
        sur l'ensemble des pages)
      </li>
      <li>
        Chaque ensemble de page ne dispose que d'un système de navigation au
        lieu de deux
      </li>
      <li>
        Les zones de regroupement de contenus présentes dans plusieurs pages web
        ne peuvent être atteinte ou évitées
      </li>
      <li>
        Les contenus additionnels n'apparaissent pas au survol, ni à la prise de
        focus, ni à l'activation d'un composant d'interface au clavier
      </li>
      <li>
        Absence de lien d'évitement ou d'accès rapide à la zone de contenu
        principal
      </li>
    </ul>

    <h2>Pages du site ayant fait l’objet de la vérification de conformité</h2>

    <ul>
      <li>
        <strong
          >Accueil :
          <a
            target="_blank"
            href="https://basegun.interieur.gouv.fr/accueil"
          />Lien</strong
        >
      </li>
      <li>
        <strong
          >Contact :
          <a
            target="_blank"
            href="https://basegun.interieur.gouv.fr/contact"
          />Lien</strong
        >
      </li>
      <li>
        <strong
          >Mentions légales :
          <a
            target="_blank"
            href="https://basegun.interieur.gouv.fr/mentions-legales"
          />Lien</strong
        >
      </li>
      <li>
        <strong
          >Accessibilité :
          <a
            target="_blank"
            href="https://basegun.interieur.gouv.fr/accessibilite"
          />Lien</strong
        >
      </li>
      <li>
        <strong
          >À propos :
          <a
            target="_blank"
            href="https://basegun.interieur.gouv.fr/a-propos"
          />Lien</strong
        >
      </li>
    </ul>

    <h2>Établissement de cette déclaration d’accessibilité</h2>
    <p>Établie le <span>16 avril 2024</span>.</p>

    <h3>
      Agents utilisateurs, technologies d'assistance et outils utilisés pour
      vérifier l'accessibilité :
    </h3>

    <p>
      Les vérifications de restitution de contenus ont été réalisées sur la base
      de la combinaison fournie par la base de référence du RGAA, avec les
      versions suivantes :
    </p>

    <ul>
      <li>Technologie d'assistance : NVDA</li>
      <li>Navigateur : Firefox</li>
      <li>Système d'exploitation : Windows 10</li>
    </ul>

    <h2>Technologies utilisées pour la réalisation de l’audit</h2>

    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>Javascript</li>
    </ul>

    <h2>Contacts</h2>

    <p>
      Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez
      contacter le responsable de Basegun pour être orienté vers une alternative
      accessible ou obtenir le contenu sous une autre forme.
    </p>

    <ul>
      <li>
        Contacter
        <strong>l'équipe du projet Basegun : basegun@interieur.gouv.fr</strong>
      </li>
    </ul>

    <h2>Voies de recours</h2>

    <p>Cette procédure est à utiliser dans le cas suivant :</p>

    <p>
      Vous avez signalé au responsable du site internet un défaut
      d’accessibilité qui vous empêche d’accéder à un contenu ou à un des
      services du portail et vous n’avez pas obtenu de réponse satisfaisante.
    </p>

    <ul>
      <li>
        Écrire un message au Défenseur des droits (<strong>
          <a target="_blank" href="https://formulaire.defenseurdesdroits.fr/"
            >https://formulaire.defenseurdesdroits.fr/</a
          > </strong
        >).
      </li>
      <li>
        Contacter le délégué du Défenseur des droits dans votre région (<strong>
          <a
            target="_blank"
            href="https://www.defenseurdesdroits.fr/saisir/delegues"
            >https://www.defenseurdesdroits.fr/saisir/delegues</a
          > </strong
        >).
      </li>
    </ul>

    <p>
      Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) :
      <br />
      Défenseur des droits <br />
      Libre réponse 71120 <br />
      75342 Paris CEDEX 07
    </p>

    <h2>Mise en conformité de l'application</h2>

    <DsfrTable
      title="Plan d'action de l'année en cours"
      :headers="headers"
      :rows="rows"
    />
  </div>
</template>
