# resource `/diary`
resource "aws_api_gateway_resource" "diary_resource" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
  parent_id   = aws_api_gateway_rest_api.rest_api.root_resource_id
  path_part   = "diary"
}

# resource `/diary/activities`
resource "aws_api_gateway_resource" "diary_activities_resource" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
  parent_id   = aws_api_gateway_resource.diary_resource.id
  path_part   = "activities"
}

# GET /diary/activities
module "diary_activities_get" {
  source        = "./api-method"
  http_method   = "GET"
  function_name = "${local.name_prefix}-diary-activities-get"
  handler       = "diary/activity/handler.getActivities"
  api_arn       = aws_api_gateway_rest_api.rest_api.execution_arn
  api_id        = aws_api_gateway_rest_api.rest_api.id
  resource_id   = aws_api_gateway_resource.diary_activities_resource.id
  role          = aws_iam_role.lambda_role.arn
  s3_bucket     = var.artifact_bucket
  s3_prefix     = local.s3_prefix
  env_vars      = var.env_vars
}

# resource `/diary/tags`
resource "aws_api_gateway_resource" "diary_tags_resource" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
  parent_id   = aws_api_gateway_resource.diary_resource.id
  path_part   = "tags"
}

# GET /diary/tags
module "diary_tags_get" {
  source        = "./api-method"
  http_method   = "GET"
  function_name = "${local.name_prefix}-diary-tags-get"
  handler       = "diary/tag/handler.getTags"
  api_arn       = aws_api_gateway_rest_api.rest_api.execution_arn
  api_id        = aws_api_gateway_rest_api.rest_api.id
  resource_id   = aws_api_gateway_resource.diary_tags_resource.id
  role          = aws_iam_role.lambda_role.arn
  s3_bucket     = var.artifact_bucket
  s3_prefix     = local.s3_prefix
  env_vars      = var.env_vars
}

