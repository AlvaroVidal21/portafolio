This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/**/*
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
src/
  assets/
    astro.svg
    background.svg
    perfil01.jpg
  components/
    TechBadge.astro
    Welcome.astro
  constants/
    technologies.ts
  content/
    blogs/
      01_elecciones_2026.md
      02_en_busqueda_deLaCarrera.md
      03_sobre_la_ia.md
    proyectos/
      01_fiados.md
      02_analisis_presupuesto.md
      03_job_tracker.md
  layouts/
    Layout.astro
  pages/
    blog/
      [id].astro
    proyecto/
      [id].astro
    index.astro
  styles/
    global.css
  content.config.ts
```

# Files

## File: src/components/TechBadge.astro
```astro
---
import { TECNOLOGIAS } from "../constants/technologies";

interface Props {
  tech: string;
}

const { tech } = Astro.props;
const config = TECNOLOGIAS[tech];
---

<span class:list={[
  "inline-block px-2.5 py-0.5 border-2 text-[9px] font-bold tracking-wide shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)]",
  config?.bg ?? "bg-neutral-200 border-neutral-950",
  config?.text ?? "text-neutral-950"
]}>
  {config?.icon && <span class="mr-0.5">{config.icon}</span>}{config?.label ?? tech}
</span>
```

## File: src/constants/technologies.ts
```typescript
// src/constants/technologies.ts

export interface TechnologyConfig {
  bg: string;
  text: string;
  label: string;
  icon?: string;
}

export const TECNOLOGIAS: Record<string, TechnologyConfig> = {
  springboot: {
    bg: "bg-emerald-200 border-emerald-950",
    text: "text-emerald-950",
    label: "Spring Boot",
    icon: "🍃"
  },
  angular: {
    bg: "bg-red-200 border-red-950",
    text: "text-red-950",
    label: "Angular",
    icon: "🅰"
  },
  postgres: {
    bg: "bg-sky-200 border-sky-950",
    text: "text-sky-950",
    label: "PostgreSQL",
    icon: "🐘"
  },
  python: {
    bg: "bg-amber-200 border-amber-950",
    text: "text-amber-950",
    label: "Python",
    icon: "🐍"
  },
  pandas: {
    bg: "bg-indigo-200 border-indigo-950",
    text: "text-indigo-950",
    label: "Pandas",
    icon: "🐼"
  },
  sqlite: {
    bg: "bg-blue-200 border-blue-950",
    text: "text-blue-950",
    label: "SQLite",
    icon: "🗄️"
  },
  flask: {
    bg: "bg-stone-200 border-stone-950",
    text: "text-stone-950",
    label: "Flask",
    icon: "🧪"
  },
  fastapi: {
    bg: "bg-teal-200 border-teal-950",
    text: "text-teal-950",
    label: "FastAPI",
    icon: "⚡"
  },
  php: {
    bg: "bg-violet-200 border-violet-950",
    text: "text-violet-950",
    label: "PHP",
    icon: "🐘"
  },
  bootstrap: {
    bg: "bg-fuchsia-200 border-fuchsia-950",
    text: "text-fuchsia-950",
    label: "Bootstrap",
    icon: "🅱"
  },
  // Aquí puedes seguir agregando más a futuro (ej: react, tailwind, etc.)
};
```

## File: src/content/proyectos/01_fiados.md
```markdown
---
title: Fiados
author: Alva Vidal 
description: Una solución de software pensando en el usuario que se pide fiados en bodegas y necesita tener una trazabilidad de dichas deudas.
technologies: ["springboot", "angular", "postgres"]
github: "https://github.com/..."
video: "https://www.youtube.com/embed/..."
status: "En progreso"
---


# Sobre el proyecto

Este proyecto se sumerge en el análisis detallado de la ejecución presupuestal, transformando datos complejos en insights claros y accionables. Nuestro objetivo es optimizar la toma de decisiones y mejorar la eficiencia en la gestión de recursos.
```

## File: src/content/proyectos/02_analisis_presupuesto.md
```markdown
---
title: Análisis presupuestal
author: Alva Vidal 
description: Análisis de datos sobre la ejecución presupuestal de una entidad.
technologies: ["python", "pandas", "sqlite"]
---

## Sobre el proyecto
```

## File: src/content/proyectos/03_job_tracker.md
```markdown
---
title: Gestor de postulaciones
author: Alva Vidal 
description: Screaper y CRM de trabajos
technologies: ["php", "pandas", "sqlite", "bootstrap"]
---
```

## File: src/pages/proyecto/[id].astro
```astro
---
import { getCollection, render } from "astro:content";
import Layout from "../../layouts/Layout.astro";
import TechBadge from "../../components/TechBadge.astro";

export async function getStaticPaths() {
  const proyectos = await getCollection("proyectos");
  return proyectos.map((project) => ({
    params: { id: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { title, author, description, technologies } = project.data;
const { Content } = await render(project);
---

<Layout>
  <article class="max-w-2xl mx-auto">
    <h1 class="text-4xl font-extrabold tracking-tight border-b-2 border-neutral-900 pb-3 mb-2" transition:name={`post-title-${project.id}`}>
      {title}
    </h1>
    <p class="text-neutral-500 text-xs mb-4">
      <em class="text-blue-900">Por {author}</em>
    </p>
    {technologies && (
      <div class="flex flex-wrap justify-end gap-2 mb-6">
        {technologies.map((tech) => (
          <TechBadge tech={tech} />
        ))}
      </div>
    )}
    <div class="prose prose-neutral max-w-none text-justify">
      <Content />
    </div>
  </article>
</Layout>
```

## File: src/assets/astro.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="115" height="48"><path fill="#17191E" d="M7.77 36.35C6.4 35.11 6 32.51 6.57 30.62c.99 1.2 2.35 1.57 3.75 1.78 2.18.33 4.31.2 6.33-.78.23-.12.44-.27.7-.42.18.55.23 1.1.17 1.67a4.56 4.56 0 0 1-1.94 3.23c-.43.32-.9.61-1.34.91-1.38.94-1.76 2.03-1.24 3.62l.05.17a3.63 3.63 0 0 1-1.6-1.38 3.87 3.87 0 0 1-.63-2.1c0-.37 0-.74-.05-1.1-.13-.9-.55-1.3-1.33-1.32a1.56 1.56 0 0 0-1.63 1.26c0 .06-.03.12-.05.2Z"/><path fill="url(#a)" d="M7.77 36.35C6.4 35.11 6 32.51 6.57 30.62c.99 1.2 2.35 1.57 3.75 1.78 2.18.33 4.31.2 6.33-.78.23-.12.44-.27.7-.42.18.55.23 1.1.17 1.67a4.56 4.56 0 0 1-1.94 3.23c-.43.32-.9.61-1.34.91-1.38.94-1.76 2.03-1.24 3.62l.05.17a3.63 3.63 0 0 1-1.6-1.38 3.87 3.87 0 0 1-.63-2.1c0-.37 0-.74-.05-1.1-.13-.9-.55-1.3-1.33-1.32a1.56 1.56 0 0 0-1.63 1.26c0 .06-.03.12-.05.2Z"/><path fill="#17191E" d="M.02 30.31s4.02-1.95 8.05-1.95l3.04-9.4c.11-.45.44-.76.82-.76.37 0 .7.31.82.76l3.04 9.4c4.77 0 8.05 1.95 8.05 1.95L17 11.71c-.2-.56-.53-.91-.98-.91H7.83c-.44 0-.76.35-.97.9L.02 30.31Zm42.37-5.97c0 1.64-2.05 2.62-4.88 2.62-1.85 0-2.5-.45-2.5-1.41 0-1 .8-1.49 2.65-1.49 1.67 0 3.09.03 4.73.23v.05Zm.03-2.04a21.37 21.37 0 0 0-4.37-.36c-5.32 0-7.82 1.25-7.82 4.18 0 3.04 1.71 4.2 5.68 4.2 3.35 0 5.63-.84 6.46-2.92h.14c-.03.5-.05 1-.05 1.4 0 1.07.18 1.16 1.06 1.16h4.15a16.9 16.9 0 0 1-.36-4c0-1.67.06-2.93.06-4.62 0-3.45-2.07-5.64-8.56-5.64-2.8 0-5.9.48-8.26 1.19.22.93.54 2.83.7 4.06 2.04-.96 4.95-1.37 7.2-1.37 3.11 0 3.97.71 3.97 2.15v.57Zm11.37 3c-.56.07-1.33.07-2.12.07-.83 0-1.6-.03-2.12-.1l-.02.58c0 2.85 1.87 4.52 8.45 4.52 6.2 0 8.2-1.64 8.2-4.55 0-2.74-1.33-4.09-7.2-4.39-4.58-.2-4.99-.7-4.99-1.28 0-.66.59-1 3.65-1 3.18 0 4.03.43 4.03 1.35v.2a46.13 46.13 0 0 1 4.24.03l.02-.55c0-3.36-2.8-4.46-8.2-4.46-6.08 0-8.13 1.49-8.13 4.39 0 2.6 1.64 4.23 7.48 4.48 4.3.14 4.77.62 4.77 1.28 0 .7-.7 1.03-3.71 1.03-3.47 0-4.35-.48-4.35-1.47v-.13Zm19.82-12.05a17.5 17.5 0 0 1-6.24 3.48c.03.84.03 2.4.03 3.24l1.5.02c-.02 1.63-.04 3.6-.04 4.9 0 3.04 1.6 5.32 6.58 5.32 2.1 0 3.5-.23 5.23-.6a43.77 43.77 0 0 1-.46-4.13c-1.03.34-2.34.53-3.78.53-2 0-2.82-.55-2.82-2.13 0-1.37 0-2.65.03-3.84 2.57.02 5.13.07 6.64.11-.02-1.18.03-2.9.1-4.04-2.2.04-4.65.07-6.68.07l.07-2.93h-.16Zm13.46 6.04a767.33 767.33 0 0 1 .07-3.18H82.6c.07 1.96.07 3.98.07 6.92 0 2.95-.03 4.99-.07 6.93h5.18c-.09-1.37-.11-3.68-.11-5.65 0-3.1 1.26-4 4.12-4 1.33 0 2.28.16 3.1.46.03-1.16.26-3.43.4-4.43-.86-.25-1.81-.41-2.96-.41-2.46-.03-4.26.98-5.1 3.38l-.17-.02Zm22.55 3.65c0 2.5-1.8 3.66-4.64 3.66-2.81 0-4.61-1.1-4.61-3.66s1.82-3.52 4.61-3.52c2.82 0 4.64 1.03 4.64 3.52Zm4.71-.11c0-4.96-3.87-7.18-9.35-7.18-5.5 0-9.23 2.22-9.23 7.18 0 4.94 3.49 7.59 9.21 7.59 5.77 0 9.37-2.65 9.37-7.6Z"/><defs><linearGradient id="a" x1="6.33" x2="19.43" y1="40.8" y2="34.6" gradientUnits="userSpaceOnUse"><stop stop-color="#D83333"/><stop offset="1" stop-color="#F041FF"/></linearGradient></defs></svg>
```

## File: src/assets/background.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1024" fill="none"><path fill="url(#a)" fill-rule="evenodd" d="M-217.58 475.75c91.82-72.02 225.52-29.38 341.2-44.74C240 415.56 372.33 315.14 466.77 384.9c102.9 76.02 44.74 246.76 90.31 366.31 29.83 78.24 90.48 136.14 129.48 210.23 57.92 109.99 169.67 208.23 155.9 331.77-13.52 121.26-103.42 264.33-224.23 281.37-141.96 20.03-232.72-220.96-374.06-196.99-151.7 25.73-172.68 330.24-325.85 315.72-128.6-12.2-110.9-230.73-128.15-358.76-12.16-90.14 65.87-176.25 44.1-264.57-26.42-107.2-167.12-163.46-176.72-273.45-10.15-116.29 33.01-248.75 124.87-320.79Z" clip-rule="evenodd" style="opacity:.154"/><path fill="url(#b)" fill-rule="evenodd" d="M1103.43 115.43c146.42-19.45 275.33-155.84 413.5-103.59 188.09 71.13 409 212.64 407.06 413.88-1.94 201.25-259.28 278.6-414.96 405.96-130 106.35-240.24 294.39-405.6 265.3-163.7-28.8-161.93-274.12-284.34-386.66-134.95-124.06-436-101.46-445.82-284.6-9.68-180.38 247.41-246.3 413.54-316.9 101.01-42.93 207.83 21.06 316.62 6.61Z" clip-rule="evenodd" style="opacity:.154"/><defs><linearGradient id="b" x1="373" x2="1995.44" y1="1100" y2="118.03" gradientUnits="userSpaceOnUse"><stop stop-color="#D83333"/><stop offset="1" stop-color="#F041FF"/></linearGradient><linearGradient id="a" x1="107.37" x2="1130.66" y1="1993.35" y2="1026.31" gradientUnits="userSpaceOnUse"><stop stop-color="#3245FF"/><stop offset="1" stop-color="#BC52EE"/></linearGradient></defs></svg>
```

## File: src/components/Welcome.astro
```astro
---
import astroLogo from '../assets/astro.svg';
import background from '../assets/background.svg';
---

<div id="container">
	<img id="background" src={background.src} alt="" fetchpriority="high" />
	<main>
		<section id="hero">
			<a href="https://astro.build"
				><img src={astroLogo.src} width="115" height="48" alt="Astro Homepage" /></a
			>
			<h1>
				To get started, open the <code><pre>src/pages</pre></code> directory in your project.
			</h1>
			<section id="links">
				<a class="button" href="https://docs.astro.build">Read our docs</a>
				<a href="https://astro.build/chat"
					>Join our Discord <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36"
						><path
							fill="currentColor"
							d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69Z"
						></path></svg
					>
				</a>
			</section>
		</section>
	</main>

	<a href="https://astro.build/blog/astro-6-beta/" id="news" class="box">
		<svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"
			><path
				d="M24.667 12c1.333 1.414 2 3.192 2 5.334 0 4.62-4.934 5.7-7.334 12C18.444 28.567 18 27.456 18 26c0-4.642 6.667-7.053 6.667-14Zm-5.334-5.333c1.6 1.65 2.4 3.43 2.4 5.333 0 6.602-8.06 7.59-6.4 17.334C13.111 27.787 12 25.564 12 22.666c0-4.434 7.333-8 7.333-16Zm-6-5.333C15.111 3.555 16 5.556 16 7.333c0 8.333-11.333 10.962-5.333 22-3.488-.774-6-4-6-8 0-8.667 8.666-10 8.666-20Z"
				fill="#111827"></path></svg
		>
		<h2>What's New in Astro 6.0?</h2>
		<p>
			Redesigned dev server, fonts, live collections, built-in CSP support, and more! Click to
			explore Astro 6.0's new features.
		</p>
	</a>
</div>

<style>
	#background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(100px);
	}

	#container {
		font-family: Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif;
		height: 100%;
	}

	main {
		height: 100%;
		display: flex;
		justify-content: center;
	}

	#hero {
		display: flex;
		align-items: start;
		flex-direction: column;
		justify-content: center;
		padding: 16px;
	}

	h1 {
		font-size: 22px;
		margin-top: 0.25em;
	}

	#links {
		display: flex;
		gap: 16px;
	}

	#links a {
		display: flex;
		align-items: center;
		padding: 10px 12px;
		color: #111827;
		text-decoration: none;
		transition: color 0.2s;
	}

	#links a:hover {
		color: rgb(78, 80, 86);
	}

	#links a svg {
		height: 1em;
		margin-left: 8px;
	}

	#links a.button {
		color: white;
		background: linear-gradient(83.21deg, #3245ff 0%, #bc52ee 100%);
		box-shadow:
			inset 0 0 0 1px rgba(255, 255, 255, 0.12),
			inset 0 -2px 0 rgba(0, 0, 0, 0.24);
		border-radius: 10px;
	}

	#links a.button:hover {
		color: rgb(230, 230, 230);
		box-shadow: none;
	}

	pre {
		font-family:
			ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono',
			monospace;
		font-weight: normal;
		background: linear-gradient(14deg, #d83333 0%, #f041ff 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 0;
	}

	h2 {
		margin: 0 0 1em;
		font-weight: normal;
		color: #111827;
		font-size: 20px;
	}

	p {
		color: #4b5563;
		font-size: 16px;
		line-height: 24px;
		letter-spacing: -0.006em;
		margin: 0;
	}

	code {
		display: inline-block;
		background:
			linear-gradient(66.77deg, #f3cddd 0%, #f5cee7 100%) padding-box,
			linear-gradient(155deg, #d83333 0%, #f041ff 18%, #f5cee7 45%) border-box;
		border-radius: 8px;
		border: 1px solid transparent;
		padding: 6px 8px;
	}

	.box {
		padding: 16px;
		background: rgba(255, 255, 255, 1);
		border-radius: 16px;
		border: 1px solid white;
	}

	#news {
		position: absolute;
		bottom: 16px;
		right: 16px;
		max-width: 300px;
		text-decoration: none;
		transition: background 0.2s;
		backdrop-filter: blur(50px);
	}

	#news:hover {
		background: rgba(255, 255, 255, 0.55);
	}

	@media screen and (max-height: 368px) {
		#news {
			display: none;
		}
	}

	@media screen and (max-width: 768px) {
		#container {
			display: flex;
			flex-direction: column;
		}

		#hero {
			display: block;
			padding-top: 10%;
		}

		#links {
			flex-wrap: wrap;
		}

		#links a.button {
			padding: 14px 18px;
		}

		#news {
			right: 16px;
			left: 16px;
			bottom: 2.5rem;
			max-width: 100%;
		}

		h1 {
			line-height: 1.5;
		}
	}
</style>
```

## File: src/layouts/Layout.astro
```astro
---
import "../styles/global.css";
import { ClientRouter } from "astro:transitions";
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="generator" content={Astro.generator} />
    <title>Alva Blogs</title>
    <ClientRouter />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Noto+Sans+JP:wght@400;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    class="bg-neutral-50 text-neutral-900 font-['Inter','Noto_Sans_JP',sans-serif] antialiased leading-relaxed min-h-screen"
  >
    <header class="border-b-2 border-neutral-900 mb-10">
      <div class="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
        <a href="/" class="text-lg font-extrabold tracking-tight">Alva</a>
        <nav class="flex gap-6 text-sm font-semibold uppercase tracking-widest">
          <a href="/" class="hover:text-neutral-500 transition-colors">Blog</a>
          <a href="/about" class="hover:text-neutral-500 transition-colors">About</a>
        </nav>
      </div>
    </header>

    <main class="px-5 pb-16">
      <slot />
    </main>

    <footer class="border-t-2 border-neutral-900">
      <div class="max-w-2xl mx-auto px-5 py-4 text-center text-xs text-neutral-500 tracking-wider">
        &copy; 2026 Alva
      </div>
    </footer>
  </body>
</html>
```

## File: src/styles/global.css
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

## File: src/content/blogs/01_elecciones_2026.md
```markdown
---
title: Qué nos dice las elecciones del 2026?
author: Alva Vidal 
description: Una columna de opinión sobre la coyuntura electoral y política que atraviesa el Perú
---


## [1] Introducción

Un dejavu es una sensación donde creemos que algo ya lo hemos vivido, y estas elecciones el 2026 es claramente uno. Cuál es patrón que siempre se repite?, obviamente la respuesta es **Keiko Fujimori, ella es la fuente de la inestabilidad**, pero a la par, es el único partido político consolidado en el Perú, vaya contradicción, si el fujimorismo gobernara para las mayorías, posiblemente Keiko hubiese sido presidenta a lo mucho, en el segundo o tercer intento. 


Pero el fujimorismo, solo le importó hacer clientelismo y populismo barato, aprovecharse que la gente dejó de exigir al Estado, esto gracias a las ideas y libros de automotivación, donde uno cree falsamente que la vida depende de uno mismo, que uno es arquitecto de su destino y tonterías así, donde los pitucos creen que "el pobre es pobre porque quiere", cuando en muchas ocasiones podríamos decir que uno es pobre porque sus padres no era ricos. 


Pero, para esos temas sociales de alta complejidad de las decisiones personales donde tenemos más control (no el total, aunque muchos creean lo contrario), lo social (donde tenemos muy poca influencia, no decidimos dónde nacemos, quiénes son nuestros padres, ni tampoco por más buena gente que seamos agradaremos a todos) y donde menos poder tenemos en el azar y la entropía. 


## [2] Contenido Principal

Como decía Porky, Rafel Lopez Aliaga, hasta un panetón le ganaría a Keiko. Y a diferencias de tantas cosas, esta vez no estaba equivocada.
```

## File: src/content/blogs/02_en_busqueda_deLaCarrera.md
```markdown
---
title: En búsqueda de ser alguien a los 31
author: Alva Vidal 
description: Una reflexión sobre el naufragio espiritual, académico y profesional.
---


## [1] Introducción

Un dejavu es una sensación donde creemos que algo ya lo hemos vivido, y estas elecciones el 2026 es claramente uno. Cuál es patrón que siempre se repite?, obviamente la respuesta es **Keiko Fujimori, ella es la fuente de la inestabilidad**, pero a la par, es el único partido político consolidado en el Perú, vaya contradicción, si el fujimorismo gobernara para las mayorías, posiblemente Keiko hubiese sido presidenta a lo mucho, en el segundo o tercer intento. 


Pero el fujimorismo, solo le importó hacer clientelismo y populismo barato, aprovecharse que la gente dejó de exigir al Estado, esto gracias a las ideas y libros de automotivación, donde uno cree falsamente que la vida depende de uno mismo, que uno es arquitecto de su destino y tonterías así, donde los pitucos creen que "el pobre es pobre porque quiere", cuando en muchas ocasiones podríamos decir que uno es pobre porque sus padres no era ricos. 


Pero, para esos temas sociales de alta complejidad de las decisiones personales donde tenemos más control (no el total, aunque muchos creean lo contrario), lo social (donde tenemos muy poca influencia, no decidimos dónde nacemos, quiénes son nuestros padres, ni tampoco por más buena gente que seamos agradaremos a todos) y donde menos poder tenemos en el azar y la entropía. 


## [2] Contenido Principal

Como decía Porky, Rafel Lopez Aliaga, hasta un panetón le ganaría a Keiko. Y a diferencias de tantas cosas, esta vez no estaba equivocada.
```

## File: src/content/blogs/03_sobre_la_ia.md
```markdown
---
title: Los peligros de la IA
author: Alva Vidal 
description: Una reflexión sobre "músculo que no se usa, se atrofia"
---


## [1] Introducción

Un dejavu es una sensación donde creemos que algo ya lo hemos vivido, y estas elecciones el 2026 es claramente uno. Cuál es patrón que siempre se repite?, obviamente la respuesta es **Keiko Fujimori, ella es la fuente de la inestabilidad**, pero a la par, es el único partido político consolidado en el Perú, vaya contradicción, si el fujimorismo gobernara para las mayorías, posiblemente Keiko hubiese sido presidenta a lo mucho, en el segundo o tercer intento. 


Pero el fujimorismo, solo le importó hacer clientelismo y populismo barato, aprovecharse que la gente dejó de exigir al Estado, esto gracias a las ideas y libros de automotivación, donde uno cree falsamente que la vida depende de uno mismo, que uno es arquitecto de su destino y tonterías así, donde los pitucos creen que "el pobre es pobre porque quiere", cuando en muchas ocasiones podríamos decir que uno es pobre porque sus padres no era ricos. 


Pero, para esos temas sociales de alta complejidad de las decisiones personales donde tenemos más control (no el total, aunque muchos creean lo contrario), lo social (donde tenemos muy poca influencia, no decidimos dónde nacemos, quiénes son nuestros padres, ni tampoco por más buena gente que seamos agradaremos a todos) y donde menos poder tenemos en el azar y la entropía. 


## [2] Contenido Principal

Como decía Porky, Rafel Lopez Aliaga, hasta un panetón le ganaría a Keiko. Y a diferencias de tantas cosas, esta vez no estaba equivocada.
```

## File: src/pages/blog/[id].astro
```astro
---
import { getCollection, render } from "astro:content";
import Layout from "../../layouts/Layout.astro";

export async function getStaticPaths(){
    const blogs = await getCollection("blogs");
    return blogs.map((blog) => ({
        params: { id: blog.id },
        props: { blog }
    }))
}

const { blog } = Astro.props;
const { title, author } = blog.data;
const { Content } = await render(blog);

---

<Layout>
  <article class="max-w-2xl mx-auto">
    <h1 class="text-4xl font-extrabold tracking-tight border-b-2 border-neutral-900 pb-3 mb-2" transition:name={`post-title-${blog.id}`}>
      {title}
    </h1>
    <p class="text-neutral-500 text-xs mb-8">
      <em class="text-blue-900">Por {author}</em>
    </p>
    <div class="prose prose-neutral max-w-none text-justify">
      <Content />
    </div>
  </article>
</Layout>
```

## File: src/content.config.ts
```typescript
import { defineCollection } from "astro:content";
// z: Zod is a powerful schema description language and data

import { glob } from 'astro/loaders';

import { z } from 'astro/zod';


const blogs = defineCollection({
    // El rastreador busca cualquier .md dentro de /blogs
    loader: glob({
        pattern: '**/[^_]*.md',
        base: "./src/content/blogs"   
        }),
    // El contrato
    schema: z.object({
        title: z.string(),
        author: z.string(),
        description: z.string()
    }),
});

const proyectos = defineCollection({
    loader: glob({
        pattern: '**/[^_]*.md',
        base: "./src/content/proyectos"
    }),
    schema: z.object({
        title: z.string(),
        author: z.string(),
        description: z.string(),
        technologies: z.array(z.string()).optional(),
        github: z.string().optional(),
        video: z.string().optional(),
        status: z.enum(['En progreso', 'completado', 'pausado']).optional()
    }),
});

// Se registra la colección en astro
export const collections  = { blogs, proyectos };
```

## File: src/pages/index.astro
```astro
---
import { getCollection } from "astro:content";
import Layout from "../layouts/Layout.astro";
import perfil from "../assets/perfil01.jpg";
import TechBadge from "../components/TechBadge.astro";

const posts = await getCollection("blogs");
const proyectos = await getCollection("proyectos");
const recentPosts = posts.slice(0, 3);
const featuredProjects = proyectos.slice(0, 3);
---

<Layout>
  <div class="max-w-6xl mx-auto space-y-4 md:h-[calc(100svh-14rem)] md:flex md:flex-col md:overflow-hidden">
    <div class="flex flex-col md:flex-row gap-5 md:flex-1 md:min-h-0 md:items-stretch">
      <aside class="md:w-[30%] min-w-0 md:min-h-0">
        <div class="relative border-2 border-neutral-900 overflow-hidden bg-white md:h-full md:flex md:flex-col">
          <div class="px-4 pt-4 pb-2 border-b-2 border-neutral-900 text-center">
            <h1 class="text-xl font-extrabold tracking-tight text-neutral-900">
              Alva Vidal
            </h1>
            <p class="mt-1 text-neutral-500 text-xs tracking-wide">
              — 思ったこと、感じたこと —
            </p>
          </div>
          <img
            src={perfil.src}
            alt="Foto de perfil"
            class="relative w-full h-auto max-h-[22vh] md:flex-1 md:min-h-0 md:max-h-none object-contain"
          />

          <div class="flex flex-wrap justify-center gap-2 border-t-2 border-neutral-900 px-4 py-2">
            <span class="inline-block -rotate-2 border-2 border-neutral-900 bg-amber-300 px-3 py-1 text-xs font-extrabold tracking-wide text-amber-950 shadow-[3px_3px_0_#111827]">
              Desarrollador
            </span>
            <span class="inline-block rotate-1 border-2 border-neutral-900 bg-amber-300 px-3 py-1 text-xs font-extrabold tracking-wide text-amber-950 shadow-[3px_3px_0_#111827]">
              Politólogo
            </span>
          </div>
          <div class="border-t-2 border-neutral-900 px-4 py-2.5">
            <p class="text-neutral-600 text-sm leading-relaxed">
              Estudiante de 4to Ciclo de la carrera de Desarrollo de Sistemas en Idat. Bachiller en Ciencia Política (UNMSM). Especializado en Derecho Internacional (Unisimón - Colombia).
            </p>
          </div>
        </div>
      </aside>

      <main class="md:w-[70%] min-w-0 space-y-2.5 md:flex md:flex-col md:min-h-0">
        <div class="flex items-center justify-between gap-4 border-b-2 border-neutral-900 pb-1.5">
          <h2 class="text-lg font-extrabold tracking-tight text-neutral-900">
            Blogs recientes
          </h2>
          <a
            href="/blog"
            class="inline-block -rotate-1 border-2 border-neutral-900 bg-amber-300 px-2.5 py-0.5 text-xs font-extrabold tracking-wide text-amber-950 shadow-[3px_3px_0_#111827] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
          >
            Ver todos
          </a>
        </div>

        <div class="space-y-1.5 md:flex md:flex-1 md:min-h-0 md:flex-col">
          {
            recentPosts.map((post) => {
              const { id, data } = post;
              const { title, author, description } = data;

              return (
                <article class="relative border-2 border-neutral-900 bg-white p-2.5 shadow-[4px_4px_0_#111827] md:flex-1">
                  <div class="absolute -top-2.5 -left-2.5 w-4 h-4 bg-neutral-900" />
                  <div class="absolute -top-2.5 -right-2.5 w-4 h-4 bg-neutral-900" />
                  <div class="pointer-events-none absolute inset-1 border border-black/10" />
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <span class="h-px w-5 bg-amber-700/70"></span>
                    </div>
                    <h3
                      class="text-sm font-extrabold tracking-tight text-neutral-950 leading-tight"
                      transition:name={`post-title-${id}`}
                    >
                      {title}
                    </h3>
                    <p class="text-[10px] font-medium italic text-neutral-500">
                      Por <span class="text-blue-900">{author}</span>
                    </p>
                    <p class="text-neutral-700 text-xs leading-relaxed line-clamp-2">
                      {description}
                    </p>
                  </div>
                  <div class="mt-1.5">
                    <a
                      href={`/blog/${id}`}
                      class="relative z-10 inline-block px-3 py-1 border-2 border-neutral-900 text-[10px] font-bold tracking-wide text-neutral-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-900 hover:text-neutral-50 hover:shadow-[2px_2px_0_#111827]"
                    >
                      Ver mas
                    </a>
                  </div>
                </article>
              );
            })
          }
        </div>
      </main>
    </div>

    <section class="space-y-1.5 md:flex-none">
      <div class="flex items-center justify-between gap-4 border-b-2 border-neutral-900 pb-1.5">
        <h2 class="text-lg font-extrabold tracking-tight text-neutral-900">
          Proyectos destacados
        </h2>
        <a
          href="#"
          class="inline-block rotate-1 border-2 border-neutral-900 bg-amber-300 px-2.5 py-0.5 text-xs font-extrabold tracking-wide text-amber-950 shadow-[3px_3px_0_#111827] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
        >
          Ver todos
        </a>
      </div>

      <div class="grid gap-2 md:grid-cols-3">
        {
          featuredProjects.map((project) => (
            <article class="relative border-2 border-neutral-900 bg-white p-3 min-h-24 shadow-[4px_4px_0_#111827]">
                  <div class="absolute -top-2.5 -left-2.5 w-4 h-4 bg-neutral-900" />
                  <div class="absolute -top-2.5 -right-2.5 w-4 h-4 bg-neutral-900" />
                  <div class="pointer-events-none absolute inset-1 border border-black/10" />
                  <div class="flex h-full flex-col justify-between gap-2">
                    <div class="space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="h-px w-5 bg-amber-700/70"></span>
                      </div>
                      <h3 class="text-sm font-extrabold tracking-tight text-neutral-950 leading-tight" transition:name={`post-title-${project.id}`}>
                        {project.data.title}
                      </h3>
                      <p class="text-[10px] font-medium italic text-neutral-500">
                        Por <span class="text-blue-900">{project.data.author}</span>
                      </p>
                      <p class="text-xs leading-relaxed text-neutral-600 line-clamp-2">
                        {project.data.description}
                      </p>
                      {project.data.technologies && (
                        <div class="flex flex-wrap justify-end gap-1.5 pt-1">
                          {project.data.technologies.map((tech) => (
                            <TechBadge tech={tech} />
                          ))}
                        </div>
                      )}
                </div>
                <a
                  href={`/proyecto/${project.id}`}
                  class="relative z-10 inline-block w-fit border-2 border-neutral-900 px-3 py-1 text-[10px] font-bold tracking-wide text-neutral-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-900 hover:text-neutral-50 hover:shadow-[2px_2px_0_#111827]"
                >
                  Ver mas
                </a>
              </div>
            </article>
          ))
        }
      </div>
    </section>

  </div>
</Layout>
```
