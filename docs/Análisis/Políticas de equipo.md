<div style={{ display: 'flex' }}>
  <img src="/img/TalentLOGO.png" alt="Imagen 1" style={{ width: '50%', height: 'auto' }} />
  <img src="/img/USLOGO.png" alt="Imagen 2" style={{ width: '30%', height: '30%' }} />
</div>

## <center>Ingeniería del Software y Práctica Profesional - Universidad de Sevilla</center>

BERMEJO SORIA, CARLOS

CASAL FERRERO, RUBÉN

DOMÍNGUEZ RUIZ. ANDRÉS

DOMÍNGUEZ-ADAME RUIZ. ALBERTO

FERNÁNDEZ CASTILLO, JAVIER

GALLARDO MARTOS, DANIEL

HERRERA RAMIREZ, ISMAEL

IZQUIERDO LAVADO, MARIO

MATEOS GÓMEZ, FERNANDO JOSÉ

MERINO PALMA, ALEJANDRO JOSÉ

MONTERO MARTÍNEZ, FRANCISCO JESÚS

LÓPEZ MOYANO, ROCÍO

OTERO BARBASÁN, MANUEL

VILAPLANA DE TRÍAS, FRANCISCO DAVID

ZARZUELA REINA, CARLOS



### Entregable: S1
### Grupo 01 (Mañana) - IT Talent


###  <a name="_z05qqri5g3tk"></a>Control de Versiones

|**Versión**|**Fecha**|**Autor**|**Cambios**|
| :- | :- | :- | :- |
|v1.0|02/02/2024|Carlos Bermejo Soria|Documento inicial|
|v.1.1|02/02/2024|Rubén Casal Ferrero|Finalización Documento|
|v.1.2|03/02/2024|Carlos Bermejo Soria|Revisión Documento|
|v.1.3|05/02/2024|Rubén Casal Ferrero|Añadir Comunicaciones|

## <a name="_lj1qgmxpo5ez"></a>**Resumen del documento**
<a name="_30j0zll"></a>La intención principal del documento es concentrar y especificar las políticas de trabajo que el equipo deberá seguir para trabajar en concordancia con lo establecido. En un proyecto software de esta magnitud es fundamental que los equipos de trabajo se coordinen  y funcionen bajo unas mismas directrices. Se pretende que las políticas sean estrictas pero no restrictivas y que, en todo caso, faciliten el trabajo de todos los miembros del equipo y, en especial, su coordinación con el resto de miembros. Las políticas de trabajo están especialmente relacionadas con la gestión y la integración del trabajo del equipo.

Los principales temas a tratar en el documento son los siguientes:

- Políticas de *commit*
- Políticas de GitHub
- Políticas de gestión del tiempo



# <a name="_1fob9te"></a>
#
#
# <a name="_k51xz950apj4"></a><a name="_ug1jcmvg7r12"></a><a name="_9j8c07fxd5sy"></a>Índice

[**Sevilla, Enero 2024	2**](#_pg8quxt9d0oa)**

[**Control de Versiones	3**](#_z05qqri5g3tk)

[Resumen del documento	3](#_lj1qgmxpo5ez)

[**Índice	4**](#_9j8c07fxd5sy)

[**1. Introducción	5**](#_3znysh7)

[**2. Política de commits	5**](#_tqwj0ctwchnr)

[2.1. Conventional Commits	5](#_tyjcwt)

[2.2. Idioma de los commits	6](#_j1l1qmoevvfq)

[**3. Gestión del proyecto en GitHub	6**](#_qzsn0uchybcq)

[3.1. Tablero de proyecto	6](#_md8kje6or46i)

[3.2. Gestión de incidencias	7](#_48qgm7jv85zy)

[3.2.1. Estructura del issue	7](#_6f42jauyw77b)

[3.2.2. Flujo de trabajo	8](#_11ichl8812fc)

[3.3. Políticas de ramas	9](#_kts97764f7zb)





1. # <a name="_3znysh7"></a> Introducción 
Este conjunto de directrices pretende establecer un **flujo de trabajo claro** y especificar los **formatos** que se deben utilizar en la integración del trabajo para facilitar la cooperación y coordinación de los miembros del equipo. El seguimiento de dichas políticas es estricto, pues el incumplimiento de las mismas podría dificultar el seguimiento y desarrollo del proyecto. En un entorno dinámico como es el desarrollo de un proyecto software, es esencial contar con prácticas uniformes que optimicen la productividad, la integridad y la comunicación.
1. # <a name="_tqwj0ctwchnr"></a> Política de commits
Si bien la utilización de herramientas de control de versiones como Git es fundamental, no garantiza por sí sola una integración y comunicación efectivas del trabajo. Las directrices que se presentan a continuación tienen como objetivo proporcionar herramientas para la integración continua y un seguimiento preciso del trabajo realizado.
## <a name="_tyjcwt"></a>**2.1. Conventional Commits**
En el proyecto se seguirán las especificaciones de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification) para cada *commit* que se envíe al repositorio central en GitHub. Se resumen a continuación las especificaciones de Conventional Commit con las partes más relevantes.


|01|Prefijos|<p>- Todos los *commits* deben estar precedidos por un prefijo conformado por una **etiqueta** y, opcionalmente, el **alcance**.</p><p>- La etiqueta debe servir para aclarar la aportación que el *commit* realiza al código o al conjunto del proyecto.</p><p>- El alcance debe indicar de forma muy breve el área en el que se trabaja.</p><p>- Las **etiquetas más habituales** son: *feat, fix, BREAKING CHANGE, build, ci, docs, test, refactor* y *style*.</p><p>- El prefijo puede ser precedido del signo “!” para indicar relevancia.</p>|
| :- | :- | :- |
|02|Descripción del *commit*|- Tras el prefijo siempre debe haber una descripción breve del contenido del *commit*.|
|03|Cuerpo del *commit*|<p>- El cuerpo del *commit* siempre debe establecerse como una nueva línea.</p><p>- El cuerpo tiene un formato libre y debe especificar en mayor profundidad la aportación del *commit*.</p>|
|04|Pie del *commit*|<p>- Un *commit* puede contener varias líneas de ***footer***.</p><p>- Un *footer* debe estar separado del cuerpo del *commit* con una línea de separación.</p><p>- Un *footer* contiene un prefijo donde los espacios se separan con “-” y se finaliza con “:”.</p>|

Se puede encontrar más información y ejemplos en la [página de especificaciones de Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification).
## <a name="_j1l1qmoevvfq"></a>**2.2. Idioma de los *commits***
El idioma predeterminado para la descripción de los *commits* es el **inglés**. Las etiquetas y otras especificaciones se pondrán según son especificadas en Conventional Commits. El alcance, por otra parte, se podrá indicar en el idioma que corresponda para clarificar mejor el área del proyecto en el que se trabaja, pero usualmente también será en inglés.
1. # <a name="_qzsn0uchybcq"></a>Gestión del proyecto en GitHub
GitHub es una herramienta fundamental para el desarrollo del proyecto y, es por ello, que surge la necesidad de aclarar unas políticas de uso que optimicen la utilización de la misma.
## <a name="_md8kje6or46i"></a>**3.1. Tablero de proyecto**
Cada subequipo tendrá acceso a un **tablero** que permite organizar las tareas e incidencias del proyecto. Cada tablero viene acompañado por un ***roadmap*** a modo de guía temporal para la realización de cada una de las tareas. Dichos *roadmaps* se modificarán exclusivamente cuando los coordinadores de los subequipos lo vean necesario. Todos estos tableros y *roadmaps* forman parte de un mismo repositorio.

En cada tablero existen diversas columnas, las cuales dan cierta información sobre el **estado** de las incidencias que se colocan en ellas. Estas columnas son:

- **Columna TODO**. Los *issues* colocados en esta columna son aquellos que aún no se han empezado a resolver. Pueden ser *issues* nuevos o *issues* ya asignados a la espera de que se comience a trabajar en ellos.
- **Columna In Progress**. Aquellos *issues* que se coloquen en esta columna deben empezar a resolverse. Cada miembro del equipo debería trabajar de forma exclusiva en un solo *issue* simultáneamente.
- **Columna In Review**. Cuando un *issue* es colocado en esta columna, se asume que el trabajo realizado para la resolución del mismo ha sido completado y se espera la revisión por parte de otro miembro del equipo. Aunque sea necesario realizar cambios en la resolución del *issue*, la tarea permanece en *In Review*, no vuelve a *In Progress*.
- **Columna Done**. Finalmente, todo *issue* colocado en esta columna debe estar completado, haber sido revisado por al menos un miembro del equipo y aprobado por un coordinador. 

Cada vez que una incidencia cambia de estado, el miembro del equipo encargado de la gestión de esa incidencia deberá mover el *issue* a la columna que represente mejor su estado actual. Para ofrecer un seguimiento correcto del desarrollo, el cambio de estado debe ser rápido. A modo de guía, no deben pasar más de 10 minutos entre el cambio de estado de un *issue* y su correspondiente cambio de columna reflejado en el tablero.
## <a name="_48qgm7jv85zy"></a>**3.2. Gestión de incidencias**
Las incidencias o *issues* son una parte esencial del desarrollo en GitHub. A continuación se pretenden resumir las principales políticas que todo miembro debe seguir para gestionar cualquier incidencia en el proyecto.
### <a name="_6f42jauyw77b"></a>3.2.1. Estructura del issue
En todas las *issues*, tanto la cabecera como la descripción serán escritas **en español**. La cabecera debe ser breve (normalmente menos de 50 caracteres) y el cuerpo del *issue* puede tener una longitud indefinida. El contenido del cuerpo y la cabecera es libre, aunque se prefiere una correcta especificación de la tarea o problema a resolver de forma que sea sencillo identificar el trabajo a realizar para su resolución. La creación de un *issue* debe ser siempre revisada y aprobada por un coordinador.

Los *issues* del proyecto podrán tener una etiqueta **type** (*Documentation*, *Feature*, *Presentation, Test, Bug* y *Deployment*) que indique el área de trabajo al que corresponde, así como una etiqueta **priority** (*Critical*, *High*, *Medium*, *Low* y *Minimal*) que destaca la importancia de realizar la resolución en un tiempo más o menos cercano.

Adicionalmente, existen otras etiquetas que ofrecen información adicional. La etiqueta de **stage** (*Preparation, Development* y *Deployment*) indica el estado con respecto al desarrollo global del proyecto al que el *issue* pertenece. Por otra parte, la etiqueta **team** (*Analysis and Design, Control and Presentations* y *Marketing and Business*) indica el subequipo al que la tarea pertenece.

Una incidencia pertenece a un subequipo, del cual se asignan uno o más miembros para participar en la resolución y encargarse de la gestión de la incidencia. Esta asignación, al igual que la creación de los *issues* debe ser revisada por un coordinador.
### <a name="_11ichl8812fc"></a>3.2.2. Flujo de trabajo
Cuando **se asigna una incidencia** a un miembro del equipo o varios, estos deben ponerse a trabajar en la misma. Cuando se comienza a trabajar en la incidencia, esta debe colocarse en la columna *In Progress*. Opcionalmente, se puede indicar en un comentario muy breve en la discusión del *issue* cómo se va a comenzar la actividad así como sugerencias o cuestiones con respecto al trabajo a realizar. Si las cuestiones son muy extensas, es preferible que los miembros del equipo se comuniquen por canales externos de comunicación y utilicen los comentarios para dar detalles superficiales de la cuestión.

Una vez **se comienza a trabajar**, cada avance relevante en una sesión de trabajo debe comentarse en el *issue* para facilitar que los coordinadores de los subequipos lleven un seguimiento efectivo del trabajo y así puedan gestionar el tiempo y resolver problemas. Es muy importante que los comentarios sean breves y directos para optimizar el trabajo de coordinación.

Cuando **se termina el trabajo**, se mueve la incidencia a la columna de *In Review* y se avisa en un comentario de la finalización del trabajo. Un coordinador o un miembro del subequipo deberá entonces revisar el trabajo realizado y, finalmente, completar la tarea moviendo el *issue* a la columna *Done*. 

Al **completar definitivamente una tarea** y cerrar la incidencia, se debe escribir un nuevo comentario y adjuntar, si fuera necesario, un enlace o captura de pantalla que clarifique cómo se ha finalizado la resolución.

En general, un flujo de trabajo normal se llevaría a cabo de la siguiente manera:

1. Creación y asignación de la incidencia.
1. Cambio a columna *In Progress* con comentario opcional.
1. Comentarios de seguimiento del trabajo.
1. Cambio a la columna *In Review* con comentario.
1. Revisión de la tarea y posibles cambios.
1. Cambio a la columna *Done* con comentario detallado.

Los comentarios de seguimiento no tienen una estructura obligatoria, pero es recomendable que contengan qué tareas se han realizado y, si fuera posible, qué queda aún por realizar.
## <a name="_kts97764f7zb"></a>**3.3. Políticas de ramas**
### <a name="_1s0i8mblszp5"></a>3.1.1. Gitflow
En cuanto a las política de ramas a seguir para los miembros del proyecto, se propondrá inicialmente **Gitflow**, ya que en la fase de desarrollo, se encontraran varías personas trabajando simultáneamente, y este tipo de política de ramas aporta estabilidad y permite trabajar en varios módulos del producto de forma sencilla.

- **Rama main.** Representa la versión actual en producción. Todo lo que se encuentra en esta rama debe estar listo para desplegar en cualquier momento.
- **Rama develop.** Sirve como rama de integración para características. Es la base para el desarrollo del día a día y contiene el estado más reciente del próximo lanzamiento.
- **Ramas de Características (feature).** Se crean desde develop y se fusionan de nuevo en develop una vez completadas. Cada rama de características se utiliza para desarrollar nuevas funcionalidades o mejoras sin afectar el código de producción hasta que estén listas. En estas ramas los distintos subgrupos se auto-organizan para decidir cómo gestionan y nombran las ramas de las nuevas funcionalidades. 
- **Ramas de Lanzamiento (release).** Se bifurcan desde develop cuando se decide que el código actual está listo para la próxima versión. Estas ramas permiten preparaciones finales para el lanzamiento, como correcciones de errores menores, metadatos de versión, etc. Una vez finalizado, se fusionan en main y en develop.
- **Ramas de Corrección (hotfix).** Se crean desde main para corregir errores en producción. Una vez completadas, se fusionan directamente en main y en develop, asegurando que las correcciones estén presentes en el próximo lanzamiento.
### <a name="_jtxfuan7duft"></a>3.3.2. Pull requests
Es importante resaltar que antes de mergear una pull request sobre cualquier rama del repositorio, dicha pull request tiene que ser aprobada con al menos una *review* antes de realizar el *merge*. La *review* debe ser realizada por un miembro ajeno a la realización de la tarea, y el mensaje de la *review* tiene que ser descriptivo, relatando los que la persona que ha hecho la revisión se ha fijado para asegurarse que todo se mantiene correcto en el código.





4\. Clockify

A pesar de que la actualización del tiempo invertido en las tareas será responsabilidad individual de cada uno, se seguirán unas pautas para preservar una homogeneidad en todos los reportes de tiempo y facilitar su gestión.

- **Clockify actualizado.** El clockify deberá ser actualizado justo después de la finalización de un periodo de trabajo para evitar información desactualizada y posibles confusiones posteriormente.
- **Nuevas Etiquetas.** Para la creación de nuevas etiquetas, se debe avisar al coordinador correspondiente para que quede registrado. Las etiquetas se crearán en forma de “tareas” de Clockify.
- **Títulos de tareas.** Los títulos de las tareas deben ser autoexplicativos, deben ser un resumen descriptivo sobre el tema que se ha abordado en la sesión de trabajo.
- **Tiempo honesto.** Los miembros del equipo deberán ser honestos sobre el tiempo que pongan en el reporte de trabajo sobre la sesión del trabajo realizado.

En el espacio de trabajo de Clockify dedicado a este proyecto hay creadas una serie de **tareas generales** útiles para la clasificación de las actividades realizadas. Las tareas de Clockify que existen en nuestro espacio de trabajo desde el comienzo del desarrollo son las siguientes:

- Documentación proyecto
- Presentaciones
- Organización (*issues*, tableros, anuncios, comunicación)
- Marketing
- Diseño
- Desarrollo
- Testing
- Despliegue-Integración
- Clase
- Reuniones de coordinación (solo para coordinadores)
- Reuniones de grupo



5\. Comunicación
## <a name="_8fcqkd8buchp"></a>La comunicación en la organización se dividirá en dos grandes grupos, la interna que se realiza entres los miembros del grupo y la externa miembros ajenos a la organización, la comunicación se llevará a cabo por los medios que van a ser mencionados
## <a name="_r4qazfif04cv"></a>2.1. Comunicación interna:
La comunicación entre los miembros del equipo se realizará mediante los siguientes medios:
- ### <a name="_t25p2ybzg9o6"></a>Whatsapp:
Se ha creado una comunidad de WhatsApp dividida por subequipos, así los miembros de cada subequipo pueden comunicarse fácilmente entre ellos y con sus coordinadores. Además existe un canal de anuncios para cualquier información que sea importante para todos los miembros del equipo.
- ### <a name="_84t3uif5lwpq"></a>Discord:
Se utilizará esta herramienta para la realización de reuniones internas del equipo o de los diferentes subequipos que se consideren oportunas.
## <a name="_si5un2eolzjo"></a>2.2. Comunicación externa:
Para la comunicación con clientes, entidades o personas externa a nuestra organización se realizará por el siguiente medio:
- ### <a name="_4t00ixuyhgmg"></a>Correo corporativo:
Para la comunicación con los clientes, se dispondrá de un correo corporativo para todo el equipo, que servirá como canal de comunicación para transmitir la información del grado de avance del proyecto a los clientes, así como para recibir su feedback.

