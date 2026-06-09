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
        description: z.string()
    }),
});

// Se registra la colección en astro
export const collections  = { blogs, proyectos };
