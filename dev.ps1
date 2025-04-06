# Simple script to start the Grooftop development environment

Write-Host "Starting Grooftop development environment..." -ForegroundColor Green
docker-compose up -d
Write-Host "Development environment started!" -ForegroundColor Green
Write-Host "Backend API: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Database: postgresql://postgres:postgres@localhost:5432/grooftop" -ForegroundColor Yellow 