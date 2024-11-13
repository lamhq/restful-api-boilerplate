# Role for Lambda function
resource "aws_iam_role" "lambda_role" {
  name = "${local.name_prefix}-lambda-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Attach a AWS-managed policy `AWSLambdaBasicExecutionRole` to the role
resource "aws_iam_role_policy_attachment" "lambda_basic_exec_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Packaging Lambda function code to a zip archive
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${local.build_dir}/code"
  output_path = "${local.build_dir}/code.zip"
}

# Upload the archive to an S3 bucket
resource "aws_s3_object" "lambda_zip_object" {
  bucket = var.artifact_bucket
  key    = "${var.project}/${local.env}/code.zip"
  source = data.archive_file.lambda_zip.output_path
  etag   = filemd5(data.archive_file.lambda_zip.output_path)
}
