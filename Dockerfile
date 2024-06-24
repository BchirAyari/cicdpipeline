# first stage of building angular image
FROM node:latest AS build
#RUN mkdir -p /app
WORKDIR /usr/local/app

# Copy package.json and package-lock.json
COPY package*.json /usr/local/app/

# Install Angular CLI and dependencies
RUN npm install -g @angular/cli

RUN npm install

COPY ./ /usr/local/app/

# Build the Angular application
RUN npm run build 

#Final stage
FROM nginx:latest

# Copier les fichiers de construction de votre application Angular dans le répertoire Nginx par défaut
COPY --from=build /usr/local/app/dist/pfe/browser /usr/share/nginx/html

# Copier le fichier de configuration personnalisé de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80