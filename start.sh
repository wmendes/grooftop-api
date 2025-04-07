#!/bin/sh

# Wait for the database to be ready
echo "Waiting for database to be ready..."
sleep 15

# Run migrations
echo "Running database migrations..."
npx prisma migrate deploy

npx prisma db seed

# Start the application
echo "Starting the application..."
npm run start:prod 