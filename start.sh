#!/bin/sh
# Railway entrypoint for EventEase

# Go to backend folder
cd eventease-backend

# Install dependencies (Railway cache will make this faster after first time)
npm install

# Start the backend
npm start
