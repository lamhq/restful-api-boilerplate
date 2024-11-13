locals {
  env = terraform.workspace == "default" ? "prod": terraform.workspace
  name_prefix = "${var.project}-${local.env}"
  build_dir = "${path.root}/../dist"
}