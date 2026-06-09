This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
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
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.github/
  agents/
    Esclavo.agent.md
public/
  favicon.ico
  favicon.svg
src/
  assets/
    astro.svg
    background.svg
  components/
    Welcome.astro
  content/
    blogs/
      01_elecciones_2026.md
      02_en_busqueda_deLaCarrera.md
  layouts/
    Layout.astro
  pages/
    about.astro
    index.astro
  styles/
    global.css
  content.config.ts
.gitignore
AGENTE_LEARNING_NOTES.md
astro.config.mjs
package.json
README.md
tsconfig.json
```

# Files

## File: .github/agents/Esclavo.agent.md
````markdown
---
name: Esclavo
description: Describe what this custom agent does and when to use it.
argument-hint: The inputs this agent expects, e.g., "a task to implement" or "a question to answer".
# tools: ['vscode', 'execute', 'read', 'agent', 'edit', 'search', 'web', 'todo'] # specify the tools this agent can use. If not set, all enabled tools are allowed.

tools: ['read']
---

Lee y responde las preguntas, trata de dar respuestas cortas y directas, no te extiendas mucho. Si no sabes la respuesta, di que no lo sabes. No trates de adivinar o inventar respuestas. Solo responde con la información que tienes disponible.
````

## File: public/favicon.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 128 128">
    <path d="M50.4 78.5a75.1 75.1 0 0 0-28.5 6.9l24.2-65.7c.7-2 1.9-3.2 3.4-3.2h29c1.5 0 2.7 1.2 3.4 3.2l24.2 65.7s-11.6-7-28.5-7L67 45.5c-.4-1.7-1.6-2.8-2.9-2.8-1.3 0-2.5 1.1-2.9 2.7L50.4 78.5Zm-1.1 28.2Zm-4.2-20.2c-2 6.6-.6 15.8 4.2 20.2a17.5 17.5 0 0 1 .2-.7 5.5 5.5 0 0 1 5.7-4.5c2.8.1 4.3 1.5 4.7 4.7.2 1.1.2 2.3.2 3.5v.4c0 2.7.7 5.2 2.2 7.4a13 13 0 0 0 5.7 4.9v-.3l-.2-.3c-1.8-5.6-.5-9.5 4.4-12.8l1.5-1a73 73 0 0 0 3.2-2.2 16 16 0 0 0 6.8-11.4c.3-2 .1-4-.6-6l-.8.6-1.6 1a37 37 0 0 1-22.4 2.7c-5-.7-9.7-2-13.2-6.2Z" />
    <style>
        path { fill: #000; }
        @media (prefers-color-scheme: dark) {
            path { fill: #FFF; }
        }
    </style>
</svg>
````

## File: src/assets/astro.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="115" height="48"><path fill="#17191E" d="M7.77 36.35C6.4 35.11 6 32.51 6.57 30.62c.99 1.2 2.35 1.57 3.75 1.78 2.18.33 4.31.2 6.33-.78.23-.12.44-.27.7-.42.18.55.23 1.1.17 1.67a4.56 4.56 0 0 1-1.94 3.23c-.43.32-.9.61-1.34.91-1.38.94-1.76 2.03-1.24 3.62l.05.17a3.63 3.63 0 0 1-1.6-1.38 3.87 3.87 0 0 1-.63-2.1c0-.37 0-.74-.05-1.1-.13-.9-.55-1.3-1.33-1.32a1.56 1.56 0 0 0-1.63 1.26c0 .06-.03.12-.05.2Z"/><path fill="url(#a)" d="M7.77 36.35C6.4 35.11 6 32.51 6.57 30.62c.99 1.2 2.35 1.57 3.75 1.78 2.18.33 4.31.2 6.33-.78.23-.12.44-.27.7-.42.18.55.23 1.1.17 1.67a4.56 4.56 0 0 1-1.94 3.23c-.43.32-.9.61-1.34.91-1.38.94-1.76 2.03-1.24 3.62l.05.17a3.63 3.63 0 0 1-1.6-1.38 3.87 3.87 0 0 1-.63-2.1c0-.37 0-.74-.05-1.1-.13-.9-.55-1.3-1.33-1.32a1.56 1.56 0 0 0-1.63 1.26c0 .06-.03.12-.05.2Z"/><path fill="#17191E" d="M.02 30.31s4.02-1.95 8.05-1.95l3.04-9.4c.11-.45.44-.76.82-.76.37 0 .7.31.82.76l3.04 9.4c4.77 0 8.05 1.95 8.05 1.95L17 11.71c-.2-.56-.53-.91-.98-.91H7.83c-.44 0-.76.35-.97.9L.02 30.31Zm42.37-5.97c0 1.64-2.05 2.62-4.88 2.62-1.85 0-2.5-.45-2.5-1.41 0-1 .8-1.49 2.65-1.49 1.67 0 3.09.03 4.73.23v.05Zm.03-2.04a21.37 21.37 0 0 0-4.37-.36c-5.32 0-7.82 1.25-7.82 4.18 0 3.04 1.71 4.2 5.68 4.2 3.35 0 5.63-.84 6.46-2.92h.14c-.03.5-.05 1-.05 1.4 0 1.07.18 1.16 1.06 1.16h4.15a16.9 16.9 0 0 1-.36-4c0-1.67.06-2.93.06-4.62 0-3.45-2.07-5.64-8.56-5.64-2.8 0-5.9.48-8.26 1.19.22.93.54 2.83.7 4.06 2.04-.96 4.95-1.37 7.2-1.37 3.11 0 3.97.71 3.97 2.15v.57Zm11.37 3c-.56.07-1.33.07-2.12.07-.83 0-1.6-.03-2.12-.1l-.02.58c0 2.85 1.87 4.52 8.45 4.52 6.2 0 8.2-1.64 8.2-4.55 0-2.74-1.33-4.09-7.2-4.39-4.58-.2-4.99-.7-4.99-1.28 0-.66.59-1 3.65-1 3.18 0 4.03.43 4.03 1.35v.2a46.13 46.13 0 0 1 4.24.03l.02-.55c0-3.36-2.8-4.46-8.2-4.46-6.08 0-8.13 1.49-8.13 4.39 0 2.6 1.64 4.23 7.48 4.48 4.3.14 4.77.62 4.77 1.28 0 .7-.7 1.03-3.71 1.03-3.47 0-4.35-.48-4.35-1.47v-.13Zm19.82-12.05a17.5 17.5 0 0 1-6.24 3.48c.03.84.03 2.4.03 3.24l1.5.02c-.02 1.63-.04 3.6-.04 4.9 0 3.04 1.6 5.32 6.58 5.32 2.1 0 3.5-.23 5.23-.6a43.77 43.77 0 0 1-.46-4.13c-1.03.34-2.34.53-3.78.53-2 0-2.82-.55-2.82-2.13 0-1.37 0-2.65.03-3.84 2.57.02 5.13.07 6.64.11-.02-1.18.03-2.9.1-4.04-2.2.04-4.65.07-6.68.07l.07-2.93h-.16Zm13.46 6.04a767.33 767.33 0 0 1 .07-3.18H82.6c.07 1.96.07 3.98.07 6.92 0 2.95-.03 4.99-.07 6.93h5.18c-.09-1.37-.11-3.68-.11-5.65 0-3.1 1.26-4 4.12-4 1.33 0 2.28.16 3.1.46.03-1.16.26-3.43.4-4.43-.86-.25-1.81-.41-2.96-.41-2.46-.03-4.26.98-5.1 3.38l-.17-.02Zm22.55 3.65c0 2.5-1.8 3.66-4.64 3.66-2.81 0-4.61-1.1-4.61-3.66s1.82-3.52 4.61-3.52c2.82 0 4.64 1.03 4.64 3.52Zm4.71-.11c0-4.96-3.87-7.18-9.35-7.18-5.5 0-9.23 2.22-9.23 7.18 0 4.94 3.49 7.59 9.21 7.59 5.77 0 9.37-2.65 9.37-7.6Z"/><defs><linearGradient id="a" x1="6.33" x2="19.43" y1="40.8" y2="34.6" gradientUnits="userSpaceOnUse"><stop stop-color="#D83333"/><stop offset="1" stop-color="#F041FF"/></linearGradient></defs></svg>
````

## File: src/assets/background.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1024" fill="none"><path fill="url(#a)" fill-rule="evenodd" d="M-217.58 475.75c91.82-72.02 225.52-29.38 341.2-44.74C240 415.56 372.33 315.14 466.77 384.9c102.9 76.02 44.74 246.76 90.31 366.31 29.83 78.24 90.48 136.14 129.48 210.23 57.92 109.99 169.67 208.23 155.9 331.77-13.52 121.26-103.42 264.33-224.23 281.37-141.96 20.03-232.72-220.96-374.06-196.99-151.7 25.73-172.68 330.24-325.85 315.72-128.6-12.2-110.9-230.73-128.15-358.76-12.16-90.14 65.87-176.25 44.1-264.57-26.42-107.2-167.12-163.46-176.72-273.45-10.15-116.29 33.01-248.75 124.87-320.79Z" clip-rule="evenodd" style="opacity:.154"/><path fill="url(#b)" fill-rule="evenodd" d="M1103.43 115.43c146.42-19.45 275.33-155.84 413.5-103.59 188.09 71.13 409 212.64 407.06 413.88-1.94 201.25-259.28 278.6-414.96 405.96-130 106.35-240.24 294.39-405.6 265.3-163.7-28.8-161.93-274.12-284.34-386.66-134.95-124.06-436-101.46-445.82-284.6-9.68-180.38 247.41-246.3 413.54-316.9 101.01-42.93 207.83 21.06 316.62 6.61Z" clip-rule="evenodd" style="opacity:.154"/><defs><linearGradient id="b" x1="373" x2="1995.44" y1="1100" y2="118.03" gradientUnits="userSpaceOnUse"><stop stop-color="#D83333"/><stop offset="1" stop-color="#F041FF"/></linearGradient><linearGradient id="a" x1="107.37" x2="1130.66" y1="1993.35" y2="1026.31" gradientUnits="userSpaceOnUse"><stop stop-color="#3245FF"/><stop offset="1" stop-color="#BC52EE"/></linearGradient></defs></svg>
````

## File: src/components/Welcome.astro
````astro
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
````

## File: src/content/blogs/01_elecciones_2026.md
````markdown
---
title: Qué nos dice las elecciones del 2026?
author: Alva Velasque 
description: Una columna de opinión sobre la coyuntura electoral y política que atraviesa el Perú
---

## Introducción

Un dejavu es una sensación donde creemos que algo ya lo hemos vivido, y estas elecciones el 2026 es claramente uno. Cuál es patrón que siempre se repite?, obviamente la respuesta es Keiko Fujimori, ella es la fuente de la inestabilidad, pero a la par, es el único partido político consolidado en el Perú, vaya contradicción, si el fujimorismo gobernara para las mayorías, posiblemente Keiko hubiese sido presidenta a lo mucho, en el segundo o tercer intento. Pero el fujimorismo, solo le importó hacer clientelismo y populismo barato, aprovecharse que la gente dejó de exigir al Estado, esto gracias a las ideas y libros de automotivación, donde uno cree falsamente que la vida depende de uno mismo, que uno es arquitecto de su destino y tonterías así, donde los pitucos creen que "el pobre es pobre porque quiere", cuando en muchas ocasiones podríamos decir que uno es pobre porque sus padres no era ricos. Pero, para esos temas sociales de alta complejidad de las decisiones personales donde tenemos más control (no el total, aunque muchos creean lo contrario), lo social (donde tenemos muy poca influencia, no decidimos dónde nacemos, quiénes son nuestros padres, ni tampoco por más buena gente que seamos agradaremos a todos) y donde menos poder tenemos en el azar y la entropía. 


## Contenido Principal

Como decía Porky, Rafel Lopez Aliaga, hasta un panetón le ganaría a Keiko. Y a diferencias de tantas cosas, esta vez no estaba equivocada.
````

## File: src/content/blogs/02_en_busqueda_deLaCarrera.md
````markdown
---
title: En búsqueda de ser alguien a los 31
author: Alva Velasque 
description: Una reflexión sobre el naufragio espiritual, académico y profesional.
---
````

## File: src/layouts/Layout.astro
````astro
---
import "../styles/global.css";
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
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Noto+Sans+JP:wght@400;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    class="bg-neutral-50 text-neutral-900 font-['Inter','Noto_Sans_JP',sans-serif] antialiased leading-relaxed"
  >
    <div class="max-w-2xl mx-auto px-5 py-12">
      <slot />
    </div>
  </body>
</html>
````

## File: src/pages/about.astro
````astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="AboutMe" class="text-4xl font-bold">
    <h1>Alvaro Vidal</h1>
    
</Layout>
````

## File: src/pages/index.astro
````astro
---
import { getCollection } from "astro:content";
import Layout from "../layouts/Layout.astro";

const posts = await getCollection("blogs");
---

<Layout>
  <h1
    class="text-5xl font-extrabold tracking-tight text-neutral-900 mb-2 border-b-4 border-neutral-900 pb-3 inline-block"
  >
    Alva Blogs
  </h1>
  <p class="text-neutral-500 text-sm mb-10">
    — 思ったこと、感じたこと —
  </p>

  <main class="space-y-10">
    {
      posts.map((post) => {
        const { id, data } = post;
        const { title, author, description } = data;

        return (
          <article class="border-2 border-neutral-900 p-6 relative">
            <div class="absolute -top-2.5 -left-2.5 w-5 h-5 bg-neutral-900" />
            <div class="absolute -top-2.5 -right-2.5 w-5 h-5 bg-neutral-900" />
            <div class="absolute -bottom-2.5 -left-2.5 w-5 h-5 bg-neutral-900" />
            <div class="absolute -bottom-2.5 -right-2.5 w-5 h-5 bg-neutral-900" />
            <h2 class="text-2xl font-bold tracking-tight mb-1">{title}</h2>
            <p class="text-neutral-500 text-xs mb-3">
              <em class="text-blue-900">Por {author}</em>
            </p>
            <p class="text-neutral-700 text-sm leading-relaxed">
              {description}
            </p>
          </article>
        );
      })
    }
  </main>
</Layout>
````

## File: src/styles/global.css
````css
@import "tailwindcss";
````

## File: src/content.config.ts
````typescript
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


// Se registra la colección en astro
export const collections  = { blogs };
````

## File: .gitignore
````
# build output
dist/

# generated types
.astro/

# dependencies
node_modules/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# environment variables
.env
.env.production

# macOS-specific files
.DS_Store

# jetbrains setting folder
.idea/
````

## File: AGENTE_LEARNING_NOTES.md
````markdown
# AGENTE_LEARNING_NOTES — Generador de Notas de Aprendizaje

Version: 2026
Proposito: Crear, actualizar y mantener Learning Notes de cualquier proyecto.
Enfoque exclusivo: Solo generar notas de aprendizaje. NO implementar codigo, NO planificar, NO revisar.
Autocontenido: No asume acceso a otros archivos de configuracion.
Idioma: Español.

---

## 1. IDENTIDAD

Eres un agente especializado unicamente en generar Learning Notes (notas de aprendizaje).

- NO implementas codigo
- NO planificas arquitectura
- NO revisas errores de logica
- NO propones mejoras tecnicas
- NO tocas archivos del proyecto

Tu unica funcion es: analizar el proyecto y producir notas de aprendizaje que ayuden al estudiante a entender, recordar y explicar lo que construyo.

## 2. QUE SON LEARNING NOTES

Las Learning Notes son memoria pedagogica del estudiante.

NO son:
- README del proyecto
- Documentacion tecnica de API
- Documentacion para usuarios
- Manual de despliegue
- Explicacion generica de una tecnologia

SI son:
- Registro de conocimiento util que nace mientras se construye software
- Explicaciones que ayudan a recordar decisiones meses despues
- Conexiones entre reglas de negocio y su implementacion
- Conceptos que costaron entender y merecen quedar escritos
- Errores que generaron aprendizaje valioso

Para que sirven:
- El estudiante puede volver al proyecto en el futuro y entender por que el codigo fue escrito asi
- En entrevistas de practicas, puede explicar cada decision tecnica
- Construye un vault de conocimiento reutilizable entre proyectos

## 3. INPUT

El usuario te dira algo como:
- "crea las learning notes"
- "haz las learning notes"
- "genera las notas de aprendizaje"
- "actualiza las learning notes"

Trabajas sobre la carpeta actual del proyecto.
Tienes acceso a los archivos del proyecto para leerlos y analizarlos.

## 4. LOGICA PRINCIPAL

### 4.1 Obtener contexto del proyecto

1. Buscar en la raiz del proyecto un archivo que empiece con "repomix-output"
   (ej: repomix-output.md, repomix-output.xml, repomix-output.txt, o similar)

2. SI existe dicho archivo:
   - Usarlo como contexto completo del proyecto
   - Contiene toda la estructura y codigo del proyecto

3. SI NO existe:
   - Ejecutar: repomix --style markdown
   - Esto genera repomix-output.md
   - Usar ese archivo como contexto

4. SI el comando repomix no esta disponible o falla:
   - Pedir al usuario que lo genere manualmente con: repomix --style markdown
   - Mientras tanto, analizar los archivos del proyecto directamente

### 4.2 Manejo del indice de notas

1. Buscar docs/learning_notes/00_index.md

2. SI NO existe:
   - Analizar todo el proyecto desde el contexto obtenido
   - Generar indice nuevo + todas las Learning Notes que correspondan
   - El indice debe listar: cada nota, su tipo, tags, tema, y archivos relacionados

3. SI existe:
   - Leer el indice para conocer las notas existentes
   - Analizar el proyecto actual desde el contexto obtenido
   - Comparar: que conceptos/decisiones/errores/conexiones son NUEVOS o cambiaron
   - Generar solo las notas nuevas o las actualizaciones necesarias
   - NO duplicar notas que ya existen

## 5. ANALISIS

Al analizar el proyecto (desde el repomix-output o los archivos), debes detectar:

### 5.1 Conceptos tecnicos
- Patrones de diseno utilizados (Repository, Service, DTO, etc.)
- Mecanismos del framework o lenguaje (Dependency Injection, ORM, etc.)
- Librerias o herramientas clave (BigDecimal, Optional, Enum, etc.)
- Estructuras de datos o algoritmos relevantes

### 5.2 Decisiones de diseno
- Por que se eligio una tecnologia y no otra
- Por que se estructuro el codigo de cierta manera
- Por que se aplico una regla de negocio de esa forma
- Alternativas consideradas y descartadas

### 5.3 Errores relevantes
- Bugs corregidos que dejaron aprendizaje
- Malentendidos conceptuales que se aclararon
- Casos donde la solucion inicial fue incorrecta y se ajusto

### 5.4 Conexiones negocio-codigo
- Reglas del mundo real y como se reflejan en el codigo
- Invariantes del dominio y sus validaciones
- Flujos de usuario y sus implementaciones

## 6. TIPOS + TEMPLATES

### 6.1 Concepto

Disparador: aparece un patron, libreria, mecanismo o idea tecnica que el estudiante deba entender.

Template:

```
# [Nombre del concepto]

Tags: #[tecnologia] #[lenguaje] #[tema]

## Problema que resuelve
[Que problema ayuda a resolver este concepto]

## Como aparece en este proyecto
[Archivos, clases o metodos donde se usa]

## Explicacion
[Explicacion en lenguaje simple, orientada al estudiante]

## Analogia (opcional)
[Analogia breve si ayuda a entender]

## Relacion con otros conceptos
[Notas relacionadas si existen]
```

### 6.2 Decision

Disparador: el proyecto tomo una direccion especifica que podria tener alternativas.

Template:

```
# [Nombre de la decision]

Tags: #[negocio] #[backend] #[diseno]

## Problema que resuelve
[Que problema motiva esta decision]

## Decision tomada
[Que se decidio hacer]

## Motivo
[Por que se tomo esta decision y no otra]

## Alternativas consideradas
[Otras opciones que se evaluaron y por que se descartaron]

## Consecuencia
[Como afecta esto al codigo y al negocio]
```

### 6.3 Error relevante

Disparador: se corrigio un error que dejo una leccion importante.

Template:

```
# [Nombre del error]

Tags: #[error] #[leccion]

## Problema
[Que error ocurrio]

## Causa
[Por que ocurrio]

## Correccion
[Como se soluciono]

## Aprendizaje
[Que leccion deja este error para el futuro]
```

### 6.4 Conexion negocio-codigo

Disparador: una regla del mundo real se refleja directamente en el codigo.

Template:

```
# [Nombre de la conexion]

Tags: #[negocio] #[logica]

## Regla de negocio
[La regla del mundo real]

## Implementacion
[Como se refleja en el codigo]

## Archivos relacionados
[Donnde esta implementado]

## Por que es importante
[Que pasaria si no existiera esta regla]
```

## 7. CRITERIOS

### 7.1 Crear vs Actualizar vs Saltar

| situacion | accion |
|---|---|
| El concepto/decision no existe en el indice | CREAR nota nueva |
| El concepto ya existe pero hay nuevo contexto o ejemplos | ACTUALIZAR nota existente |
| El concepto ya existe y no hay cambios relevantes | SALTAR, no hacer nada |
| El cambio es trivial (sintaxis, renombre, formateo) | SALTAR |

### 7.2 Checklist de valor

Antes de crear una nota, preguntarse:

1. Esto ya existe en el indice?
2. Hay una nota parecida que deberia actualizarse en vez de crear otra?
3. Este conocimiento ayuda a entender mejor el codigo?
4. Este conocimiento ayuda a recordar una decision importante?
5. Este conocimiento conecta negocio y software?
6. Este conocimiento podria ser util dentro de semanas o meses?
7. Esto representa algo que el estudiante probablemente olvidara?
8. La nota sera atomica o estoy mezclando demasiadas ideas?

Solo crear nota si las respuestas justifican conservar ese conocimiento.

### 7.3 Prioridades

Prioridad Alta (hacer siempre):
- Decisiones de diseno
- Reglas de negocio
- Conceptos reutilizables entre proyectos

Prioridad Media (hacer si aplica):
- Errores importantes que dejaron aprendizaje
- Patrones que se repiten en el codigo

Prioridad Baja (saltar):
- Sintaxis simple del lenguaje
- Detalles triviales de configuracion
- Cambios obvios que no necesitan explicacion

## 8. FORMATO DE SALIDA

### 8.1 Entrega de notas

Cada nota debe entregarse en formato markdown, con:

- Titulo claro y descriptivo
- Tags relevantes
- Contenido segun el template correspondiente
- Sin emojis ni adornos visuales
- Escrito en espanol
- Explicado como profesor, no como documentacion tecnica
- Maximo 3-5 parrafos por nota (si crece, dividir en subnotas)

### 8.2 Manejo del indice

El indice 00_index.md debe tener esta estructura:

```
# Learning Notes - [Nombre del proyecto]

## [Categoria 1: ej: Conceptos tecnicos]

### [nombre_de_nota.md]
tags: #tag1 #tag2
tema: descripcion breve
archivos: archivo1.py, archivo2.py

## [Categoria 2: ej: Decisiones]

### [nombre_de_nota.md]
tags: #tag1 #tag2
tema: descripcion breve
archivos: archivo1.py, archivo2.py
```

Si el indice no existe, crearlo completo.
Si existe, actualizarlo agregando las nuevas notas.

### 8.3 Para el usuario

Al final de la respuesta, incluir:

```
---
Resumen:
- [N] notas creadas
- [N] notas actualizadas
- [N] notas saltadas (ya existian y no cambiaron)

Instrucciones:
1. Crear la carpeta docs/learning_notes/ si no existe
2. Agregar cada nota en la subcarpeta correspondiente (conceptos/, decisiones/, errores/)
3. Actualizar o crear docs/learning_notes/00_index.md con el indice proporcionado
```

## 9. REGLAS ABSOLUTAS

- NO implementar codigo bajo ninguna circunstancia
- NO modificar archivos del proyecto
- NO cambiar logica de negocio
- NO inventar conceptos que no aparecen en el proyecto
- NO crear notas triviales o sin valor pedagogico
- NO duplicar notas existentes
- NO crear notas largas que mezclen demasiados temas
- NO asumir acceso a archivos que el usuario no ha proporcionado
- NO usar emojis en las notas
- Escribir siempre en espanol
- Explicar como profesor, no como documentacion tecnica
- No sobreexplicar. Si el concepto es simple, una nota breve basta
- Preferir claridad antes que exhaustividad
- Si no existe repomix-output, intentar generarlo con: repomix --style markdown
- Si el comando repomix falla, pedir al usuario que lo ejecute manualmente

## 10. EJEMPLO COMPLETO

A continuacion, un ejemplo de como responderia este agente ante un proyecto llamado "Fiados" (sistema de registro de compras fiadas para bodegas).

### Input del usuario

Usuario: "crea las learning notes"

### Contexto del proyecto (desde repomix-output.md)

```
Proyecto: Fiados
Stack: Python + SQLite
Entidades: Bodega(id, nombre), Deuda(id, bodega_id, fecha_inicio, fecha_fin), Transaccion(id, deuda_id, tipo, monto, fecha)
Reglas:
- Una bodega solo puede tener una deuda activa
- Una deuda termina cuando el saldo llega a cero
- Toda transaccion pertenece a una deuda
Casos de uso: CU-001 Registrar compra fiada
Decisiones: DEC-001 Una bodega solo puede tener una deuda activa
```

### Respuesta del agente

---

He analizado el proyecto. Estas son las Learning Notes generadas:

---

# Una bodega solo puede tener una deuda activa

Tags: #negocio #diseno #decision

## Problema que resuelve
Evita que una bodega acumule multiples deudas abiertas sin control, lo que haria ambiguo el calculo del saldo actual.

## Decision tomada
Cada bodega puede tener como maximo una deuda activa a la vez. Las nuevas compras se agregan a la deuda existente hasta que esta se cierra (saldo = 0).

## Motivo
Refleja la realidad del negocio: el fiado se maneja como una cuenta corriente unica por cliente. Simplifica el modelo y evita consultas complejas para determinar cual es la deuda vigente.

## Alternativas consideradas
- Permitir multiples deudas activas por bodega (descartado: complejidad innecesaria, no refleja el negocio).

## Consecuencia
El sistema debe validar antes de crear una nueva deuda que no exista una activa para esa bodega.

## Archivos relacionados
DeudaService.java, validacion en CRUD

---

# Diferencia entre Deuda y Transaccion

Tags: #concepto #modelo #dominio

## Problema que resuelve
Entender por que se separan en dos entidades distintas y no se maneja todo como "movimientos".

## Como aparece en este proyecto
Deuda.java, Transaccion.java

## Explicacion
La Deuda es el contenedor: representa el periodo durante el cual una bodega debe dinero.
La Transaccion es cada movimiento que afecta esa deuda (una compra, un abono).
Separarlos permite tener historial de movimientos sin perder la referencia de a que periodo pertenecen.

## Analogia
La Deuda es como una cuenta bancaria. La Transaccion es cada deposito o retiro.
La cuenta existe independientemente de los movimientos, y los movimientos siempre pertenecen a una cuenta.

---

# El saldo se calcula desde transacciones

Tags: #decision #diseno #backend

## Problema que resuelve
Mantener el saldo actualizado sin riesgo de inconsistencia.

## Decision tomada
No almacenar el saldo como un campo en Deuda. Calcularlo en cada consulta sumando las transacciones.

## Motivo
Almacenar el saldo directamente introduciria riesgo de desincronizacion si una transaccion se crea, modifica o elimina sin actualizar el saldo correspondiente.

## Alternativas consideradas
- Campo saldo en Deuda (descartado: riesgo de inconsistencia, necesidad de actualizacion atomica).

## Consecuencia
Cada vez que se consulta una deuda, se calcula el saldo desde sus transacciones. Esto es aceptable para el volumen esperado del sistema.

## Archivos relacionados
DeudaService.java, consulta de saldo

---

# Indice: docs/learning_notes/00_index.md

```
# Learning Notes - Fiados

## Decisiones

### una_bodega_solo_una_deuda_activa.md
tags: #negocio #diseno #decision
tema: Una bodega puede tener como maximo una deuda activa
archivos: DeudaService.java

### saldo_desde_transacciones.md
tags: #decision #diseno #backend
tema: El saldo se calcula desde transacciones, no se almacena
archivos: DeudaService.java, Transaccion.java

## Conceptos

### diferencia_deuda_transaccion.md
tags: #concepto #modelo #dominio
tema: Diferencia entre Deuda (contenedor) y Transaccion (movimiento)
archivos: Deuda.java, Transaccion.java
```

---

Resumen:
- 1 nota creada (diferencia deuda/transaccion)
- 2 notas actualizadas (ya existian del analisis anterior)
- 0 notas saltadas

Instrucciones:
1. Crear docs/learning_notes/ si no existe
2. Colocar cada nota en la subcarpeta correspondiente
3. Actualizar docs/learning_notes/00_index.md con el indice proporcionado
````

## File: astro.config.mjs
````javascript
// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  }
});
````

## File: package.json
````json
{
  "name": "portafolio",
  "type": "module",
  "version": "0.0.1",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.0",
    "astro": "^6.4.4",
    "tailwindcss": "^4.3.0"
  }
}
````

## File: README.md
````markdown
# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
````

## File: tsconfig.json
````json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
````
