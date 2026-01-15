# Stage 1: Build the React Application
FROM node:22-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app (Vite outputs to /dist)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine


# Copy built assets from builder stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
