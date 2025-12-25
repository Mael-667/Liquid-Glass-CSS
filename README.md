# Liquid Glass CSS / React

Liquid Glass is a lightweight CSS/JavaScript library inspired by Apple’s Liquid Glass aesthetic.
It provides a frosted glass effect with subtle refraction, blur and dynamic color tinting based on the surrounding environment.


## 📸 Preview

👉 View live demo on my **[portfolio](https://mael-667.github.io/portfolio/)**

---

## ✨ Features

- 🪟 Glass effect with SVG displacement
- 🎨 Dynamic color tinting based on surrounding backgrounds
- 🔧 Adjustable blur intensity (0-10 levels)
- 💡 Light & large variants
- ⚛️ React-first API with automatic style injection
- 🧱 Vanilla CSS/JS version available
- 📦 Zero external dependencies
- 🚀 Lightweight and performant

---

## 🚀 Quick Start

Install via **npm:**
```bash
npm install @mael-667/liquid-glass-react
```


Wrap your application with `<LiquidGlassProvider>` to inject styles and activate dynamic color features:

```jsx
import { LiquidGlassProvider, LiquidGlass } from "@mael-667/liquid-glass-react";

function App() {
  return (
    <LiquidGlassProvider>
      <LiquidGlass>
        Hello Liquid Glass
      </LiquidGlass>
    </LiquidGlassProvider>
  );
}
```
---

## 📦 Installation

**Install the component:**

Via npm:
```bash
npm install @mael-667/liquid-glass-react
```

**Or download the component:**

1. Download [LiquidGlassProvider.jsx](https://github.com/Mael-667/Liquid-Glass-CSS/releases) from the releases page
2. Copy the file into your project (e.g., `src/components/`)
3. Import and use in your app

```jsx
import { LiquidGlassProvider, LiquidGlass, Tint } from "@mael-667/liquid-glass-react";
```

---

## 📖 Documentation

### Setup

The `<LiquidGlassProvider>` component must wrap your application. It automatically:
- Injects required CSS styles
- Enables SVG filters
- Activates the dynamic color system

```jsx
import { LiquidGlassProvider } from "@mael-667/liquid-glass-react";


function App() {
  return (
    <LiquidGlassProvider>
      {/* Your app components */}
    </LiquidGlassProvider>
  );
}
```

### `<LiquidGlass />` Component

The main component for creating glass effect elements.

```jsx
<LiquidGlass large dynamic hoverable>
  Content here
</LiquidGlass>
```

#### Props

| Prop        | Type      | Default | Description                                    |
|-------------|-----------|---------|------------------------------------------------|
| `as`        | `string`  | `div`   | HTML tag to render (e.g., `nav`, `button`)     |
| `large`     | `boolean` | `false` | Use large glass variant                        |
| `className` | `string`  | `""`    | Additional CSS classes                         |
| `dynamic`   | `boolean` | `false` | Enable dynamic color tinting                   |
| `hoverable` | `boolean` | `false` | Enable hover tint effect (requires `dynamic`)  |

**Examples:**

```jsx
// Basic usage
<LiquidGlass>
  Basic glass effect
</LiquidGlass>

// Navigation with large variant
<LiquidGlass as="article" large>
  Navigation
</LiquidGlass>

// Button with dynamic tint
<LiquidGlass as="button" dynamic hoverable>
  Click me
</LiquidGlass>
```

---

### `<Tint />` Component

Defines colored areas that affect overlapping `LiquidGlass` components with `dynamic` enabled.

```jsx
<Tint as="section" hue="#4169e1">
  Content with blue tint
</Tint>
```

#### Props

| Prop  | Type     | Default | Description                        |
|-------|----------|---------|------------------------------------|
| `as`  | `string` | `"div"` | HTML tag to render                 |
| `hue` | `string` | -       | Hex color for tinting (required)   |

**Example with dynamic tinting:**

```jsx
<header>
  <LiquidGlass as="nav" dynamic hoverable>
    Home
  </LiquidGlass>
</header>

<Tint as="section" hue="#4169e1">
  <h2>Blue Tinted Section</h2>
  <p>Glass elements above will adapt to this color</p>
</Tint>

<Tint as="section" hue="#ff6b6b">
  <h2>Red Tinted Section</h2>
  <p>Different tint for this area</p>
</Tint>
```

---

## 🎨 Customization

You can override default styles with custom CSS:

### Border Radius

```css
.liquidGlass,
.liquidGlass::before,
.liquidGlass::after {
  border-radius: 2rem;
}
```

### Background & Shadows

```css
.liquidGlass::after {
  background: rgba(230, 18, 18, 0.1);
  box-shadow:
    inset 1px 1px 3px rgba(238, 0, 0, 0.39),
    inset -1px -2px 3px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(0, 0, 0, 0.5);
}
```

### Blur Intensity Scale

Blur levels range from 0 (no blur) to 10 (maximum blur):

---

## ⚡ Performance & Bundle Size

- **React version**: ~10KB minified
- **Zero dependencies**
- **CSS-in-JS with automatic injection**
- **Minimal runtime overhead**

---

## ♿ Accessibility

The library maintains semantic HTML and doesn't interfere with:
- Screen readers
- Keyboard navigation
- Focus indicators

Ensure you provide appropriate ARIA labels and semantic elements when using `as` prop.

---

## 🌐 Browser Compatibility

| Browser | Version |
|---------|---------|
| Chrome  | 90+     |
| Firefox | 88+     |
| Safari  | 14+     |
| Edge    | 90+     |

*Requires support for CSS backdrop-filter and SVG filters.*

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report bugs** - Open an issue with reproduction steps
2. **Suggest features** - Share your ideas in discussions
3. **Submit PRs** - Fork, create a branch, and submit a pull request
4. **Improve docs** - Help make the documentation clearer

---

## 📬 Feedback

Found a bug or have suggestions? 

- Open an issue on [GitHub](https://github.com/Mael-667/Liquid-Glass-CSS/issues)
- Check out the [live demo](https://mael-667.github.io/portfolio/)

**Made with ❤️ by me 🐐**