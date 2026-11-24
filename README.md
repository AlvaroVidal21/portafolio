# Portafolio

Sitio personal de Alva Vidal: notas de blog, proyectos y certificaciones. Astro genera HTML estático, Tailwind resuelve los estilos y el contenido vive en Markdown.

Sitio publicado: <https://alvavidal.dev>

## Stack

| Pieza | Uso |
| :--- | :--- |
| Astro 6 | Rutas, colecciones de contenido y render estático |
| Tailwind 4 | Estilos, con variantes `dark:` por preferencia del sistema |
| `@astrojs/sitemap` | `sitemap-index.xml` en cada build |
| `@tailwindcss/typography` | Estilos de los artículos en Markdown |

Requiere Node 22.12 o superior.

## Comandos

Todos se ejecutan desde la raíz del proyecto.

| Comando | Qué hace |
| :--- | :--- |
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor local en `localhost:4321` |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Sirve el build local antes de publicar |

## Estructura

```text
/
├── public/                  imágenes, iconos y estáticos servidos tal cual
├── scripts/
│   └── dark-diagrams.py     genera la variante oscura de los diagramas SVG
├── src/
│   ├── assets/              imágenes que procesa Astro (foto de perfil)
│   ├── components/          tarjetas, badges y encabezados reutilizables
│   ├── constants/           technologies.ts: color, etiqueta e icono de cada badge
│   ├── content/             blogs/, proyectos/ y certificaciones/ en Markdown
│   ├── layouts/             Layout.astro: head, metadatos y tema
│   ├── pages/               index, about, blog, proyecto y certificaciones
│   └── styles/
└── astro.config.mjs         dominio del sitio e integraciones
```

## Contenido

Las colecciones se definen en `src/content.config.ts`. Un archivo con prefijo `_` queda excluido.

**`src/content/proyectos/*.md`**: `title`, `author`, `description`, y opcionales `technologies` (lista de claves de `src/constants/technologies.ts`), `github`, `video` y `status` (`En progreso`, `Completado` o `Pausado`).

**`src/content/blogs/*.md`**: `title`, `author`, `description`.

**`src/content/certificaciones/*.md`**: `title`, `institution`, `image`, `category` (`academica` o `tecnologica`), y opcionales `date`, `order` y `credentialUrl`.

La ruta de cada entrada sale del nombre del archivo: `05_bitacora_edo2026.md` se publica en `/proyecto/05_bitacora_edo2026`.

## Detalles que importan

El orden de los proyectos no sale de las fechas. `projectOrder`, en `src/pages/proyecto/index.astro`, fija qué se ve primero; un proyecto que no esté en esa lista aparece al final.

Las tecnologías de un proyecto se escriben con la clave exacta de `technologies.ts`. Si la clave no existe, el badge igual se muestra pero sin color ni icono.

## Diagramas SVG y tema oscuro

Cada diagrama vive en dos archivos: `nombre.svg` para el tema claro y `nombre-dark.svg` para el oscuro. Los SVG se cargan con `<img>`, así que no pueden leer la clase `.dark` del documento: el cambio se resuelve en el HTML.

```html
<img src="/ruta/diagrama.svg" alt="..." class="w-full h-auto dark:hidden" />
<img src="/ruta/diagrama-dark.svg" alt="..." class="hidden w-full h-auto dark:block" />
```

Al crear o editar un diagrama, regenerá la variante oscura con `python3 scripts/dark-diagrams.py [archivo.svg ...]` y revisá el resultado: un diagrama claro sobre una página oscura se lee mal, y el texto desbordado no lo detecta el build.

## Publicación

El repositorio está conectado a Vercel: un push a `master` publica en producción. El sitio se sirve desde caché de borde, así que para confirmar que un cambio ya está arriba conviene pedir la URL con un parámetro extra (`?cb=1`) en lugar de recargar la misma.
