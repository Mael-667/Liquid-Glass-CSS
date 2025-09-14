# Liquid Glass CSS Framework

## Overview

**Liquid Glass CSS** is a lightweight CSS/JavaScript framework that brings the elegant Liquid Glass style, inspired by Apple, to your web pages. Minimal and easy to integrate, it automatically injects necessary styles and dependencies when included in your `<head>`. Simply add the predefined classes in your HTML to style any element with the Liquid Glass effect.

---

## Installation

Download the latest bundle from the [Release section](#) and add it to your project:

```html
<head>
   <!-- other meta / css -->
   <script src="/path/to/liquidGlass.js"></script>
</head>
```

For more control over styling, you can clone the repository and include `liquidGlass.css` and `filter.svg` in your project. Make sure the path to `filter.svg` in the CSS matches its location in your project.

---

## Usage

After importing the script, apply Liquid Glass effects by adding the appropriate classes directly to your HTML elements:

### `.liquidGlass`

Applies the core Liquid Glass effect:

* Transparent, frosted background with a subtle refraction effect
* Slight background saturation
* White, slightly enlarged text with shadows for readability
* Rounded corners and subtle shadows for depth (adjustable via `.liquidGlass::after`)

### `.glassLightMode`

Use alongside `.liquidGlass` for light backgrounds:

* Black text
* Removes depth shadows for a cleaner, modern look

### `.liquidGlassLarge`

A variant of `.liquidGlass` optimized for larger surfaces:

* Same effects as `.liquidGlass`
* No saturation to avoid visual distraction on large areas
* Larger border-radius (customizable as shown below):

```css
.liquidGlassLarge, .liquidGlassLarge::before, .liquidGlassLarge::after {
    border-radius: (your-radius);
}
```

### `.blur-[0-10]`

Individually adjust the frost (blur) of each liquidGlass element, from 0 to 10 pixels.


### `.liquidBtn`

Designed for frosted-glass buttons:

* Slightly white translucent background
* Subtle semi-transparent border
* White text with soft black shadow for readability
* Rounded corners (`border-radius: 0.5rem`)
* Smooth hover transitions

---

## Dynamic Colorization

You can automatically tint `.liquidGlass` elements based on the surrounding environment:

1. Set a dominant color on an HTML element using `data-hue="#hexcolor"`.
2. Add `.dynamicHue` (or `.dynamicHueHvr` for hover effects) to a liquidGlass parent element.

Liquid Glass elements will now change color based on the defined tint of the element they hover over.

**Example**:

```html
<nav class="dynamicHueHvr" style="display: sticky;">
    <div class="liquidGlass">Hello</div>
</nav>
<div data-hue="#4169e1">
    <!-- content -->
</div>
```

---

## Example

Check out [my portfolio](https://mael-667.github.io/portfolio/) for live examples of Liquid Glass in action.

---

## Customization

* **Background & Shadows**: Modify on the element's `:after` pseudo-element.
* **Border-radius**: Apply changes to the element itself, as well as its `:before` and `:after` pseudo-elements:

```css
.element, .element::before, .element::after {
    border-radius: (your-radius);
}
```