output "method_id" {
  value = aws_api_gateway_method.api_method.id
}

output "integration_id" {
  value = aws_api_gateway_integration.api_integration.id
}
