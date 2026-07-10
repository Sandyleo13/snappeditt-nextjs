# BeforeAfterSlider Component

A reusable React component for creating interactive before/after image comparisons with smooth slide-in animations.

## Features

✨ **Smooth Auto-Play Animation** - Automatic ping-pong slider movement  
🖱️ **Interactive Dragging** - Mouse and touch support for manual control  
⏸️ **Pause on Hover** - Automatically pauses animation when hovering  
📱 **Mobile Friendly** - Full touch gesture support  
🎨 **Customizable** - Custom labels, colors, and styling  
⚡ **Performance Optimized** - Uses Next.js Image optimization  

## Installation

The component is already included in your project at:
```
components/features/BeforeAfterSlider.tsx
```

## Basic Usage

```tsx
import BeforeAfterSlider from '@/components/features/BeforeAfterSlider';

export default function MyPage() {
  return (
    <BeforeAfterSlider
      beforeImage="/images/before.jpg"
      afterImage="/images/after.jpg"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `beforeImage` | string | **required** | Path to the before image |
| `afterImage` | string | **required** | Path to the after image |
| `beforeLabel` | string | `"BEFORE"` | Text label for before state |
| `afterLabel` | string | `"AFTER"` | Text label for after state |
| `autoPlay` | boolean | `true` | Enable automatic slider animation |
| `autoPlaySpeed` | number | `30` | Animation interval in milliseconds (lower = faster) |
| `className` | string | `""` | Additional CSS classes for the container |

## Examples

### Full Width Example
```tsx
<BeforeAfterSlider
  beforeImage="/images/real-estate-raw.jpg"
  afterImage="/images/real-estate-corrected.jpg"
  className="w-full h-[500px]"
/>
```

### Custom Labels
```tsx
<BeforeAfterSlider
  beforeImage="/images/day.jpg"
  afterImage="/images/dusk.jpg"
  beforeLabel="DAYTIME"
  afterLabel="DUSK"
  autoPlay={true}
/>
```

### Manual Control Only (No Auto-Play)
```tsx
<BeforeAfterSlider
  beforeImage="/images/original.jpg"
  afterImage="/images/edited.jpg"
  autoPlay={false}
/>
```

### Grid Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <BeforeAfterSlider
    beforeImage="/images/product-1-before.jpg"
    afterImage="/images/product-1-after.jpg"
    className="h-[400px]"
  />
  <BeforeAfterSlider
    beforeImage="/images/product-2-before.jpg"
    afterImage="/images/product-2-after.jpg"
    className="h-[400px]"
  />
</div>
```

### Responsive Heights
```tsx
<BeforeAfterSlider
  beforeImage="/images/before.jpg"
  afterImage="/images/after.jpg"
  className="w-full h-[300px] md:h-[500px] lg:h-[600px]"
/>
```

## Behavior

### Auto-Play Animation
- Slider automatically moves left-to-right, then right-to-left in a smooth ping-pong motion
- Pauses automatically when user hovers over the image
- Resumes when mouse leaves the component
- Can be disabled by setting `autoPlay={false}`

### Manual Control
- Click and drag the center handle to compare images
- Touch and drag on mobile devices
- Pauses auto-play while dragging
- Works with both mouse and touch events

### Visual Feedback
- "Paused" indicator appears on hover when auto-play is enabled
- "Drag to Compare" instruction shows on initial load
- Smooth transitions and animations throughout

## Styling

The component uses Tailwind CSS classes and can be customized:

```tsx
// Change container size
<BeforeAfterSlider
  className="w-full h-[600px] rounded-3xl"
  {...props}
/>

// Customize in a wrapper
<div className="max-w-4xl mx-auto p-4">
  <BeforeAfterSlider {...props} />
</div>
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Image Optimization**: Use Next.js optimized images (already included)
2. **Appropriate Sizes**: Use images sized appropriately for your layout
3. **Loading**: Component uses `priority` loading for above-the-fold images
4. **Animation Speed**: Adjust `autoPlaySpeed` based on your needs (30ms is optimal)

## Common Use Cases

- 🏠 **Real Estate**: Show property transformations
- 🛍️ **E-commerce**: Display product retouching
- 👤 **Portrait Photography**: Before/after retouching
- 🎨 **Design Work**: Show design iterations
- 🌅 **Photo Editing**: Day to dusk conversions
- ✂️ **Background Removal**: Before/after comparisons

## Demo

Visit the example page to see all variations:
```
http://localhost:3000/examples/before-after-slider
```

## Troubleshooting

### Images not showing
- Verify image paths are correct
- Check that images exist in the `public` folder
- Ensure Next.js Image domains are configured if using external images

### Animation too fast/slow
- Adjust the `autoPlaySpeed` prop (lower = faster, higher = slower)
- Default is 30ms, try values between 20-50ms

### Touch not working on mobile
- Ensure no parent elements are preventing touch events
- Check that the component isn't inside a scrollable container with conflicting touch handlers

## License

MIT - Feel free to use in your projects!
