locals {
  build_dir = "${path.root}/../dist/code"
  code_dir = join("/", slice(split("/", var.handler), 0, length(split("/", var.handler))-1))
}