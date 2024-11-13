module "update_data_method" {
  source = "./api-method"
  api_arn = aws_api_gateway_rest_api.rest_api.execution_arn
  api_id = aws_api_gateway_rest_api.rest_api.id
  resource_id = aws_api_gateway_resource.data_resource.id
  http_method = "PUT"
  function_name = "${local.name_prefix}-update-data"
  handler = "handlers/update-data.lambdaHandler"
  layers = [aws_lambda_layer_version.lambda_layer.arn]
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  role             = aws_iam_role.lambda_role.arn
  s3_bucket        = var.artifact_bucket
  s3_key           = aws_s3_object.lambda_zip_object.key
}
