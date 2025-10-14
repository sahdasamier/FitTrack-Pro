#!/bin/bash

# VPS Deployment Script for Workout App Backend
# Run this script on your VPS after uploading your backend files

echo "Starting Workout App Backend Deployment..."

# Create logs directory
mkdir -p logs

# Install dependencies
echo "Installing dependencies..."
npm install

# Install PM2 globally if not already installed
echo "Installing PM2..."
sudo npm install -g pm2

# Copy production environment file
echo "Setting up environment..."
cp production.env .env

# Start the application with PM2
echo "Starting application with PM2..."
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup

echo "Deployment complete!"
echo "Your backend is now running on port 4000"
echo "Check status with: pm2 status"
echo "View logs with: pm2 logs workout-app-backend"
