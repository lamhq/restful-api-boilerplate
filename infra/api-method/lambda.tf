# lambda function
resource "aws_lambda_function" "lambda_function" {
  function_name = var.function_name
  handler       = var.handler
  role             = var.role
  s3_bucket        = var.s3_bucket
  s3_key           = var.s3_key
  source_code_hash = var.source_code_hash
  runtime          = "nodejs20.x"
  timeout          = 10
  architectures    = ["arm64"]
  layers           = var.layers
  environment {
    variables = {
      MY_ENV_VAR = "my_value"
    }
  }  
}

# lambda function's log group
resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name = "/aws/lambda/${var.function_name}"
}
