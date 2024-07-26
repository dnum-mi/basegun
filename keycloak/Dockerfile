FROM quay.io/keycloak/keycloak:25.0.0

COPY keycloak/realm-export.json /opt/keycloak/data/import/realm-export.json

CMD ["start-dev", "--import-realm"]