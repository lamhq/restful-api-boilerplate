# Deployment package for Lambda function
data "archive_file" "src_zip" {
  type        = "zip"
  source_dir  = "${local.build_dir}/${local.code_dir}"
  output_path = "${local.build_dir}/${local.code_dir}.zip"
}

# Upload the archive to an S3 bucket
resource "aws_s3_object" "src_zip_object" {
  bucket      = var.s3_bucket
  key         = "${var.s3_prefix}/code/${local.code_dir}.zip"
  source      = data.archive_file.src_zip.output_path
  source_hash = filemd5(data.archive_file.src_zip.output_path)
}

# lambda function
resource "aws_lambda_function" "lambda_function" {
  function_name    = var.function_name
  handler          = var.handler
  role             = var.role
  s3_bucket        = var.s3_bucket
  s3_key           = aws_s3_object.src_zip_object.key
  source_code_hash = aws_s3_object.src_zip_object.source_hash
  runtime          = "nodejs20.x"
  timeout          = 10
  memory_size      = 256
  architectures    = ["arm64"]
  environment {
    variables = merge(var.env_vars, {
      NO_COLOR = "true"
      NODE_OPTIONS = "--enable-source-maps"
    })
  }
}

# lambda function's log group
resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name = "/aws/lambda/${var.function_name}"
}
