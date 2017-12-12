# About the `tasks` folder

The `tasks` directory is a suite of Grunt tasks and their configurations, bundled for your convenience.  The Grunt integration is mainly useful for bundling front-end assets, (like stylesheets, scripts, & markup templates) but it can also be used to run all kinds of development tasks, from browserify compilation to database migrations.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, read on!


### How does this work?

The asset pipeline bundled in Sails is a set of Grunt tasks configured with conventional defaults designed to make your project more consistent and productive.

The entire front-end asset workflow in Sails is completely customizable-- while it provides some suggestions out of the box, Sails makes no pretense that it can anticipate all of the needs you'll encounter building the browser-based/front-end portion of your application.  Who's to say you're even building an app for a browser?



### What tasks does Sails run automatically?

Sails runs some of these tasks (the ones in the `tasks/register` folder) automatically when you run certain commands.

###### `sails lift`

Runs the `default` task (`tasks/register/default.js`).

###### `sails lift --prod`

Runs the `prod` task (`tasks/register/prod.js`).

###### `sails www`

Runs the `build` task (`tasks/register/build.js`).

###### `sails www --prod` (production)

Runs the `buildProd` task (`tasks/register/buildProd.js`).


### Can I customize this for SASS, Angular, client-side Jade templates, etc?

You can modify, omit, or replace any of these Grunt tasks to fit your requirements. You can also add your own Grunt tasks- just add a `someTask.js` file in the `grunt/config` directory to configure the new task, then register it with the appropriate parent task(s) (see files in `grunt/register/*.js`).


### Do I have to use Grunt?

Nope! To disable Grunt integration in Sails, just delete your Gruntfile or disable the Grunt hook.


### Comentarios con Javier
- posibilidad de fundir o merge de tareas
- asignar responsable según la lista de participantes
- mail semanal con TODO por persona y resto del equipo, con el último comentario
# MVP GANTT
- Fecha de inicio, duración, responsable
- Si están vigentes, fondo verde claro
- en rojo las vencidas
- ordenadas por fecha de inicio
- completadas al fondo
- boton de finalizada y status
- comentarios como lo llevamos ahora

# CASOS DE USO DE LA HERRAMIENTA
- Ingresar con usuario y contrseña
- _ver lista de proyectos_:
    - mis proyectos
    - proyectos en los que participo
    - proyectos en los que estoy invitado
    - cada proyecto tiene una serie de indicadores de avance: se hizo e el project charter? los stakeholders? etc.
    - % de avance de la gantt de cada proyecto
- CRUD de proyectos
- _trabajar un proyecto (Project Charter):_
    - Definir nombre, descripción, alcance, antecedentes (texto libre, uni o multilinea)
    - asignar uno o más sponsors: nombre y correo. CRUD
    - asignar uno o más hitos: cada hito tiene texto+fecha. CRUD
    - asignar uno o más objetivos: cada objetivo tiene descripción, fórmula, meta. CRUD
    - asignar uno o más miembros del equipo (personas)
    - acceder desde el proyecto a las páginas de:
        - EDT, estructura de desglose de trabajo
        - Stakeholders y plan de comunicación
        - Riesgos
        - Carta Gantt
-_trabajar la EDT_:
    - trae del project charter la lista de OBJETIVOS
    - Permite asignar a cada objetivo una o más TAREAS (solo texto). CRUD.
-_trabajar stakeholders y plan de comm_:
    - trae de EDT las TAREAS.
    - permite asignar a cada tarea uno o más Stakeholders+plan de comunicación+mail (texto, texto, email)
 -_trabajar riesgos y plan de mitigación_:
    - trae los stakeholders de la otra tabla
    - permite asignar a cada stakeholder uno o más riesgos+ímpacto+plan de mitigación (texto, texto, texto)
-_trabajar carta GANTT_:
    - trae planes de comunicación de tabla de stakeholders
    - trae planes de mitigación de riesgos de donde corresponde
    - trae tareas de la EDT
    - permite determinar la escala de tiempo (de una lista desplegable)
    - permite asignar a cada item: 
        - responsable (de entre los miembros del equipo)
        - duración (numero)
        - fecha de inicio
        - uno o más comentarios de avance
        - estado (no iniciado, en proceso, finalizado)