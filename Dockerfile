# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD [ "npm", "run", "start:prod" ]
