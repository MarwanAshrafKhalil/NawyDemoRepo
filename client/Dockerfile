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

# Build the frontend application
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Start the frontend server
CMD ["npm", "start"]
