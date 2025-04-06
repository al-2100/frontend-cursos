# Proyecto Cursos Client

Este proyecto es el front-end para gestionar cursos mediante una API. Desarrollada con Next.js, React y TypeScript.

**Backend:** Puedes visitar el repositorio del frontend en [https://github.com/al-2100/backend-cursos](https://github.com/al-2100/backend-cursos)

## Tecnologías Usadas

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Instalación

### Opción 1: Instalación con Docker

1. Clona el repositorio.
   ```
   git clone https://github.com/al-2100/frontend-cursos
   cd frontend-cursos
   ```
2. Configura las variables de entorno en el archivo `.env` (crea uno siguiendo el ejemplo):
   ```
   NEXT_PUBLIC_API_URL=...
   NEXT_PUBLIC_API_USERNAME=...
   NEXT_PUBLIC_API_PASSWORD=...
   ```
3. Construye la imagen Docker:
   ```
   docker build -t cursos-client .
   ```
4. Ejecuta el contenedor:
   ```
   docker run --env-file .env -p 3000:3000 cursos-client
   ```

### Opción 2: Instalación sin Docker

1. Clona el repositorio.
   ```
   git clone https://github.com/al-2100/frontend-cursos
   cd frontend-cursos
   ```
2. Instala las dependencias:
   ```
   npm ci
   ```
3. Compila el proyecto:
   ```
   npm run build
   ```
4. Inicia la aplicación:
   ```
   npm start
   ```

## Variables de Entorno

El archivo `.env` debe contener:
```
NEXT_PUBLIC_API_URL=...
NEXT_PUBLIC_API_USERNAME=...
NEXT_PUBLIC_API_PASSWORD=...
```

## Funcionalidades

- Listar cursos
- Crear, actualizar y eliminar cursos


## Integración de Herramientas de Inteligencia Artificial en el Desarrollo del Frontend

Durante el desarrollo del frontend, se integró inteligencia artificial para acelerar y mejorar el proceso de implementación. En particular, se utilizó GitHub Copilot para:

- **Autocompletado de código:** Acelerando la escritura y optimización de funciones en el desarrollo.
- **Migración de variables de entorno y generación de archivos:** Automatizando la migración de variables importantes, la creación del `Dockerfile` y la implementación del CRUD.
- **Generación de mensajes de commit:** Contribuyendo a mantener un historial de cambios claro y estructurado.
- **Redacción de instrucciones del README:** Facilitando la elaboración de secciones y documentación detallada del proyecto.
- **Refactorización de page.tsx:** Ayudando a dividir la página principal en componentes reutilizables para mejorar la mantenibilidad del código.
- **Modificación rápida de componentes:** Permitiendo realizar ajustes ligeros en componentes de forma eficiente.
