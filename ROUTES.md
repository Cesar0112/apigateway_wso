# Rutas principales del API Gateway

## Autenticación

- **POST** `/authenticate`  
  Inicia sesión.

  - Body: `{ user, password }`
  - Guarda la sesión y permisos en el backend.

- **POST** `/authenticate/logout`  
  Cierra sesión del usuario actual.

## Proxy (todas las rutas no manejadas explícitamente)

- **ANY** `/*`  
  Todas las rutas no definidas en otros controladores son manejadas por el proxy.
  - Requiere sesión activa (token en sesión).
  - El canal puede definirse con el header `x-channel`.

## Ejemplo de flujo

1. El usuario se autentica en `/authenticate`.
2. El backend guarda el token y los permisos en la sesión.
3. El usuario puede acceder a cualquier otra ruta (`/*`) y será gestionada por el proxy, siempre que la sesión sea válida.

---

> **Nota:**  
> Si agregas más controladores, añade aquí sus rutas principales.
