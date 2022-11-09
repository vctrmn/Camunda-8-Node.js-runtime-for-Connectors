# Stage 1: Build
FROM node:lts-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY .eslintrc ./
COPY tsconfig.json ./
COPY ./src ./src
# Run Test
COPY ./tests ./tests
RUN npm run test
# Build dist
RUN npx eslint . --fix && npx tsc -p . 

# Stage 2: Run the build
FROM --platform=linux/amd64 node:lts-alpine
RUN apk add dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --production && npm cache clean --force && npm prune --production
COPY --from=builder /usr/src/app/dist ./
EXPOSE 5000
# Run the container with a non-root User
USER node
CMD ["dumb-init", "node", "index.js"]