#!/bin/sh

# Define the application base directory
APP_DIR="/app/api"

# Navigate to the application directory
cd "$APP_DIR" || { echo "Failed to change directory to $APP_DIR. Exiting."; exit 1; }

# Check if the required arguments are provided
if [ "$#" -ne 6 ]; then
    echo "Usage: $0 -e <email> -p <phone> -psw <password>"
    exit 1
fi

# Parse the arguments manually
while [ "$#" -gt 0 ]; do
    case "$1" in
        -e)
            EMAIL="$2"
            shift 2
            ;;
        -p)
            PHONE="$2"
            shift 2
            ;;
        -psw)
            PASSWORD="$2"
            shift 2
            ;;
        *)
            echo "Invalid option: $1" >&2
            exit 1
            ;;
    esac
done

# Export script to the PYTHONPATH to avoid relative import issues
export PYTHONPATH="$PYTHONPATH:$APP_DIR/src/scripts/create_admin.py"

# Run the Python script with the provided arguments
python3.11 -m src.scripts.create_admin -e "$EMAIL" -p "$PHONE" -psw "$PASSWORD"
