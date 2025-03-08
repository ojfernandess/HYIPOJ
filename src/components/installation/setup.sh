#!/bin/bash

# HYIP Platform Setup Script
# This script automates the installation and configuration of the HYIP Platform

echo "=== HYIP Platform Setup ==="
echo "This script will guide you through the installation process."
echo ""

# Check system requirements
echo "Checking system requirements..."

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js 16.x or higher."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "Node.js version 16.x or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "Node.js version $(node -v) detected. ✓"

# Check npm version
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm."
    exit 1
fi

echo "npm version $(npm -v) detected. ✓"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "git is not installed. Please install git."
    exit 1
fi

echo "git version $(git --version) detected. ✓"

echo "All system requirements met. ✓"
echo ""

# Clone repository if not already in the project directory
if [ ! -f "package.json" ]; then
    echo "Cloning the repository..."
    read -p "Enter the repository URL (default: https://github.com/your-org/hyip-platform.git): " REPO_URL
    REPO_URL=${REPO_URL:-https://github.com/your-org/hyip-platform.git}
    
    git clone "$REPO_URL" .
    if [ $? -ne 0 ]; then
        echo "Failed to clone the repository. Please check the URL and try again."
        exit 1
    fi
    echo "Repository cloned successfully. ✓"
else
    echo "Already in the project directory. Skipping repository clone. ✓"
fi

echo ""

# Install dependencies
echo "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install dependencies. Please check the error message above."
    exit 1
fi
echo "Dependencies installed successfully. ✓"
echo ""

# Configure environment variables
echo "Configuring environment variables..."
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo ".env file created from .env.example. ✓"
    else
        echo "Creating .env file..."
        cat > .env << EOL
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=hyip_platform

# Mail Configuration
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=your_email@example.com
MAIL_PASSWORD=your_mail_password
MAIL_FROM=noreply@example.com

# Payment Gateway API Keys
BTC_GATEWAY_API_KEY=
BTC_GATEWAY_SECRET=

# Security Settings
JWT_SECRET=$(openssl rand -hex 32)
JWT_EXPIRES_IN=7d

# Application Settings
APP_URL=http://localhost:3000
APP_PORT=3000
NODE_ENV=development
EOL
        echo ".env file created with default values. ✓"
    fi
    
    echo "Please edit the .env file with your configuration before continuing."
    read -p "Press Enter to continue after editing the .env file..."
else
    echo ".env file already exists. Skipping creation. ✓"
fi

echo ""

# Set up the database
echo "Setting up the database..."
read -p "Do you want to set up the database now? (y/n): " SETUP_DB
if [ "$SETUP_DB" = "y" ] || [ "$SETUP_DB" = "Y" ]; then
    npm run setup:db
    if [ $? -ne 0 ]; then
        echo "Failed to set up the database. Please check the error message above."
        exit 1
    fi
    echo "Database set up successfully. ✓"
else
    echo "Skipping database setup. You can run 'npm run setup:db' later."
fi

echo ""

# Create admin user
echo "Creating admin user..."
read -p "Do you want to create an admin user now? (y/n): " CREATE_ADMIN
if [ "$CREATE_ADMIN" = "y" ] || [ "$CREATE_ADMIN" = "Y" ]; then
    npm run create:admin
    if [ $? -ne 0 ]; then
        echo "Failed to create admin user. Please check the error message above."
        exit 1
    fi
    echo "Admin user created successfully. ✓"
else
    echo "Skipping admin user creation. You can run 'npm run create:admin' later."
fi

echo ""

# Build the application
echo "Building the application..."
read -p "Do you want to build the application for production? (y/n): " BUILD_APP
if [ "$BUILD_APP" = "y" ] || [ "$BUILD_APP" = "Y" ]; then
    npm run build
    if [ $? -ne 0 ]; then
        echo "Failed to build the application. Please check the error message above."
        exit 1
    fi
    echo "Application built successfully. ✓"
else
    echo "Skipping application build. You can run 'npm run build' later."
fi

echo ""

# Start the application
echo "Starting the application..."
read -p "Do you want to start the application now? (y/n): " START_APP
if [ "$START_APP" = "y" ] || [ "$START_APP" = "Y" ]; then
    read -p "Start in development mode? (y/n): " DEV_MODE
    if [ "$DEV_MODE" = "y" ] || [ "$DEV_MODE" = "Y" ]; then
        echo "Starting in development mode..."
        npm run dev
    else
        echo "Starting in production mode..."
        npm start
    fi
else
    echo "Skipping application start."
fi

echo ""
echo "=== HYIP Platform Setup Complete ==="
echo "You can start the application in development mode with 'npm run dev'"
echo "or in production mode with 'npm start'."
echo "Thank you for installing HYIP Platform!"
