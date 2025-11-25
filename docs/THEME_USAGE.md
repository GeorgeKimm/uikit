# Использование темы UI-Kit

## Быстрый старт

### ✅ Вариант 1: Использовать готовую тему из коробки (Рекомендуется для старта)

Используйте `UiKitThemeProvider` для быстрого подключения темы:

```tsx
import { UiKitThemeProvider } from '@george-kunka/ui-kit';
import { CssBaseline } from '@mui/material';
import App from './App';

const root = createRoot(document.getElementById('root')!);
root.render(
  <UiKitThemeProvider>
    <CssBaseline />
    <App />
  </UiKitThemeProvider>
);
```

---

## Кастомизация темы

### ✅ Вариант 2: Расширить базовую конфигурацию темы (Best Practice)

**Используйте `uiKitThemeOptions` для максимальной гибкости:**

```tsx
import { createTheme } from '@mui/material/styles';
import { uiKitThemeOptions, UiKitThemeProvider } from '@george-kunka/ui-kit';

// Создаём кастомную тему на основе базовых настроек UI-Kit
const customTheme = createTheme({
  ...uiKitThemeOptions,
  palette: {
    ...uiKitThemeOptions.palette,
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  components: {
    ...uiKitThemeOptions.components,
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // переопределяем только то, что нужно
        },
      },
    },
  },
});

root.render(
  <UiKitThemeProvider theme={customTheme}>
    <CssBaseline />
    <App />
  </UiKitThemeProvider>
);
```

**Почему это лучший подход:**
- ✅ Полный контроль над темой
- ✅ TypeScript автоматически подскажет доступные опции
- ✅ Можно использовать deep merge для сложных кастомизаций
- ✅ Чистый объект конфигурации без служебных функций

### ✅ Вариант 3: Расширить готовую тему

Если вам нужно быстро расширить готовую тему UI-Kit:

```tsx
import { createTheme } from '@mui/material/styles';
import { defaultTheme, UiKitThemeProvider } from '@george-kunka/ui-kit';

const extendedTheme = createTheme({
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    custom: {
      main: '#00ff00',
    },
  },
});

root.render(
  <UiKitThemeProvider theme={extendedTheme}>
    <App />
  </UiKitThemeProvider>
);
```

> **Примечание:** Предпочтительнее использовать `uiKitThemeOptions` (Вариант 2) для лучшей типизации.

### ✅ Вариант 4: Полностью кастомная тема

Создайте тему с нуля, не используя настройки UI-Kit:

```tsx
import { createTheme } from '@mui/material/styles';
import { UiKitThemeProvider } from '@george-kunka/ui-kit';

const myTheme = createTheme({
  palette: {
    primary: { main: '#custom-color' },
  },
});

root.render(
  <UiKitThemeProvider theme={myTheme}>
    <App />
  </UiKitThemeProvider>
);
```

## ❌ Распространенные ошибки

### Ошибка: `TypeError: theme.alpha is not a function`

**Неправильный код:**

```tsx
// ❌ НЕ ДЕЛАЙТЕ ТАК!
import { theme } from '@george-kunka/ui-kit';
import { ThemeProvider } from '@mui/material';

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
```

**Почему возникает ошибка:**

Когда вы импортируете `theme` напрямую из библиотеки, вы получаете сериализованный JSON-объект, который был экспортирован через ES-модули. При этом **теряются служебные функции**, которые MUI добавляет к theme объекту во время выполнения:

- `theme.alpha(color, value)` - для создания прозрачных цветов
- `theme.lighten(color, coefficient)` - для осветления цветов
- `theme.darken(color, coefficient)` - для затемнения цветов
- `theme.getContrastText(color)` - для получения контрастного текста
- И другие служебные методы

Компоненты MUI внутри себя используют эти функции (например, для hover эффектов), поэтому при их отсутствии приложение падает с ошибкой.

**Правильное решение:**

```tsx
// ✅ ИСПОЛЬЗУЙТЕ UiKitThemeProvider
import { UiKitThemeProvider } from '@george-kunka/ui-kit';

root.render(
  <UiKitThemeProvider>
    <App />
  </UiKitThemeProvider>
);
```

`UiKitThemeProvider` внутри использует `ThemeProvider` от MUI и правильно обрабатывает theme объект, сохраняя все служебные функции.

## Техническая деталь

### Архитектура темизации

```
UI-Kit Package (build time)
  ├─ theme.ts: createTheme({...}) → экспорт plain object
  └─ ThemeProvider.tsx: обёртка над MUI ThemeProvider

        ↓ npm publish

Consumer App (runtime)
  └─ UiKitThemeProvider → MUI ThemeProvider 
       ↓
    Augments theme object with helper functions
       ↓
    theme.alpha(), theme.lighten(), etc. становятся доступны
```

### Почему нельзя экспортировать theme с функциями?

JavaScript функции не сериализуются при экспорте ES-модулей. MUI добавляет служебные функции к theme объекту **динамически во время выполнения** внутри `ThemeProvider`. Поэтому правильный способ - всегда пропускать theme через `ThemeProvider` (или наш `UiKitThemeProvider`).

## Доступ к теме в компонентах

Если вам нужен доступ к theme внутри компонентов, используйте хук `useTheme`:

```tsx
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  
  // Теперь у вас есть полноценный theme со всеми функциями
  const semiTransparentPrimary = theme.alpha(theme.palette.primary.main, 0.5);
  
  return (
    <div style={{ backgroundColor: semiTransparentPrimary }}>
      Контент
    </div>
  );
}
```

## FAQ

### Можно ли использовать свою собственную тему вместо дефолтной?

Да! У вас есть несколько вариантов:

**Вариант A: Полностью кастомная тема (рекомендуется)**
```tsx
import { createTheme } from '@mui/material/styles';
import { UiKitThemeProvider } from '@george-kunka/ui-kit';

const myTheme = createTheme({
  palette: { primary: { main: '#custom' } },
});

<UiKitThemeProvider theme={myTheme}>
  <App />
</UiKitThemeProvider>
```

**Вариант B: Расширение базовых настроек UI-Kit**
```tsx
import { createTheme } from '@mui/material/styles';
import { uiKitThemeOptions, UiKitThemeProvider } from '@george-kunka/ui-kit';

const myTheme = createTheme({
  ...uiKitThemeOptions,
  palette: {
    ...uiKitThemeOptions.palette,
    primary: { main: '#custom' },
  },
});

<UiKitThemeProvider theme={myTheme}>
  <App />
</UiKitThemeProvider>
```

### Можно ли использовать несколько тем в одном приложении?

Да, вы можете вкладывать `ThemeProvider` (или `UiKitThemeProvider`) друг в друга:

```tsx
<UiKitThemeProvider>
  <App>
    <ThemeProvider theme={darkTheme}>
      <DarkSection />
    </ThemeProvider>
  </App>
</UiKitThemeProvider>
```

### Какая разница между `uiKitThemeOptions` и `defaultTheme`?

| | `uiKitThemeOptions` | `defaultTheme` |
|---|---|---|
| **Тип** | `ThemeOptions` (конфигурация) | `Theme` (готовая тема) |
| **Использование** | Для расширения через `createTheme()` | Для быстрого расширения |
| **TypeScript** | ✅ Лучшая типизация | ⚠️ Менее удобная типизация |
| **Рекомендация** | ✅ **Используйте это** | Опционально |

**Пример:**
```tsx
// ✅ Рекомендуется
const theme = createTheme({
  ...uiKitThemeOptions,
  palette: { /* ... */ },
});

// ⚠️ Работает, но менее удобно для TypeScript
const theme = createTheme({
  ...defaultTheme,
  palette: { /* ... */ },
});
```

### Как использовать UI-Kit компоненты без темы?

Технически возможно, но **не рекомендуется**. Компоненты UI-Kit используют MUI, которому нужен `ThemeProvider`. Минимальная настройка:

```tsx
import { UiKitThemeProvider } from '@george-kunka/ui-kit';

<UiKitThemeProvider>
  {/* Ваши компоненты */}
</UiKitThemeProvider>
```

