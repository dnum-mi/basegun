# Infra

This folder stores various contents related to Basegun deployment.

## Full infrastructure of the project
![Basegun-infra-legacy-1](https://github.com/datalab-mi/Basegun/assets/24997639/12692b3a-6108-47a9-ac16-44da2ebabd01)

1. Using Github actions, we trigger either the [*preprod* deployment](../../.github/workflows/develop.yml) or the [*prod* deployment](../../.github/workflows/release.yml).
2. For both of them, the [workflow calls Terraform](../.github/workflows/deploy.yml) using specific env variables to differentiate preprod from prod, to start a VM on OVH public cloud.
3. On the VM, we always have [3 containers](../docker-compose.yml) :
* 1 for Basegun frontend (Vue.js website)
* 1 for Basegun backend (Python API)
* 1 for the log collector (Filebeat )  
The frontend communicates with the backend using HTTP requests on the API. On prod, the OVH service SSL Gateway puts itself as intermediary to provide HTTPS connection to the user (+ some benefits like load balancing, protection to DDoS...). We could only use 1 DNS for this service so for preprod we set up an additional container for Traefik which replaces the SSL Gateway to provide HTTPS for the user.
4. The backend and Filebeat share a common volume on the VM, so that when the backend writes logs on the VM, Filebeat can collect them and send them to the OVH public cloud service Log Data Platform.
5. The images uploaded in the frontend of Basegun are sent as blob data to the backend, which then uploads them directly to OVH public cloud object storage service using Python Swift API.



## Terraform explanation

Terraform is an open-source infrastructure as code (IaC) on Openstack project. It reads all files with a `.tf` extension. We separated the Terraform code in several files for better understandability but they are read by TF as one whole block.
<img src="https://github.com/datalab-mi/Basegun/assets/24997639/8469b74c-e889-4a47-93b6-9596e3ef04f6" width="700px" />

### Classic conf files
- `backend.tf` : the remote state (in Swift container), where current state is stored.
- `provider.tf` : select provider (OVH)
- `output.tf`
- `version.tf` : version for terraform init

### Variables
We add TF variables in 2 different ways.
- Variables related to **the instance** configuration are directly passed as env variables to Terraform using the prefix `TF_VAR`.
The variables related to the instance are the following:
    - fixed_ip: fixed ip for VM (populated with github secret `PREPROD_SERVER_IP` or `PROD_SERVER_IP`)
    - flavor: code for VM size on OVH
    - volume_size: size in GB of instance

- Variables related to **Basegun product** are passed via `terraform apply --varfile="deployenv.tfvars"`. This `deployenv.tfvars` file is created by replacing the env variables from the CD in the file `env.tfvars`.
The variables related to Basegun website are the folowing:
    - API_OVH_TOKEN : credential token for logs (see Logging section)
    - OS_USERNAME : username of cloud provider
    - OS_PASSWORD : password for this user
    - OS_PROJECT_NAME : value from `openrc.sh` (find on horizon platform)
    - OS_PROJECT_ID : value from `openrc.sh` (find on horizon platform)
    - WORKSPACE : preprod or prod
    - X_OVH_TOKEN : token for logs (see Logging section)
For practical reasons, we encapsulate all these variables in one large dictionary variable called `deploy_env`.

> Regardless of how they are passed to Terraform, all variables must be declared in `variables.tf` file.

### Instance deployment
<img src="https://github.com/datalab-mi/Basegun/assets/24997639/5803d167-98e9-46ca-b4fc-43bf5e551004" width="500px" />

The file `instance.tf` contains all details related to instance deployment.
* VM size
* VM base image (Debian)
* IP (declared via network object)
* SSH connexion configuration (keypair and port)

The file `template.tf` decribes the files which must be rendered during deployment. Here we render 2 scripts, `init.yaml` as a cloud-init file (lauched at VM start), which installs dependencies and add security settings, and `deploy.sh` as a regular script file (therefore launched when VM is ready), which downloads github repository archive and launches the app.

## Logging
### Requirements
2 variables in environment
* X_OVH_TOKEN : token for OVH data steam
* API_OVH_TOKEN : credential token for OVH log data platform

### Explanation
Basegun website backend writes logs in a log file hosted locally on the server where the website runs.
The log file rotates every day : the current log file is `log.json` while the previous logs are stored in the same folder with the date as suffix in the filename. The log files are stored locally for 7 days.

We use OVH Log Data Platform as endpoint for these logs. We use 3 separate "Data streams" destinations which correspond to 3 different ElasticSearch aliases/indexes: one for dev, one for preprod, one for prod, so that we don't mix the logs issues from these 3 phases. We set the variable `X_OVH_TOKEN` accordingly to the data stream we want to use.

The logs are sent from the server to the endpoint using Filebeat. A Filebeat Docker container using `filebeat.yml` conf file is launched at the same time as the website. It watches the log file written by the website and sends the log to OVH every time there is a change in the file.

In OVH Log Data Platform, we use Kibana to visualize the logs and make queries to extract valuable information from them.

## Kubernetes deployment

It is possible to deploy basegun in a kubernetes cluster with list of manifest or 
