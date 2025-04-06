# Use an official Node 18 image
FROM node:18-alpine

# Install openssl
RUN apk update && apk add --no-cache openssl

# Create and set the working directory
WORKDIR /app

# Copy package files first (for efficient caching)
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy the rest of your code
COPY . .

RUN npm run build

# (Optional) If you have a build step (e.g., TypeScript -> JavaScript)
# RUN npm run build

# Generate Prisma client (required if you use Prisma)
RUN npx prisma generate

# Expose the port your app runs on
EXPOSE 3000

# Default command (start your app in production mode)
CMD ["npm", "run", "start:prod"]
