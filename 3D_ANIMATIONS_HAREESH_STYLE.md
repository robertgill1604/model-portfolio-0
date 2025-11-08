# 3D Animations - Hareesh Style Enhancement

## Overview
This document outlines the enhanced 3D animation features implemented to match the Hareesh portfolio style (https://hareesh.web.app/). The enhancements include advanced Three.js effects, sophisticated parallax, and interactive 3D transformations throughout the site.

## New 3D Features Added

### 1. Enhanced Three.js Background Scene
**Location:** `script.js` - `init3DBackground()`

**Improvements:**
- Upgraded from 5 basic cubes to 7 varied 3D shapes:
  - Boxes, Icosahedrons, Torus, Octahedrons, Tetrahedrons
- Dynamic color HSL system (hue rotation for visual variety)
- Pulsing scale effect using sine wave mathematics
- Enhanced lighting:
  - 3 dynamic point lights (pink, blue, cyan)
  - Ambient lighting at 40% for better depth perception
  - Lights animate through scene based on time

**Effects:**
```javascript
- Automatic rotation on all axes
- Smooth mouse tracking (0.8% easing)
- Floating motion with sin/cos waves
- Pulsing scale effect (1.0 to 1.3x)
- Dynamic light positioning
```

### 2. Enhanced Floating Particle System
**Location:** `script.js` - `create3DParticles()`

**Improvements:**
- Increased from 20 to 30 particles
- Dual animation layers:
  - `float3d`: 3D floating motion (translateY, translateZ)
  - `drift`: Horizontal drift with 1.5x duration ratio
- Enhanced visual properties:
  - Dynamic HSL color generation
  - Inset shadows for depth perception
  - Staggered animation delays (0-8s)
  - Variable opacity (0.4-0.7)

**Keyframe Details:**
```css
@keyframes float3d {
  - 0%:   translateY(0) translateZ(0)
  - 25%:  translateY(-30px) translateZ(20px)
  - 50%:  translateY(-50px) translateZ(-20px)
  - 75%:  translateY(-20px) translateZ(10px)
}
```

### 3. Advanced 3D Scroll Animations
**Location:** `script.js` - `init3DScrollAnimations()`

**Features:**
- Targets elements with `data-scroll="3d"` attribute
- Perspective transforms with easing curve: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Initial state: `rotateX(20deg) rotateY(20deg) translateZ(-50px)`
- Animates to flat on intersection (IntersectionObserver at 20% threshold)
- Smooth 0.8s transition for depth perception

### 4. 3D Mouse Tracking on Sections
**Location:** `script.js` - `init3DMouseTracking()`

**Implementation:**
```javascript
- Normalized mouse position (0 to 1)
- Apply subtle 3D rotation to all sections:
  - rotateX = (mouseY - 0.5) * 0.5deg
  - rotateY = (mouseX - 0.5) * 0.5deg
- Creates depth effect while scrolling
- Non-intrusive, low transform values (0.1x multiplier)
```

### 5. Enhanced Parallax System
**Location:** `script.js` - `enhancedParallax()`

**Multi-layer Parallax:**
- **Hero Section:** 
  - TranslateZ (20% scroll depth)
  - TranslateY (30% scroll speed)
  - Perspective: 1000px
  
- **Project Cards:**
  - TranslateY with staggered offsets
  - Index-based offset variation (20px increments)
  - Perspective transform applied

### 6. Animated Gradient Backgrounds
**Location:** `styles.css`

**Hero Section:**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
background-size: 200% 200%;
animation: gradient-shift 15s ease infinite;
```

**gradient-shift Animation:**
- Shifts background-position from 0% 50% → 100% 50% → 0% 50%
- Duration: 15 seconds for hero
- Creates flowing color transition effect

### 7. Enhanced Skill Cards with 3D Depth
**Location:** `styles.css` - `.skill-category`

**Features:**
- Radial gradient overlay (visible on hover)
- 3D hover effect: `rotateX(3deg) translateY(-8px)`
- Shadow enhancement on hover: `0 15px 40px rgba(79, 70, 229, 0.2)`
- Enhanced progress bars with animated gradients

**Progress Bar Animation:**
```css
@keyframes shimmer-3d {
  - Animates background-position
  - Creates flowing gradient effect
  - Duration: 3 seconds
  - Applied to .skill-progress elements
}
```

### 8. Neon Glow Text Effects
**Location:** `styles.css` - neon-glow animation

**Applied To:**
- `.section-title`: Pulsing glow effect
- `.hero-title`: 
  - Animated gradient text
  - Float-rotate animation (6s duration)
  - Glowing text shadow

**Keyframe:**
```css
@keyframes neon-glow {
  0%, 100%: text-shadow: 0 0 10px, 0 0 20px
  50%:      text-shadow: 0 0 20px, 0 0 40px
}
```

### 9. Enhanced Stats Card Animations
**Location:** `styles.css` - `.stat`

**Features:**
- Shimmer effect on hover (left to right sweep)
- Scale up: 1.0 → 1.05
- Lift effect: `translateY(-5px)`
- Enhanced shadow on hover: `0 15px 40px`
- Background shimmer with pseudo-element

### 10. Timeline Pulse Animation
**Location:** `styles.css` - `.timeline-content::before`

**Features:**
- Pulsing circular indicators
- Applied `scale-pulse-3d` animation
- 2-second cycle with drop-shadow effect
- Smooth scale from 1.0 to 1.1

## CSS Animation Keyframes Summary

| Animation | Duration | Use Case |
|-----------|----------|----------|
| float3d | Variable | Particle floating motion |
| drift | Variable | Particle horizontal drift |
| glow-pulse | 2s | Glowing effects |
| shimmer-3d | 3s | Progress bars |
| rotate-3d-x | Variable | 3D rotations |
| scale-pulse-3d | 2s | Pulsing scale effects |
| gradient-shift | 8-15s | Animated gradients |
| neon-glow | 3s | Text glow effects |
| float-rotate | 6s | Title floating rotation |
| perspective-tilt | Variable | Perspective tilts |

## Performance Optimizations

### CSS
- `will-change: transform` on particles
- `transform-style: preserve-3d` only where needed
- `backface-visibility: hidden` for flip elements
- GPU acceleration via CSS transforms

### JavaScript
- Passive event listeners for scroll (`{ passive: true }`)
- Debounced scroll functions
- IntersectionObserver for lazy animation triggers
- RequestAnimationFrame in Three.js render loop

## Browser Compatibility

### Full Support (Modern Browsers)
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- WebGL required for Three.js

### Graceful Degradation
- CSS 3D transforms fallback to 2D
- Three.js background skipped if WebGL unavailable
- Animations still work without WebGL
- Particles render without 3D transforms

## Interactive Animations

### Hover Effects
- **Project Cards:** Tilt based on mouse position + flip on hover
- **Skill Cards:** Lift up + rotateX + radial glow
- **Social Links:** Scale pulse animation
- **Stat Cards:** Scale, lift, and shimmer sweep

### Scroll Triggered
- Skill bar fill animations
- Section fade-in/up
- 3D element perspective entrance
- Timeline pulse activation

### Mouse Tracked
- Hero parallax on scroll
- Project card 3D tilt
- Section subtle rotation based on mouse position
- Background cube positioning

## Code Structure

### JavaScript Functions
```
init3DBackground()           - Three.js scene setup
create3DParticles()          - Floating particle generation
init3DScrollAnimations()     - Scroll-triggered 3D effects
init3DMouseTracking()        - Mouse-based 3D transforms
enhancedParallax()           - Multi-layer parallax
initScrollTextAnimations()   - Text animation triggers
```

### CSS Classes
```
.floating-particle           - Particle styling
.skill-category              - Skill card with 3D depth
.project-card-3d            - 3D project card container
.stat                        - Stats with shimmer effect
.timeline-content::before    - Timeline pulse indicator
```

## Usage Examples

### Adding 3D Scroll Animation to Elements
```html
<div data-scroll="3d">
  This element will animate in with 3D perspective
</div>
```

### Customizing Animation Timing
All keyframes can be customized by modifying:
- Duration in animation property
- Delay timing
- Transform values in keyframe percentages

## Future Enhancement Possibilities

1. **Scroll-triggered Three.js updates** - Modify scene based on scroll position
2. **WebGL Shader Effects** - Custom shaders for more advanced effects
3. **Physics Engine** - Particle collision detection
4. **Advanced Morphing** - Shape morphing between geometries
5. **Audio Visualization** - Particles respond to audio
6. **VR/AR Support** - WebXR integration

## Testing Checklist

- [ ] Three.js scene renders and rotates
- [ ] Particles float and drift smoothly
- [ ] Project cards tilt on mouse movement
- [ ] Skill cards lift on hover
- [ ] Parallax activates on scroll
- [ ] Text glows smoothly
- [ ] Stat cards shimmer and scale
- [ ] Timeline indicators pulse
- [ ] No performance lag at 60 FPS
- [ ] Mobile gestures work smoothly

## Responsive Considerations

- Animations scale appropriately on mobile
- Touch events handled without hover delays
- Performance optimized for lower-end devices
- Perspective values may need adjustment for small screens

## Notes

- All animations use GPU-accelerated transforms for better performance
- Color scheme follows the existing purple/pink gradient theme
- Animation timings are staggered to prevent visual collision
- IntersectionObserver ensures animations only trigger when visible
- No external animation libraries used - pure CSS + vanilla JS
