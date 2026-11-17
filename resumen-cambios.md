# Resumen de cambios de la web

## 1. Cada persona ve y hace solo lo que le corresponde

**Antes:** el profesional veía todos los casos del sistema y podía hacer lo mismo que el consejero. El administrador también podía modificar solicitudes.

**Ahora:**
- **Consejero:** recibe las solicitudes, las clasifica, asigna al profesional y puede cerrar casos.
- **Profesional:** ve solo los casos que le asignaron. Agenda citas, escribe observaciones y puede cerrar casos.
- **Administrador:** consulta todo y puede cerrar casos y leer las observaciones. No modifica nada más.

**Por qué:** cada caso lo ve solo quien lo atiende, lo que protege la privacidad de los estudiantes. Además, cada persona tiene una función clara y nadie cambia el trabajo de otro por error.

## 2. Las observaciones del profesional son más reservadas

**Antes:** las observaciones de seguimiento las podían ver y escribir varios perfiles, y no estaba claro qué eran.

**Ahora:** el profesional las escribe y solo el administrador las lee. Aparecen marcadas como "Observación", con el nombre de quien la escribió.

**Por qué:** son información delicada, y así quedan en manos de quien supervisa.

## 3. Talleres más ordenados

**Antes:** cualquier rol podía crear talleres e inscribir gente. Un estudiante podía inscribirse varias veces en el mismo taller.

**Ahora:**
- Solo el profesional y el administrador organizan talleres.
- Solo los estudiantes se inscriben, una única vez por taller.
- Antes de inscribirse aparece una ventana de confirmación que avisa que se notificará al equipo de bienestar.
- Si ya estás inscrito, el botón lo indica.

**Por qué:** los cupos reflejan la realidad, el estudiante confirma antes de inscribirse y nadie inscribe a otro.

## 4. Derivaciones más claras (docente)

**Antes:** el docente escribía las iniciales del estudiante a mano. El estudiante nunca se enteraba de que había un caso a su nombre. El docente tampoco podía revisar lo que había enviado, y veía un botón "Derivar estudiante" que no servía. Además, el consejero podía registrar solicitudes por su cuenta, aunque eso corresponde al docente y al estudiante.

**Ahora:**
- El docente elige al estudiante desde una lista de personas registradas, y el caso aparece en la cuenta de ese estudiante.
- Si el estudiante no está en la lista, puede escribir su nombre. Un aviso sugiere agregar su correo para que el equipo lo contacte.
- El docente tiene un botón "Ver detalle" en cada derivación, sin ver el seguimiento interno del equipo.
- Se quitó el botón repetido de la barra superior.
- El consejero ya no registra solicitudes: llegan solo de los estudiantes y de los docentes, y él las revisa, clasifica y asigna.
- El administrador puede crear cuentas de estudiante.

**Por qué:** el estudiante se entera de que tiene un caso y puede seguirlo. Además, no se pierde ninguna derivación por falta de registro.

## 5. Ventanas más fáciles de usar

**Antes:** las ventanas eran planas, sin iconos. En el detalle de solicitud el botón "Asignar" se salía de la ventana, y un color amarillo muy fuerte molestaba a la vista.

**Ahora:** las ventanas tienen iconos, secciones separadas y botones siempre visibles abajo. El detalle de solicitud se divide en tarjetas ordenadas, y el botón "Asignar" queda dentro. El amarillo se reemplazó por un crema suave.

**Por qué:** se entiende de un vistazo qué hay en cada parte y qué se puede hacer. La acción principal siempre está a la vista.

## 6. Listas e indicadores más fáciles de leer

**Antes:**
- La lista de solicitudes estaba ordenada por urgencia, sin importar qué tan nuevas fueran.
- El "tiempo promedio de asignación" mostraba cifras enormes, de más de 300 horas.
- La bitácora tenía una columna llamada "Entidad" con códigos que nadie entendía.

**Ahora:**
- Las solicitudes aparecen de la más reciente a la más antigua.
- El tiempo de asignación se muestra con un valor más realista ("3 h", "2 días") y una explicación debajo: el tiempo entre que llega una solicitud y se le asigna un profesional.
- La bitácora usa "Elemento afectado" y muestra nombres, como "Solicitud de M.P.G.", con una explicación arriba.

**Por qué:** lo nuevo se encuentra primero y los números dicen algo útil. La bitácora sirve de verdad para saber quién hizo qué.

## 7. Pequeñas correcciones

**Antes:**
- Al cerrar un caso sin escribir el motivo, la ventana se cerraba igual y se perdía lo escrito.
- Se podían agendar citas y crear talleres con fechas ya pasadas.
- El administrador podía desactivar su propia cuenta y quedar sin acceso.

**Ahora:** la ventana queda abierta hasta que el cierre sea válido. Las fechas deben ser futuras. Nadie puede desactivar su propia cuenta.

**Por qué:** evita errores de digitación y bloqueos accidentales.

## 8. Nueva imagen en la página de inicio

**Antes:** el inicio mostraba una foto cuadrada de estudiantes. Una foto horizontal habría quedado cortada.

**Ahora:** se muestra la foto de la profesional conversando con una estudiante al aire libre, y el marco se adapta a ella para verse completa.

**Por qué:** transmite cercanía y confianza, y no se corta a nadie.

## 9. Tarjeta de bienvenida según el rol

**Antes:** al entrar, cada persona veía directo su pantalla, sin saludo ni explicación de su rol.

**Ahora:** arriba de la pantalla principal hay una tarjeta fija con:
- La imagen del rol (estudiante, consejero, profesional, profesor o administrador).
- "Hola" y el nombre de quien inició sesión.
- Una etiqueta con su rol.
- Una breve definición del rol, por ejemplo: "El consejero es la persona que…".

Se ve en "Mis solicitudes" (estudiante), "Derivar estudiante" (profesor) y "Panorama general" (consejero, profesional y administrador). No desaparece ni pide hacer clic.

**Por qué:** quien entra por primera vez entiende de inmediato cuál es su lugar en la red y en qué se diferencia de los otros roles.

## Pendientes

- Las inscripciones anteriores a estos cambios no registran quién se inscribió, así que esos estudiantes podrían inscribirse una vez más.
- El aviso de inscripción es un mensaje en pantalla, no un correo, porque el proyecto no tiene envío de correos.
- Los permisos se controlan en la pantalla, no en el servidor. Para blindarlos del todo haría falta un sistema de inicio de sesión real.
- Todo se revisó solo con una comprobación básica de los archivos, nunca con la app corriendo, así que conviene probarlo completo.
