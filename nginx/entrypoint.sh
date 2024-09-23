#!/bin/bash

# Substitute environment variables in the NGINX config file
envsubst '${NGINX_PORT} ${FRONTEND_PORT} ${BACKEND_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start NGINX
exec nginx -g 'daemon off;'