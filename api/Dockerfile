# Use the official Node.js image as a base image
FROM node:18

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install TypeScript and ts-node globally
RUN npm install -g typescript ts-node

# Expose the backend port (use the port your app listens on)
EXPOSE 5432

# Start the backend server
CMD ["ts-node", "server.ts"]
