#!/bin/bash
# Launch a cluster like the one in CI
kind delete cluster

TAG=$(make get-current-tag) BUILD_TARGET=test docker-compose -f docker-compose-prod.yml build
kind create cluster --config ./infra/kube/kind/kind-config.yml

helm repo add traefik https://traefik.github.io/charts && helm repo update
helm upgrade \
  --install \
  --wait \
  --namespace traefik \
  --create-namespace \
  --values ./infra/kube/kind/traefik-values.yml \
  traefik traefik/traefik

kind load docker-image \
  basegun-backend:$(make get-current-tag) \
  basegun-frontend:$(make get-current-tag)

helm upgrade --install basegun ./infra/kube/helm/  \
  --set ingress.hosts[0].host=basegun.k8s.local \
  --set ingress.hosts[0].paths[0].path="/" \
  --set ingress.hosts[0].paths[0].pathType="Prefix"  \
  --set backend.image.repository="basegun-backend" \
  --set backend.image.tag="$(make get-current-tag)" \
  --set frontend.image.repository="basegun-frontend" \
  --set frontend.image.tag="$(make get-current-tag)" \
  --set backend.secret.create="true" \
  --set-string backend.secret.values.AWS_ACCESS_KEY_ID="x" \
  --set-string backend.secret.values.AWS_SECRET_ACCESS_KEY="x" \
  --set-string backend.secret.values.X_OVH_TOKEN="x" \
  --set-string backend.secret.values.API_OVH_TOKEN="x"
