# USS Design DNA — Source of Truth

> **Theme Identity: "Industrial Dark"**
> Every new page or component generated for USS must adhere to this document.
> This is the canonical style reference for Stitch, AI generation, and manual development.

---

## 1. Color Palette

| Token         | Hex         | Tailwind Class     | Usage                                         |
|---------------|-------------|---------------------|-----------------------------------------------|
| **Primary**   | `#1e3a8a`   | `text-primary`, `bg-primary` | CTA banners, nav highlights, link hovers |
| **Secondary** | `#475569`   | `text-secondary`   | Nav labels, muted body text                   |
| **Accent**    | `#CC0000`   | `text-accent`, `bg-accent` | Primary buttons, badges, section markers, hero text highlights |
| **Dark**      | `#1e293b`   | `bg-dark`          | Primary page backgrounds, footer, hero overlays |
| **Light**     | `#f8fafc`   | `bg-light`         | Reserved for light mode (currently unused)     |
| Gray-900      | `#111827`   | `bg-gray-900`      | Alternating section backgrounds               |
| Gray-800      | `#1f2937`   | `bg-gray-800`      | Cards, form containers, elevated surfaces     |
| Gray-700      | `#374151`   | `border-gray-700`  | Card borders, dividers                        |
| White/10      | `rgba(255,255,255,0.1)` | `bg-white/10` | Subtle badges, tag chips                |
| White/5       | `rgba(255,255,255,0.05)` | `bg-white/5` | Customer logo card backgrounds           |

### Color Rules (DO NOT DEVIATE)
- **Page backgrounds** always alternate between `bg-dark` (`#1e293b`) and `bg-gray-900` (`#111827`).
- **Cards** always use `bg-gray-800` with `border border-gray-700`.
- **Accent color** (`#CC0000`) is reserved for CTAs, section markers, and emphasis — never for backgrounds of large areas.
- **Text on dark backgrounds**: Headings `text-white`, body `text-gray-300`, muted `text-gray-400`.

---

## 2. Typography

| Property       | Value                              |
|----------------|------------------------------------|
| **Font Family** | `Inter` (Google Fonts), fallback `sans-serif` |
| **Weights Used** | 300 (light), 400, 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold) |
| **Rendering**  | `antialiased` (`-webkit-font-smoothing: antialiased`) |
| **Text Shadow** | `.text-shadow-hero { text-shadow: 0px 4px 10px rgba(0,0,0,0.5); }` on all section headings |

### Heading Scale

| Element          | Classes                                                     |
|------------------|-------------------------------------------------------------|
| Hero `<h1>`      | `text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight` |
| Section `<h2>`   | `text-3xl md:text-5xl font-bold text-white text-shadow-hero` |
| Subsection `<h2>`| `text-3xl md:text-4xl font-bold text-white text-shadow-hero` |
| Card `<h3>`      | `text-xl font-bold text-white`                              |
| Industry Card    | `text-xl font-bold text-white mb-3`                         |
| Section Label    | `text-accent font-semibold tracking-wider uppercase mb-2 block` |
| Body Copy        | `text-gray-300 leading-relaxed`                             |
| Small/Detail     | `text-sm text-gray-400 leading-relaxed`                     |

---

## 3. Spacing System

| Context                    | Value                              |
|----------------------------|------------------------------------|
| **Container**              | `container mx-auto px-4 sm:px-6 lg:px-8` |
| **Section Vertical Padding** | `py-24` (6rem / 96px) — standard sections |
| **Section Vertical Padding (compact)** | `py-20` (5rem / 80px) — certifications, contact CTA |
| **Section Header `mb`**    | `mb-16` (4rem) from heading block to content grid |
| **Section Divider Bar**    | `w-24 h-1 bg-accent mx-auto mt-6 rounded-full` |
| **Card Internal Padding**  | `p-8` (2rem / 32px)                |
| **Grid Gaps**              | `gap-8` (2rem) for card grids; `gap-12` (3rem) for two-col layouts; `gap-6` (1.5rem) for form grids |
| **Button Padding (hero)**  | `px-8 py-4`                        |
| **Button Padding (nav)**   | `px-5 py-2.5`                      |
| **Button Padding (form)**  | `px-8 py-3`                        |
| **Scroll Offset**          | `scroll-padding-top: 100px` / `scroll-margin-top: 100px` for the fixed `h-20` navbar |

---

## 4. Button Styles

### Primary CTA (Accent)
```
bg-accent hover:bg-orange-700 text-white px-8 py-4 rounded text-lg font-semibold
transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1
```

### Nav CTA (Compact Accent)
```
bg-accent hover:bg-orange-700 text-white px-5 py-2.5 rounded font-medium
transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5
```

### Ghost / Outline Button
```
bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white
px-8 py-4 rounded text-lg font-semibold transition-all shadow-xl hover:shadow-2xl
transform hover:-translate-y-1
```

### Secondary Outline Button (Projects "View All")
```
border border-primary text-primary hover:bg-primary hover:text-white
px-6 py-3 rounded font-medium transition-colors
```

### Form Submit Button
```
bg-accent hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold
transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
```

### Button Rules
- **All buttons** use `transition-all` and a subtle `hover:-translate-y-` lift effect.
- **Primary CTAs** are always `bg-accent` (`#CC0000`).
- **Ghost buttons** invert on hover (`hover:bg-white hover:text-primary`).
- **Border radius**: `rounded` (4px) on hero/nav; `rounded-lg` (8px) on form submit.

---

## 5. Grid & Layout Patterns

| Pattern                         | Classes                                      |
|---------------------------------|----------------------------------------------|
| **Capabilities Grid**           | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` |
| **Industries Grid**             | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8` |
| **Values Grid**                 | `grid grid-cols-1 md:grid-cols-3 gap-8`      |
| **Customer Logos Grid**         | `grid grid-cols-2 md:grid-cols-4 gap-8`      |
| **Two-Column Content + Image**  | `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center` |
| **Footer Columns**              | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12` |
| **Form Fields (2-col)**         | `grid grid-cols-1 md:grid-cols-2 gap-6`      |
| **Hero CTA Row**                | `flex flex-col sm:flex-row justify-center gap-4` |
| **Contact CTA Row**             | `flex flex-col sm:flex-row justify-center items-center gap-6` |

---

## 6. Component Archetypes

### Capability Card
```html
<div class="bg-gray-800 rounded-lg p-8 border border-gray-700 hover:border-accent transition-all duration-300 group">
    <div class="w-16 h-16 bg-dark rounded-full flex items-center justify-center mb-6
                group-hover:bg-accent transition-colors duration-300 border border-gray-700">
        <i class="fa-solid fa-icon text-3xl text-accent group-hover:text-white transition-colors"></i>
    </div>
    <h3 class="text-xl font-bold mb-4 text-white group-hover:text-accent transition-colors">Title</h3>
    <!-- Content -->
</div>
```

### Industry Card
```html
<div class="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-accent
            transition-all duration-300 group cursor-pointer">
    <div class="relative h-48 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        <i class="fa-solid fa-icon absolute inset-0 flex items-center justify-center text-8xl text-accent/20"></i>
    </div>
    <div class="p-6">
        <h3 class="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">Title</h3>
        <p class="text-gray-400 text-sm leading-relaxed">Description</p>
    </div>
</div>
```

### Section Header Block
```html
<div class="text-center mb-16">
    <span class="text-accent font-semibold tracking-wider uppercase mb-2 block">Label</span>
    <h2 class="text-3xl md:text-5xl font-bold text-white text-shadow-hero">Title</h2>
    <div class="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
    <p class="text-gray-300 mt-6 max-w-2xl mx-auto">Subtitle copy</p>
</div>
```

### Certification / Tag Badge
```html
<div class="bg-white/10 px-4 py-2 rounded-lg border border-white/20 flex items-center">
    <i class="fa-solid fa-icon text-accent mr-3"></i> Label Text
</div>
```

---

## 7. Navigation

| Property                  | Value                                         |
|---------------------------|-----------------------------------------------|
| **Height**                | `h-20` (80px)                                 |
| **Position**              | `fixed w-full` with `z-50`                    |
| **Background**            | `bg-white/95 backdrop-blur-sm shadow-md`      |
| **Scrolled State (JS)**   | `.scrolled` class adds thicker shadow + `bg-white/98` |
| **Nav Link**              | `text-secondary hover:text-primary font-medium transition-colors` |
| **Dropdown Panel**        | `bg-white shadow-2xl rounded-lg border border-gray-100` |
| **Mega Menu Width**       | `w-[800px]` (3-col grid, `gap-6 p-6`)        |
| **Mobile Menu**           | Full-screen overlay, `translateX` slide animation |

---

## 8. Interaction & Motion

| Pattern                   | Value                                         |
|---------------------------|-----------------------------------------------|
| **Default transition**    | `transition-all duration-300`                 |
| **Card hover**            | `hover:border-accent` + icon color swap       |
| **Image hover zoom**      | `transition-transform duration-700 group-hover:scale-110` |
| **Button lift**           | `transform hover:-translate-y-1` (hero), `hover:-translate-y-0.5` (nav/form) |
| **Carousel slide**        | `transition-transform duration-500 ease-out`  |
| **Scroll indicator**      | `animate-bounce`                              |
| **Dropdown reveal**       | `opacity-0 invisible → group-hover:visible group-hover:opacity-100` + `translate-y-2 → translate-y-0` |

---

## 9. Form Inputs

```
w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white
placeholder-gray-500 focus:outline-none focus:border-accent transition-colors
```

- **Labels**: `block text-sm font-medium text-gray-300 mb-2`
- **Select**: Same styling as inputs.
- **Textarea**: Same + `resize-none`.

---

## 10. Image Treatment

| Pattern                | Value                                          |
|------------------------|------------------------------------------------|
| **Hero Background**    | `<video>` with `object-cover` + `bg-black/40` overlay |
| **Content Images**     | `rounded-xl overflow-hidden shadow-2xl` + gradient overlay `from-black/50 to-transparent` |
| **Carousel Cards**     | `h-96 rounded-xl shadow-2xl` with `group-hover:scale-110` zoom |
| **Customer Logos**     | `object-contain` inside `h-40` containers, `group-hover:scale-105` |

---

## 11. Footer Pattern

- Background: `bg-dark` with `border-t border-gray-800`
- Padding: `pt-16 pb-8`
- 4-column grid at `lg:`, 2-col at `md:`, 1-col mobile
- Heading style: `text-lg font-bold text-white border-b-2 border-accent inline-block pb-1`
- Link style: `text-gray-400 hover:text-accent transition-colors`
- Social icons: `w-10 h-10 rounded-full bg-gray-800 hover:bg-accent`
- Copyright bar: `border-t border-gray-800 pt-8` with `text-sm text-gray-500`

---

## 12. External Dependencies

| Dependency      | Source                                          |
|-----------------|-------------------------------------------------|
| Tailwind CSS    | CDN (`cdn.tailwindcss.com`) with inline config   |
| Google Fonts    | Inter (weights 300–800)                         |
| Font Awesome    | v6.4.0 CDN (solid + brands icons)              |

---

## ⚠️ Stitch Generation Directives

> [!CAUTION]
> When using Stitch (or any AI tool) to generate new USS pages, **you MUST enforce**:
>
> 1. **Always dark mode** — No white/light page backgrounds. Use `bg-dark` / `bg-gray-900` alternation.
> 2. **Accent = `#CC0000`** — Never swap accent to blue, green, or any other color.
> 3. **Inter font only** — Do not substitute with system fonts or other typefaces.
> 4. **Card pattern lock** — All cards must be `bg-gray-800 border border-gray-700 rounded-lg`.
> 5. **Section header pattern** — Always use the label → h2 → divider bar → subtitle structure.
> 6. **Button styles are fixed** — Primary = `bg-accent`, ghost = `border-2 border-white`. No rounded-full buttons.
> 7. **`py-24` section rhythm** — Maintain consistent vertical breathing room.
> 8. **No inline styles** — Everything through Tailwind utilities or `style.css` custom classes.
> 9. **Hover effects mandatory** — Every interactive element must have a visible hover transition.
> 10. **Gradient overlays on images** — Always add `bg-gradient-to-t from-black/...` on image containers.
