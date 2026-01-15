# Use lightweight Node 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first to leverage cache
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose API port
EXPOSE 5000

# Start command
CMD ["npm", "start"]
