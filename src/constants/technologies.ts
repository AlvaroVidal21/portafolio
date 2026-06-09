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