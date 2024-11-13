variable "api_arn" {
  type = string
}

variable "api_id" {
  type    = string
}

variable "resource_id" {
  type    = string
}

variable "http_method" {
  type    = string
}

variable "authorization" {
  type    = string
  default = "NONE"
}

variable "function_name" {
  type = string
}

variable "handler" {
  type = string
}

variable "layers" {
  type = list(string)
}

variable "source_code_hash" {
  type = string
}

variable "role" {
  type = string
}

variable "s3_bucket" {
  type = string
}

variable "s3_key" {
  type = string
}
