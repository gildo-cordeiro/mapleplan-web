# AGENTS.md - MaplePlan Web Development Guide

## Quick Commands

```bash
# Development
pnpm start              # Start dev server on port 5173
pnpm build              # Build for production
pnpm preview            # Preview production build
pnpm test               # Run tests

# Code validation
pnpm run debbug         # Debug mode (detailed output)
```

---

## Tech Stack (Fixed)

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 4.1 + Radix UI
- **State Management**: Context API (AuthContext, ThemeContext)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios with custom config
- **Router**: React Router v7
- **Components Lib**: @radix-ui/* + shadcn/ui patterns
- **Path Aliases**: `@/*` resolves to `src/`

---

## Code Rules & Style

### 1. Component Structure (Functional Components Only)

✅ **Good**:
```tsx
// src/components/dashboard/WelcomeCard.tsx
import { ReactNode } from 'react'
import { Card } from '@/components/ui/Card'
import { useUserData } from '@/hooks/useUserData'

interface WelcomeCardProps {
  title: string
  children?: ReactNode
}

export function WelcomeCard({ title, children }: WelcomeCardProps) {
  const { user } = useUserData()
  
  return (
    <Card>
      <h2>{title}</h2>
      {children}
    </Card>
  )
}
```

❌ **Bad**:
- Class components
- Default exports without named exports
- Props object destructuring at top level (destructure in signature)
- Components longer than 150 lines (split into smaller components)

### 2. Hooks Rules

✅ **Good**:
```tsx
// src/hooks/useFinancialSummary.ts
import { useEffect, useState } from 'react'
import { financialService } from '@/services/financialService'

export function useFinancialSummary(userId: string) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const result = await financialService.getSummary(userId)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [userId])

  return { data, loading, error }
}
```

❌ **Bad**:
- Hooks without `use` prefix
- Direct mutations of state without setState
- Infinite loop dependencies
- Async functions directly in useEffect (wrap in async IIFE)

### 3. API Services Layer

✅ **Good**:
```tsx
// src/services/userService.ts
import axios from '@/lib/axiosConfig'
import { User } from '@/types'

export const userService = {
  async getCompleteUser(token: string): Promise<User> {
    const { data } = await axios.get<User>('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return data
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    const { data } = await axios.patch<User>(`/api/users/${userId}`, updates)
    return data
  }
}
```

❌ **Bad**:
- Direct axios calls in components
- Mixing API logic with component logic
- Untyped responses
- No error boundaries

### 4. Types Organization

✅ **Good**:
```tsx
// src/types/auth.ts
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  createdAt: Date
}

export interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  fetchUser: () => Promise<void>
}
```

❌ **Bad**:
- Inline `any` types
- Type definitions scattered across components
- No documentation for complex types
- Optional fields that should be required

### 5. Tailwind + CVA Usage

✅ **Good**:
```tsx
// src/components/ui/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md transition-all',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        outline: 'border border-input hover:bg-accent',
        ghost: 'hover:bg-accent'
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-9 px-4',
        lg: 'h-10 px-6'
      }
    },
    defaultVariants: { variant: 'default', size: 'md' }
  }
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
```

❌ **Bad**:
- Inline Tailwind classes over 80 characters
- Inline `className` strings without `cn()` utility
- Hardcoded colors instead of Tailwind tokens
- Deeply nested Tailwind classes

### 6. React Hook Form + Zod

✅ **Good**:
```tsx
// src/components/forms/LoginForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters')
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = (data: LoginFormData) => {
    // Handle submission
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      <Button type="submit">Login</Button>
    </form>
  )
}
```

❌ **Bad**:
- Manual validation instead of Zod
- Separate validation schemas and form data types
- No error message rendering
- Form state scattered across components

### 7. Context & State Management

✅ **Good**:
```tsx
// src/app/context/ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

interface ThemeContextType {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be inside ThemeProvider')
  return context
}
```

❌ **Bad**:
- Contexts without custom hooks
- Missing Provider validation in hooks
- Storing mutable objects directly in context
- Contexts that change on every render

---

## File Organization

```
src/
├── app/
│   ├── context/         # React Context providers (AuthContext, ThemeContext)
│   ├── router/          # Route definitions
│   └── App.tsx          # Root component
├── components/
│   ├── ui/              # Radix UI + Tailwind primitives (Button, Card, etc)
│   ├── dashboard/       # Feature-specific components (grouped by page)
│   ├── forms/           # Form components
│   └── *.tsx            # Shared components
├── hooks/               # Custom hooks (useUserData, useFinancial, etc)
├── services/            # API service layer (userService, financialService)
├── types/               # TypeScript interfaces & types
├── lib/                 # Utilities (api.ts, axiosConfig.ts, utils.ts)
├── pages/               # Page components
└── styles/              # Global styles
```

**Naming Conventions**:
- Components: PascalCase (`UserCard.tsx`)
- Hooks: camelCase with `use` prefix (`useUserData.ts`)
- Services: camelCase with `Service` suffix (`userService.ts`)
- Types: PascalCase (`User`, `AuthContextType`)
- Utils: camelCase (`formatCurrency.ts`)

---

## Boundaries & Constraints

### ❌ DO NOT

1. **Never add dependencies without approval** - Avoid adding new npm packages. Request approval first.
2. **Never commit secrets** - API keys, tokens, or credentials must use environment variables with `VITE_` prefix.
3. **Never skip TypeScript** - All files must be `.tsx` or `.ts`, use strict mode. No `any` types without `// @ts-ignore` + reason.
4. **Never mutate imported objects** - Always create new objects: `setData({ ...data, field: newValue })`
5. **Never use default exports for components** - Only named exports: `export function MyComponent() {}`
6. **Never fetch data in render** - Use hooks/effects only. No API calls in component body.
7. **Never break folder structure** - Keep components organized by feature, not by type.
8. **Never hardcode API endpoints** - Use environment variables or service layer constants.
9. **Never nest components beyond 2 levels** - Split into separate components if needed.
10. **Never console.log in production** - Use proper error handling or logging service.

### ✅ DO

1. **Always validate data at boundaries** - Use Zod for user input, type-check API responses.
2. **Always handle errors explicitly** - Try/catch in services, error states in hooks.
3. **Always keep components under 150 lines** - Extract logic to hooks or smaller components.
4. **Always use path aliases** - `import from '@/...'` not `'../../..'`
5. **Always add TypeScript interfaces** - For function params, context values, API responses.
6. **Always test on different screen sizes** - Tailwind responsive classes required for dashboards.

---

## Plan-Act-Reflect Flow

### When Writing Code:

**PLAN**: Outline the structure
```
1. Which folder should this go in?
2. What types do I need to define?
3. Do I need a service call or just local state?
4. Will this component need props or context?
```

**ACT**: Write in small, modular steps
- Create types first
- Write the service/hook
- Build the component
- Add error handling
- Connect to UI

**REFLECT**: Validate against rules
- ✓ TypeScript strict mode passes?
- ✓ No direct API calls in components?
- ✓ Component under 150 lines?
- ✓ All props typed?
- ✓ Error states handled?
- ✓ Uses path aliases?
- ✓ Follows file organization?

---

## Environment Variables

```
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=MaplePlan
```

Access in code: `import.meta.env.VITE_API_URL`

---

## Key Entry Points

- **App Bootstrap**: `src/index.tsx` (ReactDOM.render)
- **Main App**: `src/app/App.tsx` (Router + Providers)
- **Auth**: `src/app/context/AuthContext.tsx` + `src/services/authService.ts`
- **API Base**: `src/lib/axiosConfig.ts`
- **Utils**: `src/lib/utils.ts` (cn(), type helpers)

---

## Common Tasks

### Add a New Page
1. Create file in `src/pages/{feature}/{FeaturePage.tsx}`
2. Add route in `src/app/router/Router.tsx`
3. Create feature hook in `src/hooks/use{Feature}.ts` if needed
4. Create service in `src/services/{feature}Service.ts` if API calls needed

### Add a New Component
1. Create file in `src/components/{feature}/{FeatureComponent.tsx}`
2. Define Props interface
3. Use hooks for state/data
4. Return JSX with Tailwind classes
5. Export named export

### Add a New Service
1. Create file in `src/services/{feature}Service.ts`
2. Export singleton object with async methods
3. Use typed axios calls
4. Handle errors explicitly
5. Return typed responses

### Modify a Type
1. Edit file in `src/types/{domain}.ts`
2. Update all usages across codebase
3. Verify TypeScript compilation

---

## Debugging

- **Dev Server**: `pnpm start` (Vite with HMR)
- **Build Check**: `pnpm build` (catches TypeScript errors)
- **Network**: Check `/api/*` proxy in browser DevTools
- **Auth Issues**: Check localStorage `token` value
- **Styling**: Verify Tailwind class names exist in safelist or template

---

## Notes for AI Agents

- This project uses **Portuguese** in comments and some variable names—respect this.
- **Strict TypeScript**: All types must be explicit. No `any`.
- **Radix UI + Tailwind**: All UI components are styled with Tailwind, not CSS modules.
- **Modular Services**: Business logic lives in services, not components.
- **Immutable State**: Never mutate state objects directly.
- **Composition over Props**: Break large components into smaller ones.