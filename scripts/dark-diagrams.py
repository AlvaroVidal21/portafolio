#!/usr/bin/env python3
"""Genera la variante oscura de los diagramas SVG del portafolio.

Estrategia: los SVG se cargan con <img>, por lo que no pueden leer la clase
.dark del documento. Se genera un archivo -dark.svg con la paleta invertida y
el markdown muestra uno u otro segun el tema.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "public/images/proyectos"

# Mapa por tipo de elemento: (atributo, color claro) -> color oscuro.
ELEMENT_MAPS: dict[str, dict[tuple[str, str], str]] = {
    "text": {
        ("fill", "#171717"): "#f5f5f5",
        ("fill", "#5b5b5b"): "#a3a3a3",
        ("fill", "#454545"): "#d4d4d4",
        ("fill", "#6b7280"): "#9ca3af",
        ("fill", "#b45309"): "#fb923c",
        ("fill", "#c2410c"): "#fb923c",
        ("fill", "#b7791f"): "#f4c430",
    },
    "rect": {
        ("fill", "#f8f7f2"): "#171717",
        ("fill", "#fff"): "#1f1f1f",
        ("fill", "#ffffff"): "#1f1f1f",
        ("fill", "#fffdf5"): "#24200f",
        ("fill", "#fff7ed"): "#2a1a0f",
        ("fill", "#171717"): "#0f0f0f",
        ("fill", "#f4c430"): "#d6a21e",
        ("fill", "#d5d5d5"): "#3f3f3f",
        ("stroke", "#171717"): "#525252",
        ("stroke", "#c2410c"): "#f97316",
        ("stroke", "#d8d4cb"): "#3f3f3f",
        ("stroke", "#d5d5d5"): "#3f3f3f",
    },
    "line": {
        ("stroke", "#171717"): "#737373",
        ("stroke", "#161616"): "#a3a3a3",
        ("stroke", "#454545"): "#a3a3a3",
        ("stroke", "#d8d4cb"): "#3f3f3f",
        ("stroke", "#d5d5d5"): "#3f3f3f",
        ("stroke", "#111827"): "#ffffff",
    },
    "path": {
        ("fill", "#171717"): "#a3a3a3",
        ("fill", "#161616"): "#a3a3a3",
        ("fill", "#f4c430"): "#d6a21e",
        ("stroke", "#171717"): "#737373",
        ("stroke", "#111827"): "#ffffff",
    },
    "pattern": {
        ("stroke", "#111827"): "#ffffff",
    },
    "g": {
        ("stroke", "#171717"): "#737373",
        ("stroke", "#161616"): "#a3a3a3",
        ("stroke", "#454545"): "#a3a3a3",
        ("fill", "#171717"): "#0f0f0f",
        ("fill", "#f4c430"): "#d6a21e",
    },
    "circle": {
        ("fill", "#171717"): "#0f0f0f",
        ("stroke", "#171717"): "#737373",
    },
    "polyline": {
        ("stroke", "#171717"): "#737373",
        ("fill", "#171717"): "#a3a3a3",
    },
    "polygon": {
        ("fill", "#171717"): "#a3a3a3",
        ("stroke", "#171717"): "#737373",
    },
    "ellipse": {
        ("fill", "#171717"): "#0f0f0f",
        ("stroke", "#171717"): "#737373",
    },
}

# Mapa global para SVG generados por herramientas (mermaid), donde los colores
# aparecen tambien dentro de atributos style.
GLOBAL_MAPS: dict[str, dict[str, str]] = {
    "mermaid01.svg": {
        "#ffffff": "#1e1e1e",
        "#FFFFFF": "#1e1e1e",
        "#fff": "#1e1e1e",
        "#F0F0FF": "#242138",
        "#ECECFF": "#242138",
        "#E6F7FF": "#12232b",
        "#1a1a1a": "#e8e8e8",
        "#1A1A1A": "#e8e8e8",
        "#000000": "#f5f5f5",
        "#000": "#f5f5f5",
        "#333333": "#d4d4d4",
        "#4a4a4a": "#b0b0b0",
        "#552222": "#fca5a5",
        "#aaaa33": "#d4d476",
        "#9C9CEB": "#b4b4f5",
        "#7C7CDB": "#9d9de8",
    },
}

TAG_RE = re.compile(r"<(text|rect|line|path|pattern|g|polyline|polygon|circle|ellipse)\b([^>]*)>")
ATTR_RE = re.compile(r'\b(fill|stroke)="(#[0-9a-fA-F]{3,6})"')
HEX_RE = re.compile(r"#[0-9a-fA-F]{3,6}")


def convert_element_pass(source: str) -> str:
    def repl(match: re.Match[str]) -> str:
        tag, attrs = match.group(1), match.group(2)
        mapping = ELEMENT_MAPS.get(tag, {})

        def attr_repl(m: re.Match[str]) -> str:
            name, color = m.group(1), m.group(2)
            new = mapping.get((name, color))
            return f'{name}="{new}"' if new else m.group(0)

        converted = ATTR_RE.sub(attr_repl, attrs)
        return f"<{tag}{converted}>"

    out = TAG_RE.sub(repl, source)
    return out.replace('stroke-opacity=".045"', 'stroke-opacity=".07"')


def convert_global(source: str, mapping: dict[str, str]) -> str:
    for old, new in sorted(mapping.items(), key=lambda kv: -len(kv[0])):
        source = source.replace(old, new)
    return source


def build(path: Path) -> tuple[Path, list[str]]:
    source = path.read_text(encoding="utf-8")
    if path.name in GLOBAL_MAPS:
        out = convert_global(source, GLOBAL_MAPS[path.name])
    else:
        out = convert_element_pass(source)
    leftovers = sorted({c for c in HEX_RE.findall(out)})
    target = path.with_name(path.stem + "-dark.svg")
    target.write_text(out, encoding="utf-8")
    return target, leftovers


def main(argv: list[str]) -> int:
    targets = [BASE / p for p in argv] if argv else [
        BASE / "bitacora-edo/flujo-recodificacion.svg",
        BASE / "bitacora-edo/flujo-analisis.svg",
        BASE / "proyecto03/flujo.svg",
        BASE / "proyecto02/mermaid01.svg",
    ]
    for path in targets:
        if not path.exists():
            print(f"falta: {path}")
            continue
        target, leftovers = build(path)
        print(f"{path.name} -> {target.name}  colores presentes: {', '.join(leftovers)}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
