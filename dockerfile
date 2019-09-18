FROM node:12.3.1-alpine as croitorie_build_step
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build
# ENTRYPOINT ["sh", "-c", "sleep 1800"]
# Using official nginx image as the base image
FROM nginx:1.25.3-alpine
# Copy compiled file from build stage
COPY --from=croitorie_build_step /app/build /usr/share/nginx/html
# Expose Port 80
EXPOSE 80
# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
