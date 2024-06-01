#!/bin/sh

# Define the application base directory
APP_DIR="/app/api"

# Wait for dependent services to be ready (if necessary)
sleep 5

# Automatically load the .env file if found
set -a
if [ -e "$APP_DIR/.env" ]; then
    . "$APP_DIR/.env"
else
    echo "No .env file found. Exiting."
    exit 1
fi
set +a

# Navigate to the application directory
cd "$APP_DIR" || { echo "Failed to change directory to $APP_DIR. Exiting."; exit 1; }

# Database migration
if grep -qi '^RUN_MIGRATIONS=True' .env; then
    alembic upgrade head || { echo "Alembic upgrade failed. Exiting."; exit 1; }
fi

# Set the default message format for app mode
APP_MODE_MESSAGE="Starting the application in %s mode..."

# Check the MODE environment variable
if [ "$MODE" = "PROD" ]; then
    # Production mode: start Supervisor
    echo "Starting the application in production mode..."
    /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf

elif [ "$MODE" = "DEV" ]; then
    # Development or debug mode
    # Check for debug mode in .env file
    if grep -qi '^DEBUG=True' .env; then
        printf "$APP_MODE_MESSAGE" "debug"
        # Start FastAPI application with Uvicorn in development mode
        uvicorn src.main:app --reload --host 0.0.0.0 --port "$APP_PORT"
    else
        printf "$APP_MODE_MESSAGE" "production"
        # Start FastAPI application with Gunicorn in more stable development mode
        gunicorn src.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind "0.0.0.0:$APP_PORT"
    fi
else
    echo "No valid MODE set. Exiting..."
    exit 1
fi