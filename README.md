# RecochApp

Bitacora de entrega RecochApp

# RecochApp - Sistema de Gestión para Fútbol Aficionado

# Informe Inicial de Proyecto: RecochApp (Spring Boot)

## 1. Justificación y Pertinencia
El fútbol aficionado es un fenómeno social masivo, pero carece de herramientas que profesionalicen la experiencia del jugador amateur. La mayoría de los grupos gestionan sus estadísticas de forma rudimentaria mediante chats de WhatsApp o hojas de cálculo. 

**RecochApp** ofrece un valor agregado emocional y competitivo único al integrar un sistema de comparación con jugadores profesionales (FIFA/EA Sports), transformando datos planos en una experiencia visual altamente compartible en redes sociales.

## 2. Mundo del Problema
En el ecosistema del fútbol recreativo, identificamos tres problemas críticos:
* **Informalidad de datos:** No existe un registro histórico confiable del rendimiento individual.
* **Falta de incentivos:** Ausencia de un reconocimiento tangible del progreso tras finalizar temporadas.
* **Desconexión digital:** Los jugadores consumen contenido profesional pero no ven sus propias habilidades reflejadas bajo esos mismos estándares métricos.

## 3. Especificaciones del Sistema

### Requerimientos Funcionales (RF)
* **Gestión de Usuarios:** Registro e inicio de sesión con roles de Jugador, Capitán y Administrador.
* **Gestión de Clubes:** Creación de grupos de amigos y administración de "Clubes".
* **Registro de Partidos:** Control de fecha, lugar y carga de estadísticas (Goles, asistencias, faltas, pases clave y paradas).
* **Gamificación:** Sistema de votación para el "MVP", algoritmo de comparación con stats de FIFA y cálculo automático de "Valor de Mercado".
* **Tarjeta FIFA:** Generación y exportación de tarjetas personalizadas (PNG/JPG) con eliminación de fondo.

### Requerimientos No Funcionales (RNF)
* **Seguridad:** Protección de datos y encriptación de contraseñas mediante **BCrypt**.
* **Rendimiento:** Consultas de comparación optimizadas para no tardar más de 10 segundos.
* **Diseño:** Interfaz responsiva inspirada en la estética de **EA Sports**.
* **Integridad:** Validación estricta de formularios para evitar inyecciones SQL y auditoría de cambios en partidos cerrados.

---

## 4. Diseño de Base de Datos (Relacional)

### Entidades y Atributos Principales
* **Usuario (User):** `id_usuario` (PK), `email`, `password`, `nombre_completo`, `foto_perfil`.
* **Jugador (Player):** `id_jugador` (PK, FK), `estatura`, `peso`, `pierna_habil`, `valor_mercado`, `id_fifa_referencia`.
* **Club / Equipo (Club):** `id_club` (PK), `nombre_club`, `codigo_invitacion`, `id_capitan` (FK).
* **Partido (Match):** `id_partido` (PK), `fecha`, `lugar`, `estado` (Abierto/Cerrado), `id_mvp` (FK).
* **Estadística (Statistic):** `id_stat` (PK), `goles`, `asistencias`, `faltas`, `pases_clave`, `recuperaciones`, `paradas`.



### Relaciones del Sistema
* **Membresía (N:M):** Los jugadores pueden pertenecer a múltiples clubes mediante un código de invitación.
* **Participación (N:M):** Registro de qué jugadores se unen a cada partido específico.
* **Registro de Stats (1:N):** Cada partido genera un desglose de estadísticas individuales para los participantes.

---

## 5. Gestión y Entregas
* **Próxima Entrega:** 11 de Marzo.
* **Herramientas:** Taiga (Gestión), Git (Versionamiento), Spring Boot (Backend).
* **Entregables:** Repositorio con README actualizado, Bitácora y Diagrama Entidad-Relación.
