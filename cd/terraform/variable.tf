
variable "project_prefix" {
    type = string
    default = "basegun"
}

variable image {
    type = string
    default = "Debian 10 - Docker"
}

variable flavor {
    type = string
    default = "s1-2"
}

variable "volume_size" {
    type = number
    default = 10
}

variable "fixed_ip" {
    type = string
}

