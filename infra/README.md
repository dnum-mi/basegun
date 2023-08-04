# Infra

This folder stores various contents related to Basegun deployment.

## Full infrastructure of the project
![Basegun-infra](https://github.com/datalab-mi/Basegun/assets/24997639/49dcee11-bc2d-49a3-a1ac-891172a57b9a)

1. Using Github actions, we trigger either the [*preprod* deployment](../.github/workflows/preprod.yml) or the [*prod* deployment](../.github/workflows/release.yml).
2. For both of them, a [second workflow](../.github/workflows/deploy.yml) using specific env variables to differentiate preprod from prod updates the kube file [values.yml](./kube/helm/values.yml)
3. The service ArgoCD will detect the change in our repo [values.yml](./kube/helm/values.yml) on the branches it monitors. If we manually trigger synchronization, it updates the app in our kubernetes cluster.


## Kubernetes - Helm
Helm is a templating tool facilitating the usage of Kubernetes. Deployment of the application with kube is done using **helm**, everything is in folder `kube/helm/`

The containers of the application are deployed using files in folder `helm/templates`:
- `deployment-frontend.yml`: config for pod for frontend of basegun
- `deployment-backend.yml`: config for pod for backend (container for backend + container for handling logs)

Some of the values in these configs are configured in `helm/values.yaml`, and can be passed from CI/CD using keyword `helm upgrade --install basegun ./infra/kube/helm/ --set="value.arg1.arg2=my-value"` which overwrites content of `values.yml`.

To test a template / generate a manifest, you can use command `helm template /path/to/file`.