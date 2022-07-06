# Infra

This folder stores various contents related to Basegun deployment.

## General schema

## Scripts

* `init.yaml` : file to prepare instance for terraform (update and install dependencies, add security settings)
* `deploy.sh` : script launched at prod server start which downloads github repository archive and lauches the app
* `docker-push.sh` : script for pushing docker images to [ghcr.io](https://github.com/orgs/datalab-mi/packages?repo_name=Basegun) which is our storage system for Basegun docker images
* `test-alive.sh` : script for verifying Basegun website is available on the Internet

## Logging
### Requirements
2 variables in environment
* X_OVH_TOKEN : token for OVH data steam
* API_OVH_TOKEN : credential token for OVH log data platform

### Explanation
Basegun website backend writes logs in a log file hosted locally on the server where the website runs.
The log file rotates every day : the current log file is `log.json` while the previous logs are stored in the same folder with the date as suffix in the filename. The log files are stored locally for 7 days.

We use OVH Log Data Platform as endpoint for these logs. We use 3 separate "Data streams" destinations which correspond to 3 different ElasticSearch aliases/indexes: one for dev, one for preprod, one for prod, so that we don't mix the logs issues from these 3 phases. We set the variable `X_OVH_TOKEN` accordingly to the data stream we want to use.

The logs are sent from the server to the endpoint using Filebeat. A Filebeat Docker container using `filebeat.elastic.yml` conf file is launched at the same time as the website. It watches the log file written by the website and sends the log to OVH every time there is a change in the file.

In OVH Log Data Platform, we use Kibana to visualize the logs and make queries to extract valuable information from them.

## Terraform deployment

Terraform is an open-source infrastructure as code (IaC) on Openstack project.

![](./img/openstack.png)

### Configuration
Add the following Github secrets:
- OS_USERNAME : username of cloud provider
- OS_PASSWORD : password for this user
- OS_PROJECT_NAME : value from `openrc.sh` (find on horizon platform)
- OS_PROJECT_ID : value from `openrc.sh` (find on horizon platform)
- PERSO_ACCESS_TOKEN : github access token for publishing / deleting packages
- PREPROD_SERVER_IP : fixed ip for preprod server

### Terraform

- `backend.tf` : the remote state (in Swift container), where current state is stored.
- `instance.tf` : the desirated instance (image, flavor, volume size, network and address, security group)
- `output.tf` : show ips output
- `provider.tf` : select provider (OVH)
- `template.tf` : prepare cloud init and deployment script
- `variable.tf` : availables variables
- `version.tf` : version for terraform init





