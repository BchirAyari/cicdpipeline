# first stage of building angular image
FROM node:alpine AS build
RUN mkdir -p /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json /app/

RUN npm install -g @angular/cli

RUN npm install

COPY . /app/
RUN npm run build --prod

#Final stage
FROM nginx:alpine
COPY --from=build /app/dist/pfe /usr/share/nginx/html