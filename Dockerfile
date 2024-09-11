# Use Node.js slim-based image to avoid issues with Alpine
FROM node:22.8.0-slim

# Set working directory inside the container
WORKDIR /app

# Install necessary build tools
RUN apt-get update && apt-get install -y build-essential python3 && rm -rf /var/lib/apt/lists/*

# Copy package.json and yarn.lock to install dependencies
COPY ["package.json", "./"]

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Set environment variable for the port
ENV PORT=${SERVER_PORT}

# Expose the necessary port
EXPOSE ${SERVER_PORT}

# Start the application
CMD ["yarn", "start"]
