# USS Website — Fix Instructions

This document contains all known bugs and improvements for `index.html` and `js/script.js`.
Work through each item in order. The DESIGN.md file is the canonical style reference — do not deviate from it.

---

## Bug Fixes

### 1. Dead `#services` links
**Files:** `index.html`
**Problem:** Two elements link to `#services` which does not exist. The correct target is `#capabilities`.

Find and fix:
- Line ~253: Hero CTA button "Explore Our Services" — `href="#services"` → `href="#capabilities"`
- Line ~265: Scroll-down indicator anchor — `href="#services"` → `href="#capabilities"`

---

### 2. Quote form field name mismatch
**File:** `js/script.js`
**Problem:** The email subject line uses `data.projectType` but the form field is `name="industry"`. This results in `undefined` in the email subject.

Find in `script.js`:
```js
const subject = `Quote Request: ${data.projectType} - ${data.company || data.name}`;
```
Change to:
```js
const subject = `Quote Request: ${data.industry} - ${data.company || data.name}`;
```

---

### 3. Industry card icons not centering correctly
**File:** `index.html`
**Problem:** The 4 industry cards in the `#industries` section use `<i class="... absolute inset-0 flex items-center justify-center ...">`. An `<i>` element is inline — applying `flex` and `absolute inset-0` to it does not center the icon. It needs a wrapper `<div>`.

Find all 4 instances (Agricultural, Commercial, Industrial, Steel Structure Exports cards). Each looks like:
```html
<i class="fa-solid fa-[icon] absolute inset-0 flex items-center justify-center text-8xl text-accent/20"></i>
```
Replace each with:
```html
<div class="absolute inset-0 flex items-center justify-center">
    <i class="fa-solid fa-[icon] text-8xl text-accent/20"></i>
</div>
```
Preserve the correct icon name for each card (`fa-tractor`, `fa-building`, `fa-industry`, `fa-globe`).

---

### 4. Quote form success message never visible
**File:** `js/script.js`
**Problem:** The success message is shown immediately before `window.location.href = mailto:...` which navigates the user away — so the message is never seen.

Current code (lines ~175–179):
```js
window.location.href = `mailto:...`;

// Show success message (optional, as user leaves page)
quoteSuccess.classList.remove('hidden');
quoteForm.reset();
```

Fix: Show the success message and reset the form *before* the mailto redirect, and add a short delay so the user sees it:
```js
quoteSuccess.classList.remove('hidden');
quoteForm.reset();

setTimeout(() => {
    window.location.href = `mailto:sales@uss.org.za,saminan24@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
}, 1500);
```

---

## Improvements

### 5. Scrollbar styling — match dark theme
**File:** `css/style.css`
**Problem:** The custom scrollbar uses light grey colors (`#f1f1f1`, `#888`, `#555`) which clashes with the dark site theme.

Replace the existing scrollbar block:
```css
::-webkit-scrollbar-track {
    background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
```
With:
```css
::-webkit-scrollbar-track {
    background: #1e293b;
}
::-webkit-scrollbar-thumb {
    background: #374151;
    border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
    background: #CC0000;
}
```

---

### 6. Add favicon
**File:** `index.html`
**Problem:** No favicon is set; the browser tab shows a blank icon.

Add inside `<head>`, after the existing `<meta>` tags:
```html
<link rel="icon" type="image/png" href="./images/uss_logo1.png">
```

---

### 7. Add Open Graph meta tags
**File:** `index.html`
**Problem:** No OG tags — social media shares will show blank previews.

Add inside `<head>`, after the favicon link:
```html
<meta property="og:title" content="Uitenhage Super Steel (USS) | Manufacturing & Erecting Excellence Since 1972">
<meta property="og:description" content="ISO 9001:2015 certified structural steel fabricators. Established 1972 in the automotive hub of Nelson Mandela Metro.">
<meta property="og:image" content="./images/uss_logo1.png">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

---

### 8. Add stats bar section
**File:** `index.html`
**Problem:** No social proof numbers on the page. Add a stats bar between the Hero section and the Quality/Certifications section.

Insert a new `<section>` after the closing `</section>` tag of the Hero (line ~269) and before the Quality section:

```html
<!-- Stats Bar -->
<section class="py-12 bg-gray-900 border-y border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
                <p class="text-4xl md:text-5xl font-bold text-accent">50+</p>
                <p class="text-gray-400 mt-2 text-sm uppercase tracking-wider">Years of Excellence</p>
            </div>
            <div>
                <p class="text-4xl md:text-5xl font-bold text-accent">500+</p>
                <p class="text-gray-400 mt-2 text-sm uppercase tracking-wider">Projects Completed</p>
            </div>
            <div>
                <p class="text-4xl md:text-5xl font-bold text-accent">ISO</p>
                <p class="text-gray-400 mt-2 text-sm uppercase tracking-wider">9001:2015 Certified</p>
            </div>
            <div>
                <p class="text-4xl md:text-5xl font-bold text-accent">4</p>
                <p class="text-gray-400 mt-2 text-sm uppercase tracking-wider">Industries Served</p>
            </div>
        </div>
    </div>
</section>
```

> **Note:** Confirm the "500+ Projects" figure with the USS team before publishing. Update the numbers to match actual data.

---

### 9. Replace external Unsplash image in About People section
**File:** `index.html`
**Problem:** The About People section uses a hardcoded Unsplash URL for the team photo — this is an external dependency that could break.

Find (line ~719):
```html
<img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    alt="USS Team" class="w-full h-full object-cover">
```

Replace with a local image. Add a real team photo to `./images/` named `team.jpg` and update:
```html
<img src="./images/team.jpg" alt="USS Team" class="w-full h-full object-cover">
```

If no team photo is available yet, keep the Unsplash URL as a placeholder but add a comment:
```html
<!-- TODO: Replace with actual USS team photo -->
```

---

### 10. Update social media links
**File:** `index.html`
**Problem:** Social icons in the footer link to generic/placeholder URLs.

Find the 3 social icon links in the footer and update:
- LinkedIn: Replace `href="https://linkedin.com"` with the actual USS LinkedIn profile URL
- Facebook: Replace `href="#"` with the actual USS Facebook page URL
- Instagram: Replace `href="#"` with the actual USS Instagram profile URL

If the actual URLs are not yet known, leave as `href="#"` but add `aria-label` attributes:
```html
<a href="#" aria-label="USS on LinkedIn" class="...">
<a href="#" aria-label="USS on Facebook" class="...">
<a href="#" aria-label="USS on Instagram" class="...">
```

---

## Notes for the implementing LLM

- Follow `DESIGN.md` strictly — do not change colors, fonts, spacing, or component patterns.
- Do not add new dependencies or CDN links.
- Do not refactor working code — only touch what is listed above.
- After all fixes, do a quick scan for any remaining `href="#"` placeholder links and add a `<!-- TODO -->` comment next to each so they are easy to find later.
