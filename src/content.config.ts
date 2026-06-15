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
        status: z.enum(['En progreso', 'Completado', 'Pausado']).optional()
    }),
});

const certificaciones = defineCollection({
    loader: glob({
        pattern: '**/[^_]*.md',
        base: "./src/content/certificaciones"
    }),
    schema: z.object({
        title: z.string(),
        institution: z.string(),
        image: z.string(),
        category: z.enum(["academica", "tecnologica"]),
        date: z.string().optional(),
        order: z.number().optional(),
        credentialUrl: z.url().optional(),
    }),
});

// Se registra la colección en astro
export const collections  = { blogs, proyectos, certificaciones };
