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

## Diagramas SVG y tema oscuro

Cada diagrama vive en dos archivos: `nombre.svg` para el tema claro y
`nombre-dark.svg` para el oscuro. Los SVG se cargan con `<img>`, así que no
pueden leer la clase `.dark` del documento: el cambio se resuelve en el HTML.

```html
<img src="/ruta/diagrama.svg" alt="..." class="w-full h-auto dark:hidden" />
<img src="/ruta/diagrama-dark.svg" alt="..." class="hidden w-full h-auto dark:block" />
```

Al crear o editar un diagrama, regenerá la variante oscura con
`python3 scripts/dark-diagrams.py [archivo.svg ...]` y revisá el resultado: un
diagrama claro sobre una página oscura se lee mal, y el texto desbordado no lo
detecta el build.
