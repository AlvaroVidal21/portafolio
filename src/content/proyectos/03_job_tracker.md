---
title: Gestor de postulaciones
author: Alva Vidal
description: Herramienta para registrar postulaciones, consultar su estado y analizar el avance de una búsqueda laboral con un dashboard web y reportes en Python.
technologies: ["php", "pandas", "sqlite", "bootstrap", "python"]
github: "https://github.com/AlvaroVidal21/Gestor_posulaciones"
status: "Completado"
---

# Gestor de postulaciones

## Problema

Durante mi búsqueda laboral, los datos de cada postulación estaban repartidos entre plataformas, correos, mensajería y hojas de cálculo. Era difícil recordar a qué puesto había postulado, cuándo lo hice y en qué estado estaba cada proceso.

## Proceso y datos

El sistema registra empresa, puesto, plataforma, enlace y fecha de cada postulación. También mantiene estados para consultar las postulaciones activas, vencidas y rechazadas.

## Solución

Construí una aplicación web para registrar y filtrar postulaciones sin recargar la página. Si pasan más de quince días sin novedades, el sistema marca una postulación como vencida. Un script de Python lee la misma base y presenta resúmenes de la búsqueda en la terminal.

## Tecnología

PHP, SQLite, Bootstrap y JavaScript para la aplicación; Python y Pandas para los reportes.
