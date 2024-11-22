output "deploy_signature" {
  value = "${aws_api_gateway_method.api_method.id}+${aws_api_gateway_integration.api_integration.id}"
}
