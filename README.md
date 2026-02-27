# Curso de Backend con ExpressJS (Platzi)

Backend RESTful construido con Node.js y Express, con autenticación JWT, ORM Prisma y base de datos PostgreSQL en Docker.

---

## 📋 Descripción

- **Autor:** Sebastián Londoño Valencia
- **Entrypoint:** `src/server.js`
- **Tipo:** CommonJS (`"type": "commonjs"`)
- **Base de datos:** PostgreSQL (Docker) + Prisma ORM v6

### 🛠 Tecnologías usadas

- 🚀 Node.js
- ⚙️ Express
- 🛡️ JSON Web Tokens (JWT)
- 🐘 PostgreSQL (Docker)
- 💠 Prisma ORM v6
- 📦 bcryptjs para hashing
- 🔑 dotenv para variables de entorno

---

## 🗂️ Estructura del proyecto

```
├── src/
│   ├── server.js              # Punto de entrada — levanta el servidor
│   ├── app.js                 # Configuración de Express (middlewares y rutas)
│   ├── routes/
│   │   ├── index.js           # Router principal
│   │   └── auth.js            # Rutas de autenticación
│   ├── controllers/
│   │   └── authController.js  # Lógica de request/response
│   ├── services/
│   │   └── authService.js     # Lógica de negocio (register, login)
│   ├── middlewares/
│   │   ├── auth.js            # Verificación de token JWT
│   │   ├── logger.js          # Logger de solicitudes
│   │   └── errorHandler.js    # Manejo centralizado de errores
│   └── utils/
│       └── validation.js      # Funciones de validación
├── prisma/
│   ├── schema.prisma          # Modelos de BD
│   ├── seed.js                # Script para poblar la BD
│   └── migrations/            # Historial de migraciones SQL
├── generated/
│   └── prisma/                # Cliente Prisma generado
├── docs/
│   └── body-parser.md         # Nota sobre body-parser vs express.json
├── docker-compose.yml         # Servicio PostgreSQL
├── prisma.config.ts           # Configuración avanzada de Prisma
└── .env                       # Variables de entorno (no subir al repo)
```

---

## ⚙️ Requisitos

- Node.js v16+
- npm
- Docker y Docker Compose

---

## 🚀 Instalación y ejecución

### 1. Clonar e instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz (puedes copiar `.env-example`):

```properties
PORT=3005
NODE_ENV=development
DATABASE_URL="postgresql://Sebas:admin123@localhost:5432/MyStore?schema=public"
JWT_SECRET="tu_clave_secreta_aqui"
```

### 3. Levantar PostgreSQL con Docker

```bash
docker-compose up -d
```

### 4. Aplicar migraciones y generar cliente Prisma

`npx prisma migrate deploy` — Aplica todas las migraciones pendientes que están en `prisma/migrations/` a la base de datos. Úsalo siempre que configures el proyecto por primera vez o cuando tus compañeros hayan creado nuevas migraciones.

```bash
npx prisma migrate deploy
```

`npx prisma generate` — Lee el `schema.prisma` y genera el cliente Prisma en `generated/prisma/`. Debes ejecutarlo cada vez que cambies el schema o después de `migrate deploy`.

```bash
npx prisma generate
```

### 5. (Opcional) Poblar la BD con datos de prueba

`node prisma/seed.js` — Ejecuta el script de seed que inserta usuarios de demo en la base de datos. Útil para tener datos de prueba rápidamente sin hacerlo manualmente por la API.

```bash
node prisma/seed.js
```

### 6. Iniciar el servidor

`npm run dev` — Usa `node --watch` para reiniciar automáticamente el servidor cuando detecta cambios en los archivos. Ideal para desarrollo.

```bash
npm run dev
```

`npm start` — Inicia el servidor sin recarga automática. Recomendado para producción.

```bash
npm start
```

---

## 📡 Endpoints disponibles

### Autenticación (`/api/auth`)

| Método | Ruta                        | Descripción                 | Auth   |
| ------ | --------------------------- | --------------------------- | ------ |
| `POST` | `/api/auth/register`        | Registrar nuevo usuario     | ❌     |
| `POST` | `/api/auth/login`           | Iniciar sesión, retorna JWT | ❌     |
| `GET`  | `/api/auth/protected-route` | Ruta protegida de prueba    | ✅ JWT |

### Usuarios (legacy — archivo `users.json`)

| Método   | Ruta         | Descripción                        |
| -------- | ------------ | ---------------------------------- |
| `GET`    | `/users`     | Listar todos los usuarios del JSON |
| `POST`   | `/users`     | Crear usuario en el JSON           |
| `PUT`    | `/users/:id` | Actualizar usuario del JSON        |
| `DELETE` | `/users/:id` | Eliminar usuario del JSON          |

### Base de datos (Prisma + PostgreSQL)

| Método | Ruta        | Descripción                   |
| ------ | ----------- | ----------------------------- |
| `GET`  | `/db-users` | Listar usuarios de PostgreSQL |

### Otros

| Método | Ruta                          | Descripción                      |
| ------ | ----------------------------- | -------------------------------- |
| `GET`  | `/`                           | Página de bienvenida             |
| `GET`  | `/search?termino=&categoria=` | Búsqueda por query params        |
| `POST` | `/form`                       | Envío de formulario (urlencoded) |
| `POST` | `/api/data`                   | Recibir datos JSON genéricos     |
| `GET`  | `/error`                      | Ruta de prueba del errorHandler  |

---

## 🔐 Autenticación JWT

### Registrar usuario

```bash
curl -X POST http://localhost:3005/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Juan\",\"email\":\"juan@example.com\",\"password\":\"123456\"}"
```

### Iniciar sesión

```bash
curl -X POST http://localhost:3005/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"juan@example.com\",\"password\":\"123456\"}"
```

### Usar el token en rutas protegidas

```bash
curl http://localhost:3005/api/auth/protected-route \
  -H "Authorization: Bearer <token>"
```

---

## 🐘 Base de datos PostgreSQL

### Levantar contenedor

`docker-compose up -d` — Levanta el contenedor de PostgreSQL en segundo plano (detached). La BD queda disponible en `localhost:5432`.

```bash
docker-compose up -d
```

`docker-compose ps` — Muestra el estado actual de los contenedores definidos en `docker-compose.yml`. Verifica que el contenedor esté `Up (healthy)`.

```bash
docker-compose ps
```

`docker-compose down` — Detiene y elimina los contenedores (los datos persisten gracias al volumen `db_data`).

```bash
docker-compose down
```

### Conectarse al contenedor

`docker-compose exec postgres psql -U Sebas -d MyStore` — Abre una sesión interactiva de `psql` directamente dentro del contenedor Docker. Es la forma más directa y evita problemas de puertos o instalaciones locales.

```bash
docker-compose exec postgres psql -U Sebas -d MyStore
```

Una vez dentro del contenedor, si quieres reconectarte a otra BD:

```bash
psql -U Sebas -d MyStore
```

### Comandos psql útiles

| Comando           | Descripción           |
| ----------------- | --------------------- |
| `\l`              | Listar bases de datos |
| `\c nombre_bd`    | Conectarse a una BD   |
| `\dt`             | Listar tablas         |
| `\d nombre_tabla` | Describir tabla       |
| `\du`             | Listar usuarios       |
| `\q`              | Salir                 |

> Referencia: [14 Comandos para administrar Postgres – librebyte.net](https://www.librebyte.net/base-de-datos/comandos-para-administrar-postgres/)

### Consultar tabla User

> ⚠️ La tabla se llama `"User"` con comillas dobles porque Prisma la crea con mayúscula. Sin las comillas PostgreSQL la busca en minúscula y lanza error.

```sql
SELECT * FROM "User";
```

---

## 🔧 Configuración de Prisma v6 (paso a paso)

> ⚠️ Este proyecto usa **Prisma v6**. En v6 la `url` va en `schema.prisma`. En v7 se mueve a `prisma.config.ts`.

### Schema (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  USER
}

model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
  role     Role
}
```

### Comandos Prisma v6

| Comando                                             | Cuándo usarlo                                                                    |
| --------------------------------------------------- | -------------------------------------------------------------------------------- |
| `npx prisma generate`                               | Después de cambiar `schema.prisma` o al instalar por primera vez                 |
| `npx prisma migrate dev --name init`                | Primera vez que creas las tablas en desarrollo                                   |
| `npx prisma migrate dev --name "update user model"` | Cada vez que modificas un modelo (agregar campo, cambiar tipo, etc.)             |
| `npx prisma migrate deploy`                         | Aplica migraciones pendientes (primer setup o CI/CD)                             |
| `npx prisma db push`                                | Sincroniza schema con la BD sin generar historial (solo para prototipado rápido) |
| `npx prisma studio`                                 | Abre UI visual en `http://localhost:5555` para ver y editar datos                |
| `npx prisma -v`                                     | Verifica versión del CLI y del cliente instalados                                |

### Importar el cliente en el código

```js
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();
```

---

## 📦 Dependencias principales

| Paquete          | Uso                              |
| ---------------- | -------------------------------- |
| `express`        | Framework HTTP                   |
| `@prisma/client` | ORM cliente                      |
| `prisma`         | CLI de migraciones (devDep)      |
| `bcryptjs`       | Hash de contraseñas              |
| `jsonwebtoken`   | Generación y verificación de JWT |
| `dotenv`         | Variables de entorno             |
| `pg`             | Driver PostgreSQL                |

---

## 📝 Notas

- Consulta [`docs/body-parser.md`](./docs/body-parser.md) para más información sobre el parsing de cuerpos en Express.
- El archivo `users.json` en la raíz es un legado de las primeras versiones del proyecto (sin BD).
- En producción, cambia `JWT_SECRET` por una clave segura y no la subas al repositorio.
