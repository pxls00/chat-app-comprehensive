
set -e 

echo "Starting build process..."

# Build backend service
echo "Building backend..."
docker-compose build backend
echo "Backend built successfully."

# Build frontend service
echo "Building frontend..."
docker-compose build frontend
echo "Frontend built successfully."

echo "Build process completed."
echo ""

docker-compose --profile prod up -d
echo "Docker Compose started successfully with prod profile."