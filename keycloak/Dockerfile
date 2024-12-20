FROM quay.io/keycloak/keycloak:25.0.0

COPY keycloak/realm-export.json /opt/keycloak/data/import/realm-export.json

COPY keycloak/keycloak-theme-dsfr.jar /opt/keycloak/providers/keycloak-theme-dsfr.jar

CMD ["start-dev", "--import-realm"]