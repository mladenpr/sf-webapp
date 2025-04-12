# Frontend Development Guidelines

## Architecture

### Component Structure
```
src/
├── components/
│   ├── calculators/
│   │   ├── TubularPileCalculator/
│   │   ├── SheetPileCalculator/
│   │   └── AnodeCalculator/
│   ├── common/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Table/
│   │   └── Card/
│   ├── layout/
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Sidebar/
│   └── forms/
│       └── PileGroupForm/
├── hooks/
├── utils/
│   └── calculations/
├── types/
└── styles/
```

## Component Guidelines

### Component Structure
1. Each component should be in its own directory with:
   - Component file (index.tsx)
   - Styles (styles.module.css)
   - Tests (*.test.tsx)
   - Type definitions (types.ts)

### State Management
1. Use React Query for server state
2. Use React Context for global UI state
3. Use local state for component-specific state

### Component Best Practices
1. Implement proper TypeScript types
2. Use functional components with hooks
3. Implement error boundaries
4. Use proper prop validation
5. Implement loading states
6. Handle edge cases and errors

## Styling Guidelines

### CSS Modules
1. Use CSS Modules for component-specific styles
2. Follow BEM naming convention
3. Use CSS variables for theming
4. Implement responsive design using breakpoints

### Theme
```css
:root {
  /* Colors */
  --primary: #2563eb;
  --secondary: #475569;
  --success: #22c55e;
  --danger: #ef4444;
  --warning: #f59e0b;
  --info: #3b82f6;
  
  /* Typography */
  --font-primary: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}
```

## Form Handling

### Guidelines
1. Use React Hook Form for form management
2. Implement proper validation using Zod
3. Show validation errors clearly
4. Implement proper error handling
5. Use controlled components when necessary

### Example Form Structure
```typescript
interface PileGroupForm {
  groupName: string;
  pileCount: number;
  outerDiameter: number;
  wallThickness: number;
  pileLength: number;
  paintLength: number;
}
```

## Performance Guidelines

### Optimization Techniques
1. Use React.memo for expensive components
2. Implement proper code splitting
3. Use Image component for optimized images
4. Implement proper caching strategies
5. Use proper loading strategies (lazy loading)

### Performance Metrics
1. First Contentful Paint (FCP) < 1.8s
2. Largest Contentful Paint (LCP) < 2.5s
3. First Input Delay (FID) < 100ms
4. Cumulative Layout Shift (CLS) < 0.1

## Testing Guidelines

### Unit Tests
1. Test component rendering
2. Test user interactions
3. Test error states
4. Test loading states
5. Test edge cases

### Integration Tests
1. Test form submissions
2. Test calculations
3. Test API interactions
4. Test navigation flows

### Example Test Structure
```typescript
describe('TubularPileCalculator', () => {
  it('should calculate pile weight correctly', () => {
    // Test implementation
  });

  it('should calculate painting area correctly', () => {
    // Test implementation
  });

  it('should handle invalid inputs', () => {
    // Test implementation
  });
});
```

## Accessibility Guidelines

### Requirements
1. Implement proper ARIA labels
2. Ensure keyboard navigation
3. Implement proper color contrast
4. Provide proper error messages
5. Implement proper focus management

## Documentation Guidelines

### Component Documentation
1. Document component props
2. Document component usage
3. Provide examples
4. Document edge cases
5. Document accessibility features

### Code Comments
1. Use JSDoc for function documentation
2. Document complex logic
3. Document business rules
4. Document assumptions
5. Document limitations 