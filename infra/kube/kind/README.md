# Run kubernetes locally with docker

## Prerequisite

Download & install on your local machine :
- [kind](https://github.com/kubernetes-sigs/kind)
- [kubectl](https://github.com/kubernetes/kubectl)
- [helm](https://github.com/helm/helm)

## Cluster

One single node is deployed but it can be customized in `./kind-config.yml`. The cluster comes with [Traefik](https://doc.traefik.io/traefik/providers/kubernetes-ingress/) ingress controller installed with port mapping on both ports `80` and `443`.
