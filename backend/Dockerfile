# Use a specific Node.js version for consistency
FROM node:19-slim

# Create and set working directory
WORKDIR /app

# Copy package files and install dependencies first
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Install tsx globally
RUN npm install -g tsx

# Expose the port that the app will run on
EXPOSE 3001

# Start the application using tsx
CMD ["tsx", "src/server.ts"]