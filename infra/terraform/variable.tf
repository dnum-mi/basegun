
variable "project_prefix" {
  type        = string
  default     = "basegun"
  description = "Name of project to prefix all instances"
}

variable "image" {
  type        = string
  default     = "Debian 10 - Docker"
  description = "Image name available in Openstack Glance"
}

variable "flavor" {
  type        = string
  default     = "s1-2"
  description = "Flavor available in Openstack"
}

variable "volume_size" {
  type        = number
  default     = 10
  description = "Size in GB of boot volume"
}

variable "fixed_ip" {
  type        = string
  description = "Desirated IP address for instance"
}

variable "branch" {
  type        = string
  default     = "main"
  description = "Branch name to deploy"
}

variable "org" {
  type        = string
  default     = "datalab-mi"
  description = "Organization name in Github"
}

variable "app" {
  type        = string
  default     = "basegun"
  description = "Name of repo Github"
}

variable "app_version" {
  type        = string
  default     = "latest"
  description = "Version to deploy"
}

variable "x_ovh_token" {
  type        = string
  default     = "uuid"
  description = "Token for using a specific stream of OVH Data Log Platform"
}

variable "api_ovh_token" {
  type        = string
  default     = "somestringofcharacters"
  description = "Authentication token for Data Log Platform"
}