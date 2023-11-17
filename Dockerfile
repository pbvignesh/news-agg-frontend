FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

COPY package*.json ./

# Install any dependencies
RUN npm install
COPY . .
RUN npm run build

# Install a simple HTTP server to serve static content
RUN npm install -g serve
EXPOSE 3000

# Run serve when the container launches
CMD ["serve", "-s", "build"]
