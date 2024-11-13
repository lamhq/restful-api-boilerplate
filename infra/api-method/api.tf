resource "aws_api_gateway_method" "api_method" {
  authorization = var.authorization
  http_method   = var.http_method
  rest_api_id   = var.api_id
  resource_id   = var.resource_id
}

resource "aws_api_gateway_integration" "api_integration" {
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  rest_api_id             = var.api_id
  resource_id             = var.resource_id
  http_method             = aws_api_gateway_method.api_method.http_method
  uri                     = aws_lambda_function.lambda_function.invoke_arn
}

# api gateway permission to invoke get_data lambda function
resource "aws_lambda_permission" "invoke_api_permission" {
  principal     = "apigateway.amazonaws.com"
  action        = "lambda:InvokeFunction"
  function_name = var.function_name
  source_arn = "${var.api_arn}/*"
}
