
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

variable "env" {
    type = map
}