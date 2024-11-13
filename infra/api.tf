resource "aws_api_gateway_rest_api" "rest_api" {
  name = "${local.name_prefix}-rest-api"
  endpoint_configuration {
    types = ["EDGE"]
  } 
}

resource "aws_api_gateway_deployment" "rest_api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id

  triggers = {
    # NOTE: The configuration below will satisfy ordering considerations,
    #       but not pick up all future REST API changes. More advanced patterns
    #       are possible, such as using the filesha1() function against the
    #       Terraform configuration file(s) or removing the .id references to
    #       calculate a hash against whole resources. Be aware that using whole
    #       resources will show a difference after the initial implementation.
    #       It will stabilize to only change when resources change afterwards.
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.data_resource.id,
      module.get_data_method.method_id,
      module.get_data_method.integration_id,
      module.update_data_method.method_id,
      module.update_data_method.integration_id,
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

# resource `/data`
resource "aws_api_gateway_resource" "data_resource" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
  parent_id   = aws_api_gateway_rest_api.rest_api.root_resource_id
  path_part   = "data"
}
