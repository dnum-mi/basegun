<template>
  <div>
    <div class="fr-container mt-4">
      <h1>Mentions légales</h1>
      <div>
        <h2 class="title-space">
          Editeur
        </h2>
        <p>Le site basegun.fr est édité et géré par l’équipe du Laboratoire de la Donnée, à la Sous-Direction Innovation et Transformation Numérique, Direction du Numérique du Ministère de l’Intérieur et des Outre-Mer.</p>
        <p>Adresse : 40 avenue des Terroirs de France, 75012 PARIS.</p>

        <h2 class="title-space">
          Données collectées
        </h2>
        <h3>Objectif</h3>
        <p>Basegun est un projet récent, actuellement en phase de test auprès de potentiels utilisateurs. En collectant les données citées ci-dessous, nous pourrons mieux comprendre comment et dans quels contextes le service est utilisé, et avoir les informations nécessaires pour résoudre d’éventuels problèmes.</p>
        <h3>Cadre</h3>
        <p>Nous collectons uniquement les informations relatives à des requêtes pertinentes et correspondant à l’objectif de Basegun: identifier des armes à feu. C’est pourquoi nous demandons à nos utilisateurs de ne soumettre que des requêtes en lien avec cet objectif et de respecter les conditions de l’application.</p>
        <p>Nous ne souhaitons en aucun cas traiter des informations personnelles (par exemple aucune photo où le visage d'une personne est visible ne doit être déposée sur l'application).</p>
        <h3>Liste des données</h3>
        <p>Pour chaque requête effectuée sur basegun.fr, nous collectons les données suivantes :</p>
        <ul class="list-margin">
          <li>Date et heure</li>
          <li>Photo soumise</li>
          <li>Résultat obtenu (label et taux de fiabilité)</li>
          <li>Temps de traitement de la requête</li>
          <li>Géolocalisation approximative de l’utilisateur (zone d’environ 10km de rayon)</li>
          <li>Identification unique et chiffrée (cookie uuid) de l’utilisateur</li>
          <li>Type d’appareil (mobile, tablette, ordinateur), système d’exploitation (iOS, Android, Windows...) et navigateur (Chrome, Firefox, Safari...) utilisés</li>
          <li>Evaluation (positive ou négative) par l’utilisateur du résultat obtenu</li>
        </ul>
        <h3>Confidentialité</h3>
        <p>Nous nous réservons le droit de supprimer les données collectées suite à des requêtes non pertinentes. Nous pouvons également, sur simple demande d’un utilisateur, supprimer les données relatives à une requête spécifique. Pour cela, il suffit de nous envoyer une demande à <a href="mailto:basegun@interieur.gouv.fr">basegun@interieur.gouv.fr</a>, en nous précisant la date et l’heure de la requête.</p>
        <p>Les informations collectées ne sont en aucun cas confiées à des tiers.</p>

        <h2 class="title-space">
          Code source
        </h2>
        <p>
          Le code source du projet est disponible publiquement à l'adresse <a
            href="https://github.com/datalab-mi/Basegun"
            target="blank"
          >https://github.com/datalab-mi/Basegun</a>
        </p>

        <h2 class="title-space">
          Hébergement
        </h2>
        <p>Le site basegun.fr est hébergé par la société OVH. Adresse : 2 rue Kellermann, 59100 ROUBAIX.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .content {
    margin: min(5vw, 10rem);
  }

  .small-text {
    font-size: 10pt;
    margin-bottom: 0;
  }

  .small-link {
    color: var(--blue-france-sun-113-625);
  }

  .small-link:hover {
    color: #1212ff
  }

  .title-space {
    margin-top: 20px;
  }

  .list-margin {
    margin-left: 2rem;
    margin-bottom: 2rem;
  }

</style>
