
data "template_file" "init" {
  template = "${file("${path.module}/../scripts/init.yaml")}"
}


data "template_file" "deploy" {
  template = "${file("${path.module}/../scripts/deploy.sh")}"

  vars = {
    APP_NAME     = "${var.app}"
    APP_BRANCH   = "${var.branch}"
    ORG          = "${var.org}"
    VERSION      = "${var.app_version}"
  }
}

data "template_cloudinit_config" "config" {
  gzip          = false
  base64_encode = false

  part {
    content_type = "text/cloud-config"
    content      = "${data.template_file.init.rendered}"
  }

  part {
    content_type = "text/plain"
    content      = "${data.template_file.deploy.rendered}"
  }

}