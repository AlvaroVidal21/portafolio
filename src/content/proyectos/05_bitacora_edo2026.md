---
title: Bitácora EDO 2026
author: Alva Vidal
description: Aplicación local para organizar el seguimiento de empresas y documentar la revisión, consistencia y recodificación de encuestas de demanda ocupacional.
technologies: ["python", "django", "postgres", "htmx", "bootstrap"]
github: "https://github.com/AlvaroVidal21/edo2026"
status: "En progreso"
---

# Bitácora EDO 2026

## Problema

El seguimiento de una carga de empresas y la revisión posterior de sus encuestas requieren consultar datos, contactos, gestiones y criterios técnicos en distintos momentos. Sin un registro común, cuesta reconstruir qué ocurrió y sustentar las decisiones de revisión.

## Solución

Desarrollo una aplicación web local para centralizar el directorio de empresas, el historial de actividades, las incidencias y el sustento de crítica. Incluye vistas de avance y exportaciones para facilitar el seguimiento y preparar información para supervisión.

## Trazabilidad y análisis

Cada revisión conserva el valor original, el resultado y su sustento. La búsqueda de ocupaciones combina coincidencias textuales y semánticas sobre clasificadores oficiales; los modelos de lenguaje son opcionales y solo pueden reordenar candidatos recuperados. La decisión final permanece en manos del usuario.

La validación de consistencia entre respuestas usa reglas locales y reproducibles, separadas de la recodificación. El sistema también mantiene historial de cambios y permite respaldar la base de datos y las evidencias almacenadas localmente.

## Tecnología

Python, Django y PostgreSQL para la aplicación; Django Templates, HTMX y Bootstrap para la interfaz. La búsqueda semántica local usa Sentence Transformers y NumPy.
