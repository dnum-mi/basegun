# Configuration d'un cluster Kubernetes

Exemple de configuration d'un cluster kubernetes pour l'installation de l'application


## 1. Ingress controller 

L'ingress controller permet de gérer connexions entrantes au cluster sous la forme d'un reverse proxy. Pour notre cas nous utiliserons `traefik` et activerons
- letsencrypt par défaut
- la redirectio en https automatique pour tous les ingress


Ajout du dépôt traefik
```
helm repo add traefik traefik/traefik
helm repo update
```

Installation de l'ingress controller

```
helm upgrade traefik traefik/traefik -n traefik -f values-lb.yaml
```

## 2. Installation de ArgoCD


```
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Pour plus de configuration, comme l'authentification ou les RBAC, consulter ce [lien](https://argo-cd.readthedocs.io/en/stable/getting_started/).

Ajouter un ingress pour argocd

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: argocd
  namespace: argocd
spec:
  ingressClassName: traefik-internal
  rules:
  - host: <host>
    http:
      paths:
      - backend:
          service:
            name: argocd-server
            port:
              number: 443
        path: /
        pathType: Prefix
      - backend:
          service:
            name: argocd-server
            port:
              number: 80
        path: /
        pathType: Prefix
```

## 3. Création des comptes de service

Cette partie permet de créer un compte de service pour l'ajout des secrets via Github (en Github Action)

```
kubectl apply -f sa.yaml -n <namespace>
```

Cette commande permet de : 
- Créer un rôle permettant au service account de gérer les secrets dans son namespace
- Créer un SA (compte de service)
- Créer un secret permanent permettant de se connecter au cluster (via un token) en tant que compte de service, crée précédemment
- Ajouter le rôle crée à la première étape au compte de service

Pour récupérer le token dans un fichier
```
kubectl get secret -n secret -n basegun-preprod token-github -o jsonpath="{.data.token}" | base64 -d > token.txt
```