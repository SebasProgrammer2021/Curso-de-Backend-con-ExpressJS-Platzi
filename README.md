# Curso de Backend con ExpressJS (Platzi)

Proyecto de ejemplo para el curso de Backend con ExpressJS. Contiene una API mínima que gestiona usuarios de ejemplo y archivos de configuración para desarrollo.

## Descripción

- Autor: Sebastián Londoño Valencia
- Principal: `app.js`
- Tipo del proyecto: CommonJS (ver `package.json`)

## Requisitos

- Node.js (v16+ recomendado)
- npm

## Instalación

1. Instala dependencias:

```bash
npm install
```

2. Variables de entorno (opcional): crea un archivo `.env` si necesitas definir configuraciones (el proyecto incluye `dotenv`).

## Scripts útiles (definidos en `package.json`)

- `npm run dev` — Ejecuta `node --watch app.js` para desarrollo con recarga.
- `npm start` — Ejecuta `node app.js`.

## Datos de ejemplo

El archivo `users.json` en la raíz del proyecto contiene los datos usados por las rutas y métodos de usuarios del proyecto (por ejemplo, respuestas para `GET /users`, `POST /users`, `PUT /users/:id`, `DELETE /users/:id`). Es un JSON con usuarios de ejemplo que las rutas del servidor pueden consumir durante pruebas o desarrollo.

Contenido ejemplo (resumido):

- id: 1, name: John Doe, email: johndoe2019@gmail.com
- id: 2, name: Jenny Smith, email: jenny2025@gmail.com

## Notas sobre body-parser

Consulta el archivo [docs/body-parser.md](./docs/body-parser.md) para la explicación detallada sobre el uso de parsing en Express (recomendación moderna: `express.json()` y `express.urlencoded()`)

Si instalaste `body-parser` y no usas características avanzadas, puedes eliminarlo para reducir dependencias.

## Ejemplos rápidos (curl)

- Listar usuarios:
  curl http://localhost:3000/users

- Obtener usuario por id:
  curl http://localhost:3000/users/1

- Crear usuario (JSON):
  curl -X POST -H "Content-Type: application/json" -d '{"name":"Ana","email":"ana@example.com"}' http://localhost:3000/users

(Adapta el puerto según la configuración de `app.js`.)

---

Para más detalles sobre decisiones de implementación, rutas y estructura revisa `app.js` y los archivos en la carpeta `docs/`.
