# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
# Copy package files
COPY package*.json ./
# Install dependencies
RUN npm ci
# Copy source code
COPY . .
# Build the application
RUN npm run build
# Production stage
FROM nginx:alpine AS production
# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy custom nginx config for SPA
RUN echo 'server { \
    listen 80; \
    listen [::]:80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ $uri.html =404; \
    } \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    gzip on; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript; \
}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
