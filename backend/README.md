# 🏋️ SportClub Backend API

Backend académico desarrollado para la asignatura **Programación Front
End** de **INACAP**.

Este proyecto proporciona una **API REST** para que los estudiantes
desarrollen aplicaciones SPA utilizando **React**, enfocándose en la
integración **Frontend ↔ Backend** mediante **Fetch** o **Axios**.

El backend ya incorpora autenticación, autorización, persistencia de
datos y reglas básicas de negocio, permitiendo que el foco del curso
esté en el desarrollo Front End.

------------------------------------------------------------------------

# 🎯 Objetivo

Este proyecto busca proporcionar una API funcional para que los
estudiantes puedan:

-   Consumir servicios REST.
-   Implementar autenticación mediante JWT.
-   Desarrollar operaciones CRUD.
-   Integrar aplicaciones React con un backend real.
-   Desplegar aplicaciones utilizando Docker y AWS.

------------------------------------------------------------------------

# 🚀 Tecnologías utilizadas

-   Node.js
-   Express.js
-   Sequelize ORM
-   SQLite
-   MySQL / MariaDB
-   JWT
-   bcrypt
-   Docker
-   Docker Compose

------------------------------------------------------------------------

# 🏗️ Arquitectura

``` text
React
   │
Fetch / Axios
   │
Express API
   │
Servicios
   │
Repositorios
   │
Sequelize ORM
   │
SQLite / MySQL
```

------------------------------------------------------------------------

# ⚙️ Instalación Local

## 1. Clonar el repositorio

``` bash
git clone https://github.com/<usuario>/backend-sportclub.git
cd backend-sportclub
```

## 2. Instalar dependencias

``` bash
npm install
```

## 3. Configurar variables de entorno

### SQLite

``` env
DB_DIALECT=sqlite
SQLITE_STORAGE=./storage/database.sqlite
```

### MySQL

``` env
DB_DIALECT=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=frontend_users_db
DB_USER=root
DB_PASSWORD=123456
```

## 4. Ejecutar

``` bash
npm run dev
```

Servidor:

``` text
http://localhost:3000
```

------------------------------------------------------------------------

# 🐳 Docker

El proyecto incorpora **Docker Compose**, facilitando el despliegue
tanto en desarrollo como en producción.

## Variables de entorno para Docker

``` env
DB_HOST=mariadb
DB_PORT=3306
DB_NAME=frontend_users_db
DB_USER=club_user
DB_PASSWORD=club_pass
```

## Levantar contenedores

``` bash
docker compose up -d --build
```

## Detener

``` bash
docker compose down
```

## Reiniciar completamente

``` bash
docker compose down -v
docker compose up -d --build
```

## Verificar contenedores

``` bash
docker ps
```

## Revisar logs

``` bash
docker logs club_backend
docker logs club_mariadb
```

------------------------------------------------------------------------

# 👥 Usuarios de prueba

  Rol             Usuario            Contraseña
  --------------- ------------------ ------------
  Administrador   admin1@demo.cl     12345678
  Coach           coach1@demo.cl     12345678
  Usuario         usuario1@demo.cl   12345678

------------------------------------------------------------------------

# 🔐 Autenticación

La mayoría de los endpoints requieren autenticación mediante **JWT**.

Obtener token:

``` http
POST /api/auth/login
```

Enviar en cada solicitud protegida:

``` http
Authorization: Bearer TU_TOKEN
```

------------------------------------------------------------------------

# 📡 Módulos disponibles

  Módulo            Endpoint Base
  ----------------- ----------------------
  Auth              /api/auth
  Users             /api/users
  Sports            /api/sports
  Rooms             /api/rooms
  Sport Rooms       /api/sport-rooms
  Class Schedules   /api/class-schedules
  Coach             /api/coach
  Member            /api/member
  Reservations      /api/reservations

Para el detalle completo de los endpoints consulte la documentación
técnica incluida en el repositorio.

------------------------------------------------------------------------

# 📂 Estructura del proyecto

``` text
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── seeders/
├── services/
├── utils/
├── validators/
├── app.js
└── server.js
```

------------------------------------------------------------------------

# ☁️ Despliegue en AWS

Este backend fue diseñado para ser desplegado en **Amazon EC2**
utilizando Docker Compose.

Se recomienda utilizar:

-   Docker
-   Docker Compose
-   Nginx como Reverse Proxy

El frontend puede consumir la API mediante:

``` text
/api
```

utilizando la configuración de **Reverse Proxy** de Nginx.

------------------------------------------------------------------------

# 📚 Uso Académico

Este repositorio fue desarrollado como material de apoyo para la
asignatura **Programación Front End** de **INACAP**.

Los estudiantes podrán utilizar este backend para desarrollar
laboratorios, actividades y evaluaciones de la asignatura.

No se recomienda modificar:

-   La estructura base del proyecto.
-   Los contratos de la API.
-   Los endpoints entregados.
-   El modelo de datos.

El objetivo principal es centrar el trabajo en el desarrollo del
**Frontend**.

------------------------------------------------------------------------

# ⚠️ Buenas prácticas

-   No subir el archivo `.env`.
-   No subir la base de datos.
-   Utilizar `.gitignore`.
-   Mantener separados controladores, servicios y repositorios.

------------------------------------------------------------------------
