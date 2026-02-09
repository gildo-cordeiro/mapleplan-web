# Design Moderno - Guia de Padrões

## 🎨 Padrões aplicados com sucesso em GoalsList

### Cards
```tsx
<Card className="border-0 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-800/50 shadow-md hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-0.5 group">
  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--maple-primary)]/0 to-[var(--maple-primary)]/0 group-hover:from-[var(--maple-primary)]/5 group-hover:to-[var(--maple-primary)]/0 transition-all duration-300 rounded-lg" />
  <CardContent className="p-5 relative z-10">
```

### Progress Bars
```tsx
<div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
  <div
    className="h-full bg-gradient-to-r from-[var(--maple-primary)] to-[var(--maple-primary)]/70 rounded-full transition-all duration-500"
    style={{ width: `${value}%` }}
  />
</div>
```

### Badges
```tsx
<Badge className="text-xs font-semibold px-3 py-1 bg-X-100 dark:bg-X-900/30 hover:bg-X-200 dark:hover:bg-X-800 text-foreground">
  Texto
</Badge>
```

### Buttons
```tsx
<Button className={`text-xs font-semibold transition-all duration-200 ${activeStatus ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/50 scale-105" : "bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800 text-foreground"}`}>
```

### Headers
```tsx
<div className="flex items-center gap-5">
  <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--maple-primary)] to-[var(--maple-primary)]/70 shadow-xl shadow-[var(--maple-primary)]/30">
    <Icon className="w-7 h-7 text-white" />
  </div>
  <div className="flex-1">
    <h1 className="text-5xl font-black bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
      Título
    </h1>
  </div>
</div>
```

### Stats Cards
```tsx
<Card className={`border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${bgGradient}`}>
  <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
    <Icon className="w-6 h-6 text-white" />
  </div>
  <p className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
    {value}
  </p>
</Card>
```

## 🎯 Próximos componentes para refatorar
1. ChecklistMasterList e Items
2. DocumentsList
3. FinancesSummary e widgets
4. Dashboard sidebar
5. Login forms
