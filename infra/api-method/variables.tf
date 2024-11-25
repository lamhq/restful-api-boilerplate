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

variable "role" {
  type = string
}

variable "s3_bucket" {
  type = string
  description = "S3 Bucket that store the code"
}

variable "s3_prefix" {
  type = string
  description = "Prefix for S3 object"
}

variable "env_vars" {
  description = "Environment variables for the application"
  type = map(string)
}
