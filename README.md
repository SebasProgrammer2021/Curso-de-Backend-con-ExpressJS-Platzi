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

## Conexión a PostgreSQL (Prisma)

Levanta primero el servicio de Postgres si no está en ejecución:

```bash
docker-compose up -d
```

Opciones para conectarse a la base de datos MyStore (usuario: Sebas):

- Desde dentro del contenedor (recomendado si no tienes psql en el host):

```bash
docker-compose exec postgres psql -U Sebas -d MyStore
```

conexion desde dentro del contenedor es más directa y evita problemas de redireccionamiento o puertos.

Una vez dentro del contenedor puedes usar el cliente `psql` directamente:

```bash
psql -U Sebas -d MyStore
```

### Comandos PostgreSQL comunes (psql)

> Referencia: [14 Comandos para administrar Postgres – librebyte.net](https://www.librebyte.net/base-de-datos/comandos-para-administrar-postgres/)

| Comando                                      | Descripción                                |
| -------------------------------------------- | ------------------------------------------ |
| `\l`                                         | Listar todas las bases de datos            |
| `\c nombre_bd`                               | Conectarse / seleccionar una base de datos |
| `\dt`                                        | Listar tablas de la BD actual              |
| `\d nombre_tabla`                            | Describir estructura de una tabla          |
| `\du`                                        | Listar usuarios y roles                    |
| `\?` o `\h`                                  | Obtener ayuda de comandos psql             |
| `\q`                                         | Salir de la consola psql                   |
| `CREATE DATABASE nombre OWNER usuario;`      | Crear una base de datos                    |
| `DROP DATABASE nombre;`                      | Eliminar una base de datos                 |
| `CREATE USER usuario WITH PASSWORD 'clave';` | Crear un usuario                           |
| `ALTER USER usuario WITH SUPERUSER;`         | Dar privilegios de superusuario            |
| `DROP USER usuario;`                         | Eliminar un usuario                        |
| `ALTER SCHEMA public OWNER TO usuario;`      | Cambiar propietario del schema public      |

- Desde el host (si tienes psql instalado):

```bash
psql postgresql://Sebas:admin123@localhost:5432/MyStore
```

- Alternativa: usa un cliente GUI (pgAdmin, DBeaver, TablePlus, etc.) y conecta con los mismos datos.

Notas:

- Asegúrate de que `DATABASE_URL` en `.env` coincide con la base de datos usada por el contenedor (ej.: `postgresql://Sebas:admin123@localhost:5432/MyStore?schema=public`).
- Si necesitas aplicar migraciones (crear las tablas en la BD) ejecuta:

```bash
npx prisma migrate deploy
```

- O en desarrollo para sincronizar el schema sin historial de migraciones:

```bash
npx prisma db push
```

- Después de aplicar migraciones, regenera el cliente Prisma:

```bash
npx prisma generate
```

## Configuración de Prisma v6 (paso a paso)

Esta guía explica cómo configurar Prisma 6.x con PostgreSQL en este proyecto desde cero.

### 1. Instalar dependencias de Prisma

```bash
npm install @prisma/client@6
npm install --save-dev prisma@6
```

### 2. Inicializar Prisma (si aún no existe `prisma/schema.prisma`)

```bash
npx prisma init
```

Esto genera la carpeta `prisma/` con el archivo `schema.prisma` y agrega `DATABASE_URL` al `.env`.

### 3. Configurar el archivo `.env`

Asegúrate de que `.env` tenga la URL apuntando al contenedor Docker:

```properties
DATABASE_URL="postgresql://Sebas:admin123@localhost:5432/MyStore?schema=public"
```

### 4. Configurar `prisma/schema.prisma`

El schema debe verse así para Prisma v6 (con `url` en el datasource y `output` en el generator):

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```

> ⚠️ En Prisma v6 la propiedad `url` va dentro del bloque `datasource` del `schema.prisma`.
> En Prisma v7 fue movida a `prisma.config.ts` — no mezclar ambas versiones.

### 5. Levantar el contenedor de PostgreSQL

```bash
docker-compose up -d
```

Verifica que el contenedor esté en ejecución:

```bash
docker-compose ps
```

### 6. Crear y aplicar migraciones (crea las tablas en la BD)

```bash
npx prisma migrate dev --name init
```

> Usa `migrate dev` en desarrollo. Genera el historial de migraciones en `prisma/migrations/`.

Cuando modificas el modelo (por ejemplo agregas campos como `password` o `role`), crea una nueva migración con un nombre descriptivo:

```bash
npx prisma migrate dev --name "update user model"
```

> Esto detecta los cambios en `schema.prisma` respecto a la última migración, genera un nuevo archivo SQL en `prisma/migrations/` y lo aplica automáticamente a la BD. El nombre debe describir el cambio realizado.

O si ya existen migraciones y solo quieres aplicarlas:

```bash
npx prisma migrate deploy
```

O para sincronizar el schema directamente sin historial de migraciones (rápido en dev):

```bash
npx prisma db push
```

### 7. Generar el cliente Prisma

```bash
npx prisma generate
```

Esto genera el cliente en `generated/prisma/` según el `output` configurado en el schema.

### 8. Importar el cliente en `app.js`

```js
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();
```

### 9. Probar la conexión

Inicia la app y accede al endpoint que usa Prisma:

```bash
npm run dev
```

```bash
curl http://localhost:3005/db-users
```

### Resumen de comandos Prisma v6

| Comando                                  | Descripción                                    |
| ---------------------------------------- | ---------------------------------------------- |
| `npx prisma generate`                    | Genera el cliente JS a partir del schema       |
| `npx prisma migrate dev --name <nombre>` | Crea y aplica una nueva migración en dev       |
| `npx prisma migrate deploy`              | Aplica migraciones pendientes (producción/CI)  |
| `npx prisma db push`                     | Sincroniza el schema con la BD sin migraciones |
| `npx prisma studio`                      | Abre una UI visual para explorar la BD         |
| `npx prisma -v`                          | Muestra versión del CLI y del cliente          |

---

Para más detalles sobre decisiones de implementación, rutas y estructura revisa `app.js` y los archivos en la carpeta `docs/`.
