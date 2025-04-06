# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

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