# Kubernetes

The containers of the application are deployed using files in folder `templates`:
- `deployment-frontend.yml`: config for pod for frontend of basegun
- `deployment-backend.yml`: config for pod for backend (container for backend + container for handling logs)

Some of the values in these configs are configured in `values.yaml`, and can be passed from CI/CD using keyword `helm upgrade --install basegun ./infra/kube/basegun/ --set="value.arg1.arg2=my-value"` which overwrites content of `values.yml`.
