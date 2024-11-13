# Packaging node_modules to a zip archive
data "archive_file" "layer_zip" {
  type        = "zip"
  source_dir  = "${local.build_dir}/deps"
  output_path = "${local.build_dir}/deps.zip"
}

# Upload the archive to an S3 bucket
resource "aws_s3_object" "layer_zip_object" {
  bucket      = var.artifact_bucket
  key         = "${var.project}/${local.env}/deps.zip"
  source      = data.archive_file.layer_zip.output_path
  source_hash = filemd5("${path.root}/../package.json")
}

resource "aws_lambda_layer_version" "lambda_layer" {
  layer_name = "${local.name_prefix}-dependencies"
  s3_bucket  = var.artifact_bucket
  s3_key     = aws_s3_object.layer_zip_object.key
  source_code_hash = filemd5("${path.root}/../package.json")
  compatible_runtimes = ["nodejs20.x"]
}

