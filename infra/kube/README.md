# Kubernetes

Deployment of the application with kube is done using **helm**. Everything is in folder `helm/`.

## Helm
Helm is a templating tool facilitating the usage of Kubernetes.

The containers of the application are deployed using files in folder `helm/templates`:
- `deployment-frontend.yml`: config for pod for frontend of basegun
- `deployment-backend.yml`: config for pod for backend (container for backend + container for handling logs)

Some of the values in these configs are configured in `helm/values.yaml`, and can be passed from CI/CD using keyword `helm upgrade --install basegun ./infra/kube/helm/ --set="value.arg1.arg2=my-value"` which overwrites content of `values.yml`.

To test a template / generate a manifest, you can use command `helm template /path/to/file`.