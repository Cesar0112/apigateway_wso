FROM node:22.16.0
WORKDIR /usr/src/app

ARG HTTP_PROXY
ARG HTTPS_PROXY

# Copiar archivos de definición
COPY package.json yarn.lock ./


ENV HTTP_PROXY=$HTTP_PROXY
ENV HTTPS_PROXY=$HTTPS_PROXY

# Instalar dependencias usando el proxy
RUN yarn install --frozen-lockfile

# Quitar las variables de proxy para las siguientes etapas
ENV HTTP_PROXY=""
ENV HTTPS_PROXY=""

# Copiar resto del código y compilar
COPY . .
RUN yarn build

EXPOSE 10410
CMD ["node", "dist/main"]

