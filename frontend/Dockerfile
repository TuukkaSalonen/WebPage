# Use a specific Node.js version for consistency
FROM node:19-slim

# Create and set working directory
WORKDIR /app

# Copy package files and install dependencies first
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend application
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]