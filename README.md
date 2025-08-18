# 🌧️ Sistema de Gestión de Estaciones

Aplicación web realizada con **React** y **Vite** para administrar estaciones. Incluye autenticación, gestión de estaciones y formularios con validación.

## 🌐 En Vivo
- **Frontend**: 

## 📋 Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior.
- [npm](https://www.npmjs.com/) (incluido con Node.js).

## Instalación y configuración

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd station-management-system-app
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecutar localmente

- **Desarrollo**:
  ```bash
  npm run dev
  ```
  Inicia el servidor de desarrollo en `http://localhost:5173`

## 📁 Estructura del Proyecto
```
└── 📁src
    └── 📁assets
        ├── react.svg
    └── 📁auth
        ├── AuthContext.jsx
        ├── keys.js
        ├── ls.js
        ├── ProtectedRoute.jsx
        ├── PublicRoute.jsx
    └── 📁components
        └── 📁ui
            ├── Modal.jsx
            ├── Navbar.jsx
    └── 📁lib
        ├── formatDate.js
    └── 📁routes
        └── 📁private
            ├── AppLayout.jsx
            ├── HomePage.jsx
            ├── ProfilePage.jsx
        └── 📁public
            ├── AuthLayout.jsx
            ├── LoginPage.jsx
            ├── RegisterPage.jsx
    └── 📁stations
        └── 📁components
            ├── DeleteConfirm.jsx
            ├── StationForm.jsx
        ├── api.js
        ├── StationContext.jsx
    └── 📁validation
        ├── stationSchemas.js
        ├── userSchemas.js
    ├── App.css
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

## 🔍 Decisiones de diseño

- **React + Vite**: se eligieron por su rapidez de compilación y experiencia de desarrollo moderna con HMR.
- **Ruteo público/privado**: se implementó con `react-router-dom` para separar pantallas públicas (login/registro) y privadas, usando componentes `ProtectedRoute` y `PublicRoute`.
- **Contextos de autenticación y estaciones**: `AuthContext` gestiona sesión y credenciales en `localStorage`; `StationContext` centraliza el CRUD de estaciones y el manejo de estados de carga y error.
- **Validación de formularios**: se utiliza `react-hook-form` junto con esquemas de [`zod`](https://zod.dev/) para proporcionar validaciones.
- **Estilos**: se emplea [Tailwind CSS](https://tailwindcss.com/) a través del plugin oficial para Vite.
- **API externa**: la comunicación con el backend se realiza mediante `fetch` con control de tiempo de espera y manejo de errores en `src/stations/api.js`.

Estas decisiones buscan una arquitectura modular y fácilmente extensible, facilitando la mantenibilidad y la incorporación de nuevas funcionalidades.
