# RecochApp

Bitacora de entrega RecochApp


INFORME INICIAL DE PROYECTO: SPRING BOOT












Nombre del proyecto: RecochApp
    • Ricardo Andrés López Tarazona – Código: 2201710
    • Santiago Ortega Veloza – Código: 2220032
    • Juan Diego Herrera Cáceres – Código: 2151316



Entornos de Programación F1
Carlos Adolfo Beltran Castro
Escuela de Ingeniería de sistemas e informatica
 2026


1. Justificación y Pertinencia
El fútbol aficionado es un fenómeno social masivo, pero carece de herramientas que profesionalicen la experiencia del jugador amateur. La mayoría de los grupos gestionan sus estadísticas de forma rudimentaria (chats de WhatsApp o hojas de cálculo).
Este proyecto aumenta la retención de los jugadores y el compromiso con el deporte. Al integrar un sistema de comparación con jugadores profesionales (FIFA/EA Sports), se ofrece un valor agregado emocional y competitivo único, transformando datos planos en una experiencia visual que es altamente compartible en redes sociales.
2. Mundo del Problema
En el ecosistema del fútbol recreativo, identificamos tres problemas críticos:
    1. Informalidad de datos: No existe un registro histórico confiable del rendimiento individual.
    2. Falta de incentivos: Tener reconocimiento tangible de las estadísticas del jugador. Tras finalizar una temporada o torneo, no hay un reconocimiento tangible del progreso del jugador.
 
    3. Desconexión con la cultura digital: Los jugadores consumen contenido fútbol profesional, y hablan de jugadores y equipos y sus estadísticas, pero no ven reflejadas sus propias habilidades bajo esos mismos estándares métricos.
3. Requerimientos Funcionales
Los "qué" debe hacer el sistema.
    1. RF01: Registro e inicio de sesión de usuarios (Jugadores y Administradores).
    2. RF02: Creación y gestión de "Clubes" o grupos de amigos.
    3. RF03: Registro de partidos (fecha, lugar, equipos).
    4. RF04: Carga de estadísticas básicas por partido (Goles, asistencias, faltas).
    5. RF05: Registro de estadísticas avanzadas (Pases clave, recuperaciones, paradas).
    6. RF06: Sistema de votación para el "MVP" (Jugador del partido).
    7. RF07: Integración de API (o base de datos) con stats reales de jugadores FIFA.
    8. RF08: Algoritmo de comparación de métricas amateur vs. profesionales.
    9. RF09: Cálculo automático de "Valor de Mercado" basado en rendimiento.
    10. RF10: Generación de perfil de jugador con historial de progresión.
    11. RF11: Formato para la "Tarjeta FIFA" personalizada.
    12. RF12: Carga de fotografía de perfil con eliminación de fondo para la tarjeta.
    13. RF13: Exportación de la tarjeta en formato PNG/JPG.
    14. RF14: Tablas de clasificación (Leaderboards) dentro del grupo.
    15. RF15: Gestión de temporadas (Inicio y cierre de ciclos de stats).
    16. RF16: Buscador de jugadores dentro de la plataforma.
    17. RF17: Sistema de roles y permisos (Capitán vs. Jugador).
    18. RF18: Módulo de avisos del grupo.
    19. RF19: Configuración de atributos físicos (Estatura, peso, pierna hábil).
    20. RF20: Dashboard de administración para validar resultados de partidos.
4. Requerimientos No Funcionales 
Los "cómo" debe ser el sistema.
    1. RNF01 (Seguridad): Protección de datos personales. / Encriptación de contraseñas mediante algoritmos como BCrypt.
    2. RNF02 (Disponibilidad): El sistema debe estar activo el 99.5% del tiempo.
    3. RNF03 (Rendimiento): Las consultas de comparación no deben tardar más de 10 segundos.
    4. RNF04 (Usabilidad): Diseño responsivo para uso en canchas.
    5. RNF05 (Escalabilidad): Capacidad para soportar hasta 500 usuarios concurrentes, con proyecciones de escalar hasta 10.000 usuarios.
    6. RNF06 (Mantenibilidad): Código documentado.
    7. RNF07 (Interoperabilidad): API RESTful para posibles integraciones futuras.
    8. RNF08 (Localización): Soporte inicial en español. Con proyección futura a soporte en inglés.
    9. RNF09 (Privacidad): 
    10. RNF10 (Estética): Interfaz gráfica inspirada en la estética de EA Sports.
    11. RNF11 (Portabilidad): Compatible con navegadores Chrome, Safari y Firefox.
    12. RNF12 (Integridad): Los datos de partidos cerrados no podrán ser modificados sin auditoría (solo el líder de cada club)
    13. RNF13 (Concurrencia): Manejo de estados para evitar duplicidad en la carga de goles.
    14. RNF14 (Resiliencia): Copias de seguridad automáticas cada 3 días.
    15. RNF15 (Eficiencia): Optimización de imágenes para carga rápida en móviles.
    16. RNF16 (Accesibilidad): Cumplimiento con niveles básicos de WCAG 2.1.
    17. RNF17 (Robustez): Validación estricta de formularios para evitar inyecciones SQL.
    18. RNF18 (Tolerancia a fallos): Mensajes de error claros y no técnicos para el usuario.
    19. RNF19 (Despliegue): Configuración de integración continua (CI/CD).
    20. RNF20 (Auditoría): Registro de logs de acciones críticas (cambios de roles, borrado de stats).
5. Historias de Usuario 
Formato: Como [Rol], quiero [Acción] para [Beneficio].
    1. HU01: Como Jugador, quiero registrarme para tener un perfil personal.
    2. HU02: Como Capitán, quiero crear un equipo para organizar a mis amigos.
    3. HU03: Como Administrador, quiero crear un partido para habilitar la carga de datos.
    4. HU04: Como Jugador, quiero ver mis goles acumulados para seguir mi progreso.
    5. HU05: Como Jugador, quiero compararme con Lucho Díaz para ver qué tan cerca estoy de su nivel de recuperación.
    6. HU06: Como Jugador, quiero subir mi foto para que aparezca en mi tarjeta FIFA.
    7. HU07: Como Capitán, quiero asignar goles a mis compañeros para cerrar el acta del partido.
    8. HU08: Como Jugador, quiero ver el ranking de goleadores de mi grupo para competir por el primer puesto.
    9. HU09: Como Jugador, quiero descargar mi tarjeta para compartirla en Instagram.
    10. HU10: Como Invitado, quiero buscar el perfil de un amigo para ver sus estadísticas.
    11. HU11: Como Jugador, quiero recibir una notificación cuando se publique el MVP del partido.
    12. HU12: Como Jugador, quiero ver mi "valor de mercado" subir si tengo una buena racha.
    13. HU13: Como Capitán, quiero editar la información del equipo para mantenerla actualizada.
    14. HU14: Como Jugador, quiero filtrar jugadores FIFA por posición para encontrar comparaciones precisas.
    15. HU15: Como Administrador, quiero editar/eliminar/cancelar un partido cargado por error para mantener la integridad de la liga.
    16. HU16: Como Jugador, quiero ver gráficas de mi rendimiento en los últimos 5 partidos.
    17. HU17: Como Jugador, quiero elegir el diseño de mi tarjeta (Oro, Plata, Icono) según mis logros.
    18. HU18: Como Capitán, quiero invitar a amigos mediante un enlace para que se unan al equipo.
    19. HU19: Como Jugador, quiero registrar mi pierna hábil para que se refleje en mis debilidades/fortalezas.
    20. HU20: Como Jugador, quiero recuperar mi contraseña por correo en caso de olvido.





Enfoque a las estadisticas de cada equipo.
Usuario, jugador, capitan, admin
capitan crea equipo / inscribe torneos / crea partido
jugador tiene estadisticas 
jugador se une a partidos
capacidad del partido??
Crear torneos:
“Admin” crea torneo
capitan inscribe equipo
jugador se inscribe al partido
LINK invitación partido. 
capitan agrega jugadores
invitado se une a partido
inscribirse a equipos

Siguiente entrega: 11 de Marzo
Readme - Bitacora en repositorio, con versionamiento.
programa - Taiga - 
    • DB relacional, front JS generico, diagrama entidad relacion.
    • En el controlador de versiones presentar la primera y la segunda entrega
    • usando GIT, 

ENTIDAD RELACION

Modelo Entidad-Relación y Estructura SQL
1. Entidades y Atributos
    • Usuario (User): Contiene la información de acceso y perfil básico.
        ◦ id_usuario: Identificador único (PK).
        ◦ email: Correo electrónico del usuario.
        ◦ password: Contraseña encriptada (BCrypt).
        ◦ nombre_completo: Nombre del jugador.
        ◦ foto_perfil: Ruta de la imagen para la tarjeta FIFA.
    • Jugador (Player): Perfil técnico y físico del usuario.
        ◦ id_jugador: (PK, FK de Usuario).
        ◦ estatura, peso, pierna_habil.
        ◦ valor_mercado: Cálculo basado en rendimiento.
        ◦ id_fifa_referencia: ID del jugador profesional para comparación.
    • Club / Equipo (Club): Grupos de amigos organizados.
        ◦ id_club: (PK).
        ◦ nombre_club.
        ◦ codigo_invitacion: Enlace único para unirse.
        ◦ id_capitan: (FK a Jugador).
    • Partido (Match): Encuentros programados por el club.
        ◦ id_partido: (PK).
        ◦ fecha, lugar.
        ◦ estado: Abierto o Cerrado.
        ◦ id_mvp: (FK a Jugador) Ganador de la votación.
    • Estadistica (Statistic): Datos de rendimiento por partido.
        ◦ id_stat: (PK).
        ◦ goles, asistencias, faltas, pases_clave, recuperaciones, paradas.

2. Relaciones del Sistema
    • Membresia (Jugador - Club): Un jugador puede estar en muchos clubes y un club tiene muchos jugadores (N:M).
    • Participacion (Jugador - Partido): Relación que registra qué jugadores asistieron a qué partido (N:M).
    • Registro (Partido - Estadistica): Un partido genera múltiples registros de estadísticas, uno por cada jugador participante (1:N).
