# Use the official Bun image as the base image
FROM oven/bun:latest as base

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and bun.lockb (if exists) to the working directory
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the port that the MQTT broker will run on
EXPOSE 1883

# Set environment variables for authentication (optional, can be overridden at runtime)
ENV USER_NAME=admin
ENV PASSWORD=password

# Command to run the application
CMD ["bun", "run", "start"]