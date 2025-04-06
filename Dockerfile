# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Definir los argumentos para el build y asignarlos a variables de entorno
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_USERNAME
ARG NEXT_PUBLIC_API_PASSWORD

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_USERNAME=$NEXT_PUBLIC_API_USERNAME
ENV NEXT_PUBLIC_API_PASSWORD=$NEXT_PUBLIC_API_PASSWORD

# Copiar archivos de dependencias e instalar dependencias
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci

# Copiar el resto del código y construir la aplicación
COPY . .
RUN npm run build

# Run stage
FROM node:18-alpine AS runner
WORKDIR /app

# Variable de entorno para producción
ENV NODE_ENV=production

# Copiar desde el stage anterior
COPY --from=builder /app ./

# Exponer puerto para la aplicación
EXPOSE 3000

# Ejecutar la aplicación
CMD ["npm", "start"]