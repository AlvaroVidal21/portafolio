---
title: Devengados SIAF
author: Alva Vidal
description: Herramienta que organiza información del SIAF y clasifica órdenes de servicio para facilitar la conciliación y el seguimiento de su estado operativo y presupuestal.
technologies: ["python", "pandas", "excel"]
github: "https://github.com/AlvaroVidal21/Devengados_SIAF"
status: "Completado"
---

# Devengados SIAF: conciliación y seguimiento de órdenes de servicio

## Problema

Revisar órdenes de servicio y sus movimientos presupuestales requiere relacionar información de distintas fechas y documentos. Sin una vista consolidada, resulta difícil reconocer el estado de cada orden y el saldo asociado.

## Proceso y datos

La herramienta extrae registros financieros del SIAF, los consolida y concilia devengados con retenciones para reconstruir montos brutos por mes. Después aplica reglas de clasificación basadas en los movimientos, montos y plazos disponibles.

## Solución

El reporte organiza las órdenes en cinco estados operativos —concluida, rebaja parcial, rebaja total, por rebajar y vigente— y propone una acción de seguimiento para cada caso.

En una ejecución, el reporte identificó **S/ 200,761.07** en saldos comprometidos sin devengar. Es un hallazgo para revisión y validación administrativa; no representa dinero recuperado.

<img src="/images/proyectos/proyecto02/mermaid01.svg" alt="Flujo de clasificación de estados de órdenes de servicio" class="w-full h-auto" />

<img src="/images/proyectos/proyecto02/hoja_calculo.png" alt="Reporte de órdenes de servicio con saldos comprometidos sin devengar" class="w-full h-auto border-2 border-neutral-900 dark:border-neutral-700" />

## Tecnología

Python, Pandas, Playwright y OpenPyXL; uv gestiona el entorno de Python.
