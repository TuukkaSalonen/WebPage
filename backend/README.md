# Running the backend
Run backend with `npx server.ts`

# Running the database
I am using the postgres Docker image, which is started when docker-compose is run.

# Note
In my setup, the backend is run within a Docker container and the source directories are copied and dependencies are installed inside Docker images. Also, environment variables, such as the port, are passed for the image and the container.