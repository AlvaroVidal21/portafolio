---
title: Bitácora EDO 2026
author: Alva Vidal
description: Aplicación local para recodificar ocupaciones con búsqueda híbrida y conservar la trazabilidad de cada registro, evidencia y decisión de revisión.
technologies: ["python", "django", "postgres", "htmx", "bootstrap"]
github: "https://github.com/AlvaroVidal21/edo2026"
status: "Completado"
---

## Recodificación explicable de ocupaciones

La aplicación ayuda a localizar candidatos oficiales de la Clasificación Nacional de Ocupaciones (CNO) a partir de las tareas y el contexto declarado en la encuesta. La búsqueda combina coincidencias de texto con similitud semántica; luego ordena los resultados con reglas explícitas. No inventa códigos: el Crítico Verificador revisa los candidatos y conserva la decisión final.

<div class="my-6 not-prose">
  <ol class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
    <li class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
      <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">01 · Interpretar</p>
      <h3 class="mt-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">Consulta + contexto</h3>
      <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Tareas, nivel, sector y especialidad describen la función buscada. No asigna un código.</p>
    </li>
    <li class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
      <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">02 · Recuperar</p>
      <h3 class="mt-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">Cinco señales</h3>
      <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Tres búsquedas léxicas y dos vectoriales encuentran candidatos del catálogo CNO oficial.</p>
    </li>
    <li class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
      <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">03 · Explicar</p>
      <h3 class="mt-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">Orden determinista</h3>
      <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Puntúa función, acción, objeto, categoría, nivel, sector y título; expone coincidencias y penalizaciones.</p>
    </li>
    <li class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
      <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">04 · Verificar</p>
      <h3 class="mt-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">Decisión humana</h3>
      <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">El Crítico Verificador revisa candidatos oficiales, elige y deja el sustento. No se inventan códigos.</p>
    </li>
  </ol>
  <div class="mt-4 border-l-4 border-orange-700 bg-neutral-100 p-4 dark:bg-neutral-800">
    <p class="font-bold text-neutral-900 dark:text-neutral-100">La trazabilidad acompaña todo el recorrido</p>
    <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Desde el registro y valor original hasta los candidatos, el resultado, la evidencia, la revisión y el historial de cambios.</p>
  </div>
</div>

### Cómo encuentra candidatos

La búsqueda CNO une y deduplica cinco vías: título de la ocupación, función interpretada, tareas y sector por búsqueda léxica; y similitud vectorial de función y contexto. Esto permite recuperar ocupaciones aunque la consulta no repita literalmente el nombre del catálogo.

Los embeddings se generan con `intfloat/multilingual-e5-small` mediante Sentence Transformers, en CPU. El texto de consulta usa el prefijo `query:` y los registros del catálogo usan `passage:`. Cada vector tiene 384 dimensiones; los fragmentos normalizados se guardan en PostgreSQL y NumPy calcula localmente la similitud coseno. Si el modelo o los vectores no están disponibles, sigue funcionando la búsqueda textual.

Como el catálogo oficial CNO no incluye descripciones ni sinónimos, la aplicación deriva una frase funcional desde cada denominación oficial y la incorpora al pasaje semántico. La misma interpretación de consulta identifica función, objeto, sector, nivel y especialidad sin seleccionar un código.

### Ordenamiento y revisión humana

Un reranker determinista compara función, acción equivalente, objeto o tarea, categoría, nivel, sector y título. También considera el orden original de recuperación y aplica penalizaciones explícitas cuando solo coincide el sector o cambia la especialidad dentro del mismo nivel. El CIIU aporta contexto de compatibilidad, pero nunca descarta por sí solo un candidato.

La traza visible por candidato registra qué ramas lo encontraron, las puntuaciones de cada componente, las señales vectoriales, las penalizaciones aplicadas, su posición y el motivo del ordenamiento. Así se puede revisar por qué aparece una ocupación y qué factores influyeron, en lugar de depender de una respuesta opaca.

## Consulta y trazabilidad en la interfaz

La búsqueda separa el nombre declarado de la ocupación y el contexto que ayuda a desambiguarla. En cada resultado se puede abrir el detalle de recuperación para revisar los orígenes léxicos y vectoriales, los componentes del puntaje, las penalizaciones y el motivo.

<figure class="my-6 not-prose">
  <a href="/images/proyectos/bitacora-edo/04-consulta-recodificacion.png" target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura del formulario de recodificación">
    <img src="/images/proyectos/bitacora-edo/04-consulta-recodificacion.png" alt="Formulario de recodificación local con una consulta demostrativa de fumigación agrícola y contexto de tareas" class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
  </a>
  <figcaption class="mt-2 text-left text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">Consulta de demostración: el contexto se agrega aparte del nombre declarado para ayudar a encontrar ocupaciones similares.</figcaption>
</figure>

<figure class="my-6 not-prose">
  <a href="/images/proyectos/bitacora-edo/05-traza-candidatos.png" target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura de candidatos y traza de búsqueda">
    <img src="/images/proyectos/bitacora-edo/05-traza-candidatos.png" alt="Resultado CNO de demostración con el detalle abierto: orígenes de búsqueda, puntuaciones, penalización, similitud vectorial y motivo" class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
  </a>
  <figcaption class="mt-2 text-left text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">El detalle expandido muestra por qué se recuperó y ordenó cada candidato. La consulta y sus datos son de demostración.</figcaption>
</figure>

## Trazabilidad del dato y de la decisión

Cada crítica queda vinculada a la empresa, la variable y el registro exacto de la encuesta. Mantiene el valor original junto con el resultado propuesto, la evidencia y el sustento; además registra método, confianza y revisión humana. El historial conserva quién cambió la información, cuándo y qué cambió. La recodificación no borra el dato declarado ni convierte la sugerencia del sistema en una decisión automática.

<figure class="my-6 not-prose">
  <a href="/images/proyectos/bitacora-edo/03-sustento-critica.png" target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura del seguimiento de críticas">
    <img src="/images/proyectos/bitacora-edo/03-sustento-critica.png" alt="Vista de demostración del seguimiento de críticas y revisiones pendientes" class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
  </a>
  <figcaption class="mt-2 text-left text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">La revisión mantiene los casos y sus estados visibles para dar seguimiento al sustento.</figcaption>
</figure>

## Seguimiento operativo

El directorio reúne avance de encuesta, gestión con la empresa, revisión crítica y canales de contacto. El dashboard resume la carga y ayuda a ubicar pendientes, mientras que las actividades permanecen asociadas a la empresa correspondiente.

<div class="grid gap-6 md:grid-cols-2">
  <figure class="my-6 not-prose">
    <a href="/images/proyectos/bitacora-edo/01-dashboard.png" target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura del dashboard de Bitácora EDO">
      <img src="/images/proyectos/bitacora-edo/01-dashboard.png" alt="Dashboard de demostración con avance de encuestas, estado de crítica y casos pendientes" class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
    </a>
    <figcaption class="mt-2 text-left text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">Resumen de avance y revisiones que necesitan seguimiento.</figcaption>
  </figure>
  <figure class="my-6 not-prose">
    <a href="/images/proyectos/bitacora-edo/02-directorio.png" target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura del directorio de empresas">
      <img src="/images/proyectos/bitacora-edo/02-directorio.png" alt="Directorio de demostración con filtros y estados de encuesta y crítica" class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
    </a>
    <figcaption class="mt-2 text-left text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">Vista de empresas, contacto y estado operativo.</figcaption>
  </figure>
</div>

Las capturas de interfaz se tomaron en modo de demostración con empresas, contactos y actividades ficticios; no contienen información de la base de trabajo.

## Tecnología

Python, Django y PostgreSQL sostienen la aplicación. Django Templates, HTMX y Bootstrap resuelven la interfaz. Sentence Transformers prepara los embeddings y NumPy calcula la similitud vectorial localmente; el proceso puede continuar con búsqueda textual cuando no hay vectores disponibles.
