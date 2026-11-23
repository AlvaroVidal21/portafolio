---
title: Bitácora EDO 2026
author: Alva Vidal
description: Sistema local que ordena la gestión con empresas, analiza encuestas de demanda ocupacional del MTPE y recodifica ocupaciones a la CNO 2015 con el contexto del CIIU revisión 4, evidencia y trazabilidad completa.
technologies: ["python", "django", "postgres", "htmx", "bootstrap"]
github: "https://github.com/AlvaroVidal21/edo2026"
status: "Completado"
---

La Encuesta de Demanda Ocupacional (EDO) es el instrumento con el que el Ministerio de Trabajo y Promoción del Empleo pregunta a las empresas qué ocupaciones necesitan, qué perfiles buscan y qué requisitos exigen. La edición 2026 se aplica desde un aplicativo web del propio Ministerio, y detrás de cada encuesta hay un analista de información: la persona que mantiene el contacto con la empresa hasta que responde, revisa que las respuestas sean coherentes y traduce las ocupaciones declaradas en texto libre a los dos clasificadores oficiales que el Estado usa para leerlas: la **CNO 2015**, que pone el código de la ocupación, y el **CIIU revisión 4**, que dice si esa ocupación es compatible con la actividad económica de la empresa.

Ese trabajo tiene dos frentes que rara vez conviven en la misma herramienta: la gestión operativa del contacto con cada empresa y la crítica técnica del dato. La Bitácora EDO 2026 reúne ambos y deja constancia de cada paso.

<div class="my-6 not-prose border-l-4 border-orange-700 bg-neutral-100 p-4 dark:bg-neutral-800">
  <p class="font-bold text-neutral-900 dark:text-neutral-100">En una línea</p>
  <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Registra a qué empresa se contactó, por qué canal, con qué evidencia y en qué quedó; y cuando llega la encuesta, clasifica sus ocupaciones con candidatos oficiales y demuestra por qué eligió cada código.</p>
</div>

## Los dos problemas

<div class="my-6 not-prose grid grid-cols-1 gap-3 sm:grid-cols-2">
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">Frente 1 · Gestión</p>
    <h3 class="mt-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">¿En qué quedó cada empresa?</h3>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Las gestiones viven dispersas entre WhatsApp, correo, llamadas y reuniones. Sin un historial único no se sabe a quién ya se contactó, por qué canal, cuándo fue la última vez ni qué quedó pendiente.</p>
  </div>
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">Frente 2 · Crítica</p>
    <h3 class="mt-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">¿Por qué se eligió ese código?</h3>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">La recodificación cambia datos de una encuesta oficial. Si la decisión no queda sustentada, no se puede defender ante una revisión ni ante la propia empresa.</p>
  </div>
</div>

## Qué es el CNO, el CIIU y la recodificación

Tres siglas explican casi todo el proyecto.

- **CNO 2015 — Clasificación Nacional de Ocupaciones.** El catálogo oficial de ocupaciones del país. Cada ocupación tiene un código y una denominación, y el catálogo no trae sinónimos ni descripciones: son nombres sueltos.
- **CIIU revisión 4 — Clasificación Industrial Internacional Uniforme.** Clasifica la actividad económica de la empresa. No decide la ocupación: la condiciona. Una ocupación puede ser compatible con un sector y no con otro, y esa compatibilidad entra al ordenamiento como contexto, nunca como descarte automático.
- **Recodificación.** Convertir lo que la empresa escribió con sus propias palabras —«encargado de aplicar herbicidas en los cultivos»— en el código CNO que corresponde. Es una decisión con consecuencias estadísticas, no una corrección de estilo.

El problema práctico es que la empresa nunca escribe como escribe el catálogo. Y el catálogo tampoco se puede ampliar a gusto: si una ocupación no existe, no se inventa.

## Cómo se resuelve: cuatro pasos

<div class="my-6 not-prose">
  <ol class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
    <li class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
      <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">01 · Interpretar</p>
      <h3 class="mt-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">Consulta + contexto</h3>
      <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Tareas, nivel educativo, sector y especialidad describen la función buscada. No asigna ningún código.</p>
    </li>
    <li class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
      <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">02 · Recuperar</p>
      <h3 class="mt-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">Cinco búsquedas</h3>
      <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Tres por coincidencia de texto y dos por similitud semántica recorren el catálogo CNO oficial.</p>
    </li>
    <li class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
      <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">03 · Ordenar</p>
      <h3 class="mt-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">Reglas explícitas</h3>
      <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Compara función, acción, objeto, categoría, nivel, sector y título, y expone coincidencias y penalizaciones.</p>
    </li>
    <li class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
      <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">04 · Decidir</p>
      <h3 class="mt-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">Decisión humana</h3>
      <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">El analista revisa candidatos oficiales, elige, deja el sustento y firma la revisión.</p>
    </li>
  </ol>
</div>

## Del formulario al resultado

Una consulta se arma con lo que declaró la empresa y con el contexto de la encuesta. Lo que devuelve no es una lista de códigos: es un conjunto acotado de candidatos oficiales, cada uno con su explicación abierta.

<figure class="my-6 not-prose media-scroll">
  <a href="/images/proyectos/bitacora-edo/04-consulta-recodificacion.png" target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura del formulario de recodificación">
    <img src="/images/proyectos/bitacora-edo/04-consulta-recodificacion.png" alt="Formulario de recodificación con una consulta demostrativa de fumigación agrícola, contexto de tareas y actividad económica CIIU" class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
  </a>
  <figcaption class="mt-2 text-left text-xs leading-relaxed text-neutral-500 dark:text-neutral-400"><span class="font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">Entrada</span> · El nombre declarado, las tareas, la actividad CIIU y el contexto del formulario EDO.<span class="mt-1 block text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300 md:hidden">Desliza para ver la captura completa →</span></figcaption>
</figure>

<figure class="my-6 not-prose media-scroll">
  <a href="/images/proyectos/bitacora-edo/06-resultado-candidato.png" target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura del resultado de la recodificación">
    <img src="/images/proyectos/bitacora-edo/06-resultado-candidato.png" alt="Resultado real de demostración: diez candidatos encontrados y el primero con su detalle de recuperación abierto, con orígenes, puntaje por componente, penalización, similitud vectorial y motivo" class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
  </a>
  <figcaption class="mt-2 text-left text-xs leading-relaxed text-neutral-500 dark:text-neutral-400"><span class="font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">Salida</span> · Los diez candidatos y, desplegado, el detalle del primero: de dónde vino, cómo puntuó y por qué quedó ahí.<span class="mt-1 block text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300 md:hidden">Desliza para ver la captura completa →</span></figcaption>
</figure>

### Qué estás viendo en ese resultado

<div class="my-6 not-prose border-2 border-neutral-900 dark:border-neutral-700">
  <div class="border-b-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">Candidato 1 de 10</p>
    <p class="mt-2 font-mono text-lg font-bold text-neutral-900 dark:text-neutral-100">9211073</p>
    <p class="text-base font-bold text-neutral-900 dark:text-neutral-100">Fumigador de plantas y cultivos</p>
    <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Grupo primario 9211 · Peones de explotaciones agrícolas y ganaderas</p>
  </div>
  <div class="grid gap-px bg-neutral-300 dark:bg-neutral-700 sm:grid-cols-2">
    <div class="bg-white p-4 dark:bg-neutral-900">
      <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Lo encontraron</p>
      <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Seis vías a la vez: la búsqueda base, tres léxicas (título, función y contexto) y dos vectoriales. Aparecer por varias rutas lo empuja arriba.</p>
    </div>
    <div class="bg-white p-4 dark:bg-neutral-900">
      <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Cómo puntuó</p>
      <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Función 2,0 · similitud de título 1,0 · sector CIIU 0,8 · categoría 0,8 · similitud vectorial 0,524. Lo que no aplica queda en 0,0: no se rellena.</p>
    </div>
    <div class="bg-white p-4 dark:bg-neutral-900">
      <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Qué lo penalizó</p>
      <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">−0,6 por una razón concreta: la función no coincide con el objeto declarado. La penalización se muestra; no es un ajuste oculto.</p>
    </div>
    <div class="bg-white p-4 dark:bg-neutral-900">
      <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Por qué quedó primero</p>
      <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">El motivo lo dice en una frase: misma acción en la denominación, sector compatible, coincidencia literal de título y buena posición previa, con la salvedad de la función.</p>
    </div>
  </div>
  <div class="flex flex-wrap items-center justify-between gap-3 border-t-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-sm font-bold text-neutral-900 dark:text-neutral-100">Score final 5,508</p>
    <p class="text-sm text-neutral-600 dark:text-neutral-300">El botón <span class="font-bold">Usar código en crítica</span> traslada el código y toda esta traza al registro de la crítica.</p>
  </div>
</div>

Ese último paso es el que cierra el círculo: el resultado no queda en pantalla, entra a la crítica con su valor original, su método, su confianza, su evidencia y su sustento. La consulta y sus datos son de demostración: el escenario completo está armado con registros ficticios.

## La parte que más me gusta: buscar por significado

Un *embedding* es una forma de convertir una frase en una lista de 384 números, ordenados de tal manera que dos frases con significado parecido quedan cerca aunque no compartan una sola palabra. «Aplicar herbicidas» y «control de malezas en el cultivo» no se parecen en nada si se comparan letra por letra, pero sí en ese espacio de números.

Eso no es un lujo técnico: es el corazón del problema. La CNO lista denominaciones, no descripciones. Si la empresa escribe «fumigación» y el catálogo dice «operador de equipo de aspersión», ningún buscador de texto va a unir esas dos frases. La búsqueda vectorial sí, porque compara significado.

Por eso la recuperación entra por cinco puertas y no por una.

<div class="my-6 not-prose grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Léxico</p>
    <h3 class="mt-2 text-base font-bold text-neutral-900 dark:text-neutral-100">Título declarado</h3>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">La denominación tal como la escribió la empresa.</p>
  </div>
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Léxico</p>
    <h3 class="mt-2 text-base font-bold text-neutral-900 dark:text-neutral-100">Función derivada</h3>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Una frase funcional inferida de la denominación oficial.</p>
  </div>
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Léxico</p>
    <h3 class="mt-2 text-base font-bold text-neutral-900 dark:text-neutral-100">Tareas y sector</h3>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">El detalle operativo de la ocupación.</p>
  </div>
  <div class="border-2 border-orange-700 bg-orange-50 p-4 dark:border-orange-700 dark:bg-neutral-800">
    <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">Vectorial</p>
    <h3 class="mt-2 text-base font-bold text-neutral-900 dark:text-neutral-100">Función en 384 dimensiones</h3>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Compara el significado de la función con cada pasaje del catálogo.</p>
  </div>
  <div class="border-2 border-orange-700 bg-orange-50 p-4 dark:border-orange-700 dark:bg-neutral-800">
    <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">Vectorial</p>
    <h3 class="mt-2 text-base font-bold text-neutral-900 dark:text-neutral-100">Contexto completo</h3>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Nivel, sector y especialidad viajan en un mismo vector: separa lo que suena parecido.</p>
  </div>
  <div class="border-2 border-dashed border-neutral-400 p-4 dark:border-neutral-600">
    <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">El resultado</p>
    <h3 class="mt-2 text-base font-bold text-neutral-900 dark:text-neutral-100">Cinco rankings, un candidato</h3>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Se fusionan y deduplican: aparecer por varias vías sube la posición.</p>
  </div>
</div>

<div class="my-6 not-prose">
  <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">El recorrido completo</p>
  <ol class="mt-3 space-y-2">
    <li class="border-2 border-neutral-900 dark:border-neutral-700 p-4 ">
      <div class="flex gap-3">
        <span class="mt-0.5 font-mono text-xs font-bold text-orange-800 dark:text-orange-300">01</span>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Entrada</p>
          <p class="mt-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">La frase de la empresa y su contexto</p>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">«Encargado de aplicar herbicidas en los cultivos», más nivel educativo, actividad CIIU, especialidad y tareas declaradas. Texto libre, sin código y sin sinónimos: así llega siempre.</p>
        </div>
      </div>
    </li>
    <li class="border-2 border-neutral-900 dark:border-neutral-700 p-4 ">
      <div class="flex gap-3">
        <span class="mt-0.5 font-mono text-xs font-bold text-orange-800 dark:text-orange-300">02</span>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Recuperación</p>
          <p class="mt-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">Cinco vías sobre el catálogo CNO</p>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Tres búsquedas léxicas y dos vectoriales miran el mismo catálogo desde ángulos distintos.</p>
          <div class="mt-2 flex flex-wrap gap-1.5"><span class="border border-neutral-400 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-600 dark:text-neutral-300">Título</span><span class="border border-neutral-400 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-600 dark:text-neutral-300">Función derivada</span><span class="border border-neutral-400 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-600 dark:text-neutral-300">Tareas y sector</span></div>
          <div class="mt-2 flex flex-wrap gap-1.5"><span class="border border-orange-700 bg-orange-50 px-2 py-0.5 text-xs font-bold text-orange-900 dark:bg-neutral-800 dark:text-orange-200">Función · 384 dims</span><span class="border border-orange-700 bg-orange-50 px-2 py-0.5 text-xs font-bold text-orange-900 dark:bg-neutral-800 dark:text-orange-200">Contexto completo</span></div>
        </div>
      </div>
    </li>
    <li class="border-2 border-neutral-900 dark:border-neutral-700 p-4 ">
      <div class="flex gap-3">
        <span class="mt-0.5 font-mono text-xs font-bold text-orange-800 dark:text-orange-300">03</span>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Fusión</p>
          <p class="mt-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">BM25 + Reciprocal Rank Fusion</p>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Los cinco rankings se suman y deduplican: un candidato que aparece por varias vías sube de posición.</p>
        </div>
      </div>
    </li>
    <li class="border-2 border-neutral-900 dark:border-neutral-700 p-4 ">
      <div class="flex gap-3">
        <span class="mt-0.5 font-mono text-xs font-bold text-orange-800 dark:text-orange-300">04</span>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Ordenamiento</p>
          <p class="mt-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">Siete criterios, ninguno oculto</p>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Función, acción, objeto, categoría, nivel, sector y título, con penalizaciones explícitas cuando solo coincide el sector.</p>
        </div>
      </div>
    </li>
    <li class="border-2 border-neutral-900 dark:border-neutral-700 p-4 ">
      <div class="flex gap-3">
        <span class="mt-0.5 font-mono text-xs font-bold text-orange-800 dark:text-orange-300">05</span>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Revisión</p>
          <p class="mt-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">Diez candidatos, cada uno con su traza</p>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Qué rama lo trajo, cuánto puntuó en cada componente, qué penalización recibió y por qué quedó en esa posición.</p>
        </div>
      </div>
    </li>
    <li class="border-2 border-orange-700 p-4 bg-orange-50 dark:bg-neutral-800">
      <div class="flex gap-3">
        <span class="mt-0.5 font-mono text-xs font-bold text-orange-800 dark:text-orange-300">06</span>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Decisión humana</p>
          <p class="mt-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">El analista elige y sustenta</p>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">El modelo reordena, nunca asigna. El código final, la evidencia y el sustento los deja la persona que revisa.</p>
        </div>
      </div>
    </li>
    <li class="border-2 border-neutral-900 dark:border-neutral-700 p-4 ">
      <div class="flex gap-3">
        <span class="mt-0.5 font-mono text-xs font-bold text-orange-800 dark:text-orange-300">07</span>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Queda registrado</p>
          <p class="mt-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">La crítica con su evidencia</p>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Valor original, resultado, método, confianza, evidencia, sustento, autor y fecha, con historial de cambios.</p>
        </div>
      </div>
    </li>
  </ol>
</div>

Sobre la parte técnica: los vectores se generan en el propio equipo con un modelo multilingüe pequeño, usan prefijos distintos para la consulta y para el catálogo, se guardan junto a cada fragmento oficial y se comparan con similitud coseno. Todo el cálculo es local. Y como el catálogo no trae descripciones, la aplicación deriva una frase funcional de cada denominación para que el vector tenga algo que comparar.

Lo importante es lo que la semántica no resuelve sola: traer parecidos no es traer el correcto. Por eso el resultado pasa por una fusión de rankings y después por un ordenamiento determinista, con penalizaciones visibles cuando solo coincide el sector. La parte estadística propone; la parte auditable ordena.

## Qué queda visible en cada candidato

Aparecer en la lista no significa ser el mejor candidato. Cada resultado expone qué ramas lo encontraron, cuánto puntuó en cada componente, qué penalizaciones recibió, en qué posición quedó y por qué. El CIIU aporta compatibilidad, pero nunca descarta por sí solo.

<div class="my-6 not-prose grid grid-cols-1 gap-3 sm:grid-cols-2">
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">Origen</p>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Qué ramas lo trajeron: título, función, tareas, sector o similitud semántica.</p>
  </div>
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">Puntaje</p>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Cuánto aportó cada componente, incluida la señal vectorial cuando existió.</p>
  </div>
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">Penalización</p>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Qué lo hizo bajar: coincidir solo en sector, cambiar de especialidad o caer en un nicho que no corresponde.</p>
  </div>
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">Motivo</p>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">La explicación en una frase y la posición final dentro de la lista.</p>
  </div>
</div>

Todo eso se ve en la captura de la salida, más arriba: la traza se abre candidato por candidato, no en una pantalla aparte.

## La IA propone, la persona decide

La aplicación puede reordenar candidatos con un modelo, local o remoto. En los dos casos el modelo recibe la consulta, el contexto pertinente y hasta 100 candidatos oficiales ya recuperados en el equipo; devuelve esos mismos candidatos en otro orden y puede proponer denominaciones alternativas para seguir buscando. No entrega códigos nuevos ni asigna: si devuelve un código que no estaba en el conjunto recuperado, se descarta, y los que omitió se completan. De esos 100 se muestran los 10 primeros, que es donde se concentra la revisión.

Ese recorte es deliberado. Un analista no necesita cien opciones: necesita diez defendibles y el registro de por qué esas diez.

## Del PDF del aplicativo al análisis de la encuesta

El análisis es una capacidad distinta de la recodificación. Las empresas llenan la EDO en el aplicativo web del Ministerio; lo que llega a mis manos es el PDF que ese aplicativo genera. La aplicación lo convierte con **MarkItDown 0.1.9**, la herramienta de conversión de documentos de Microsoft, que extrae el texto y las tablas y devuelve Markdown; trabaja sobre ese Markdown.

Ahí aparece el problema real: el PDF de una encuesta extensa no produce un Markdown limpio. Las páginas se cortan, las tablas se rompen en fragmentos y los encabezados quedan sueltos. Por eso el Markdown pasa antes por una normalización estructural programada —secciones, preguntas, respuestas, tablas y listas— que reconstruye la encuesta solo cuando la correspondencia es verificable. Si sigue siendo ambigua, conserva el contenido tal como vino y no inventa encabezados.

Sobre esa estructura se hace la lectura: ocupaciones declaradas, cargos de contacto de las preguntas 2.2 y 2.7 —informativos, nunca recodificables—, casos que corresponden a las preguntas de doble codificación y alertas de inconsistencia entre respuestas. Si el modelo no está disponible, la lectura se hace igual con reglas locales, y el sistema guarda el modo junto con el motivo, para que nadie confunda una lectura degradada con una completa.

<div class="my-6 not-prose">
  <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">El recorrido del documento</p>
  <ol class="mt-3 space-y-2">
    <li class="border-2 border-neutral-900 dark:border-neutral-700 p-4 ">
      <div class="flex gap-3">
        <span class="mt-0.5 font-mono text-xs font-bold text-orange-800 dark:text-orange-300">01</span>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Origen del dato</p>
          <p class="mt-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">Aplicativo web del Ministerio</p>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">La empresa llena la Encuesta de Demanda Ocupacional en el sistema del MTPE. Digital, no en papel.</p>
          <div class="mt-2 flex flex-wrap gap-1.5"><span class="border border-neutral-400 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-600 dark:text-neutral-300">digital</span></div>
        </div>
      </div>
    </li>
    <li class="border-2 border-neutral-900 dark:border-neutral-700 p-4 ">
      <div class="flex gap-3">
        <span class="mt-0.5 font-mono text-xs font-bold text-orange-800 dark:text-orange-300">02</span>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Salida del sistema</p>
          <p class="mt-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">PDF descargado</p>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Un documento extenso: decenas de páginas, tablas y encabezados que se cortan.</p>
        </div>
      </div>
    </li>
    <li class="border-2 border-neutral-900 dark:border-neutral-700 p-4 ">
      <div class="flex gap-3">
        <span class="mt-0.5 font-mono text-xs font-bold text-orange-800 dark:text-orange-300">03</span>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Extracción</p>
          <p class="mt-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">MarkItDown 0.1.9 · Microsoft</p>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Convierte el PDF a Markdown en el propio equipo. El documento no sale de la máquina.</p>
          <div class="mt-2 flex flex-wrap gap-1.5"><span class="border border-neutral-400 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-600 dark:text-neutral-300">local</span></div>
        </div>
      </div>
    </li>
    <li class="border-2 border-orange-700 p-4 bg-orange-50 dark:bg-neutral-800">
      <div class="flex gap-3">
        <span class="mt-0.5 font-mono text-xs font-bold text-orange-800 dark:text-orange-300">04</span>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Normalización estructural</p>
          <p class="mt-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">El paso que hace legible una encuesta</p>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Reglas propias ordenan secciones, preguntas, respuestas, tablas y listas. Si la correspondencia es ambigua, se conserva el contenido tal como vino: no se inventan encabezados.</p>
        </div>
      </div>
    </li>
    <li class="border-2 border-neutral-900 dark:border-neutral-700 p-4 ">
      <div class="flex gap-3">
        <span class="mt-0.5 font-mono text-xs font-bold text-orange-800 dark:text-orange-300">05</span>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Lectura</p>
          <p class="mt-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">Con modelo o con reglas fijas</p>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Ollama local u OpenCode Go interpretan la estructura ya normalizada; si el modelo no está, el lector determinista hace la lectura igual.</p>
          <div class="mt-2 flex flex-wrap gap-1.5"><span class="border border-neutral-400 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-600 dark:text-neutral-300">Ollama local</span><span class="border border-neutral-400 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-600 dark:text-neutral-300">OpenCode Go</span><span class="border border-neutral-400 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-600 dark:text-neutral-300">lector determinista</span></div>
        </div>
      </div>
    </li>
    <li class="border-2 border-neutral-900 dark:border-neutral-700 p-4 ">
      <div class="flex gap-3">
        <span class="mt-0.5 font-mono text-xs font-bold text-orange-800 dark:text-orange-300">06</span>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Resultado revisable</p>
          <p class="mt-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">Nada se modifica solo</p>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Ocupaciones declaradas, cargos de contacto de 2.2 y 2.7, casos de doble codificación y alertas de consistencia. Cada hallazgo espera revisión y deja su estado.</p>
        </div>
      </div>
    </li>
  </ol>
</div>

## Trazabilidad del contacto

Cada gestión con una empresa queda registrada con fecha y hora, canal, categoría, descripción y estado. La aplicación distingue lo que se hizo de lo que quedó pendiente, y conserva la historia completa aunque la empresa cambie de estado.

Los casos concretos están modelados, no anotados en un campo libre:

- **Cambio de correo**, con el correo anterior y el nuevo, el contacto afectado y la constancia de autorización de la empresa.
- **Llamada**, con el teléfono de destino y el resultado de la gestión.
- **Notificación enviada**, con un enlace único por envío: cuando la empresa responde, se registra el número desde el que respondió, el compromiso de completar la encuesta y la captura que lo sustenta.
- **Evidencia adjunta** en cada gestión: PDF o imagen, validada al subirla.

<div class="my-6 not-prose grid grid-cols-1 gap-3 sm:grid-cols-3">
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">Lo que se hizo</p>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Canal, categoría, fecha, hora y la captura que lo prueba.</p>
  </div>
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">Lo que quedó pendiente</p>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Estado de la gestión y compromiso asumido por la empresa.</p>
  </div>
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">Lo que se presenta</p>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Informe en PDF con la evidencia incrustada y resumen exportable a Excel.</p>
  </div>
</div>

El informe respeta la fecha de corte: reconstruye el estado que la empresa tenía al final del período consultado, no el de hoy. Es el detalle que separa un reporte de gestión de un reporte que aguanta una auditoría.

<div class="grid gap-6 md:grid-cols-2">
  <figure class="my-6 not-prose media-scroll">
    <a href="/images/proyectos/bitacora-edo/01-dashboard.png" target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura del dashboard de Bitácora EDO">
      <img src="/images/proyectos/bitacora-edo/01-dashboard.png" alt="Dashboard de demostración con avance de encuestas, estado de crítica y casos pendientes" class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
    </a>
    <figcaption class="mt-2 text-left text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">Resumen de avance y revisiones que necesitan seguimiento.</figcaption>
  </figure>
  <figure class="my-6 not-prose media-scroll">
    <a href="/images/proyectos/bitacora-edo/02-directorio.png" target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura del directorio de empresas">
      <img src="/images/proyectos/bitacora-edo/02-directorio.png" alt="Directorio de demostración con filtros y estados de encuesta y crítica" class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
    </a>
    <figcaption class="mt-2 text-left text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">Vista de empresas, contacto y estado operativo.</figcaption>
  </figure>
</div>

## Trazabilidad de la decisión

Cada crítica queda vinculada a la empresa, la variable y el registro exacto de la encuesta. Conserva el valor original junto con el resultado propuesto, la evidencia, el sustento, el método, la confianza y la revisión humana; el historial registra quién cambió qué y cuándo. La recodificación no borra el dato declarado ni convierte una sugerencia en decisión automática. Cuando una empresa o un análisis se archivan, se guarda un respaldo completo —incluidos los adjuntos— antes de eliminarse.

<figure class="my-6 not-prose media-scroll">
  <a href="/images/proyectos/bitacora-edo/03-sustento-critica.png" target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura del seguimiento de críticas">
    <img src="/images/proyectos/bitacora-edo/03-sustento-critica.png" alt="Vista de demostración del seguimiento de críticas y revisiones pendientes" class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
  </a>
  <figcaption class="mt-2 text-left text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">La revisión mantiene los casos y sus estados visibles para dar seguimiento al sustento.</figcaption>
</figure>

## Cómo lo construí

Diseñé el sistema completo —de la regla de negocio al criterio de aceptación— y conduje la implementación con asistentes de IA, revisando el cambio y su evidencia en cada paso.

- **El modelo de auditoría.** Veinte tablas que guardan valor original, resultado, método, confianza, evidencia, sustento y revisión, con historial en cada registro que puede cambiar.
- **Las reglas de la recodificación.** Qué se puede reasignar, qué se conserva siempre, cuándo se penaliza un candidato y cuándo es mejor no mostrar ninguno.
- **El pipeline de recuperación.** Cinco ramas, una fusión y un ordenamiento cuyos pesos se pueden leer en voz alta.
- **La normalización del PDF.** El paso que convierte un formulario roto en una estructura con secciones y preguntas confiables.
- **Las pruebas.** 469 casos automáticos: cada corrección de regla entra con la prueba que la sostiene.

<div class="my-6 not-prose grid grid-cols-2 gap-3 sm:grid-cols-4">
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">20</p>
    <p class="mt-1 text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">modelos de datos</p>
  </div>
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">53</p>
    <p class="mt-1 text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">migraciones de esquema</p>
  </div>
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">469</p>
    <p class="mt-1 text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">pruebas automáticas</p>
  </div>
  <div class="border-2 border-neutral-900 p-4 dark:border-neutral-700">
    <p class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">+24.000</p>
    <p class="mt-1 text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">líneas de Python</p>
  </div>
</div>

## Privacidad y control

Todo funciona en el equipo: la base es local y no hay sincronización con servicios externos. Nada sale de la máquina salvo que se elija expresamente un modelo remoto, y la aplicación indica qué se envía en cada caso. Al recodificar viajan la consulta, el contexto pertinente, el RUC, la razón social y los candidatos oficiales; no viaja la encuesta completa, ni las encuestas de otras empresas, ni credenciales en el cuerpo del mensaje. Al analizar una encuesta el envío remoto se decide encuesta por encuesta, porque ese documento sí puede contener datos identificatorios y de contacto.

Tampoco se guarda de más: las decisiones de revisión no entrenan modelos, los respaldos se generan antes de cualquier migración y cada operación destructiva deja primero su copia.

## Límites

- No decide. Ordena candidatos y conserva lo que alguien decidió con evidencia.
- No reemplaza la validación en campo ni la llamada de verificación al contacto.
- Depende del catálogo oficial: si una ocupación no existe en la CNO, no se inventa.
- No programa recordatorios ni acciones futuras.
- La calidad de la lectura depende de cuánto se pueda reconstruir la estructura del PDF original.

## Tecnología

Python, Django y PostgreSQL sostienen la aplicación. Django Templates, HTMX y Bootstrap resuelven la interfaz. MarkItDown 0.1.9 convierte los PDF dentro del entorno del proyecto sobre Fedora Linux; la normalización estructural y el ordenamiento se implementaron como reglas propias para poder explicar cada resultado, y los embeddings se calculan en el equipo con un modelo multilingüe pequeño. Ollama y OpenCode Go se usan solo para reordenar candidatos y proponer denominaciones alternativas.

## Por qué este proyecto

Vengo de Ciencia Política. Ahí aprendí dos cosas que sigo usando: un dato sin su fuente no se puede defender, y una clasificación es un acuerdo entre personas, no una verdad natural. Hoy estudio desarrollo de sistemas y me interesa la seguridad; de ahí vienen las decisiones de diseño de este proyecto: local por defecto, respaldo antes de migrar y registro de quién hizo qué.

La Bitácora EDO 2026 junta esas tres cosas en el mismo lugar: método de investigación, criterio técnico y cuidado del dato.
