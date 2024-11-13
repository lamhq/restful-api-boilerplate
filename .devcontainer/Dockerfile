FROM public.ecr.aws/lambda/nodejs:20

# Install tar
RUN dnf install -y tar gzip

# enable pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

# set pnpm store directory to a location accessible by the user running the container (root)
RUN pnpm config set store-dir /root/pnpm-store
