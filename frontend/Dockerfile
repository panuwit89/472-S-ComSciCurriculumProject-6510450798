# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the application
COPY . .

# Build the application with error tolerance
RUN npx vite build

# Production stage
FROM nginx:alpine

# Copy built files or fall back to a minimal HTML file if build failed
COPY --from=builder /app/dist /usr/share/nginx/html/


# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]