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
.agents/
  skills/
    accessibility/
      references/
        A11Y-PATTERNS.md
        WCAG.md
      SKILL.md
    astro/
      SKILL.md
    frontend-design/
      LICENSE.txt
      SKILL.md
    nodejs-backend-patterns/
      references/
        advanced-patterns.md
      SKILL.md
    nodejs-best-practices/
      SKILL.md
    seo/
      SKILL.md
    tailwind-css-patterns/
      references/
        accessibility.md
        animations.md
        component-patterns.md
        configuration.md
        layout-patterns.md
        performance.md
        reference.md
        responsive-design.md
      SKILL.md
    typescript-advanced-types/
      SKILL.md
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
    perfil01.jpg
  components/
    Welcome.astro
  content/
    blogs/
      01_elecciones_2026.md
      02_en_busqueda_deLaCarrera.md
      03_sobre_la_ia.md
    proyectos/
      01_fiados.md
      02_analisis_presupuesto.md
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
.gitignore
astro.config.mjs
package.json
README.md
skills-lock.json
tsconfig.json
```

# Files

## File: src/content/proyectos/01_fiados.md
````markdown
---
title: Fiados
author: Alva Vidal 
description: Una solución de software pensando en el usuario que se pide fiados en bodegas y necesita tener una trazabilidad de dichas deudas.
---


# Sobre el proyecto

Un proyecto que nace por mi necesidad de tener claro lo que debía a diferentes bodegas y tener una trazabilidad de mis gastos al momento de fiarme.
````

## File: src/content/proyectos/02_analisis_presupuesto.md
````markdown
---
title: Fiados
author: Alva Vidal 
description: Análisis de datos sobre la ejecucińo presupuestal del entidad x
---

## Sobre el proyecto
asdaadasd
asdadasdasdad
asdadasda
````

## File: src/pages/proyecto/[id].astro
````astro
---
import { getCollection, render } from "astro:content";
import Layout from "../../layouts/Layout.astro";

export async function getStaticPaths() {
  const proyectos = await getCollection("proyectos");
  return proyectos.map((project) => ({
    params: { id: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { title, author, description } = project.data;
const { Content } = await render(project);
---

<Layout>
  <article class="max-w-2xl mx-auto">
    <h1 class="text-4xl font-extrabold tracking-tight border-b-2 border-neutral-900 pb-3 mb-2">
      {title}
    </h1>
    <p class="text-neutral-500 text-xs mb-8">
      <em class="text-blue-900">Por {author}</em>
    </p>
    <div class="prose prose-neutral max-w-none text-justify">
      <Content />
    </div>
  </article>1
</Layout>
````

## File: .agents/skills/accessibility/references/A11Y-PATTERNS.md
````markdown
# Accessibility Code Patterns

Practical, copy-paste-ready patterns for common accessibility requirements. Each pattern is self-contained and linked from the main [SKILL.md](../SKILL.md).

---

## Modal focus trap

Trap keyboard focus inside a modal dialog so Tab/Shift+Tab cycle through its focusable elements and Escape closes it.

```javascript
function openModal(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  firstElement.focus();
}
```

The native `<dialog>` element handles focus trapping automatically—prefer it when browser support allows.

---

## Skip link

Allows keyboard users to bypass repetitive navigation and jump straight to main content.

```html
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header><!-- navigation --></header>
  <main id="main-content" tabindex="-1">
    <!-- main content -->
  </main>
</body>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

---

## Error handling

Announce errors to screen readers and focus the first invalid field on submit.

```html
<form novalidate>
  <div class="field" aria-live="polite">
    <label for="email">Email</label>
    <input type="email" id="email"
           aria-invalid="true"
           aria-describedby="email-error">
    <p id="email-error" class="error" role="alert">
      Please enter a valid email address (e.g., name@example.com)
    </p>
  </div>
</form>
```

```javascript
form.addEventListener('submit', (e) => {
  const firstError = form.querySelector('[aria-invalid="true"]');
  if (firstError) {
    e.preventDefault();
    firstError.focus();

    const errorSummary = document.getElementById('error-summary');
    errorSummary.textContent =
      `${errors.length} errors found. Please fix them and try again.`;
    errorSummary.focus();
  }
});
```

---

## Form labels

Every input needs an associated label—either explicit (`for`/`id`) or implicit (wrapping `<label>`).

```html
<!-- ❌ No label association -->
<input type="email" placeholder="Email">

<!-- ✅ Explicit label -->
<label for="email">Email address</label>
<input type="email" id="email" name="email"
       autocomplete="email" required>

<!-- ✅ Implicit label -->
<label>
  Email address
  <input type="email" name="email" autocomplete="email" required>
</label>

<!-- ✅ With instructions -->
<label for="password">Password</label>
<input type="password" id="password"
       aria-describedby="password-requirements">
<p id="password-requirements">
  Must be at least 8 characters with one number.
</p>
```

---

## Dragging movements

Any action triggered by dragging must offer a single-pointer alternative (WCAG 2.5.7).

```html
<!-- ❌ Drag-only reorder -->
<ul class="sortable-list" draggable="true">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<!-- ✅ Drag + button alternatives -->
<ul class="sortable-list">
  <li>
    <span>Item 1</span>
    <button aria-label="Move Item 1 up">↑</button>
    <button aria-label="Move Item 1 down">↓</button>
  </li>
  <li>
    <span>Item 2</span>
    <button aria-label="Move Item 2 up">↑</button>
    <button aria-label="Move Item 2 down">↓</button>
  </li>
</ul>
```

Also applies to sliders, map panning, colour pickers, and similar drag-based widgets—always provide an equivalent click/tap or keyboard path.

---

## ARIA tabs

Tabs require `role="tablist"`, `role="tab"`, and `role="tabpanel"` with proper `aria-selected`, `aria-controls`, and keyboard support.

```html
<div role="tablist" aria-label="Product information">
  <button role="tab" id="tab-1" aria-selected="true"
          aria-controls="panel-1">Description</button>
  <button role="tab" id="tab-2" aria-selected="false"
          aria-controls="panel-2" tabindex="-1">Reviews</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  <!-- Panel content -->
</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  <!-- Panel content -->
</div>
```

Arrow keys should move focus between tabs; the active tab receives `tabindex="0"` while inactive tabs use `tabindex="-1"`.

---

## Live regions and notifications

Use `aria-live` to announce dynamic content changes to screen readers without moving focus.

```html
<!-- Status updates (polite — waits for pause in speech) -->
<div aria-live="polite" aria-atomic="true" class="status">
  <!-- Content updates announced to screen readers -->
</div>

<!-- Urgent alerts (assertive — interrupts) -->
<div role="alert" aria-live="assertive">
  <!-- Interrupts current announcement -->
</div>
```

```javascript
function showNotification(message, type = 'polite') {
  const container = document.getElementById(`${type}-announcer`);
  container.textContent = '';
  requestAnimationFrame(() => {
    container.textContent = message;
  });
}
```

Clear the container before writing to ensure the same message triggers a new announcement.

---

## Screen reader commands

Quick reference for the most common screen reader shortcuts.

| Action | VoiceOver (Mac) | NVDA (Windows) |
|--------|-----------------|----------------|
| Start/Stop | ⌘ + F5 | Ctrl + Alt + N |
| Next item | VO + → | ↓ |
| Previous item | VO + ← | ↑ |
| Activate | VO + Space | Enter |
| Headings list | VO + U, then arrows | H / Shift + H |
| Links list | VO + U | K / Shift + K |
````

## File: .agents/skills/accessibility/references/WCAG.md
````markdown
# WCAG 2.2 Quick Reference

## Success criteria by level

### Level A (minimum)

| Criterion | Description |
|-----------|-------------|
| **1.1.1** Non-text Content | All images, icons have text alternatives |
| **1.2.1** Audio-only/Video-only | Provide transcript or audio description |
| **1.2.2** Captions | Video with audio has captions |
| **1.2.3** Audio Description | Video has audio description |
| **1.3.1** Info and Relationships | Information conveyed through presentation is available programmatically |
| **1.3.2** Meaningful Sequence | Reading order is logical |
| **1.3.3** Sensory Characteristics | Instructions don't rely solely on shape, color, size, location, orientation, or sound |
| **1.4.1** Use of Color | Color is not the only visual means of conveying information |
| **1.4.2** Audio Control | Audio playing automatically can be paused/stopped |
| **2.1.1** Keyboard | All functionality available via keyboard |
| **2.1.2** No Keyboard Trap | Keyboard focus can be moved away from any component |
| **2.1.4** Character Key Shortcuts | Single-key shortcuts can be turned off or remapped |
| **2.2.1** Timing Adjustable | Time limits can be extended |
| **2.2.2** Pause, Stop, Hide | Moving/blinking content can be paused |
| **2.3.1** Three Flashes | Nothing flashes more than 3 times per second |
| **2.4.1** Bypass Blocks | Skip link or landmark navigation available |
| **2.4.2** Page Titled | Pages have descriptive titles |
| **2.4.3** Focus Order | Focus order preserves meaning |
| **2.4.4** Link Purpose | Link purpose clear from link text or context |
| **2.5.1** Pointer Gestures | Multi-point gestures have single-pointer alternatives |
| **2.5.2** Pointer Cancellation | Down-event doesn't trigger action (use up-event or click) |
| **2.5.3** Label in Name | Accessible name contains visible label text |
| **2.5.4** Motion Actuation | Motion-triggered functions have alternatives |
| **3.1.1** Language of Page | Default language specified in HTML |
| **3.2.1** On Focus | Focus doesn't trigger unexpected changes |
| **3.2.2** On Input | Input doesn't trigger unexpected changes |
| **3.2.6** Consistent Help | Help mechanisms appear in the same relative order across pages |
| **3.3.1** Error Identification | Input errors clearly described |
| **3.3.2** Labels or Instructions | Form inputs have labels or instructions |
| **3.3.7** Redundant Entry | Information previously entered is auto-populated or available to select |
| **4.1.2** Name, Role, Value | UI components have accessible names and correct roles |

### Level AA (standard)

| Criterion | Description |
|-----------|-------------|
| **1.2.4** Captions (Live) | Live audio has captions |
| **1.2.5** Audio Description | Pre-recorded video has audio description |
| **1.3.4** Orientation | Content doesn't restrict orientation |
| **1.3.5** Identify Input Purpose | Input purpose can be programmatically determined |
| **1.4.3** Contrast (Minimum) | 4.5:1 for normal text, 3:1 for large text |
| **1.4.4** Resize Text | Text can be resized to 200% without loss of functionality |
| **1.4.5** Images of Text | Text used instead of images of text |
| **1.4.10** Reflow | Content reflows at 320px width without horizontal scroll |
| **1.4.11** Non-text Contrast | UI components have 3:1 contrast |
| **1.4.12** Text Spacing | Content adapts to text spacing changes |
| **1.4.13** Content on Hover/Focus | Additional content is dismissible, hoverable, persistent |
| **2.4.5** Multiple Ways | Multiple ways to find pages |
| **2.4.6** Headings and Labels | Headings and labels are descriptive |
| **2.4.7** Focus Visible | Focus indicator is visible |
| **2.4.11** Focus Not Obscured (Minimum) | Focused element is not entirely hidden by author-created content |
| **2.5.7** Dragging Movements | Dragging actions have single-pointer alternatives |
| **2.5.8** Target Size (Minimum) | Interactive targets are at least 24×24 CSS pixels (with exceptions) |
| **3.1.2** Language of Parts | Language changes are marked |
| **3.2.3** Consistent Navigation | Navigation is consistent across pages |
| **3.2.4** Consistent Identification | Same functionality uses same labels |
| **3.3.3** Error Suggestion | Error corrections suggested when known |
| **3.3.4** Error Prevention (Legal) | Actions can be reversed or confirmed |
| **3.3.8** Accessible Authentication (Minimum) | No cognitive function test for login unless an alternative or assistance is provided |
| **4.1.3** Status Messages | Status messages announced to screen readers |

### Level AAA (enhanced)

| Criterion | Description |
|-----------|-------------|
| **1.4.6** Contrast (Enhanced) | 7:1 for normal text, 4.5:1 for large text |
| **1.4.8** Visual Presentation | Foreground/background colors can be selected |
| **1.4.9** Images of Text (No Exception) | No images of text |
| **2.1.3** Keyboard (No Exception) | All functionality keyboard accessible |
| **2.2.3** No Timing | No time limits |
| **2.2.4** Interruptions | Interruptions can be postponed |
| **2.2.5** Re-authenticating | Data preserved on re-authentication |
| **2.2.6** Timeouts | Users warned about data loss from inactivity |
| **2.3.2** Three Flashes | No content flashes more than 3 times |
| **2.3.3** Animation from Interactions | Motion animation can be disabled |
| **2.4.8** Location | User location within site is available |
| **2.4.9** Link Purpose (Link Only) | Link purpose clear from link text alone |
| **2.4.10** Section Headings | Sections have headings |
| **2.4.12** Focus Not Obscured (Enhanced) | No part of the focused element is hidden by author-created content |
| **2.4.13** Focus Appearance | Focus indicator has sufficient area, contrast, and is not obscured |
| **3.1.3** Unusual Words | Definitions available for unusual words |
| **3.1.4** Abbreviations | Abbreviations expanded |
| **3.1.5** Reading Level | Alternative content for complex text |
| **3.1.6** Pronunciation | Pronunciation available where needed |
| **3.2.5** Change on Request | Changes initiated only by user |
| **3.3.5** Help | Context-sensitive help available |
| **3.3.6** Error Prevention (All) | All form submissions can be reviewed |
| **3.3.9** Accessible Authentication (Enhanced) | No cognitive function test for login (no object or personal content recognition exceptions) |

## Common ARIA patterns

### Buttons
```html
<button>Label</button>
<!-- or -->
<button aria-label="Close dialog">×</button>
```

### Links
```html
<a href="/page">Descriptive link text</a>
<!-- External links -->
<a href="https://external.com" target="_blank" rel="noopener">
  External site
  <span class="visually-hidden">(opens in new tab)</span>
</a>
```

### Form fields
```html
<label for="email">Email address</label>
<input type="email" id="email" aria-describedby="email-hint">
<p id="email-hint">We'll never share your email.</p>
```

### Error states
```html
<label for="email">Email</label>
<input type="email" id="email" aria-invalid="true" aria-describedby="email-error">
<p id="email-error" role="alert">Please enter a valid email address.</p>
```

### Navigation
```html
<nav aria-label="Main">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

### Modals
```html
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Action</h2>
  <!-- content -->
</div>
```

### Live regions
```html
<!-- Polite (waits for pause in speech) -->
<div aria-live="polite">Status update here</div>

<!-- Assertive (interrupts immediately) -->
<div aria-live="assertive" role="alert">Error message here</div>

<!-- Status (polite, implicit) -->
<div role="status">Loading complete</div>
```

## What changed from 2.1 to 2.2

| Change | Criterion | Level |
|--------|-----------|-------|
| **Removed** | 4.1.1 Parsing | A |
| **Added** | 2.4.11 Focus Not Obscured (Minimum) | AA |
| **Added** | 2.4.12 Focus Not Obscured (Enhanced) | AAA |
| **Added** | 2.4.13 Focus Appearance | AAA |
| **Added** | 2.5.7 Dragging Movements | AA |
| **Added** | 2.5.8 Target Size (Minimum) | AA |
| **Added** | 3.2.6 Consistent Help | A |
| **Added** | 3.3.7 Redundant Entry | A |
| **Added** | 3.3.8 Accessible Authentication (Minimum) | AA |
| **Added** | 3.3.9 Accessible Authentication (Enhanced) | AAA |

## Testing tools

| Tool | Type | URL |
|------|------|-----|
| axe DevTools | Browser extension | [deque.com/axe](https://www.deque.com/axe/) |
| WAVE | Browser extension | [wave.webaim.org](https://wave.webaim.org/) |
| Lighthouse | Built into Chrome | DevTools → Lighthouse |
| NVDA | Screen reader (Windows) | [nvaccess.org](https://www.nvaccess.org/) |
| VoiceOver | Screen reader (Mac) | Built into macOS |
| Colour Contrast Analyser | Desktop app | [tpgi.com](https://www.tpgi.com/color-contrast-checker/) |

## Sources

- [WCAG 2.2 W3C Recommendation](https://www.w3.org/TR/WCAG22/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
````

## File: .agents/skills/accessibility/SKILL.md
````markdown
---
name: accessibility
description: Audit and improve web accessibility following WCAG 2.2 guidelines. Use when asked to "improve accessibility", "a11y audit", "WCAG compliance", "screen reader support", "keyboard navigation", or "make accessible".
license: MIT
metadata:
  author: web-quality-skills
  version: "1.1"
---

# Accessibility (a11y)

Comprehensive accessibility guidelines based on WCAG 2.2 and Lighthouse accessibility audits. Goal: make content usable by everyone, including people with disabilities.

## WCAG Principles: POUR

| Principle | Description |
|-----------|-------------|
| **P**erceivable | Content can be perceived through different senses |
| **O**perable | Interface can be operated by all users |
| **U**nderstandable | Content and interface are understandable |
| **R**obust | Content works with assistive technologies |

## Conformance levels

| Level | Requirement | Target |
|-------|-------------|--------|
| **A** | Minimum accessibility | Must pass |
| **AA** | Standard compliance | Should pass (legal requirement in many jurisdictions) |
| **AAA** | Enhanced accessibility | Nice to have |

---

## Perceivable

### Text alternatives (1.1)

**Images require alt text:**
```html
<!-- ❌ Missing alt -->
<img src="chart.png">

<!-- ✅ Descriptive alt -->
<img src="chart.png" alt="Bar chart showing 40% increase in Q3 sales">

<!-- ✅ Decorative image (empty alt) -->
<img src="decorative-border.png" alt="" role="presentation">

<!-- ✅ Complex image with longer description -->
<figure>
  <img src="infographic.png" alt="2024 market trends infographic" 
       aria-describedby="infographic-desc">
  <figcaption id="infographic-desc">
    <!-- Detailed description -->
  </figcaption>
</figure>
```

**Icon buttons need accessible names:**
```html
<!-- ❌ No accessible name -->
<button><svg><!-- menu icon --></svg></button>

<!-- ✅ Using aria-label -->
<button aria-label="Open menu">
  <svg aria-hidden="true"><!-- menu icon --></svg>
</button>

<!-- ✅ Using visually hidden text -->
<button>
  <svg aria-hidden="true"><!-- menu icon --></svg>
  <span class="visually-hidden">Open menu</span>
</button>
```

**Visually hidden class:**
```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Color contrast (1.4.3, 1.4.6)

| Text Size | AA minimum | AAA enhanced |
|-----------|------------|--------------|
| Normal text (< 18px / < 14px bold) | 4.5:1 | 7:1 |
| Large text (≥ 18px / ≥ 14px bold) | 3:1 | 4.5:1 |
| UI components & graphics | 3:1 | 3:1 |

```css
/* ❌ Low contrast (2.5:1) */
.low-contrast {
  color: #999;
  background: #fff;
}

/* ✅ Sufficient contrast (7:1) */
.high-contrast {
  color: #333;
  background: #fff;
}

/* ✅ Focus states need contrast too */
:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}
```

**Don't rely on color alone:**
```html
<!-- ❌ Only color indicates error -->
<input class="error-border">
<style>.error-border { border-color: red; }</style>

<!-- ✅ Color + icon + text -->
<div class="field-error">
  <input aria-invalid="true" aria-describedby="email-error">
  <span id="email-error" class="error-message">
    <svg aria-hidden="true"><!-- error icon --></svg>
    Please enter a valid email address
  </span>
</div>
```

### Media alternatives (1.2)

```html
<!-- Video with captions -->
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English" default>
  <track kind="descriptions" src="descriptions.vtt" srclang="en" label="Descriptions">
</video>

<!-- Audio with transcript -->
<audio controls>
  <source src="podcast.mp3" type="audio/mp3">
</audio>
<details>
  <summary>Transcript</summary>
  <p>Full transcript text...</p>
</details>
```

---

## Operable

### Keyboard accessible (2.1)

**All functionality must be keyboard accessible:**
```javascript
// ❌ Only handles click
element.addEventListener('click', handleAction);

// ✅ Handles both click and keyboard
element.addEventListener('click', handleAction);
element.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleAction();
  }
});
```

**No keyboard traps.** Users must be able to Tab into and out of every component. Use the [modal focus trap pattern](references/A11Y-PATTERNS.md#modal-focus-trap) for dialogs—the native `<dialog>` element handles this automatically.

### Focus visible (2.4.7)

```css
/* ❌ Never remove focus outlines */
*:focus { outline: none; }

/* ✅ Use :focus-visible for keyboard-only focus */
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* ✅ Or custom focus styles */
button:focus-visible {
  box-shadow: 0 0 0 3px rgba(0, 95, 204, 0.5);
}
```

### Focus not obscured (2.4.11) — new in 2.2

When an element receives keyboard focus, it must not be entirely hidden by other author-created content such as sticky headers, footers, or overlapping panels. At Level AAA (2.4.12), no part of the focused element may be hidden.

```css
/* ✅ Account for sticky headers when scrolling to focused elements */
:target {
  scroll-margin-top: 80px;
}

/* ✅ Ensure focused items clear fixed/sticky bars */
:focus {
  scroll-margin-top: 80px;
  scroll-margin-bottom: 60px;
}
```

### Skip links (2.4.1)

Provide a skip link so keyboard users can bypass repetitive navigation. See the [skip link pattern](references/A11Y-PATTERNS.md#skip-link) for full markup and styles.

### Target size (2.5.8) — new in 2.2

Interactive targets must be at least **24 × 24 CSS pixels** (AA). Exceptions: inline text links, elements where the browser controls the size, and targets where a 24px circle centered on the bounding box does not overlap another target.

```css
/* ✅ Minimum target size */
button,
[role="button"],
input[type="checkbox"] + label,
input[type="radio"] + label {
  min-width: 24px;
  min-height: 24px;
}

/* ✅ Comfortable target size (recommended 44×44) */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

### Dragging movements (2.5.7) — new in 2.2

Any action that requires dragging must have a single-pointer alternative (e.g., buttons, inputs). See the [dragging movements pattern](references/A11Y-PATTERNS.md#dragging-movements) for a sortable-list example.

### Timing (2.2)

```javascript
// Allow users to extend time limits
function showSessionWarning() {
  const modal = createModal({
    title: 'Session Expiring',
    content: 'Your session will expire in 2 minutes.',
    actions: [
      { label: 'Extend session', action: extendSession },
      { label: 'Log out', action: logout }
    ],
    timeout: 120000
  });
}
```

### Motion (2.3)

```css
/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Understandable

### Page language (3.1.1)

```html
<!-- ❌ No language specified -->
<html>

<!-- ✅ Language specified -->
<html lang="en">

<!-- ✅ Language changes within page -->
<p>The French word for hello is <span lang="fr">bonjour</span>.</p>
```

### Consistent navigation (3.2.3)

```html
<!-- Navigation should be consistent across pages -->
<nav aria-label="Main">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

### Consistent help (3.2.6) — new in 2.2

If a help mechanism (contact info, chat widget, FAQ link, self-help option) is repeated across multiple pages, it must appear in the **same relative order** each time. Users who rely on consistent placement shouldn't have to hunt for help on every page.

### Form labels (3.3.2)

Every input needs a programmatically associated label. See the [form labels pattern](references/A11Y-PATTERNS.md#form-labels) for explicit, implicit, and instructional examples.

### Error handling (3.3.1, 3.3.3)

Announce errors to screen readers with `role="alert"` or `aria-live`, set `aria-invalid="true"` on invalid fields, and focus the first error on submit. See the [error handling pattern](references/A11Y-PATTERNS.md#error-handling) for full markup and JS.

### Redundant entry (3.3.7) — new in 2.2

Don't force users to re-enter information they already provided in the same session. Auto-populate from earlier steps, or let users select from previously entered values. Exceptions: security re-confirmation and content that has expired.

```html
<!-- ✅ Auto-fill shipping address from billing -->
<fieldset>
  <legend>Shipping address</legend>
  <label>
    <input type="checkbox" id="same-as-billing" checked>
    Same as billing address
  </label>
  <!-- Fields auto-populated when checked -->
</fieldset>
```

### Accessible authentication (3.3.8) — new in 2.2

Login flows must not rely on cognitive function tests (e.g., remembering a password, solving a puzzle) unless at least one of:
- A copy-paste or autofill mechanism is available
- An alternative method exists (e.g., passkey, SSO, email link)
- The test uses object recognition or personal content (AA only; AAA removes this exception)

```html
<!-- ✅ Allow paste in password fields -->
<input type="password" id="password" autocomplete="current-password">

<!-- ✅ Offer passwordless alternatives -->
<button type="button">Sign in with passkey</button>
<button type="button">Email me a login link</button>
```

---

## Robust

### ARIA usage (4.1.2)

**Prefer native elements:**
```html
<!-- ❌ ARIA role on div -->
<div role="button" tabindex="0">Click me</div>

<!-- ✅ Native button -->
<button>Click me</button>

<!-- ❌ ARIA checkbox -->
<div role="checkbox" aria-checked="false">Option</div>

<!-- ✅ Native checkbox -->
<label><input type="checkbox"> Option</label>
```

**When ARIA is needed,** use the correct roles and states. See the [ARIA tabs pattern](references/A11Y-PATTERNS.md#aria-tabs) for a complete tablist example.

### Live regions (4.1.3)

Use `aria-live` regions to announce dynamic content changes without moving focus. See the [live regions pattern](references/A11Y-PATTERNS.md#live-regions-and-notifications) for markup and a `showNotification()` helper.

---

## Testing checklist

### Automated testing
```bash
# Lighthouse accessibility audit
npx lighthouse https://example.com --only-categories=accessibility

# axe-core
npm install @axe-core/cli -g
axe https://example.com
```

### Manual testing

- [ ] **Keyboard navigation:** Tab through entire page, use Enter/Space to activate
- [ ] **Screen reader:** Test with VoiceOver (Mac), NVDA (Windows), or TalkBack (Android)
- [ ] **Zoom:** Content usable at 200% zoom
- [ ] **High contrast:** Test with Windows High Contrast Mode
- [ ] **Reduced motion:** Test with `prefers-reduced-motion: reduce`
- [ ] **Focus order:** Logical and follows visual order
- [ ] **Target size:** Interactive elements meet 24×24px minimum

See the [screen reader commands reference](references/A11Y-PATTERNS.md#screen-reader-commands) for VoiceOver and NVDA shortcuts.

---

## Common issues by impact

### Critical (fix immediately)
1. Missing form labels
2. Missing image alt text
3. Insufficient color contrast
4. Keyboard traps
5. No focus indicators

### Serious (fix before launch)
1. Missing page language
2. Missing heading structure
3. Non-descriptive link text
4. Auto-playing media
5. Missing skip links

### Moderate (fix soon)
1. Missing ARIA labels on icons
2. Inconsistent navigation
3. Missing error identification
4. Timing without controls
5. Missing landmark regions

## References

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Deque axe Rules](https://dequeuniversity.com/rules/axe/)
- [Web Quality Audit](../web-quality-audit/SKILL.md)
- [WCAG criteria reference](references/WCAG.md)
- [Accessibility code patterns](references/A11Y-PATTERNS.md)
````

## File: .agents/skills/astro/SKILL.md
````markdown
---
name: astro
description: Skill for building with the Astro web framework. Helps create Astro components and pages, configure SSR adapters, set up content collections, deploy static sites, and manage project structure and CLI commands. Use when the user needs to work with Astro, mentions .astro files, asks about static site generation (SSG), islands architecture, content collections, or deploying an Astro project.
license: MIT
metadata: 
  authors: "Astro Team"
  version: "0.0.1"
---

# Astro Usage Guide

**Always consult [docs.astro.build](https://docs.astro.build) for code examples and latest API.**

Astro is the web framework for content-driven websites.

---

## Quick Reference

### File Location
CLI looks for `astro.config.js`, `astro.config.mjs`, `astro.config.cjs`, and `astro.config.ts` in: `./`. Use `--config` for custom path.

### CLI Commands

- `npx astro dev` - Start the development server.
- `npx astro build` - Build your project and write it to disk.
- `npx astro check` - Check your project for errors.
- `npx astro add` - Add an integration.
- `npx astro sync` - Generate TypeScript types for all Astro modules.

**Re-run after adding/changing plugins.**

### Project Structure

Reference [project structure docs](https://docs.astro.build/en/basics/project-structure).

- `src/*` - Project source code (components, pages, styles, images, etc.)
- `src/pages` - **Required.** Defines all pages and routes.
- `src/components` - Components (convention, not required).
- `src/layouts` - Layout components (convention, not required).
- `src/styles` - CSS/Sass files (convention, not required).
- `public/*` - Non-code, unprocessed assets (fonts, icons, etc.); copied as-is to build output.
- `package.json` - Project manifest.
- `astro.config.{js,mjs,cjs,ts}` - Astro configuration file. (recommended)
- `tsconfig.json` - TypeScript configuration file. (recommended)

---

## Core Config Options

| Option | Notes |
|--------|-------|
| `site` | Your final, deployed URL. Used to generate sitemaps and canonical URLs. |

### Example `astro.config.ts`

```ts
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
});
```

---

## Common Workflows

### Creating a Basic Page

Add a file to `src/pages/` — the filename becomes the route:

```astro
---
// src/pages/index.astro
const title = 'Hello, Astro!';
---
<html>
  <head><title>{title}</title></head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

### Creating a Component

```astro
---
// src/components/Card.astro
const { title, body } = Astro.props;
---
<div class="card">
  <h2>{title}</h2>
  <p>{body}</p>
</div>
```

### Deploying with an Adapter

1. Add the adapter: `npx astro add vercel --yes` (or `node`, `cloudflare`, `netlify`)
2. Run `npx astro check` to catch type and configuration errors before building.
3. Run `npx astro build` to produce the deployment artifact.
4. Verify the build output directory (e.g. `dist/`) exists and is non-empty before proceeding.
5. Deploy the output per the adapter's documentation.

---

## Adapters

Deploy to your favorite server, serverless, or edge host with build adapters. Use an adapter to enable on-demand rendering in your Astro project.

**Add [Node.js](https://docs.astro.build/en/guides/integrations-guide/node) adapter using astro add:**
```
npx astro add node --yes
```

**Add [Cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare) adapter using astro add:**
```
npx astro add cloudflare --yes
```

**Add [Netlify](https://docs.astro.build/en/guides/integrations-guide/netlify) adapter using astro add:**
```
npx astro add netlify --yes
```

**Add [Vercel](https://docs.astro.build/en/guides/integrations-guide/vercel) adapter using astro add:**
```
npx astro add vercel --yes
```

[Other Community adapters](https://astro.build/integrations/2/?search=&categories%5B%5D=adapters)

## Resources

- [Docs](https://docs.astro.build)
- [Config Reference](https://docs.astro.build/en/reference/configuration-reference/)
- [llms.txt](https://docs.astro.build/llms.txt)
- [GitHub](https://github.com/withastro/astro)
````

## File: .agents/skills/frontend-design/LICENSE.txt
````
Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS
````

## File: .agents/skills/frontend-design/SKILL.md
````markdown
---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
````

## File: .agents/skills/nodejs-backend-patterns/references/advanced-patterns.md
````markdown
# Node.js Advanced Patterns

Advanced patterns for dependency injection, database integration, authentication, caching, and API response formatting.

## Dependency Injection

### DI Container

```typescript
// di-container.ts
import { Pool } from "pg";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { AuthService } from "./services/auth.service";

class Container {
  private instances = new Map<string, any>();

  register<T>(key: string, factory: () => T): void {
    this.instances.set(key, factory);
  }

  resolve<T>(key: string): T {
    const factory = this.instances.get(key);
    if (!factory) {
      throw new Error(`No factory registered for ${key}`);
    }
    return factory();
  }

  singleton<T>(key: string, factory: () => T): void {
    let instance: T;
    this.instances.set(key, () => {
      if (!instance) {
        instance = factory();
      }
      return instance;
    });
  }
}

export const container = new Container();

// Register dependencies
container.singleton(
  "db",
  () =>
    new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    }),
);

container.singleton(
  "userRepository",
  () => new UserRepository(container.resolve("db")),
);

container.singleton(
  "userService",
  () => new UserService(container.resolve("userRepository")),
);

container.register(
  "userController",
  () => new UserController(container.resolve("userService")),
);

container.singleton(
  "authService",
  () => new AuthService(container.resolve("userRepository")),
);
```

## Database Patterns

### PostgreSQL with Connection Pool

```typescript
// config/database.ts
import { Pool, PoolConfig } from "pg";

const poolConfig: PoolConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

export const pool = new Pool(poolConfig);

// Test connection
pool.on("connect", () => {
  console.log("Database connected");
});

pool.on("error", (err) => {
  console.error("Unexpected database error", err);
  process.exit(-1);
});

// Graceful shutdown
export const closeDatabase = async () => {
  await pool.end();
  console.log("Database connection closed");
};
```

### MongoDB with Mongoose

```typescript
// config/mongoose.ts
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});

export { connectDB };

// Model example
import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

// Indexes
userSchema.index({ email: 1 });

export const User = model<IUser>("User", userSchema);
```

### Transaction Pattern

```typescript
// services/order.service.ts
import { Pool } from "pg";

export class OrderService {
  constructor(private db: Pool) {}

  async createOrder(userId: string, items: any[]) {
    const client = await this.db.connect();

    try {
      await client.query("BEGIN");

      // Create order
      const orderResult = await client.query(
        "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING id",
        [userId, calculateTotal(items)],
      );
      const orderId = orderResult.rows[0].id;

      // Create order items
      for (const item of items) {
        await client.query(
          "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
          [orderId, item.productId, item.quantity, item.price],
        );

        // Update inventory
        await client.query(
          "UPDATE products SET stock = stock - $1 WHERE id = $2",
          [item.quantity, item.productId],
        );
      }

      await client.query("COMMIT");
      return orderId;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}
```

## Authentication & Authorization

### JWT Authentication

```typescript
// services/auth.service.ts
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { UnauthorizedError } from "../utils/errors";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const token = this.generateToken({
      userId: user.id,
      email: user.email,
    });

    const refreshToken = this.generateRefreshToken({
      userId: user.id,
    });

    return {
      token,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
      ) as { userId: string };

      const user = await this.userRepository.findById(payload.userId);

      if (!user) {
        throw new UnauthorizedError("User not found");
      }

      const token = this.generateToken({
        userId: user.id,
        email: user.email,
      });

      return { token };
    } catch (error) {
      throw new UnauthorizedError("Invalid refresh token");
    }
  }

  private generateToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });
  }

  private generateRefreshToken(payload: any): string {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "7d",
    });
  }
}
```

## Caching Strategies

```typescript
// utils/cache.ts
import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || "6379"),
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

export class CacheService {
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    if (ttl) {
      await redis.setex(key, ttl, serialized);
    } else {
      await redis.set(key, serialized);
    }
  }

  async delete(key: string): Promise<void> {
    await redis.del(key);
  }

  async invalidatePattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }
}

// Cache decorator
export function Cacheable(ttl: number = 300) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cache = new CacheService();
      const cacheKey = `${propertyKey}:${JSON.stringify(args)}`;

      const cached = await cache.get(cacheKey);
      if (cached) {
        return cached;
      }

      const result = await originalMethod.apply(this, args);
      await cache.set(cacheKey, result, ttl);

      return result;
    };

    return descriptor;
  };
}
```

## API Response Format

```typescript
// utils/response.ts
import { Response } from "express";

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message?: string,
    statusCode = 200,
  ) {
    return res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  }

  static error(res: Response, message: string, statusCode = 500, errors?: any) {
    return res.status(statusCode).json({
      status: "error",
      message,
      ...(errors && { errors }),
    });
  }

  static paginated<T>(
    res: Response,
    data: T[],
    page: number,
    limit: number,
    total: number,
  ) {
    return res.json({
      status: "success",
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  }
}
```
````

## File: .agents/skills/nodejs-backend-patterns/SKILL.md
````markdown
---
name: nodejs-backend-patterns
description: Build production-ready Node.js backend services with Express/Fastify, implementing middleware patterns, error handling, authentication, database integration, and API design best practices. Use when creating Node.js servers, REST APIs, GraphQL backends, or microservices architectures.
---

# Node.js Backend Patterns

Comprehensive guidance for building scalable, maintainable, and production-ready Node.js backend applications with modern frameworks, architectural patterns, and best practices.

## When to Use This Skill

- Building REST APIs or GraphQL servers
- Creating microservices with Node.js
- Implementing authentication and authorization
- Designing scalable backend architectures
- Setting up middleware and error handling
- Integrating databases (SQL and NoSQL)
- Building real-time applications with WebSockets
- Implementing background job processing

## Core Frameworks

### Express.js - Minimalist Framework

**Basic Setup:**

```typescript
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(",") }));
app.use(compression());

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Fastify - High Performance Framework

**Basic Setup:**

```typescript
import Fastify from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import compress from "@fastify/compress";

const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || "info",
    transport: {
      target: "pino-pretty",
      options: { colorize: true },
    },
  },
});

// Plugins
await fastify.register(helmet);
await fastify.register(cors, { origin: true });
await fastify.register(compress);

// Type-safe routes with schema validation
fastify.post<{
  Body: { name: string; email: string };
  Reply: { id: string; name: string };
}>(
  "/users",
  {
    schema: {
      body: {
        type: "object",
        required: ["name", "email"],
        properties: {
          name: { type: "string", minLength: 1 },
          email: { type: "string", format: "email" },
        },
      },
    },
  },
  async (request, reply) => {
    const { name, email } = request.body;
    return { id: "123", name };
  },
);

await fastify.listen({ port: 3000, host: "0.0.0.0" });
```

## Architectural Patterns

### Pattern 1: Layered Architecture

**Structure:**

```
src/
├── controllers/     # Handle HTTP requests/responses
├── services/        # Business logic
├── repositories/    # Data access layer
├── models/          # Data models
├── middleware/      # Express/Fastify middleware
├── routes/          # Route definitions
├── utils/           # Helper functions
├── config/          # Configuration
└── types/           # TypeScript types
```

**Controller Layer:**

```typescript
// controllers/user.controller.ts
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDTO, UpdateUserDTO } from "../types/user.types";

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: CreateUserDTO = req.body;
      const user = await this.userService.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updates: UpdateUserDTO = req.body;
      const user = await this.userService.updateUser(id, updates);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
```

**Service Layer:**

```typescript
// services/user.service.ts
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDTO, UpdateUserDTO, User } from "../types/user.types";
import { NotFoundError, ValidationError } from "../utils/errors";
import bcrypt from "bcrypt";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userData: CreateUserDTO): Promise<User> {
    // Validation
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ValidationError("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  async updateUser(id: string, updates: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.update(id, updates);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  async deleteUser(id: string): Promise<void> {
    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError("User not found");
    }
  }
}
```

**Repository Layer:**

```typescript
// repositories/user.repository.ts
import { Pool } from "pg";
import { CreateUserDTO, UpdateUserDTO, UserEntity } from "../types/user.types";

export class UserRepository {
  constructor(private db: Pool) {}

  async create(
    userData: CreateUserDTO & { password: string },
  ): Promise<UserEntity> {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, password, created_at, updated_at
    `;
    const { rows } = await this.db.query(query, [
      userData.name,
      userData.email,
      userData.password,
    ]);
    return rows[0];
  }

  async findById(id: string): Promise<UserEntity | null> {
    const query = "SELECT * FROM users WHERE id = $1";
    const { rows } = await this.db.query(query, [id]);
    return rows[0] || null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await this.db.query(query, [email]);
    return rows[0] || null;
  }

  async update(id: string, updates: UpdateUserDTO): Promise<UserEntity | null> {
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    const setClause = fields
      .map((field, idx) => `${field} = $${idx + 2}`)
      .join(", ");

    const query = `
      UPDATE users
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;

    const { rows } = await this.db.query(query, [id, ...values]);
    return rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const query = "DELETE FROM users WHERE id = $1";
    const { rowCount } = await this.db.query(query, [id]);
    return rowCount > 0;
  }
}
```

### Pattern 2: Dependency Injection

Use a DI container to wire up repositories, services, and controllers. For a full container implementation, see [references/advanced-patterns.md](references/advanced-patterns.md).

## Middleware Patterns

### Authentication Middleware

```typescript
// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors";

interface JWTPayload {
  userId: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new UnauthorizedError("No token provided");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    req.user = payload;
    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid token"));
  }
};

export const authorize = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError("Not authenticated"));
    }

    // Check if user has required role
    const hasRole = roles.some((role) => req.user?.roles?.includes(role));

    if (!hasRole) {
      return next(new UnauthorizedError("Insufficient permissions"));
    }

    next();
  };
};
```

### Validation Middleware

```typescript
// middleware/validation.middleware.ts
import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { ValidationError } from "../utils/errors";

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        next(new ValidationError("Validation failed", errors));
      } else {
        next(error);
      }
    }
  };
};

// Usage with Zod
import { z } from "zod";

const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

router.post("/users", validate(createUserSchema), userController.createUser);
```

### Rate Limiting Middleware

```typescript
// middleware/rate-limit.middleware.ts
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || "6379"),
});

export const apiLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: "rl:",
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: "rl:auth:",
  }),
  windowMs: 15 * 60 * 1000,
  max: 5, // Stricter limit for auth endpoints
  skipSuccessfulRequests: true,
});
```

### Request Logging Middleware

```typescript
// middleware/logger.middleware.ts
import { Request, Response, NextFunction } from "express";
import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  // Log response when finished
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    });
  });

  next();
};

export { logger };
```

## Error Handling

### Custom Error Classes

```typescript
// utils/errors.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public errors?: any[],
  ) {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden") {
    super(message, 403);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}
```

### Global Error Handler

```typescript
// middleware/error-handler.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { logger } from "./logger.middleware";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      ...(err instanceof ValidationError && { errors: err.errors }),
    });
  }

  // Log unexpected errors
  logger.error({
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  });

  // Don't leak error details in production
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message;

  res.status(500).json({
    status: "error",
    message,
  });
};

// Async error wrapper
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
```

## Database Patterns

Node.js supports both SQL and NoSQL databases. Use connection pooling for all production databases.

Key patterns covered in [references/advanced-patterns.md](references/advanced-patterns.md):
- **PostgreSQL with connection pool** — `pg` Pool configuration and graceful shutdown
- **MongoDB with Mongoose** — connection management and schema definition
- **Transaction pattern** — `BEGIN`/`COMMIT`/`ROLLBACK` with `pg` client

## Authentication & Authorization

JWT-based auth with access tokens (short-lived, 15m) and refresh tokens (7d). Full `AuthService` implementation with `bcrypt` password comparison in [references/advanced-patterns.md](references/advanced-patterns.md).

## Caching Strategies

Redis-backed `CacheService` with get/set/delete/invalidatePattern, plus a `@Cacheable` decorator for method-level caching. See [references/advanced-patterns.md](references/advanced-patterns.md).

## API Response Format

Standardized `ApiResponse` helper with `success`, `error`, and `paginated` static methods. See [references/advanced-patterns.md](references/advanced-patterns.md).

## Best Practices

1. **Use TypeScript**: Type safety prevents runtime errors
2. **Implement proper error handling**: Use custom error classes
3. **Validate input**: Use libraries like Zod or Joi
4. **Use environment variables**: Never hardcode secrets
5. **Implement logging**: Use structured logging (Pino, Winston)
6. **Add rate limiting**: Prevent abuse
7. **Use HTTPS**: Always in production
8. **Implement CORS properly**: Don't use `*` in production
9. **Use dependency injection**: Easier testing and maintenance
10. **Write tests**: Unit, integration, and E2E tests
11. **Handle graceful shutdown**: Clean up resources
12. **Use connection pooling**: For databases
13. **Implement health checks**: For monitoring
14. **Use compression**: Reduce response size
15. **Monitor performance**: Use APM tools

## Testing Patterns

See `javascript-testing-patterns` skill for comprehensive testing guidance.
````

## File: .agents/skills/nodejs-best-practices/SKILL.md
````markdown
---
name: nodejs-best-practices
description: "Node.js development principles and decision-making. Framework selection, async patterns, security, and architecture. Teaches thinking, not copying."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Node.js Best Practices

> Principles and decision-making for Node.js development in 2025.
> **Learn to THINK, not memorize code patterns.**

## When to Use
Use this skill when making Node.js architecture decisions, choosing frameworks, designing async patterns, or applying security and deployment best practices.

---

## ⚠️ How to Use This Skill

This skill teaches **decision-making principles**, not fixed code to copy.

- ASK user for preferences when unclear
- Choose framework/pattern based on CONTEXT
- Don't default to same solution every time

---

## 1. Framework Selection (2025)

### Decision Tree

```
What are you building?
│
├── Edge/Serverless (Cloudflare, Vercel)
│   └── Hono (zero-dependency, ultra-fast cold starts)
│
├── High Performance API
│   └── Fastify (2-3x faster than Express)
│
├── Enterprise/Team familiarity
│   └── NestJS (structured, DI, decorators)
│
├── Legacy/Stable/Maximum ecosystem
│   └── Express (mature, most middleware)
│
└── Full-stack with frontend
    └── Next.js API Routes or tRPC
```

### Comparison Principles

| Factor | Hono | Fastify | Express |
|--------|------|---------|---------|
| **Best for** | Edge, serverless | Performance | Legacy, learning |
| **Cold start** | Fastest | Fast | Moderate |
| **Ecosystem** | Growing | Good | Largest |
| **TypeScript** | Native | Excellent | Good |
| **Learning curve** | Low | Medium | Low |

### Selection Questions to Ask:
1. What's the deployment target?
2. Is cold start time critical?
3. Does team have existing experience?
4. Is there legacy code to maintain?

---

## 2. Runtime Considerations (2025)

### Native TypeScript

```
Node.js 22+: --experimental-strip-types
├── Run .ts files directly
├── No build step needed for simple projects
└── Consider for: scripts, simple APIs
```

### Module System Decision

```
ESM (import/export)
├── Modern standard
├── Better tree-shaking
├── Async module loading
└── Use for: new projects

CommonJS (require)
├── Legacy compatibility
├── More npm packages support
└── Use for: existing codebases, some edge cases
```

### Runtime Selection

| Runtime | Best For |
|---------|----------|
| **Node.js** | General purpose, largest ecosystem |
| **Bun** | Performance, built-in bundler |
| **Deno** | Security-first, built-in TypeScript |

---

## 3. Architecture Principles

### Layered Structure Concept

```
Request Flow:
│
├── Controller/Route Layer
│   ├── Handles HTTP specifics
│   ├── Input validation at boundary
│   └── Calls service layer
│
├── Service Layer
│   ├── Business logic
│   ├── Framework-agnostic
│   └── Calls repository layer
│
└── Repository Layer
    ├── Data access only
    ├── Database queries
    └── ORM interactions
```

### Why This Matters:
- **Testability**: Mock layers independently
- **Flexibility**: Swap database without touching business logic
- **Clarity**: Each layer has single responsibility

### When to Simplify:
- Small scripts → Single file OK
- Prototypes → Less structure acceptable
- Always ask: "Will this grow?"

---

## 4. Error Handling Principles

### Centralized Error Handling

```
Pattern:
├── Create custom error classes
├── Throw from any layer
├── Catch at top level (middleware)
└── Format consistent response
```

### Error Response Philosophy

```
Client gets:
├── Appropriate HTTP status
├── Error code for programmatic handling
├── User-friendly message
└── NO internal details (security!)

Logs get:
├── Full stack trace
├── Request context
├── User ID (if applicable)
└── Timestamp
```

### Status Code Selection

| Situation | Status | When |
|-----------|--------|------|
| Bad input | 400 | Client sent invalid data |
| No auth | 401 | Missing or invalid credentials |
| No permission | 403 | Valid auth, but not allowed |
| Not found | 404 | Resource doesn't exist |
| Conflict | 409 | Duplicate or state conflict |
| Validation | 422 | Schema valid but business rules fail |
| Server error | 500 | Our fault, log everything |

---

## 5. Async Patterns Principles

### When to Use Each

| Pattern | Use When |
|---------|----------|
| `async/await` | Sequential async operations |
| `Promise.all` | Parallel independent operations |
| `Promise.allSettled` | Parallel where some can fail |
| `Promise.race` | Timeout or first response wins |

### Event Loop Awareness

```
I/O-bound (async helps):
├── Database queries
├── HTTP requests
├── File system
└── Network operations

CPU-bound (async doesn't help):
├── Crypto operations
├── Image processing
├── Complex calculations
└── → Use worker threads or offload
```

### Avoiding Event Loop Blocking

- Never use sync methods in production (fs.readFileSync, etc.)
- Offload CPU-intensive work
- Use streaming for large data

---

## 6. Validation Principles

### Validate at Boundaries

```
Where to validate:
├── API entry point (request body/params)
├── Before database operations
├── External data (API responses, file uploads)
└── Environment variables (startup)
```

### Validation Library Selection

| Library | Best For |
|---------|----------|
| **Zod** | TypeScript first, inference |
| **Valibot** | Smaller bundle (tree-shakeable) |
| **ArkType** | Performance critical |
| **Yup** | Existing React Form usage |

### Validation Philosophy

- Fail fast: Validate early
- Be specific: Clear error messages
- Don't trust: Even "internal" data

---

## 7. Security Principles

### Security Checklist (Not Code)

- [ ] **Input validation**: All inputs validated
- [ ] **Parameterized queries**: No string concatenation for SQL
- [ ] **Password hashing**: bcrypt or argon2
- [ ] **JWT verification**: Always verify signature and expiry
- [ ] **Rate limiting**: Protect from abuse
- [ ] **Security headers**: Helmet.js or equivalent
- [ ] **HTTPS**: Everywhere in production
- [ ] **CORS**: Properly configured
- [ ] **Secrets**: Environment variables only
- [ ] **Dependencies**: Regularly audited

### Security Mindset

```
Trust nothing:
├── Query params → validate
├── Request body → validate
├── Headers → verify
├── Cookies → validate
├── File uploads → scan
└── External APIs → validate response
```

---

## 8. Testing Principles

### Test Strategy Selection

| Type | Purpose | Tools |
|------|---------|-------|
| **Unit** | Business logic | node:test, Vitest |
| **Integration** | API endpoints | Supertest |
| **E2E** | Full flows | Playwright |

### What to Test (Priorities)

1. **Critical paths**: Auth, payments, core business
2. **Edge cases**: Empty inputs, boundaries
3. **Error handling**: What happens when things fail?
4. **Not worth testing**: Framework code, trivial getters

### Built-in Test Runner (Node.js 22+)

```
node --test src/**/*.test.ts
├── No external dependency
├── Good coverage reporting
└── Watch mode available
```

---

## 9. Anti-Patterns to Avoid

### ❌ DON'T:
- Use Express for new edge projects (use Hono)
- Use sync methods in production code
- Put business logic in controllers
- Skip input validation
- Hardcode secrets
- Trust external data without validation
- Block event loop with CPU work

### ✅ DO:
- Choose framework based on context
- Ask user for preferences when unclear
- Use layered architecture for growing projects
- Validate all inputs
- Use environment variables for secrets
- Profile before optimizing

---

## 10. Decision Checklist

Before implementing:

- [ ] **Asked user about stack preference?**
- [ ] **Chosen framework for THIS context?** (not just default)
- [ ] **Considered deployment target?**
- [ ] **Planned error handling strategy?**
- [ ] **Identified validation points?**
- [ ] **Considered security requirements?**

---

> **Remember**: Node.js best practices are about decision-making, not memorizing patterns. Every project deserves fresh consideration based on its requirements.

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.
````

## File: .agents/skills/seo/SKILL.md
````markdown
---
name: seo
description: Optimize for search engine visibility and ranking. Use when asked to "improve SEO", "optimize for search", "fix meta tags", "add structured data", "sitemap optimization", or "search engine optimization".
license: MIT
metadata:
  author: web-quality-skills
  version: "1.0"
---

# SEO optimization

Search engine optimization based on Lighthouse SEO audits and Google Search guidelines. Focus on technical SEO, on-page optimization, and structured data.

## SEO fundamentals

Search ranking factors (approximate influence):

| Factor | Influence | This Skill |
|--------|-----------|------------|
| Content quality & relevance | ~40% | Partial (structure) |
| Backlinks & authority | ~25% | ✗ |
| Technical SEO | ~15% | ✓ |
| Page experience (Core Web Vitals) | ~10% | See [Core Web Vitals](../core-web-vitals/SKILL.md) |
| On-page SEO | ~10% | ✓ |

---

## Technical SEO

### Crawlability

**robots.txt:**
```text
# /robots.txt
User-agent: *
Allow: /

# Block admin/private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Don't block resources needed for rendering
# ❌ Disallow: /static/

Sitemap: https://example.com/sitemap.xml
```

**Meta robots:**
```html
<!-- Default: indexable, followable -->
<meta name="robots" content="index, follow">

<!-- Noindex specific pages -->
<meta name="robots" content="noindex, nofollow">

<!-- Indexable but don't follow links -->
<meta name="robots" content="index, nofollow">

<!-- Control snippets -->
<meta name="robots" content="max-snippet:150, max-image-preview:large">
```

**Canonical URLs:**
```html
<!-- Prevent duplicate content issues -->
<link rel="canonical" href="https://example.com/page">

<!-- Self-referencing canonical (recommended) -->
<link rel="canonical" href="https://example.com/current-page">

<!-- For paginated content -->
<link rel="canonical" href="https://example.com/products">
<!-- Or use rel="prev" / rel="next" for explicit pagination -->
```

### XML sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/products</loc>
    <lastmod>2024-01-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Sitemap best practices:**
- Maximum 50,000 URLs or 50MB per sitemap
- Use sitemap index for larger sites
- Include only canonical, indexable URLs
- Update `lastmod` when content changes
- Submit to Google Search Console

### URL structure

```
✅ Good URLs:
https://example.com/products/blue-widget
https://example.com/blog/how-to-use-widgets

❌ Poor URLs:
https://example.com/p?id=12345
https://example.com/products/item/category/subcategory/blue-widget-2024-sale-discount
```

**URL guidelines:**
- Use hyphens, not underscores
- Lowercase only
- Keep short (< 75 characters)
- Include target keywords naturally
- Avoid parameters when possible
- Use HTTPS always

### HTTPS & security

```html
<!-- Ensure all resources use HTTPS -->
<img src="https://example.com/image.jpg">

<!-- Not: -->
<img src="http://example.com/image.jpg">
```

**Security headers for SEO trust signals:**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
```

---

## On-page SEO

### Title tags

```html
<!-- ❌ Missing or generic -->
<title>Page</title>
<title>Home</title>

<!-- ✅ Descriptive with primary keyword -->
<title>Blue Widgets for Sale | Premium Quality | Example Store</title>
```

**Title tag guidelines:**
- 50-60 characters (Google truncates ~60)
- Primary keyword near the beginning
- Unique for every page
- Brand name at end (unless homepage)
- Action-oriented when appropriate

### Meta descriptions

```html
<!-- ❌ Missing or duplicate -->
<meta name="description" content="">

<!-- ✅ Compelling and unique -->
<meta name="description" content="Shop premium blue widgets with free shipping. 30-day returns. Rated 4.9/5 by 10,000+ customers. Order today and save 20%.">
```

**Meta description guidelines:**
- 150-160 characters
- Include primary keyword naturally
- Compelling call-to-action
- Unique for every page
- Matches page content

### Heading structure

```html
<!-- ❌ Poor structure -->
<h2>Welcome to Our Store</h2>
<h4>Products</h4>
<h1>Contact Us</h1>

<!-- ✅ Proper hierarchy -->
<h1>Blue Widgets - Premium Quality</h1>
  <h2>Product Features</h2>
    <h3>Durability</h3>
    <h3>Design</h3>
  <h2>Customer Reviews</h2>
  <h2>Pricing</h2>
```

**Heading guidelines:**
- Single `<h1>` per page (the main topic)
- Logical hierarchy (don't skip levels)
- Include keywords naturally
- Descriptive, not generic

### Image SEO

```html
<!-- ❌ Poor image SEO -->
<img src="IMG_12345.jpg">

<!-- ✅ Optimized image -->
<img src="blue-widget-product-photo.webp"
     alt="Blue widget with chrome finish, side view showing control panel"
     width="800"
     height="600"
     loading="lazy">
```

**Image guidelines:**
- Descriptive filenames with keywords
- Alt text describes the image content
- Compressed and properly sized
- WebP/AVIF with fallbacks
- Lazy load below-fold images

### Internal linking

```html
<!-- ❌ Non-descriptive -->
<a href="/products">Click here</a>
<a href="/widgets">Read more</a>

<!-- ✅ Descriptive anchor text -->
<a href="/products/blue-widgets">Browse our blue widget collection</a>
<a href="/guides/widget-maintenance">Learn how to maintain your widgets</a>
```

**Linking guidelines:**
- Descriptive anchor text with keywords
- Link to relevant internal pages
- Reasonable number of links per page
- Fix broken links promptly
- Use breadcrumbs for hierarchy

---

## Structured data (JSON-LD)

### Organization

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Example Company",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://twitter.com/example",
    "https://linkedin.com/company/example"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "customer service"
  }
}
</script>
```

### Article

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Choose the Right Widget",
  "description": "Complete guide to selecting widgets for your needs.",
  "image": "https://example.com/article-image.jpg",
  "author": {
    "@type": "Person",
    "name": "Jane Smith",
    "url": "https://example.com/authors/jane-smith"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Example Blog",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-20"
}
</script>
```

### Product

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Blue Widget Pro",
  "image": "https://example.com/blue-widget.jpg",
  "description": "Premium blue widget with advanced features.",
  "brand": {
    "@type": "Brand",
    "name": "WidgetCo"
  },
  "offers": {
    "@type": "Offer",
    "price": "49.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://example.com/products/blue-widget"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "1250"
  }
}
</script>
```

### FAQ

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What colors are available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our widgets come in blue, red, and green."
      }
    },
    {
      "@type": "Question",
      "name": "What is the warranty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All widgets include a 2-year warranty."
      }
    }
  ]
}
</script>
```

### Breadcrumbs

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://example.com/products"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Blue Widgets",
      "item": "https://example.com/products/blue-widgets"
    }
  ]
}
</script>
```

### Validation

Test structured data at:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

---

## Mobile SEO

### Responsive design

```html
<!-- ❌ Not mobile-friendly -->
<meta name="viewport" content="width=1024">

<!-- ✅ Responsive viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

### Tap targets

```css
/* ❌ Too small for mobile */
.small-link {
  padding: 4px;
  font-size: 12px;
}

/* ✅ Adequate tap target */
.mobile-friendly-link {
  padding: 12px;
  font-size: 16px;
  min-height: 48px;
  min-width: 48px;
}
```

### Font sizes

```css
/* ❌ Too small on mobile */
body {
  font-size: 10px;
}

/* ✅ Readable without zooming */
body {
  font-size: 16px;
  line-height: 1.5;
}
```

---

## International SEO

### Hreflang tags

```html
<!-- For multi-language sites -->
<link rel="alternate" hreflang="en" href="https://example.com/page">
<link rel="alternate" hreflang="es" href="https://example.com/es/page">
<link rel="alternate" hreflang="fr" href="https://example.com/fr/page">
<link rel="alternate" hreflang="x-default" href="https://example.com/page">
```

### Language declaration

```html
<html lang="en">
<!-- or -->
<html lang="es-MX">
```

---

## SEO audit checklist

### Critical
- [ ] HTTPS enabled
- [ ] robots.txt allows crawling
- [ ] No `noindex` on important pages
- [ ] Title tags present and unique
- [ ] Single `<h1>` per page

### High priority
- [ ] Meta descriptions present
- [ ] Sitemap submitted
- [ ] Canonical URLs set
- [ ] Mobile-responsive
- [ ] Core Web Vitals passing

### Medium priority
- [ ] Structured data implemented
- [ ] Internal linking strategy
- [ ] Image alt text
- [ ] Descriptive URLs
- [ ] Breadcrumb navigation

### Ongoing
- [ ] Fix crawl errors in Search Console
- [ ] Update sitemap when content changes
- [ ] Monitor ranking changes
- [ ] Check for broken links
- [ ] Review Search Console insights

---

## Tools

| Tool | Use |
|------|-----|
| Google Search Console | Monitor indexing, fix issues |
| Google PageSpeed Insights | Performance + Core Web Vitals |
| Rich Results Test | Validate structured data |
| Lighthouse | Full SEO audit |
| Screaming Frog | Crawl analysis |

## References

- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Core Web Vitals](../core-web-vitals/SKILL.md)
- [Web Quality Audit](../web-quality-audit/SKILL.md)
````

## File: .agents/skills/tailwind-css-patterns/references/accessibility.md
````markdown
# Tailwind CSS Accessibility Guidelines

## Focus Management

```html
<!-- Custom focus styles that meet WCAG AA -->
<button class="focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2">
  Accessible Button
</button>

<!-- Skip links for keyboard navigation -->
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4">
  Skip to main content
</a>
```

### Focus Visible vs Focus

```html
<!-- Only show focus ring on keyboard navigation -->
<button class="focus-visible:ring-2 focus-visible:ring-blue-500">
  Keyboard-only focus indicator
</button>
```

---

## Screen Reader Support

```html
<!-- Semantic buttons with ARIA labels -->
<button aria-label="Close dialog" class="p-2">
  <svg class="w-5 h-5" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>

<!-- Descriptive links -->
<a href="/docs" aria-describedby="docs-description">
  Documentation
</a>
<p id="docs-description" class="sr-only">
  Learn how to use our API and integration guides
</p>

<!-- Live regions for dynamic content -->
<div aria-live="polite" class="sr-only">
  <p>3 new notifications</p>
</div>
```

### Screen Reader Only Content

```html
<span class="sr-only">Opens in new window</span>
```

---

## Color Contrast

```html
<!-- Ensure sufficient contrast ratios -->
<div class="bg-gray-900 text-white">
  High contrast text (WCAG AAA)
</div>

<div class="bg-blue-500 text-blue-100">
  Good contrast on colored backgrounds
</div>

<!-- Use contrast utilities for testing -->
<div class="bg-red-500 text-white contrast-more:bg-red-600 contrast-more:text-red-100">
  Adjusts for high contrast mode
</div>
```

### Contrast Guidelines

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

---

## Motion Preferences

```html
<!-- Respect prefers-reduced-motion -->
<div class="transform transition-transform motion-reduce:transition-none">
  Doesn't animate when user prefers reduced motion
</div>

<!-- Conditional animations -->
<div class="animate-pulse motion-safe:hover:animate-spin">
  Only animates when motion is preferred
</div>
```

### Reduced Motion Media Query

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## ARIA Patterns with Tailwind

### Toggle Button

```html
<button
  type="button"
  role="switch"
  aria-checked="false"
  class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 aria-checked:bg-blue-600"
>
  <span class="sr-only">Enable notifications</span>
  <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1 aria-checked:translate-x-6"></span>
</button>
```

### Alert Dialog

```html
<div
  role="alertdialog"
  aria-labelledby="alert-title"
  aria-describedby="alert-description"
  class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
>
  <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-6">
    <h2 id="alert-title" class="text-lg font-bold mb-2">
      Are you sure?
    </h2>
    <p id="alert-description" class="text-gray-600 mb-4">
      This action cannot be undone.
    </p>
    <div class="flex justify-end gap-2">
      <button class="px-4 py-2 text-gray-600">Cancel</button>
      <button class="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
    </div>
  </div>
</div>
```

---

## Accessibility Checklist

- [ ] All interactive elements have visible focus indicators
- [ ] Color contrast meets WCAG standards
- [ ] Images have alt text
- [ ] Form inputs have associated labels
- [ ] ARIA labels used for icon-only buttons
- [ ] Animations respect reduced motion preference
- [ ] Skip links provided for keyboard navigation
- [ ] Landmarks (header, main, nav, footer) used appropriately
````

## File: .agents/skills/tailwind-css-patterns/references/animations.md
````markdown
# Tailwind CSS Animations & Transitions

## Basic Transitions

```html
<button class="bg-blue-500 hover:bg-blue-700 transition duration-300">
  Smooth transition
</button>
```

### Transition Properties

| Class | Description |
|-------|-------------|
| `transition` | All properties |
| `transition-colors` | Color properties only |
| `transition-opacity` | Opacity only |
| `transition-transform` | Transform only |
| `duration-150` | 150ms duration |
| `duration-300` | 300ms duration |
| `ease-in` | Ease in timing |
| `ease-out` | Ease out timing |
| `ease-in-out` | Ease in-out timing |

---

## Transform Effects

```html
<!-- Scale on hover -->
<div class="transform hover:scale-110 transition duration-300">
  Scale on hover
</div>

<!-- Rotate on hover -->
<img class="transform hover:rotate-6 transition duration-300" />

<!-- Multiple transforms -->
<div class="transform hover:scale-105 hover:-translate-y-1 transition">
  Scale up and move up
</div>
```

---

## Built-in Animations

```html
<div class="animate-spin">Spinning</div>
<div class="animate-pulse">Pulsing</div>
<div class="animate-bounce">Bouncing</div>
<div class="animate-ping">Pinging (radar effect)</div>
```

### Common Use Cases

```html
<!-- Loading spinner -->
<svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>

<!-- Skeleton loading -->
<div class="animate-pulse space-y-4">
  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
  <div class="h-4 bg-gray-200 rounded"></div>
  <div class="h-4 bg-gray-200 rounded w-5/6"></div>
</div>

<!-- Notification badge -->
<span class="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-red-400 opacity-75"></span>
<span class="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
```

---

## Custom Animations (v4.1+)

```css
/* In your CSS with @theme */
@theme {
  --animate-fade-in: fadeIn 0.5s ease-in-out;
  --animate-slide-up: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Usage:

```html
<div class="animate-fade-in">Fades in on load</div>
<div class="animate-slide-up">Slides up on load</div>
```

---

## Motion Preferences

Respect user's motion preferences:

```html
<!-- Disable animations for users who prefer reduced motion -->
<div class="transform transition-transform motion-reduce:transition-none">
  Doesn't animate when user prefers reduced motion
</div>

<!-- Only animate when motion is preferred -->
<div class="animate-pulse motion-safe:hover:animate-spin">
  Only animates when motion is preferred
</div>
```

### Global Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
````

## File: .agents/skills/tailwind-css-patterns/references/component-patterns.md
````markdown
# Tailwind CSS Component Patterns

## Card Component

```html
<div class="bg-white rounded-lg shadow-lg overflow-hidden">
  <img class="w-full h-48 object-cover" src="image.jpg" alt="Card image" />
  <div class="p-6">
    <h3 class="text-xl font-bold mb-2">Card Title</h3>
    <p class="text-gray-700 mb-4">Card description text goes here.</p>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Action
    </button>
  </div>
</div>
```

## Responsive User Card

```html
<div class="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden sm:flex sm:max-w-2xl">
  <img class="h-48 w-full object-cover sm:h-auto sm:w-48"
       src="profile.jpg"
       alt="Profile" />
  <div class="p-8">
    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
      Product Engineer
    </div>
    <h2 class="mt-1 text-xl font-semibold text-gray-900">
      John Doe
    </h2>
    <p class="mt-2 text-gray-500">
      Building amazing products with modern technology.
    </p>
    <button class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
      Contact
    </button>
  </div>
</div>
```

## Navigation Bar

```html
<nav class="bg-white shadow-lg">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      <div class="flex items-center">
        <a href="#" class="text-xl font-bold text-gray-800">Logo</a>
      </div>
      <div class="hidden md:flex space-x-8">
        <a href="#" class="text-gray-700 hover:text-blue-600 transition">Home</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 transition">About</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 transition">Services</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 transition">Contact</a>
      </div>
      <button class="md:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
  </div>
</nav>
```

## Form Elements

```html
<form class="space-y-6 max-w-md mx-auto">
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      Email
    </label>
    <input
      type="email"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="you@example.com"
    />
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      Password
    </label>
    <input
      type="password"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>

  <div class="flex items-center">
    <input type="checkbox" class="mr-2" />
    <label class="text-sm text-gray-600">Remember me</label>
  </div>

  <button
    type="submit"
    class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
  >
    Sign In
  </button>
</form>
```

## Modal/Dialog

```html
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
  <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold">Modal Title</h3>
      <button class="text-gray-500 hover:text-gray-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <p class="text-gray-700 mb-6">
      Modal content goes here.
    </p>
    <div class="flex justify-end space-x-4">
      <button class="px-4 py-2 text-gray-600 hover:text-gray-800">
        Cancel
      </button>
      <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Confirm
      </button>
    </div>
  </div>
</div>
```

## React Button Component with Variants

```tsx
import { useState } from 'react';

function Button({
  variant = 'primary',
  size = 'md',
  children
}: {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}) {
  const baseClasses = 'font-semibold rounded transition';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
}
```
````

## File: .agents/skills/tailwind-css-patterns/references/configuration.md
````markdown
# Tailwind CSS Configuration

## CSS-First Configuration (v4.1+)

Use the `@theme` directive for CSS-based configuration:

```css
/* src/styles.css */
@import "tailwindcss";

@theme {
  /* Custom colors */
  --color-brand-50: #f0f9ff;
  --color-brand-500: #3b82f6;
  --color-brand-900: #1e3a8a;

  /* Custom fonts */
  --font-display: "Inter", system-ui, sans-serif;
  --font-mono: "Fira Code", monospace;

  /* Custom spacing */
  --spacing-128: 32rem;

  /* Custom animations */
  --animate-fade-in: fadeIn 0.5s ease-in-out;

  /* Custom breakpoints */
  --breakpoint-3xl: 1920px;
}

/* Define custom animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Custom utilities */
@utility content-auto {
  content-visibility: auto;
}
```

---

## JavaScript Configuration (Legacy)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,svelte}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
```

---

## Vite Integration (v4.1+)

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

---

## Advanced v4.1 Features

### Native CSS Custom Properties

```html
<div class="bg-[var(--color-brand-500)] text-[var(--color-white)]">
  Using CSS custom properties directly
</div>
```

### Enhanced Arbitrary Values

```html
<!-- Complex grid with custom tracks -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
  Responsive grid without custom CSS
</div>

<!-- Custom animation timing -->
<div class="animate-bounce ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
  Bounce with custom easing
</div>
```

### Custom Utilities

```css
@utility content-auto {
  content-visibility: auto;
}

@utility text-shadow {
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

---

## Plugins

### Custom Plugin Example

```javascript
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function({ addUtilities, addComponents, e, config }) {
      // Add custom utilities
      addUtilities({
        '.content-auto': {
          contentVisibility: 'auto',
        },
      })

      // Add custom components
      addComponents({
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
      })
    }),
  ],
}
```

---

## Presets

### Creating a Reusable Preset

```javascript
// tailwind-preset.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#1d4ed8',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### Using a Preset

```javascript
// tailwind.config.js
module.exports = {
  presets: [
    require('./tailwind-preset.js'),
  ],
}
```
````

## File: .agents/skills/tailwind-css-patterns/references/layout-patterns.md
````markdown
# Tailwind CSS Layout Patterns

## Layout Utilities

### Flexbox Layouts

Basic flex container:

```html
<div class="flex items-center justify-between">
  <div>Left</div>
  <div>Center</div>
  <div>Right</div>
</div>
```

Responsive flex direction:

```html
<div class="flex flex-col md:flex-row gap-4">
  <div class="flex-1">Item 1</div>
  <div class="flex-1">Item 2</div>
  <div class="flex-1">Item 3</div>
</div>
```

Common flex patterns:

```html
<!-- Center content -->
<div class="flex items-center justify-center min-h-screen">
  <div>Centered Content</div>
</div>

<!-- Space between items -->
<div class="flex justify-between items-center">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Vertical stack with gap -->
<div class="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Grid Layouts

Basic grid:

```html
<div class="grid grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

Responsive grid:

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <!-- 1 column mobile, 2 tablet, 4 desktop -->
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

Auto-fit columns:

```html
<div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
  <!-- Automatically fit columns based on container width -->
</div>
```

### Container & Max Width

Centered container with max width:

```html
<div class="container mx-auto px-4 max-w-7xl">
  <!-- Centered content with padding -->
</div>
```

Responsive max width:

```html
<div class="w-full max-w-md mx-auto">
  <!-- Max 448px width, centered -->
</div>
```

---

## Spacing

### Padding & Margin

Uniform spacing:

```html
<div class="p-4">Padding all sides</div>
<div class="m-4">Margin all sides</div>
```

Individual sides:

```html
<div class="pt-4 pr-8 pb-4 pl-8">
  <!-- Top 1rem, Right 2rem, Bottom 1rem, Left 2rem -->
</div>
```

Axis-based spacing:

```html
<div class="px-4 py-8">
  <!-- Horizontal padding 1rem, Vertical padding 2rem -->
</div>
```

Responsive spacing:

```html
<div class="p-4 md:p-8 lg:p-12">
  <!-- Increases padding at larger breakpoints -->
</div>
```

Space between children:

```html
<div class="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## Typography

### Font Size & Weight

```html
<h1 class="text-4xl font-bold">Large Heading</h1>
<h2 class="text-2xl font-semibold">Subheading</h2>
<p class="text-base font-normal">Body text</p>
<small class="text-sm text-gray-600">Small text</small>
```

Responsive typography:

```html
<h1 class="text-2xl md:text-4xl lg:text-6xl font-bold">
  Responsive Heading
</h1>
```

### Line Height & Letter Spacing

```html
<p class="leading-relaxed tracking-wide">
  Text with relaxed line height and wide letter spacing
</p>
```

### Text Alignment

```html
<p class="text-left md:text-center">
  Left aligned on mobile, centered on tablet+
</p>
```

---

## Colors

### Background Colors

```html
<div class="bg-blue-500">Blue background</div>
<div class="bg-gray-100">Light gray background</div>
<div class="bg-gradient-to-r from-blue-500 to-purple-600">
  Gradient background
</div>
```

### Text Colors

```html
<p class="text-gray-900">Dark text</p>
<p class="text-blue-600">Blue text</p>
<p class="text-red-500">Error text</p>
```

### Opacity

```html
<div class="bg-blue-500 bg-opacity-50">
  Semi-transparent blue
</div>
```

---

## Responsive Breakpoints Reference

| Prefix | Min Width | CSS Equivalent |
|--------|-----------|----------------|
| `sm:` | 640px | `@media (min-width: 640px)` |
| `md:` | 768px | `@media (min-width: 768px)` |
| `lg:` | 1024px | `@media (min-width: 1024px)` |
| `xl:` | 1280px | `@media (min-width: 1280px)` |
| `2xl:` | 1536px | `@media (min-width: 1536px)` |
````

## File: .agents/skills/tailwind-css-patterns/references/performance.md
````markdown
# Tailwind CSS Performance Optimization

## Bundle Size Optimization

Configure content sources for optimal purging:

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,svelte}",
    "./node_modules/@mycompany/ui-lib/**/*.{js,ts,jsx,tsx}",
  ],
  // Enable JIT for faster builds
  jit: true,
}
```

### Content Path Best Practices

1. **Be specific**: Don't use `"./**/*"` - it scans too many files
2. **Include UI libraries**: Add paths to component libraries
3. **Exclude tests**: Don't include test files in content paths

---

## CSS Optimization Techniques

```html
<!-- Use content-visibility for offscreen content -->
<div class="content-visibility-auto">
  <div>Heavy content that's initially offscreen</div>
</div>

<!-- Optimize images with aspect-ratio -->
<img class="aspect-video w-full object-cover" src="video.jpg" alt="Video thumbnail" />

<!-- Use contain for paint optimization -->
<div class="contain-layout">
  Complex layout that doesn't affect outside elements
</div>
```

---

## Development Performance (v4.1+)

```css
/* Enable CSS-first configuration in v4.1 */
@import "tailwindcss";

@theme {
  /* Define once, use everywhere */
  --color-brand: #3b82f6;
  --font-mono: "Fira Code", monospace;
}

/* Critical CSS for above-the-fold content */
@layer critical {
  .hero-title {
    @apply text-4xl md:text-6xl font-bold;
  }
}
```

---

## Production Build Optimization

### PurgeCSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.html',
      './src/**/*.jsx',
      './src/**/*.tsx',
    ],
    options: {
      safelist: [
        'bg-red-500',
        'text-center',
        // Classes that shouldn't be purged
      ],
    },
  },
}
```

### Minification

```bash
# Use cssnano for minification
npm install -D cssnano

# In postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [require('cssnano')] : []),
  ],
}
```

---

## Best Practices for Performance

1. **Use the JIT engine**: Faster builds, smaller output
2. **Configure content correctly**: Only include files that use Tailwind
3. **Minimize custom CSS**: Use Tailwind utilities over custom CSS
4. **Enable purging in production**: Removes unused styles
5. **Use `@layer` for custom styles**: Helps with organization and purging
6. **Avoid `@apply` in components**: Prefer composing utilities in markup
````

## File: .agents/skills/tailwind-css-patterns/references/reference.md
````markdown
# Tailwind CSS Documentation

Tailwind CSS is a utility-first CSS framework that generates styles by scanning HTML, JavaScript, and template files for class names. It provides a comprehensive design system through CSS utility classes, enabling rapid UI development without writing custom CSS. The framework operates at build-time, analyzing source files and generating only the CSS classes actually used in the project, resulting in optimized production bundles with zero runtime overhead.

The framework includes an extensive default color palette (18 colors with 11 shades each), responsive breakpoint system, customizable design tokens via CSS custom properties, and support for dark mode, pseudo-classes, pseudo-elements, and media queries through variant prefixes. Tailwind CSS v4.1 introduces CSS-first configuration using the `@theme` directive, native support for custom utilities via `@utility`, seamless integration with modern build tools through Vite, PostCSS, and framework-specific plugins, and enhanced arbitrary value syntax for maximum flexibility.

## Installation with Vite

Installing Tailwind CSS using the Vite plugin for modern JavaScript frameworks.

```bash
# Create a new Vite project
npm create vite@latest my-project
cd my-project

# Install Tailwind CSS and Vite plugin
npm install tailwindcss @tailwindcss/vite
```

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
 plugins: [
 tailwindcss(),
 ],
})
```

```css
/* src/style.css */
@import "tailwindcss";
```

```html



# Hello world!

```

## Utility Classes with Variants

Applying conditional styles using variant prefixes for hover, focus, and responsive breakpoints.

```html

 Save changes

Content adapts to color scheme preference

 Submit

```

## Custom Theme Configuration

Defining custom design tokens using the `@theme` directive in CSS.

```css
/* app.css */
@import "tailwindcss";

@theme {
 /* Custom fonts */
 --font-display: "Satoshi", "sans-serif";
 --font-body: "Inter", system-ui, sans-serif;

 /* Custom colors */
 --color-brand-50: oklch(0.98 0.02 264);
 --color-brand-100: oklch(0.95 0.05 264);
 --color-brand-500: oklch(0.55 0.22 264);
 --color-brand-900: oklch(0.25 0.12 264);

 /* Custom breakpoints */
 --breakpoint-3xl: 120rem;
 --breakpoint-4xl: 160rem;

 /* Custom spacing */
 --spacing-18: calc(var(--spacing) * 18);

 /* Custom animations */
 --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
 --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
}
```

```html

Custom design system

```

## Arbitrary Values

Using square bracket notation for one-off custom values without leaving HTML.

```html

Pixel-perfect positioning

Custom hex colors, font sizes, and content

Any CSS property

Reference custom properties

Complex grid layouts

Font size from CSS variable

Color from CSS variable

```

## Color System

Working with Tailwind's comprehensive color palette and opacity modifiers.

```html

Color utilities across all properties

Alpha channel with percentage

Arbitrary opacity values

Opacity from CSS variable

Adapts to color scheme


```

## Dark Mode

Implementing dark mode with CSS media queries or manual toggle.

```html

Content automatically adapts


```

```css
/* Manual dark mode toggle with class selector */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

```html

Controlled by .dark class




```

```javascript
// Dark mode toggle logic
// On page load or theme change
document.documentElement.classList.toggle(
 "dark",
 localStorage.theme === "dark" ||
 (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
);

// User chooses light mode
localStorage.theme = "light";

// User chooses dark mode
localStorage.theme = "dark";

// User chooses system preference
localStorage.removeItem("theme");
```

## State Variants

Styling elements based on pseudo-classes and parent/sibling state.

```html

- Item content


**Title**
Description

Please provide a valid email address.


 Option

```

## Responsive Design

Building mobile-first responsive layouts with breakpoint variants.

```html

# Responsive heading

Text scales with viewport


Desktop only

Mobile only

Custom breakpoint

Below medium

```

## Custom Utilities

Creating reusable custom utility classes with variant support.

```css
/* Simple custom utility */
@utility content-auto {
 content-visibility: auto;
}

/* Complex utility with nesting */
@utility scrollbar-hidden {
 &::-webkit-scrollbar {
 display: none;
 }
}

/* Functional utility with theme values */
@theme {
 --tab-size-2: 2;
 --tab-size-4: 4;
 --tab-size-github: 8;
}

@utility tab-* {
 tab-size: --value(--tab-size-*);
}

/* Supporting arbitrary, bare, and theme values */
@utility opacity-* {
 opacity: --value([percentage]);
 opacity: calc(--value(integer) * 1%);
 opacity: --value(--opacity-*);
}

/* Utility with modifiers */
@utility text-* {
 font-size: --value(--text-*, [length]);
 line-height: --modifier(--leading-*, [length], [*]);
}

/* Negative value support */
@utility inset-* {
 inset: --spacing(--value(integer));
 inset: --value([percentage], [length]);
}

@utility -inset-* {
 inset: --spacing(--value(integer) * -1);
 inset: calc(--value([percentage], [length]) * -1);
}
```

```html

Custom utilities work with variants

Variants and arbitrary values supported

Utility with modifier (font-size/line-height)

```

## Custom Variants

Registering custom conditional styles with the `@custom-variant` directive.

```css
/* Simple custom variant */
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));

/* Variant with media query */
@custom-variant any-hover {
 @media (any-hover: hover) {
 &:hover {
 @slot;
 }
 }
}

/* ARIA state variant */
@custom-variant aria-asc (&[aria-sort="ascending"]);
@custom-variant aria-desc (&[aria-sort="descending"]);

/* Data attribute variant */
@custom-variant data-checked (&[data-ui~="checked"]);
```

```html

 Midnight theme button


 Sortable column

Checked state

One-off custom selectors

```

## Applying Variants in CSS

Using the `@variant` directive to apply variants within custom CSS.

```css
/* Single variant */
.my-element {
 background: white;

 @variant dark {
 background: black;
 }
}

/* Nested variants */
.my-button {
 background: white;

 @variant dark {
 background: gray;

 @variant hover {
 background: black;
 }
 }
}

/* Compiled output */
.my-element {
 background: white;
}

@media (prefers-color-scheme: dark) {
 .my-element {
 background: black;
 }
}
```

## Layer Organization

Organizing custom styles into Tailwind's cascade layers.

```css
@import "tailwindcss";

/* Base styles for HTML elements */
@layer base {
 h1 {
 font-size: var(--text-2xl);
 font-weight: bold;
 }

 h2 {
 font-size: var(--text-xl);
 font-weight: 600;
 }

 body {
 font-family: var(--font-body);
 }
}

/* Reusable component classes */
@layer components {
 .btn {
 padding: --spacing(2) --spacing(4);
 border-radius: var(--radius);
 font-weight: 600;
 transition: all 150ms;
 }

 .btn-primary {
 background-color: var(--color-blue-500);
 color: white;
 }

 .card {
 background-color: var(--color-white);
 border-radius: var(--radius-lg);
 padding: --spacing(6);
 box-shadow: var(--shadow-xl);
 }

 /* Third-party component overrides */
 .select2-dropdown {
 border-radius: var(--radius);
 box-shadow: var(--shadow-lg);
 }
}
```

```html

Square corners despite card class

 Component with utility overrides

```

## Functions and Directives

Using Tailwind's CSS functions for dynamic values and opacity adjustments.

```css
/* Alpha function for opacity */
.my-element {
 color: --alpha(var(--color-lime-300) / 50%);
 background: --alpha(var(--color-blue-500) / 25%);
}

/* Spacing function */
.my-element {
 margin: --spacing(4);
 padding: calc(--spacing(6) - 1px);
}

/* In arbitrary values */

/* Source directive for additional content */
@source "../node_modules/@my-company/ui-lib";

/* Apply directive for inline utilities */
.select2-dropdown {
 @apply rounded-b-lg shadow-md;
}

.select2-search {
 @apply rounded border border-gray-300;
}

.select2-results__group {
 @apply text-lg font-bold text-gray-900;
}
```

## Pseudo-elements

Styling ::before, ::after, ::placeholder, and other pseudo-elements.

```html

 Email


- First item
- Second item

Select this text to see custom colors

Typography with pseudo-elements

```

## Media Queries

Conditional styling based on user preferences and device capabilities.

```html

 Respects user preference

 Only animates if motion allowed

 Adjusts for contrast needs


Hidden in portrait mode

Layout adapts to orientation

 Not shown when printing

Only visible in print

Progressive enhancement

```

## Summary

Tailwind CSS provides a complete utility-first design system that eliminates the need for writing custom CSS in most cases. The framework's primary use cases include rapid prototyping, building production applications with consistent design systems, creating responsive layouts, implementing dark mode, and maintaining design consistency across large teams. By using utility classes directly in markup, developers can iterate quickly, avoid naming conventions, and prevent CSS bloat since only used styles are generated.

The v4.1 release enhances the developer experience with CSS-first configuration, eliminating JavaScript configuration files for most projects. Integration patterns include using the Vite plugin for modern frameworks, PostCSS for custom build pipelines, the Tailwind CLI for simple projects, and CDN scripts for rapid prototyping. The framework excels at component-driven development when combined with React, Vue, Svelte, or other modern frameworks, where utility classes are co-located with component logic. Custom design systems can be fully defined in CSS using `@theme`, with project-specific utilities and variants extending the framework's capabilities without writing JavaScript plugins.
````

## File: .agents/skills/tailwind-css-patterns/references/responsive-design.md
````markdown
# Tailwind CSS Responsive Design & Dark Mode

## Responsive Design Patterns

### Mobile-First Responsive Layout

```html
<div class="container mx-auto px-4">
  <!-- Hero Section -->
  <div class="flex flex-col md:flex-row items-center gap-8 py-12">
    <div class="flex-1">
      <h1 class="text-3xl md:text-5xl font-bold mb-4">
        Welcome to Our Site
      </h1>
      <p class="text-lg text-gray-600 mb-6">
        Build amazing things with Tailwind CSS
      </p>
      <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Get Started
      </button>
    </div>
    <div class="flex-1">
      <img src="hero.jpg" class="w-full rounded-lg shadow-lg" />
    </div>
  </div>
</div>
```

### Responsive Grid Gallery

```html
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
    <img src="image1.jpg" class="w-full h-full object-cover hover:scale-105 transition" />
  </div>
  <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
    <img src="image2.jpg" class="w-full h-full object-cover hover:scale-105 transition" />
  </div>
  <!-- More items... -->
</div>
```

### Responsive Card Component

```tsx
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden
                    sm:flex sm:max-w-2xl">
      <img
        className="h-48 w-full object-cover sm:h-auto sm:w-48"
        src={product.image}
        alt={product.name}
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {product.name}
        </h3>
        <p className="mt-2 text-gray-600">
          {product.description}
        </p>
        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white
                          rounded-lg hover:bg-indigo-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
```

---

## Dark Mode

### Basic Dark Mode Support

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 class="text-gray-900 dark:text-white">Title</h1>
  <p class="text-gray-600 dark:text-gray-400">Description</p>
</div>
```

Enable dark mode in tailwind.config.js:

```javascript
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}
```

### Dark Mode Toggle (React)

```tsx
function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
}
```

### Dark Mode Best Practices

1. **Use semantic color names**: Instead of `bg-white` use `bg-surface` custom color
2. **Test with real content**: Some colors look good in light but not in dark
3. **Respect system preference**: Use `darkMode: 'media'` for OS-level preference
4. **Smooth transitions**: Add transition utilities for theme changes

```css
/* Global transition for theme changes */
* {
  @apply transition-colors duration-200;
}
```

---

## Container Queries (v4.1+)

Component that responds to its container size, not viewport:

```html
<div class="@container">
  <div class="@lg:text-xl @2xl:text-2xl">
    Text size based on container, not viewport
  </div>
</div>
```

Usage in a card component:

```html
<div class="@container w-full">
  <div class="flex flex-col @[400px]:flex-row gap-4">
    <img class="w-full @[400px]:w-32 h-32 object-cover" src="image.jpg" />
    <div>
      <h3 class="text-base @[400px]:text-lg font-bold">Title</h3>
      <p class="text-sm @[400px]:text-base">Description</p>
    </div>
  </div>
</div>
```
````

## File: .agents/skills/tailwind-css-patterns/SKILL.md
````markdown
---
name: tailwind-css-patterns
description: Provides comprehensive Tailwind CSS utility-first styling patterns including responsive design, layout utilities, flexbox, grid, spacing, typography, colors, and modern CSS best practices. Use when styling React/Vue/Svelte components, building responsive layouts, implementing design systems, or optimizing CSS workflow.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Tailwind CSS Development Patterns

Expert guide for building modern, responsive user interfaces with Tailwind CSS utility-first framework. Covers v4.1+ features including CSS-first configuration, custom utilities, and enhanced developer experience.

## Overview

Provides actionable patterns for responsive, accessible UIs with Tailwind CSS v4.1+. Covers utility composition, dark mode, component patterns, and performance optimization.

## When to Use

- Styling React/Vue/Svelte components
- Building responsive layouts and grids
- Implementing design systems
- Adding dark mode support
- Optimizing CSS workflow

## Quick Reference

### Responsive Breakpoints

| Prefix | Min Width | Description |
|--------|-----------|-------------|
| `sm:` | 640px | Small screens |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktops |
| `xl:` | 1280px | Large screens |
| `2xl:` | 1536px | Extra large |

### Common Patterns

```html
<!-- Center content -->
<div class="flex items-center justify-center min-h-screen">
  Content
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Items -->
</div>

<!-- Card component -->
<div class="bg-white rounded-lg shadow-lg p-6">
  <h3 class="text-xl font-bold">Title</h3>
  <p class="text-gray-600">Description</p>
</div>
```

## Instructions

1. **Start Mobile-First**: Write base styles for mobile, add responsive prefixes (`sm:`, `md:`, `lg:`) for larger screens
2. **Use Design Tokens**: Leverage Tailwind's spacing, color, and typography scales
3. **Compose Utilities**: Combine multiple utilities for complex styles
4. **Extract Components**: Create reusable component classes for repeated patterns
5. **Configure Theme**: Customize design tokens in `tailwind.config.js` or using `@theme`
6. **Verify Changes**: Test at each breakpoint using DevTools responsive mode. Check for visual regressions and accessibility issues before committing.

## Examples

### Responsive Card Component

```tsx
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden sm:flex">
      <img className="h-48 w-full object-cover sm:h-auto sm:w-48" src={product.image} />
      <div className="p-6">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
```

### Dark Mode Toggle

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 class="dark:text-white">Title</h1>
</div>
```

### Form Input

```html
<input
  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  placeholder="you@example.com"
/>
```

## Best Practices

1. **Consistent Spacing**: Use Tailwind's spacing scale (4, 8, 12, 16, etc.)
2. **Color Palette**: Stick to Tailwind's color system for consistency
3. **Component Extraction**: Extract repeated patterns into reusable components
4. **Utility Composition**: Prefer utility classes over `@apply` for maintainability
5. **Semantic HTML**: Use proper HTML elements with Tailwind classes
6. **Performance**: Ensure content paths include all template files for optimal purging
7. **Accessibility**: Include focus styles, ARIA labels, and respect user preferences (reduced-motion)

## Troubleshooting

### Classes Not Applying
- **Check content paths**: Ensure all template files are included in `content: []` in config
- **Verify build**: Run `npm run build` to regenerate purged CSS
- **Dev mode**: Use `npx tailwindcss -o` with `--watch` flag for live updates

### Responsive Styles Not Working
- **Order matters**: Responsive prefixes must come before non-responsive (e.g., `md:flex` not `flex md:flex`)
- **Check breakpoint values**: Verify breakpoints match your design requirements
- **DevTools**: Use browser DevTools responsive mode to test at each breakpoint

### Dark Mode Issues
- **Verify config**: Ensure `darkMode: 'class'` or `'media'` is set correctly
- **Toggle implementation**: Use `document.documentElement.classList.toggle('dark')` for class strategy
- **Initial flash**: Add `dark` class to `<html>` before body renders

## Constraints and Warnings

- **Class Proliferation**: Long class strings reduce readability; extract into components
- **Content Paths**: Misconfigured paths cause classes to be purged in production
- **Arbitrary Values**: Use sparingly; prefer design tokens for consistency
- **Specificity Issues**: Avoid `@apply` with complex selectors
- **Dark Mode**: Requires correct configuration (`class` or `media` strategy)
- **Browser Support**: Check Tailwind docs for compatibility notes

## References

- **[references/layout-patterns.md](references/layout-patterns.md)** — Flexbox, grid, spacing, typography, colors
- **[references/component-patterns.md](references/component-patterns.md)** — Cards, navigation, forms, modals, React patterns
- **[references/responsive-design.md](references/responsive-design.md)** — Responsive patterns, dark mode, container queries
- **[references/animations.md](references/animations.md)** — Transitions, transforms, built-in animations, motion preferences
- **[references/performance.md](references/performance.md)** — Bundle optimization, CSS optimization, production builds
- **[references/accessibility.md](references/accessibility.md)** — Focus management, screen readers, color contrast, ARIA
- **[references/configuration.md](references/configuration.md)** — CSS-first config, JavaScript config, plugins, presets
- **[references/reference.md](references/reference.md)** — Additional reference materials

## External Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com)
- [Tailwind Play](https://play.tailwindcss.com)
````

## File: .agents/skills/typescript-advanced-types/SKILL.md
````markdown
---
name: typescript-advanced-types
description: Master TypeScript's advanced type system including generics, conditional types, mapped types, template literals, and utility types for building type-safe applications. Use when implementing complex type logic, creating reusable type utilities, or ensuring compile-time type safety in TypeScript projects.
---

# TypeScript Advanced Types

Comprehensive guidance for mastering TypeScript's advanced type system including generics, conditional types, mapped types, template literal types, and utility types for building robust, type-safe applications.

## When to Use This Skill

- Building type-safe libraries or frameworks
- Creating reusable generic components
- Implementing complex type inference logic
- Designing type-safe API clients
- Building form validation systems
- Creating strongly-typed configuration objects
- Implementing type-safe state management
- Migrating JavaScript codebases to TypeScript

## Core Concepts

### 1. Generics

**Purpose:** Create reusable, type-flexible components while maintaining type safety.

**Basic Generic Function:**

```typescript
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42); // Type: number
const str = identity<string>("hello"); // Type: string
const auto = identity(true); // Type inferred: boolean
```

**Generic Constraints:**

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): T {
  console.log(item.length);
  return item;
}

logLength("hello"); // OK: string has length
logLength([1, 2, 3]); // OK: array has length
logLength({ length: 10 }); // OK: object has length
// logLength(42);             // Error: number has no length
```

**Multiple Type Parameters:**

```typescript
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "John" }, { age: 30 });
// Type: { name: string } & { age: number }
```

### 2. Conditional Types

**Purpose:** Create types that depend on conditions, enabling sophisticated type logic.

**Basic Conditional Type:**

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

**Extracting Return Types:**

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: "John" };
}

type User = ReturnType<typeof getUser>;
// Type: { id: number; name: string; }
```

**Distributive Conditional Types:**

```typescript
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>;
// Type: string[] | number[]
```

**Nested Conditions:**

```typescript
type TypeName<T> = T extends string
  ? "string"
  : T extends number
    ? "number"
    : T extends boolean
      ? "boolean"
      : T extends undefined
        ? "undefined"
        : T extends Function
          ? "function"
          : "object";

type T1 = TypeName<string>; // "string"
type T2 = TypeName<() => void>; // "function"
```

### 3. Mapped Types

**Purpose:** Transform existing types by iterating over their properties.

**Basic Mapped Type:**

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  id: number;
  name: string;
}

type ReadonlyUser = Readonly<User>;
// Type: { readonly id: number; readonly name: string; }
```

**Optional Properties:**

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type PartialUser = Partial<User>;
// Type: { id?: number; name?: string; }
```

**Key Remapping:**

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// Type: { getName: () => string; getAge: () => number; }
```

**Filtering Properties:**

```typescript
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

interface Mixed {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

type OnlyNumbers = PickByType<Mixed, number>;
// Type: { id: number; age: number; }
```

### 4. Template Literal Types

**Purpose:** Create string-based types with pattern matching and transformation.

**Basic Template Literal:**

```typescript
type EventName = "click" | "focus" | "blur";
type EventHandler = `on${Capitalize<EventName>}`;
// Type: "onClick" | "onFocus" | "onBlur"
```

**String Manipulation:**

```typescript
type UppercaseGreeting = Uppercase<"hello">; // "HELLO"
type LowercaseGreeting = Lowercase<"HELLO">; // "hello"
type CapitalizedName = Capitalize<"john">; // "John"
type UncapitalizedName = Uncapitalize<"John">; // "john"
```

**Path Building:**

```typescript
type Path<T> = T extends object
  ? {
      [K in keyof T]: K extends string ? `${K}` | `${K}.${Path<T[K]>}` : never;
    }[keyof T]
  : never;

interface Config {
  server: {
    host: string;
    port: number;
  };
  database: {
    url: string;
  };
}

type ConfigPath = Path<Config>;
// Type: "server" | "database" | "server.host" | "server.port" | "database.url"
```

### 5. Utility Types

**Built-in Utility Types:**

```typescript
// Partial<T> - Make all properties optional
type PartialUser = Partial<User>;

// Required<T> - Make all properties required
type RequiredUser = Required<PartialUser>;

// Readonly<T> - Make all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick<T, K> - Select specific properties
type UserName = Pick<User, "name" | "email">;

// Omit<T, K> - Remove specific properties
type UserWithoutPassword = Omit<User, "password">;

// Exclude<T, U> - Exclude types from union
type T1 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"

// Extract<T, U> - Extract types from union
type T2 = Extract<"a" | "b" | "c", "a" | "b">; // "a" | "b"

// NonNullable<T> - Exclude null and undefined
type T3 = NonNullable<string | null | undefined>; // string

// Record<K, T> - Create object type with keys K and values T
type PageInfo = Record<"home" | "about", { title: string }>;
```

## Advanced Patterns

### Pattern 1: Type-Safe Event Emitter

```typescript
type EventMap = {
  "user:created": { id: string; name: string };
  "user:updated": { id: string };
  "user:deleted": { id: string };
};

class TypedEventEmitter<T extends Record<string, any>> {
  private listeners: {
    [K in keyof T]?: Array<(data: T[K]) => void>;
  } = {};

  on<K extends keyof T>(event: K, callback: (data: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    const callbacks = this.listeners[event];
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }
}

const emitter = new TypedEventEmitter<EventMap>();

emitter.on("user:created", (data) => {
  console.log(data.id, data.name); // Type-safe!
});

emitter.emit("user:created", { id: "1", name: "John" });
// emitter.emit("user:created", { id: "1" });  // Error: missing 'name'
```

### Pattern 2: Type-Safe API Client

```typescript
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

type EndpointConfig = {
  "/users": {
    GET: { response: User[] };
    POST: { body: { name: string; email: string }; response: User };
  };
  "/users/:id": {
    GET: { params: { id: string }; response: User };
    PUT: { params: { id: string }; body: Partial<User>; response: User };
    DELETE: { params: { id: string }; response: void };
  };
};

type ExtractParams<T> = T extends { params: infer P } ? P : never;
type ExtractBody<T> = T extends { body: infer B } ? B : never;
type ExtractResponse<T> = T extends { response: infer R } ? R : never;

class APIClient<Config extends Record<string, Record<HTTPMethod, any>>> {
  async request<Path extends keyof Config, Method extends keyof Config[Path]>(
    path: Path,
    method: Method,
    ...[options]: ExtractParams<Config[Path][Method]> extends never
      ? ExtractBody<Config[Path][Method]> extends never
        ? []
        : [{ body: ExtractBody<Config[Path][Method]> }]
      : [
          {
            params: ExtractParams<Config[Path][Method]>;
            body?: ExtractBody<Config[Path][Method]>;
          },
        ]
  ): Promise<ExtractResponse<Config[Path][Method]>> {
    // Implementation here
    return {} as any;
  }
}

const api = new APIClient<EndpointConfig>();

// Type-safe API calls
const users = await api.request("/users", "GET");
// Type: User[]

const newUser = await api.request("/users", "POST", {
  body: { name: "John", email: "john@example.com" },
});
// Type: User

const user = await api.request("/users/:id", "GET", {
  params: { id: "123" },
});
// Type: User
```

### Pattern 3: Builder Pattern with Type Safety

```typescript
type BuilderState<T> = {
  [K in keyof T]: T[K] | undefined;
};

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type IsComplete<T, S> =
  RequiredKeys<T> extends keyof S
    ? S[RequiredKeys<T>] extends undefined
      ? false
      : true
    : false;

class Builder<T, S extends BuilderState<T> = {}> {
  private state: S = {} as S;

  set<K extends keyof T>(key: K, value: T[K]): Builder<T, S & Record<K, T[K]>> {
    this.state[key] = value;
    return this as any;
  }

  build(this: IsComplete<T, S> extends true ? this : never): T {
    return this.state as T;
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

const builder = new Builder<User>();

const user = builder
  .set("id", "1")
  .set("name", "John")
  .set("email", "john@example.com")
  .build(); // OK: all required fields set

// const incomplete = builder
//   .set("id", "1")
//   .build();  // Error: missing required fields
```

### Pattern 4: Deep Readonly/Partial

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepReadonly<T[P]>
    : T[P];
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : DeepPartial<T[P]>
    : T[P];
};

interface Config {
  server: {
    host: string;
    port: number;
    ssl: {
      enabled: boolean;
      cert: string;
    };
  };
  database: {
    url: string;
    pool: {
      min: number;
      max: number;
    };
  };
}

type ReadonlyConfig = DeepReadonly<Config>;
// All nested properties are readonly

type PartialConfig = DeepPartial<Config>;
// All nested properties are optional
```

### Pattern 5: Type-Safe Form Validation

```typescript
type ValidationRule<T> = {
  validate: (value: T) => boolean;
  message: string;
};

type FieldValidation<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

type ValidationErrors<T> = {
  [K in keyof T]?: string[];
};

class FormValidator<T extends Record<string, any>> {
  constructor(private rules: FieldValidation<T>) {}

  validate(data: T): ValidationErrors<T> | null {
    const errors: ValidationErrors<T> = {};
    let hasErrors = false;

    for (const key in this.rules) {
      const fieldRules = this.rules[key];
      const value = data[key];

      if (fieldRules) {
        const fieldErrors: string[] = [];

        for (const rule of fieldRules) {
          if (!rule.validate(value)) {
            fieldErrors.push(rule.message);
          }
        }

        if (fieldErrors.length > 0) {
          errors[key] = fieldErrors;
          hasErrors = true;
        }
      }
    }

    return hasErrors ? errors : null;
  }
}

interface LoginForm {
  email: string;
  password: string;
}

const validator = new FormValidator<LoginForm>({
  email: [
    {
      validate: (v) => v.includes("@"),
      message: "Email must contain @",
    },
    {
      validate: (v) => v.length > 0,
      message: "Email is required",
    },
  ],
  password: [
    {
      validate: (v) => v.length >= 8,
      message: "Password must be at least 8 characters",
    },
  ],
});

const errors = validator.validate({
  email: "invalid",
  password: "short",
});
// Type: { email?: string[]; password?: string[]; } | null
```

### Pattern 6: Discriminated Unions

```typescript
type Success<T> = {
  status: "success";
  data: T;
};

type Error = {
  status: "error";
  error: string;
};

type Loading = {
  status: "loading";
};

type AsyncState<T> = Success<T> | Error | Loading;

function handleState<T>(state: AsyncState<T>): void {
  switch (state.status) {
    case "success":
      console.log(state.data); // Type: T
      break;
    case "error":
      console.log(state.error); // Type: string
      break;
    case "loading":
      console.log("Loading...");
      break;
  }
}

// Type-safe state machine
type State =
  | { type: "idle" }
  | { type: "fetching"; requestId: string }
  | { type: "success"; data: any }
  | { type: "error"; error: Error };

type Event =
  | { type: "FETCH"; requestId: string }
  | { type: "SUCCESS"; data: any }
  | { type: "ERROR"; error: Error }
  | { type: "RESET" };

function reducer(state: State, event: Event): State {
  switch (state.type) {
    case "idle":
      return event.type === "FETCH"
        ? { type: "fetching", requestId: event.requestId }
        : state;
    case "fetching":
      if (event.type === "SUCCESS") {
        return { type: "success", data: event.data };
      }
      if (event.type === "ERROR") {
        return { type: "error", error: event.error };
      }
      return state;
    case "success":
    case "error":
      return event.type === "RESET" ? { type: "idle" } : state;
  }
}
```

## Type Inference Techniques

### 1. Infer Keyword

```typescript
// Extract array element type
type ElementType<T> = T extends (infer U)[] ? U : never;

type NumArray = number[];
type Num = ElementType<NumArray>; // number

// Extract promise type
type PromiseType<T> = T extends Promise<infer U> ? U : never;

type AsyncNum = PromiseType<Promise<number>>; // number

// Extract function parameters
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function foo(a: string, b: number) {}
type FooParams = Parameters<typeof foo>; // [string, number]
```

### 2. Type Guards

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isArrayOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T,
): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

const data: unknown = ["a", "b", "c"];

if (isArrayOf(data, isString)) {
  data.forEach((s) => s.toUpperCase()); // Type: string[]
}
```

### 3. Assertion Functions

```typescript
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Not a string");
  }
}

function processValue(value: unknown) {
  assertIsString(value);
  // value is now typed as string
  console.log(value.toUpperCase());
}
```

## Best Practices

1. **Use `unknown` over `any`**: Enforce type checking
2. **Prefer `interface` for object shapes**: Better error messages
3. **Use `type` for unions and complex types**: More flexible
4. **Leverage type inference**: Let TypeScript infer when possible
5. **Create helper types**: Build reusable type utilities
6. **Use const assertions**: Preserve literal types
7. **Avoid type assertions**: Use type guards instead
8. **Document complex types**: Add JSDoc comments
9. **Use strict mode**: Enable all strict compiler options
10. **Test your types**: Use type tests to verify type behavior

## Type Testing

```typescript
// Type assertion tests
type AssertEqual<T, U> = [T] extends [U]
  ? [U] extends [T]
    ? true
    : false
  : false;

type Test1 = AssertEqual<string, string>; // true
type Test2 = AssertEqual<string, number>; // false
type Test3 = AssertEqual<string | number, string>; // false

// Expect error helper
type ExpectError<T extends never> = T;

// Example usage
type ShouldError = ExpectError<AssertEqual<string, number>>;
```

## Common Pitfalls

1. **Over-using `any`**: Defeats the purpose of TypeScript
2. **Ignoring strict null checks**: Can lead to runtime errors
3. **Too complex types**: Can slow down compilation
4. **Not using discriminated unions**: Misses type narrowing opportunities
5. **Forgetting readonly modifiers**: Allows unintended mutations
6. **Circular type references**: Can cause compiler errors
7. **Not handling edge cases**: Like empty arrays or null values

## Performance Considerations

- Avoid deeply nested conditional types
- Use simple types when possible
- Cache complex type computations
- Limit recursion depth in recursive types
- Use build tools to skip type checking in production
````

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

## File: src/layouts/Layout.astro
````astro
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
````

## File: src/pages/blog/[id].astro
````astro
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
const { title, author, description } = blog.data;
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
````

## File: src/styles/global.css
````css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
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
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.20"
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

## File: skills-lock.json
````json
{
  "version": 1,
  "skills": {
    "accessibility": {
      "source": "addyosmani/web-quality-skills",
      "sourceType": "autoskills-registry",
      "computedHash": "bffe3d08cfe92ebad63699f74ce29e35c19850ebfbf474c1463183cfe34d6a09"
    },
    "astro": {
      "source": "astrolicious/agent-skills",
      "sourceType": "autoskills-registry",
      "computedHash": "2afd3a02edf4374598ce471dabb1ab5638851dbf7b82d0bb36f1019331eafb54"
    },
    "frontend-design": {
      "source": "anthropics/skills",
      "sourceType": "autoskills-registry",
      "computedHash": "82fb11a63fb1e35ee2469516ed02d54695f783115b1540c0e783197af4240a3a"
    },
    "nodejs-backend-patterns": {
      "source": "wshobson/agents",
      "sourceType": "autoskills-registry",
      "computedHash": "710a5e6f83c46e8f6c43356df55c143a7375c4414559a581654ce51709138c55"
    },
    "nodejs-best-practices": {
      "source": "sickn33/antigravity-awesome-skills",
      "sourceType": "autoskills-registry",
      "computedHash": "7361ab02fb6b09913e3bdd9cf61c629ed6c17de9485e6a781054e5d437ccfc29"
    },
    "seo": {
      "source": "addyosmani/web-quality-skills",
      "sourceType": "autoskills-registry",
      "computedHash": "c184da724d1c61ad077f27418ea8e7e88fd54bcdf98165e18be7e4681cbd5e20"
    },
    "tailwind-css-patterns": {
      "source": "giuseppe-trisciuoglio/developer-kit",
      "sourceType": "autoskills-registry",
      "computedHash": "8fd534b64b3f305ade80c207e2f9ba4338d5e409e355af9f724c36764b6709c1"
    },
    "typescript-advanced-types": {
      "source": "wshobson/agents",
      "sourceType": "autoskills-registry",
      "computedHash": "5ca0e177c6aaaba1889255691224daafdb7d71f317cc70bede1590d3907ded42"
    }
  }
}
````

## File: tsconfig.json
````json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
````

## File: src/content/blogs/01_elecciones_2026.md
````markdown
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
````

## File: src/content/blogs/02_en_busqueda_deLaCarrera.md
````markdown
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
````

## File: src/content/blogs/03_sobre_la_ia.md
````markdown
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
````

## File: src/pages/index.astro
````astro
---
import { getCollection } from "astro:content";
import Layout from "../layouts/Layout.astro";
import perfil from "../assets/perfil01.jpg";

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
              Bachiller en Ciencia Política (UNMSM) y estudiante del Cuarto Ciclo de Desarrollo de Sistemas (IDAT). 
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
                      <h3 class="text-sm font-extrabold tracking-tight text-neutral-950 leading-tight">
                        {project.data.title}
                      </h3>
                      <p class="text-[10px] font-medium italic text-neutral-500">
                        Por <span class="text-blue-900">{project.data.author}</span>
                      </p>
                      <p class="text-xs leading-relaxed text-neutral-600 line-clamp-2">
                        {project.data.description}
                      </p>
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
````
