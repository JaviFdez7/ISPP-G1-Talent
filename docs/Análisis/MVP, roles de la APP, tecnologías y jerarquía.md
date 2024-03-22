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
|v1.0|02/02/2024|Andrés Domínguez Ruiz|Documento inicial|
|v1.1|02/02/2024|Francisco Jesús Montero Martínez|Primera versión del documento finalizada|
|V2.2|04/02/2024|Francisco Jesús Montero Martínez|Añadidas posibles extensiones del MVP|
|v3|06/02/2024|Rubén Casal Ferrero|Añadir busqueda grupos MVP|

## <a name="_tyjcwt"></a>**Resumen del documento**
<a name="_3dy6vkm"></a>El objetivo de este documento es describir el alcance mínimo y viable del producto, la forma en la que se desarrollará el mismo y la jerarquía de trabajo propuesta. Para ello, se explicarán los siguientes aspectos:

- Producto mínimo viable
- Los roles de clientes/usuarios que se seguirán en la aplicación
- Las tecnologías a utilizar para desarrollar y mantener la aplicación
- La jerarquía de trabajo que se seguirá


# <a name="_1t3h5sf"></a>
# <a name="_17dp8vu"></a>Índice

[**1. MVP	4**](#_3rdcrjn)**

[**2. Roles de la APP	5**](#_saz0mv2rf1vg)

[**3. Tecnologías y herramientas	5**](#_1qoe16el5sh2)

[3.1. Tecnologías	5](#_qnn1s9au8be6)

[3.2. Herramientas	6](#_699i8yr18zjz)

[**4. Jerarquía del equipo de trabajo	6**](#_xtr7b6ykbc7r)




# <a name="_3rdcrjn"></a>1. MVP 

El MVP de IT Talent es un sistema que permite a los representantes de las empresas **recopilar información sobre candidatos** a través del nombre de usuario que tienen en GitHub. Este sistema recopila y presenta información relevante y procesada extraída de la API pública de GitHub. IT Talent ofrecerá la función de recopilar datos de personas individuales o de varios candidatos simultáneamente para ofrecer un apoyo a la búsqueda completa de equipos.

**Características principales:**

- Los representantes podrán **generar cuadros de mando** con información pública relevante de los candidatos, procesada con el objetivo de que el representante pueda hacerse a la idea rápidamente del perfil profesional de cada uno y que, de esa forma, se acelere el proceso de contratación.
- La información será recolectada mediante la **API pública de GitHub**, a través del nombre de usuario del candidato del que se quiera extraer información en cada petición.
- Se utilizarán **algoritmos de filtrado** que descarten la información de poco interés y destaquen la información relevante, con el objetivo de que el representante, de manera fácil y rápida, pueda conocer los detalles más importantes del candidato en el contexto de un proceso de contratación.
- También existirá la posibilidad de **generar cuadros comparativos de más de un candidato**, abriendo la posibilidad para que esta herramienta ayude a **crear y formar grupos completos**,  pudiendo así recomendar a los usuarios de la herramienta grupos para nuevos proyectos o pendientes de la contratación del personal para su comienzo.

**Proceso para generar un cuadro de mando:**

- El representante **rellena un formulario** en el que especifica el nombre o nombres de usuario del candidato en GitHub.
- El sistema, mediante la API pública de GitHub, **recolecta información** del candidato.
- Se **procesan los datos** y se aplican **algoritmos de filtrado** para descartar la información irrelevante y quedarse con la que aporte valor en el contexto de un proceso de contratación.
- Se **ordena la información** y se **presenta** de manera fácilmente entendible en un cuadro de mando, a través de gráficas y resaltando la información más relevante.

**Posibles extensiones del MVP:**

- **Adición de APIs públicas** que el representante puede incluir en sus análisis, como puede ser la de LinkedIn, Facebook, Twitter (X) o Instagram.
- Publicación de **ofertas laborales** por parte de los representantes, con el objetivo de que los candidatos se postulen a ellas y puedan ser analizados conjuntamente en una sola petición.
- **Análisis avanzados** en los que la aplicación, recibiendo el nombre y los apellidos de un candidato, pueda buscar sus perfiles en redes sociales.

# <a name="_saz0mv2rf1vg"></a>2. Roles de la APP 
En cuanto a roles, se han considerado los siguientes:

**Administrador:** Usuario con permisos de administración. Su autoridad es mayor que la del resto de usuarios, pudiendo gestionar diferentes apartados de la aplicación.

**Representante:** Usuario que representa a una entidad empresarial, el cuál podrá buscar posibles candidatos que cumplan con las expectativas que desea la empresa.  

**Candidato:** Usuario que proporciona información que puede ser procesada y analizada por las empresas en sus procesos de contratación.

# <a name="_1qoe16el5sh2"></a>3. Tecnologías y herramientas
## <a name="_qnn1s9au8be6"></a>3.1. Tecnologías
**Back-end:** Express.js

**Front-end:** React

**Base de datos:** MongoDB
## <a name="_ieceqmgh7tyw"></a>
## <a name="_699i8yr18zjz"></a>3.2. Herramientas
**APIs Externas:** GRAPHQL y RESTFUL API.

**Despliegue e Integración continua:** Docker, AppEngine y Github Actions.

**Herramientas de trabajo:** Discord, WhatsApp, Google Drive, Clockify y GitHub.

# <a name="_xtr7b6ykbc7r"></a>4. Jerarquía del equipo de trabajo


El equipo se dividirá en 3 subgrupos de trabajo independientes. El trabajo de cada subgrupo será verificado y controlado por **el coordinador del subgrupo.**

Con el objetivo de controlar y gestionar el trabajo global del proyecto, existirá el **coordinador de proyecto**, el/la cuál se asegurará de que todo trabajo se esté realizando correctamente para cumplir con las expectativas y los objetivos del proyecto. Para ello, se comunicará con los distintos coordinadores de subgrupos.

Los objetivos de cada subgrupo dependen de la fase del proyecto en la que nos encontremos:

- **En la fase de preparación**, los subgrupos serán:
  - **Control y Presentación:** Se encargará del diseño de las presentaciones, asegurar la coherencia de la información en el proyecto y apuntar feedbacks.
  - **Análisis:** Se encargará de analizar y diseñar los requisitos del proyecto, los casos de uso, el modelo de datos, etc.
  - **Marketing:** Se encargará de estudiar el modelo de negocio del proyecto.
- **En la fase de desarrollo,** los subgrupos serán:
  - **Control y Presentación:** Se encargará del diseño de las presentaciones, asegurar la coherencia de la información en el proyecto y apuntar feedbacks.
  - **2 subgrupos de Desarrollo:** Se encargarán del desarrollo y la construcción de las funcionalidades del producto, así como el testing formal e informal, asegurar la calidad y comenzar la integración continua.
- **En la fase de despliegue y cierre**, los subgrupos serán:
  - **Control y Presentación:** Se encargará del diseño de las presentaciones, asegurar la coherencia de la información en el proyecto y apuntar feedbacks.
  - **QA y Testing:** Se encargará de la creación de tests formales de las funcionalidades construidas, asegurar la calidad del producto y el cumplimiento de las expectativas antes de dar por cerrada cada tarea y/o requisito del proyecto.
  - **Despliegue e Integración:** Se encargará de desplegar el producto y de realizar la integración continua del mismo para automatizar ciertas tareas.


