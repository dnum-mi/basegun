# Deploy automatically Basegun instance on ovh

From tutorial https://docs.ovh.com/fr/public-cloud/utiliser-terraform/

**First time**
1. Create tf workspace for the project
 `terraform workspace new basegun`
2. `terraform init` to init the providers
3. You need an OVH account. In your horizon cloud space, click on your name (upper right) and download your `openrc.sh` file in the current folder.

**Every time**
1. `source openrc.sh` to login
2. `terraform plan` to see changes to the infra
3. `terraform apply` to apply changes