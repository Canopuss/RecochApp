# RecochApp

Bitacora de entrega RecochApp

# RecochApp - Sistema de Gestión para Fútbol Aficionado

## 1. Justificación y Pertinencia
El fútbol aficionado es un fenómeno social masivo, pero carece de herramientas que profesionalicen la experiencia del jugador amateur. La mayoría de los grupos gestionan sus estadísticas de forma rudimentaria (chats de WhatsApp o hojas de cálculo).

Este proyecto aumenta la retención de los jugadores y el compromiso con el deporte. Al integrar un sistema de comparación con jugadores profesionales (FIFA/EA Sports), se ofrece un valor agregado emocional y competitivo único, transformando datos planos en una experiencia visual que es altamente compartible en redes sociales.

## 2. Mundo del Problema
En el ecosistema del fútbol recreativo, identificamos tres problemas críticos:
* **Informalidad de datos:** No existe un registro histórico confiable del rendimiento individual.
* **Desconexión con la cultura digital:** Los jugadores consumen contenido de fútbol profesional, hablan de estadísticas de sus ídolos, pero no ven reflejadas sus propias habilidades bajo esos mismos estándares métricos.

## 3. Requerimientos Funcionales (RF)
* **RF01:** Registro e inicio de sesión de usuarios (Jugadores y Administradores).
* **RF02:** Creación y gestión de "Clubes" o grupos de amigos.
* **RF03:** Registro de partidos (fecha, lugar, equipos).
* **RF04:** Carga de estadísticas básicas por partido (Goles, asistencias, faltas).
* **RF11:** Formato para la "Tarjeta FIFA" personalizada.
* **RF12:** Carga de fotografía de perfil con eliminación de fondo para la tarjeta.
* **RF13:** Exportación de la tarjeta en formato PNG/JPG.
* **RF14:** Tablas de clasificación (Leaderboards) dentro del grupo.
* **RF16:** Buscador de jugadores dentro de la plataforma.
* **RF17:** Sistema de roles y permisos (Capitán vs. Jugador).
* **RF18:** Módulo de avisos del grupo.

## 4. Requerimientos No Funcionales (RNF)
* **RNF01 (Seguridad):** Protección de datos personales y encriptación de contraseñas mediante algoritmos como BCrypt.
* **RNF02 (Disponibilidad):** El sistema debe estar activo el 99.5% del tiempo.
* **RNF03 (Rendimiento):** Las consultas de comparación no deben tardar más de 10 segundos.
* **RNF04 (Usabilidad):** Diseño responsivo para uso en canchas.
* **RNF05 (Escalabilidad):** Capacidad para soportar hasta 500 usuarios concurrentes, escalable a 10.000.
* **RNF10 (Estética):** Interfaz gráfica inspirada en la estética de EA Sports.
* **RNF12 (Integridad):** Los datos de partidos cerrados no podrán ser modificados sin auditoría.
* **RNF17 (Robustez):** Validación estricta de formularios para evitar inyecciones SQL.
* **RNF20 (Auditoría):** Registro de logs de acciones críticas (cambios de roles, borrado de stats).

## 5. Historias de Usuario
* **HU01:** Como Jugador, quiero registrarme para tener un perfil personal.
* **HU02:** Como Capitán, quiero crear un equipo para organizar a mis amigos.
* **HU03:** Como Administrador, quiero crear un partido para habilitar la carga de datos.
* **HU04:** Como Jugador, quiero ver mis goles acumulados para seguir mi progreso.
* **HU06:** Como Jugador, quiero subir mi foto para que aparezca en mi tarjeta FIFA.
* **HU08:** Como Jugador, quiero ver el ranking de goleadores de mi grupo para competir por el primer puesto.
* **HU09:** Como Jugador, quiero descargar mi tarjeta para compartirla en Instagram.
* **HU13:** Como Capitán, quiero editar la información del equipo para mantenerla actualizada.
* **HU17:** Como Jugador, quiero elegir el diseño de mi tarjeta (Oro, Plata, Icono) según mis logros.
* **HU18:** Como Capitán, quiero invitar a amigos mediante un enlace para que se unan al equipo.

---

## 6. Modelo Entidad-Relación

### Entidades y Atributos
* **Usuario (User):** Información de acceso.
    * `id_usuario` (PK), `email`, `password`, `nombre_completo`, `foto_perfil`.
* **Jugador (Player):** Perfil técnico y físico.
    * `id_jugador` (PK, FK), `estatura`, `peso`, `pierna_habil`, `valor_mercado`, `id_fifa_referencia`.
* **Club / Equipo (Club):** Grupos de amigos organizados.
    * `id_club` (PK), `nombre_club`, `codigo_invitacion`, `id_capitan` (FK).
* **Partido (Match):** Encuentros programados por el club.
    * `id_partido` (PK), `fecha`, `lugar`, `estado`, `id_mvp` (FK).
* **Estadística (Statistic):** Datos de rendimiento por partido.
    * `id_stat` (PK), `goles`, `asistencias`, `faltas`, `pases_clave`, `recuperaciones`, `paradas`.



### Relaciones del Sistema
* **Membresía (Jugador - Club):** Relación muchos a muchos (**N:M**). Un jugador puede estar en muchos clubes y un club tiene muchos jugadores.
* **Participación (Jugador - Partido):** Relación muchos a muchos (**N:M**) que registra qué jugadores asistieron a qué partido.
* **Registro (Partido - Estadística):** Relación uno a muchos (**1:N**). Un partido genera múltiples registros de estadísticas, uno por cada jugador participante.
