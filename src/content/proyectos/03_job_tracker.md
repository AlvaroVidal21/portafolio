---
title: Gestor de postulaciones y búsqueda laboral con IA
author: Alva Vidal
description: Aplicación local para seguir postulaciones y buscar vacantes actuales con Codex, reglas de evaluación basadas en el perfil y resultados exportables a Excel.
technologies: ["php", "sqlite", "python", "codex", "bootstrap"]
github: "https://github.com/AlvaroVidal21/Gestor_posulaciones"
status: "Completado"
---

# De registrar postulaciones a encontrar nuevas oportunidades

Una búsqueda laboral combina dos tareas distintas: dar seguimiento a los procesos iniciados y encontrar nuevas vacantes que realmente encajen. Este proyecto reúne ambas en una aplicación local: un gestor de postulaciones y un flujo de búsqueda asistido por IA.

## El problema

Las postulaciones suelen quedar dispersas entre portales, correos, mensajes y hojas de cálculo. A la vez, revisar vacantes una por una consume tiempo y hace difícil aplicar criterios consistentes. Necesitaba saber qué procesos requerían seguimiento y convertir una búsqueda en nuevas oportunidades verificables, sin delegar la decisión de postular.

## Dos flujos, un mismo sistema

### 1. Seguimiento de postulaciones

Registro cada postulación con empresa, puesto, plataforma, enlace, fechas y notas. El panel permite buscar y filtrar por estado; las postulaciones sin actualización por más de 15 días aparecen como vencidas. Ese estado se calcula al consultar los datos, así que actualizar el proceso puede reactivarlo sin una migración manual.

Los reportes de Python analizan la misma base SQLite y muestran métricas de la búsqueda desde la terminal.

### 2. Búsqueda de vacantes con Codex

Desde **Buscar trabajo** elijo una familia de puestos, agrego condiciones opcionales y selecciono el modelo. La aplicación crea una búsqueda en cola y muestra su estado e historial mientras el proceso se ejecuta en segundo plano.

Un trabajador en Python prepara una copia temporal de las reglas, fuentes, perfil profesional y vacantes guardadas. Después invoca Codex CLI con búsqueda web en vivo para investigar ofertas actuales. Los criterios priorizan el sector privado en Perú, separan requisitos obligatorios de deseables y piden evidencia directa de cada vacante. Antes de guardar cambios, el flujo valida el registro de vacantes; luego integra los resultados nuevos, conserva las ediciones hechas durante la búsqueda y regenera el Excel.

## La aplicación en uso

Las capturas muestran el panel de postulaciones, el formulario e historial de búsqueda con IA y la lista de oportunidades para revisar. Están tomadas de la aplicación y usan registros ficticios de demostración.

<figure>
  <img src="/images/proyectos/proyecto03/02-busqueda-ia.png" alt="Captura de demostración del formulario de búsqueda laboral con selección de tipo de puesto, detalles opcionales y modelo de Codex, seguida del historial de búsquedas." class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
  <figcaption class="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">Búsqueda asistida por Codex e historial de tareas · datos ficticios</figcaption>
</figure>

<figure>
  <img src="/images/proyectos/proyecto03/03-vacantes.png" alt="Captura de demostración de la lista de vacantes con filtros por modalidad, ubicación, fuente, disponibilidad y tipo de oportunidad." class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
  <figcaption class="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">Vacantes evaluadas para revisión · datos ficticios</figcaption>
</figure>

<figure>
  <img src="/images/proyectos/proyecto03/01-dashboard.png" alt="Captura de demostración del dashboard de postulaciones con métricas de seguimiento, filtros por estado y plataforma, y tabla de registros." class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" loading="lazy" />
  <figcaption class="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">Dashboard de seguimiento de postulaciones · datos ficticios</figcaption>
</figure>

![Flujo de seguimiento y búsqueda de vacantes: la aplicación registra postulaciones y ejecuta una búsqueda con Codex, valida los resultados y actualiza el historial y Excel.](/images/proyectos/proyecto03/flujo.svg)

## Datos y control

Las postulaciones y el historial de búsquedas se guardan localmente en SQLite. Las oportunidades encontradas se mantienen en un registro JSON y se exportan a Excel para revisar, ordenar y continuar el análisis.

La IA investiga y organiza información; no postula ni contacta empresas. Cada vacante conserva sus enlaces y evidencia para que yo pueda comprobar si sigue abierta y decidir qué hacer. Los puntajes sirven para comparar oportunidades según los criterios definidos, no son probabilidades de contratación.

## Tecnología

PHP y Bootstrap construyen la aplicación local. SQLite guarda postulaciones y el estado de las búsquedas. Python ejecuta el trabajo en segundo plano y genera análisis; Codex CLI realiza la investigación web dentro de un espacio temporal. JavaScript añade filtros y actualizaciones de la interfaz, y Node.js mantiene al día el archivo Excel.
