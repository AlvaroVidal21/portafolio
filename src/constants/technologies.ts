// src/constants/technologies.ts

export interface TechnologyConfig {
  bg: string;
  text: string;
  label: string;
  icon?: string;
  svgPath?: string;
}

export const TECNOLOGIAS: Record<string, TechnologyConfig> = {
  springboot: {
    bg: "bg-emerald-200 border-emerald-950 dark:bg-emerald-900/30 dark:border-emerald-800",
    text: "text-emerald-950 dark:text-emerald-400",
    label: "Spring Boot",
    icon: "🍃",
    svgPath: "/IconsTec/SpringBoot.svg"
  },
  angular: {
    bg: "bg-red-200 border-red-950 dark:bg-red-900/30 dark:border-red-800",
    text: "text-red-950 dark:text-red-400",
    label: "Angular",
    icon: "🅰",
    svgPath: "/IconsTec/Angular.svg"
  },
  postgres: {
    bg: "bg-sky-200 border-sky-950 dark:bg-sky-900/30 dark:border-sky-800",
    text: "text-sky-950 dark:text-sky-400",
    label: "PostgreSQL",
    icon: "🐘",
    svgPath: "/IconsTec/PostgresSQL.svg"
  },
  python: {
    bg: "bg-amber-200 border-amber-950 dark:bg-amber-900/30 dark:border-amber-800",
    text: "text-amber-950 dark:text-amber-400",
    label: "Python",
    icon: "🐍",
    svgPath: "/IconsTec/Python.svg"
  },
  pandas: {
    bg: "bg-indigo-200 border-indigo-950 dark:bg-indigo-900/30 dark:border-indigo-800",
    text: "text-indigo-950 dark:text-indigo-400",
    label: "Pandas",
    icon: "🐼",
    svgPath: "/IconsTec/Pandas.svg"
  },
  sqlite: {
    bg: "bg-blue-200 border-blue-950 dark:bg-blue-900/30 dark:border-blue-800",
    text: "text-blue-950 dark:text-blue-400",
    label: "SQLite",
    icon: "🗄️",
    svgPath: "/IconsTec/SQLite.svg"
  },
  flask: {
    bg: "bg-stone-200 border-stone-950 dark:bg-stone-800 dark:border-stone-700",
    text: "text-stone-950 dark:text-stone-300",
    label: "Flask",
    icon: "🧪",
    svgPath: "/IconsTec/Flask.svg"
  },
  fastapi: {
    bg: "bg-teal-200 border-teal-950 dark:bg-teal-900/30 dark:border-teal-800",
    text: "text-teal-950 dark:text-teal-400",
    label: "FastAPI",
    icon: "⚡",
    svgPath: "/IconsTec/FastAPI.svg"
  },
  php: {
    bg: "bg-violet-200 border-violet-950 dark:bg-violet-900/30 dark:border-violet-800",
    text: "text-violet-950 dark:text-violet-400",
    label: "PHP",
    icon: "🐘",
    svgPath: "/IconsTec/PHP.svg"
  },
  bootstrap: {
    bg: "bg-fuchsia-200 border-fuchsia-950 dark:bg-fuchsia-900/30 dark:border-fuchsia-800",
    text: "text-fuchsia-950 dark:text-fuchsia-400",
    label: "Bootstrap",
    icon: "🅱",
    svgPath: "/IconsTec/Bootstrap.svg"
  },
  linux: {
    bg: "bg-yellow-200 border-yellow-950 dark:bg-yellow-900/30 dark:border-yellow-800",
    text: "text-yellow-950 dark:text-yellow-400",
    label: "Linux",
    svgPath: "/IconsTec/Linux.svg"
  },
  fedora: {
    bg: "bg-sky-200 border-sky-950 dark:bg-sky-900/30 dark:border-sky-800",
    text: "text-sky-950 dark:text-sky-400",
    label: "Fedora",
    svgPath: "/IconsTec/Fedora.svg"
  },
  streamlit: {
    bg: "bg-red-200 border-red-950 dark:bg-red-900/30 dark:border-red-800",
    text: "text-red-950 dark:text-red-400",
    label: "Streamlit",
    svgPath: "/IconsTec/Streamlit.svg"
  },
  rust: {
    bg: "bg-orange-200 border-orange-950 dark:bg-orange-900/30 dark:border-orange-800",
    text: "text-orange-950 dark:text-orange-400",
    label: "Rust",
    icon: "🦀",
    svgPath: "/IconsTec/Rust.svg"
  },
};