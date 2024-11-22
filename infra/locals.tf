locals {
  env         = terraform.workspace == "default" ? "prod" : terraform.workspace
  name_prefix = "${var.project}-${local.env}"
  s3_prefix   = "${var.project}/${local.env}"
  role_tags = {
    role = "zoiautomationrole"
  }
}
