
output "ipv4_adress" {
  value = openstack_compute_instance_v2.instance.access_ip_v4
}

output "ipv6_adress" {
  value = openstack_compute_instance_v2.instance.access_ip_v6
}