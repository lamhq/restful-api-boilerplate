resource "aws_api_gateway_rest_api" "rest_api" {
  name = "${local.name_prefix}-rest-api"
  endpoint_configuration {
    types = ["EDGE"]
  } 
}

resource "aws_api_gateway_deployment" "rest_api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.diary_resource.id,
      aws_api_gateway_resource.diary_activities_resource.id,
      aws_api_gateway_resource.diary_tags_resource.id,
      module.diary_activities_get.deploy_signature,
      module.diary_tags_get.deploy_signature,
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

# stage
resource "aws_api_gateway_stage" "rest_api_v1_stage" {
  deployment_id = aws_api_gateway_deployment.rest_api_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.rest_api.id
  stage_name    = "v1"
}
