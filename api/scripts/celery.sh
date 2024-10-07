#!/bin/sh

# Define the application base directory
APP_DIR="/app/api"

# Wait some time for the rabbitmq to be ready
sleep 18

# Automatically load the .env file if found
set -a
if [ -e "$APP_DIR/.env" ]; then
    . "$APP_DIR/.env"
else
    echo "No .env file found. Exiting."
    exit 1
fi
set +a

# Check the MODE environment variable and start the Celery worker accordingly
if [ "$MODE" = "PROD" ]; then
    echo "Starting Celery in production mode..."
    celery -A src.core.celery.app worker -B --loglevel=INFO
elif [ "$MODE" = "DEV" ]; then
    echo "Starting Celery in development mode..."
    celery -A src.core.celery.app worker -B --loglevel=DEBUG
else
    echo "Invalid MODE specified. Exiting."
    exit 1
fi
