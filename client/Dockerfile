# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./
# COPY .env ./

# RUN npm install

# COPY . .



# EXPOSE 5173

# CMD ["npm", "run", "build"]




# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# # COPY .env ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Install a static file server (e.g., 'serve')
# RUN npm install -g serve

# EXPOSE 5173
# CMD ["serve", "-s", "dist", "-l", "5173"]



# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

# Stage 2: Production Serve
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install production dependencies ONLY
RUN npm install --omit=dev

# Install serve globally (or use local node_modules version)
RUN npm install -g serve

EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]










# //instead try to use the nginx which will automaticlly serves the text/html to application/javascript 