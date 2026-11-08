---
title: Bitácora EDO 2026
author: Alva Vidal
description: Aplicación local que reúne el avance de la EDO 2026, las gestiones con empresas y el sustento de revisión de cada registro.
technologies: ["python", "django", "postgres", "htmx", "bootstrap"]
github: "https://github.com/AlvaroVidal21/edo2026"
status: "En progreso"
---

## Avance de encuestas y crítica

El dashboard reúne el tamaño de la carga, las encuestas concluidas, las revisiones pendientes y las críticas en análisis o cerradas. Desde ahí se pasa al directorio o a las gestiones recientes para ubicar qué requiere atención.

Las capturas se tomaron en el modo de demostración con empresas, contactos y actividades ficticios; no contienen información de la base de trabajo.

<figure class="my-6 not-prose">
  <a href="/images/proyectos/bitacora-edo/01-dashboard.png" target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura del dashboard de Bitácora EDO">
    <img src="/images/proyectos/bitacora-edo/01-dashboard.png" alt="Dashboard de Bitácora EDO con avance de encuestas, estado de crítica y casos pendientes" class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
  </a>
  <figcaption class="mt-2 text-left text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">El dashboard resume el avance de la carga y señala las revisiones que necesitan seguimiento.</figcaption>
</figure>

## Seguimiento de empresas

El directorio combina situación reportada, estado de encuesta, revisión crítica y canales de contacto. Sus filtros permiten localizar empresas por avance, resultado de revisión y disponibilidad de correo; las actividades quedan vinculadas a la ficha de cada empresa.

<figure class="my-6 not-prose">
  <a href="/images/proyectos/bitacora-edo/02-directorio.png" target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura del directorio de empresas">
    <img src="/images/proyectos/bitacora-edo/02-directorio.png" alt="Directorio de demostración con filtros y estados de encuesta y crítica" class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
  </a>
  <figcaption class="mt-2 text-left text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">El directorio pone los datos de contacto y los estados operativos en una sola vista.</figcaption>
</figure>

## Sustento de crítica

Cada caso identifica la empresa, la variable y el registro de encuesta analizado. Conserva el valor original, el resultado, la evidencia y la justificación para que otra persona pueda reconstruir el criterio aplicado.

<figure class="my-6 not-prose">
  <a href="/images/proyectos/bitacora-edo/03-sustento-critica.png" target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura de casos de crítica">
    <img src="/images/proyectos/bitacora-edo/03-sustento-critica.png" alt="Lista de empresas con casos de crítica y revisiones pendientes" class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
  </a>
  <figcaption class="mt-2 text-left text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">La lista muestra cuántos casos esperan revisión y cuándo se actualizaron.</figcaption>
</figure>

## Tecnología

Python, Django y PostgreSQL sostienen la aplicación; Django Templates, HTMX y Bootstrap resuelven la interfaz. La búsqueda semántica corre localmente con Sentence Transformers y NumPy. Para recodificar, los candidatos siempre provienen de clasificadores oficiales y la decisión final queda en manos del usuario.
