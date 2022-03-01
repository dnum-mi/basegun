# Création d'une instance
resource "openstack_compute_instance_v2" "test_terraform_instance" {
  name        = "test_terraform_sarah"    # Nom de l'instance
  provider    = openstack.ovh           # Nom du fournisseur
  image_name  = "Debian 10"             # Nom de l'image
  flavor_name = "s1-2"                  # Nom du type d'instance
  key_pair    = "tf-basegun-sarah"
  network {
    name      = "Ext-Net" # Ajoute le composant réseau pour atteindre votre instance
  }
}