terraform {
  backend "swift" {
    region_name = "GRA"
    container   = "basegun-terraform-state"
  }
}