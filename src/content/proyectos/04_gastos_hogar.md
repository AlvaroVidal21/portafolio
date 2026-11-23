---
title: GastosHogar
author: Alva Vidal
description: Aplicación local de finanzas familiares que facilita el registro de ingresos y gastos con asistencia de inteligencia artificial.
technologies: ["python", "fastapi", "postgres", "sql"]
status: "En progreso"
---

# GastosHogar

## Problema

Llevar el control de las finanzas familiares puede ser difícil cuando registrar cada gasto requiere llenar formularios extensos. La falta de registros claros también dificulta saber cuánto dinero tiene disponible el hogar.

## Proceso y datos

La aplicación reúne los ingresos y gastos de un hogar y calcula un saldo compartido a partir de los movimientos confirmados. Los gastos se pueden registrar manualmente o capturar mediante texto, fotografías y voz con ayuda de inteligencia artificial. La persona revisa los datos antes de confirmarlos; los registros pendientes no afectan el saldo.

## Solución

Estoy desarrollando una aplicación web de ejecución local para consultar movimientos, organizar gastos por categoría y conciliar el saldo calculado con el dinero disponible. Los movimientos anulados conservan su trazabilidad y el motivo de la anulación.

## Tecnología

Python y FastAPI para la aplicación web, PostgreSQL como base de datos y SQL directo mediante asyncpg. La integración con modelos de inteligencia artificial utiliza un cliente compatible con la API de OpenAI.
