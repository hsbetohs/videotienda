# Video Tienda
proyecto creado en angular 8, implementando guards, interceptors, lazy load components, rxjs operators, almacenando la informacion por medio de JSON Server.

## Comenzando 🚀

Todos los modulos son accesibles desde la barra de navegación.

Los modulos se muestran según el perfil del usuario.

Registrate por medio del formulario de registro. Inicie en la aplicación por medio de la página de login, el modulo que carga después de la autenticación es el modulo de reservas de películas.

El perfil de administrador tiene un modulo adicional por le cual se gestionan las películas (CRUD).


### Pre-requisitos 📋
Se requiere instalacón de Angular
Se requiere instalación y ejecucion del servidor JSON Server - https://github.com/typicode/json-server


### JSON SERVER: 🔧
Dentro de la raiz del proyecto se encuentra /data/db.json el cual es el archivo usado para almacenar la data
* Instalación: npm install -g json-server
* Crear archivo [ruta_proyecto]/data/db.json
* Ejecución: json-server --watch [ruta_proyecto]/data/db.json
* Peticiones AJAX: http://localhost:3000

```
npm install -g json-server

json-server --watch [PATH]\db.json

```

## Deployment 📦

```
npm build
```

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* Angular 8
* JSON Server - https://github.com/typicode/json-server

