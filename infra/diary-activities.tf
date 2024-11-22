# resource `/diary/activities`
resource "aws_api_gateway_resource" "diary_activities_resource" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
  parent_id   = aws_api_gateway_rest_api.rest_api.root_resource_id
  path_part   = "diary-activities"
}

# GET /diary/activities
module "diary_activities_get" {
  source           = "./api-method"
  http_method      = "GET"
  function_name    = "${local.name_prefix}-diary-activities-get"
  handler          = "diary/activity/handler.getActivitiesHandler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  api_arn          = aws_api_gateway_rest_api.rest_api.execution_arn
  api_id           = aws_api_gateway_rest_api.rest_api.id
  resource_id      = aws_api_gateway_resource.diary_activities_resource.id
  layers           = [aws_lambda_layer_version.lambda_layer.arn]
  role             = aws_iam_role.lambda_role.arn
  s3_bucket        = var.artifact_bucket
  s3_key           = aws_s3_object.lambda_zip_object.key
}

