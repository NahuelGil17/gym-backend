<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="images/nestjs.png" alt="Nest Logo" width="512" /></a>
</p>

<h1 align="center">🏋️ Gym Management Backend API 🏋️</h1>

<p align="center">
  Sistema de gestión completo para gimnasios con arquitectura multi-tenant, autenticación Firebase y API REST
</p>

<p align="center">
  <a href="https://nodejs.org/docs/latest-v20.x/api/index.html"><img src="https://img.shields.io/badge/node-20.x-green.svg" alt="node"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="typescript"/></a>
  <a href="https://docs.nestjs.com/v10/"><img src="https://img.shields.io/badge/nestjs-10.x-red.svg" alt="nestjs"/></a>
  <a href="https://fastify.dev/"><img src="https://img.shields.io/badge/Web_Framework-Fastify_⚡-black.svg" alt="fastify"/></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/Database-MongoDB-47A248.svg" alt="mongodb"/></a>
  <a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/Auth-Firebase-FFCA28.svg" alt="firebase"/></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Dockerized 🐳_-blue.svg" alt="docker"/></a>
</p>

## 🎯 Descripción del Proyecto

**Gym Management Backend API** es un sistema completo de gestión para gimnasios construido con NestJS, que implementa una arquitectura multi-tenant robusta y escalable. El sistema permite gestionar múltiples organizaciones (gimnasios) con sus respectivos clientes, planes, rutinas y ejercicios de forma independiente y segura.

### 🚀 Características Principales

- **Multi-tenancy**: Cada organización opera de forma completamente aislada
- **Autenticación Firebase**: Sistema seguro de autenticación y autorización
- **Gestión de Organizaciones**: Creación automática de organizaciones con administradores
- **API REST Completa**: Endpoints para gestión de clientes, planes, rutinas y ejercicios
- **Reportes y Métricas**: Sistema de generación de reportes con exportación
- **Permisos Granulares**: Control de acceso basado en roles y permisos

## 🏗️ Arquitectura y Tecnologías

### Stack Tecnológico

1. **🚀 NestJS**: Framework Node.js robusto para construir aplicaciones escalables del lado del servidor
2. **⚡️ Fastify**: Web framework de alto rendimiento, más rápido que Express
3. **🍃 MongoDB**: Base de datos NoSQL para almacenamiento flexible y escalable
4. **🔥 Firebase**: Autenticación y autorización de usuarios
5. **🐳 Docker**: Containerización para desarrollo y producción
6. **👷 SWC**: Compilador ultra-rápido para TypeScript (~20x más rápido que tsc)
7. **🧪 Vitest**: Framework de testing moderno y rápido
8. **🏎️ K6**: Testing de rendimiento y carga

### Funcionalidades del Sistema

- **🏢 Gestión de Organizaciones**: CRUD completo de organizaciones/gimnasios
- **👥 Gestión de Clientes**: Administración de miembros por organización
- **📋 Planes de Entrenamiento**: Creación y asignación de planes personalizados
- **💪 Rutinas y Ejercicios**: Base de datos completa de ejercicios y rutinas
- **📊 Reportes y Métricas**: Generación de estadísticas y exportación de datos
- **🔐 Control de Acceso**: Sistema de roles y permisos granulares
- **📅 Programación**: Sistema de horarios y citas

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Configuración principal de la aplicación
├── contexts/               # Contextos de dominio
│   ├── organizations/      # Gestión de organizaciones
│   ├── clients/           # Gestión de clientes
│   ├── plans/             # Planes de entrenamiento
│   ├── routines/          # Rutinas de ejercicios
│   ├── exercises/         # Base de datos de ejercicios
│   ├── reports/           # Reportes y métricas
│   └── auth/              # Autenticación y autorización
├── shared/                # Código compartido
│   ├── guards/            # Guards de autenticación
│   ├── decorators/        # Decoradores personalizados
│   ├── services/          # Servicios compartidos
│   └── utils/             # Utilidades
└── main.ts                # Punto de entrada
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 20.x o superior
- npm 9.x o superior
- Docker y Docker Compose
- MongoDB (local o cloud)
- Cuenta de Firebase con proyecto configurado

### 1. Clonar el repositorio

```bash
git clone https://github.com/NahuelGil17/gym-backend.git
cd gym-backend
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar el archivo `.env` con tus configuraciones:

```env
# Base de datos
MONGODB_URI=mongodb://localhost:27017/gym-db

# Firebase
FIREBASE_PUBLIC_KEYS_URL=https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com

# JWT
JWT_ACCESS_SECRET=tu_secret_key_aqui
JWT_ACCESS_EXPIRES_IN=1d

# Servidor
PORT=3000
LOGGER_LEVEL=log
```

### 3. Instalación con Docker (Recomendado)

```bash
# Modo desarrollo con hot-reload
docker-compose up -d my-service-dev

# Modo producción
docker-compose up -d my-service-production
```

### 4. Instalación local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
npm start
```

## 🧪 Testing y Desarrollo

### Scripts Disponibles

```bash
# Desarrollo
npm run dev                    # Iniciar servidor con hot-reload
npm run build                  # Construir para producción
npm start                      # Iniciar servidor de producción

# Testing
npm run test                   # Ejecutar todos los tests
npm run test:unit             # Tests unitarios
npm run test:e2e              # Tests end-to-end
npm run test:performance      # Tests de rendimiento con k6

# Calidad de código
npm run lint                  # Ejecutar linter
npm run lint:fix             # Arreglar problemas de linting automáticamente
npm run typos                # Verificar errores tipográficos
```

### Health Check

Una vez iniciado el servidor, puedes verificar que funciona correctamente:

```bash
curl --request GET \
  --url http://localhost:3000/health
```

### Debugging con VS Code

Crear archivo `.vscode/launch.json`:

```json
{
  "version": "0.1.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to docker",
      "restart": true,
      "port": 9229,
      "remoteRoot": "/app"
    }
  ]
}
```

## 📚 API Documentation

### 🏢 Gestión de Organizaciones

#### Crear nueva organización con administrador

Crea automáticamente una organización con su administrador en Firebase y MongoDB.

**Endpoint:** `POST /organizations`

```json
{
  "name": "Mi Gimnasio",
  "slug": "mi-gimnasio", 
  "description": "Descripción opcional",
  "maxClients": 100,
  "adminUser": {
    "email": "admin@migimnasio.com",
    "password": "contraseñaSegura123",
    "name": "Administrador Principal",
    "phone": "091234567"
  }
}
```

**Respuesta exitosa:**
```json
{
  "organization": { /* datos de la organización */ },
  "admin": { /* datos del cliente admin */ },
  "firebaseUser": {
    "uid": "firebase-uid",
    "email": "admin@migimnasio.com"
  }
}
```

### 🔐 Autenticación

La API utiliza Firebase Authentication con JWT tokens. Incluir en las cabeceras:

```
Authorization: Bearer <firebase-jwt-token>
```

### 📋 Endpoints Principales

- `GET /organizations` - Listar organizaciones
- `POST /organizations` - Crear organización
- `GET /clients` - Listar clientes (filtrado por organización)
- `POST /clients` - Crear cliente
- `GET /plans` - Listar planes de entrenamiento
- `GET /routines` - Listar rutinas
- `GET /exercises` - Listar ejercicios
- `GET /reports` - Generar reportes

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

MIT License - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

- **Nahuel Gil** - [NahuelGil17](https://github.com/NahuelGil17)
