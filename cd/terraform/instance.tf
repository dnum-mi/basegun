data "openstack_compute_keypair_v2" "keypair" {
  name = "basegun_keypair_tf"
}

data "openstack_networking_network_v2" "network" {
  name = "Ext-Net"
  provider = openstack.ovh
}

data "openstack_images_image_v2" "debian" {
  name          = var.image
  most_recent   = true
}

resource "openstack_compute_instance_v2" "instance" {
    provider = openstack.ovh
    name        = "${var.project_prefix}-instance"
    image_name  = var.image
    flavor_name = var.flavor
    key_pair    = data.openstack_compute_keypair_v2.keypair.name
    security_groups = ["default"]
    user_data   = data.template_cloudinit_config.config.rendered

    block_device {
        uuid                  = data.openstack_images_image_v2.debian.id
        source_type           = "image"
        destination_type      = "local"
        volume_size           = var.volume_size
        boot_index            = 0
        delete_on_termination = true
    }

    network {
        name = "Ext-Net"
        fixed_ip_v4  = var.fixed_ip
    }
  }