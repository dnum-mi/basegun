# Terraform deployment

This folder is used to create Basegun deployment with Terraform, an open-source infrastructure as code (IaC) on Openstack project.


![](./img/openstack.png)

## Configuration
Add the following Github secrets:
- OS_USERNAME : username of cloud provider
- OS_PASSWORD : password for this user
- OS_PROJECT_NAME : value from `openrc.sh` (find on horizon platform)
- OS_PROJECT_ID : value from `openrc.sh` (find on horizon platform)
- PERSO_ACCESS_TOKEN : github access token for publishing / deleting packages
- PREPROD_SERVER_IP : fixed ip for preprod server

## Terraform

- `backend.tf` : the remote state (in Swift container), where current state is stored.
- `instance.tf` : the desirated instance (image, flavor, volume size, network and address, security group)
- `output.tf` : show ips output
- `provider.tf` : select provider (OVH)
- `template.tf` : prepare cloud init and deployment script
- `variable.tf` : availables variables
- `version.tf` : version for terraform init

## Scripts

This folder create the cloud-init file for prepare instance (update and install dependencies, add security settings). Then, use the `deploy.sh` script for download github repository archive and lauch the app.



