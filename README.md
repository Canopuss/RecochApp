# Recochapp - Plataforma para Fútbol Amateur

Recochapp es una plataforma diseñada para gestionar y organizar partidos, torneos y estadísticas de fútbol amateur. El proyecto incluye un frontend interactivo con estética "FIFA" y una estructura robusta para la gestión de usuarios y equipos.

## Características Principales

- **Dashboard de Usuario**: Resumen de actividad y acceso rápido a funciones.
- **Gestión de Torneos**: Organización y seguimiento de competiciones.
- **Estadísticas Dinámicas**: Visualización de rendimiento de jugadores y equipos.
- **Tarjetas de Jugador**: Sistema visual estilo cartas de FIFA para mostrar atributos.
- **Integración Social**: Espacio para organizar "recochas" (partidos informales).

## Estructura del Proyecto

- `/frontend`: Contiene la interfaz de usuario (HTML, CSS, JS).
- `SQLRecochApp.txt`: Script para la creación de la base de datos.
- `/docs`: Documentación detallada sobre la planeación y el diseño del sistema.

## Tecnologías Utilizadas

- **Frontend**: HTML5, Vanilla CSS, JavaScript.
- **Backend**: Java 17, Spring Boot 3.2.0.
- **Base de Datos Relacional (Autenticación)**: H2 Database (Memoria).
- **Base de Datos NoSQL (Perfiles y Búsqueda)**: MongoDB Atlas (Cloud).
- **Diseño**: Inspirado en interfaces deportivas modernas.

## Arquitectura y CRUD NoSQL (MongoDB)

Recochapp utiliza una **Arquitectura Políglota** de bases de datos:
1. **Autenticación (H2 - Relacional)**: Gestiona la creación de cuentas de usuario, correos y contraseñas.
2. **Perfiles Deportivos (MongoDB - NoSQL)**: Gestiona los datos dinámicos de los jugadores (posiciones preferidas, zonas de juego, club, edad, pierna hábil).

Se implementó un **CRUD completo** con Spring Data MongoDB (`JugadorPerfilController`):
- **Crear (Create)**: Al registrarse un usuario, su perfil deportivo se vincula y se guarda como un documento NoSQL flexible.
- **Leer (Read)**: Un motor de búsqueda dinámico con `MongoTemplate` permite encontrar jugadores filtrando por nombre, club, múltiples posiciones a la vez (ej. 'MCO', 'DC') y ubicación (Comunas).
- **Actualizar (Update)**: Los usuarios pueden editar sus estadísticas y preferencias en tiempo real desde su perfil.
- **Eliminar (Delete)**: Los usuarios pueden borrar su cuenta de forma permanente, lo que elimina en cascada sus credenciales en H2 y su documento en MongoDB.

## Instalación y Uso (Guía de Ejecución)

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/Canopuss/RecochApp.git
   ```

2. **Ejecuta el Backend (Spring Boot)**:
   Abre una terminal, navega a la carpeta del backend y usa Maven para iniciar el servidor. 
   *(Nota: Asegúrate de estar dentro de la carpeta `backend` antes de ejecutar el comando)*
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   *El servidor se iniciará en el puerto `3001` (http://localhost:3001) y un script automático (`DataSeeder`) insertará a 10 jugadores de prueba (ej. Carlos Valderrama, Radamel Falcao) en la colección de MongoDB.*

3. **Inicia el Frontend**:
   Puedes abrir directamente el archivo `frontend/index.html` en tu navegador para ver la interfaz, o usar una extensión como *Live Server* en VSCode.

4. **Prueba el sistema**:
   - Ingresa a la sección de "Registro" y crea tu cuenta.
   - Accede a "Buscar Jugadores" para probar los filtros y consultar la base de datos NoSQL.
  
5. **Imagenes del proyecto**
   <img width="1917" height="992" alt="image" src="https://github.com/user-attachments/assets/a0c04c61-387d-481f-a1b4-530eabbfd1c9" />
   <img width="1917" height="992" alt="image" src="https://github.com/user-attachments/assets/f95747a6-781e-48ca-bdc9-3a0fce638ed5" />
   <img width="1917" height="992" alt="image" src="https://github.com/user-attachments/assets/bd631000-8a46-4c3e-8066-95addcc3d7bd" />
   <img width="1917" height="992" alt="image" src="https://github.com/user-attachments/assets/385c8735-6f82-4714-8dba-3fbf2d43f8a6" />
   <img width="1917" height="992" alt="image" src="https://github.com/user-attachments/assets/2952a1fd-d49a-46f2-91df-667b13c61024" />
   <img width="1917" height="992" alt="image" src="https://github.com/user-attachments/assets/cc10c1fb-6490-4412-b45f-1af6c172b1d7" />
   <img width="1917" height="992" alt="image" src="https://github.com/user-attachments/assets/12dbe1fa-b034-4451-9bec-dfad78a60705" />
   <img width="1917" height="992" alt="image" src="https://github.com/user-attachments/assets/782123db-d449-4c01-9807-55fcc5fc193a" />







---
© 2026 Recochapp Team
