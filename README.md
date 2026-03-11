# RecochApp

Bitacora de entrega RecochApp

# RecochApp - Sistema de Gestión para Fútbol Aficionado

## 1. Justificación y Pertinencia
[cite_start]El fútbol aficionado es un fenómeno social masivo que carece de herramientas para profesionalizar la experiencia del jugador amateur[cite: 117]. [cite_start]La mayoría de los grupos gestionan sus estadísticas de forma rudimentaria en chats o hojas de cálculo[cite: 118]. [cite_start]**RecochApp** busca aumentar la retención y el compromiso integrando un sistema de comparación con jugadores profesionales (FIFA/EA Sports)[cite: 119, 120].

## 2. Mundo del Problema
Identificamos tres problemas críticos en el ecosistema recreativo:
* [cite_start]**Informalidad de datos:** No existe un registro histórico confiable del rendimiento[cite: 123].
* [cite_start]**Falta de incentivos:** Ausencia de reconocimiento tangible del progreso tras finalizar temporadas[cite: 124, 125].
* [cite_start]**Desconexión digital:** Los jugadores no ven reflejadas sus habilidades bajo estándares métricos profesionales[cite: 126].

## 3. Especificaciones Técnicas

### Requerimientos Funcionales Destacados
* [cite_start]**RF01/02:** Registro de usuarios y gestión de clubes o grupos de amigos[cite: 129, 130].
* [cite_start]**RF04/05:** Carga de estadísticas básicas (goles, asistencias) y avanzadas (pases clave, recuperaciones)[cite: 132, 133].
* [cite_start]**RF08/09:** Algoritmo de comparación amateur vs. profesional y cálculo de "Valor de Mercado"[cite: 136, 137].
* [cite_start]**RF11/12:** Generación de "Tarjeta FIFA" personalizada con eliminación de fondo en la fotografía[cite: 139, 140].

### Requerimientos No Funcionales
* [cite_start]**Seguridad:** Encriptación de contraseñas mediante algoritmos como BCrypt[cite: 151].
* [cite_start]**Rendimiento:** Consultas de comparación con tiempo de respuesta menor a 10 segundos[cite: 153].
* [cite_start]**Escalabilidad:** Capacidad inicial para 500 usuarios concurrentes[cite: 155].
* [cite_start]**Disponibilidad:** Sistema activo el 99.5% del tiempo[cite: 152].

---

## 4. Diseño de Base de Datos (Relacional)

### Entidades y Atributos
* [cite_start]**Usuario (User):** Información de acceso y perfil básico[cite: 216].
    * [cite_start]`id_usuario` (PK), `email`, `password`, `nombre_completo`, `foto_perfil`[cite: 217, 218, 219, 220, 221].
* [cite_start]**Jugador (Player):** Perfil técnico y físico[cite: 222].
    * [cite_start]`id_jugador` (PK, FK), `estatura`, `peso`, `pierna_habil`, `valor_mercado`, `id_fifa_referencia`[cite: 223, 224, 225, 226].
* [cite_start]**Club / Equipo (Club):** Grupos organizados[cite: 227].
    * [cite_start]`id_club` (PK), `nombre_club`, `codigo_invitacion`, `id_capitan` (FK)[cite: 228, 229, 230, 231].
* [cite_start]**Partido (Match):** Encuentros programados[cite: 232].
    * [cite_start]`id_partido` (PK), `fecha`, `lugar`, `estado` (Abierto/Cerrado), `id_mvp` (FK)[cite: 233, 234, 235, 236].
* [cite_start]**Estadística (Statistic):** Rendimiento por partido[cite: 237].
    * [cite_start]`id_stat` (PK), `goles`, `asistencias`, `faltas`, `pases_clave`, `recuperaciones`, `paradas`[cite: 238, 239].

### Relaciones del Sistema
1. [cite_start]**Membresía (N:M):** Un jugador puede pertenecer a múltiples clubes y viceversa[cite: 241].
2. [cite_start]**Participación (N:M):** Registro de asistencia de jugadores a partidos específicos[cite: 242].
3. [cite_start]**Registro (1:N):** Un partido genera múltiples registros de estadísticas (uno por cada jugador)[cite: 243].

---

## 5. Gestión del Proyecto
* [cite_start]**Herramienta de Seguimiento:** Taiga[cite: 209].
* [cite_start]**Control de Versiones:** Git (GitHub)[cite: 211, 212].
* [cite_start]**Próxima Entrega:** 11 de Marzo[cite: 207].
