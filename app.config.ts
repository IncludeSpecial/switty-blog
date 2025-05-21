export default defineAppConfig({
  ogImage: {
    // Отключаем пресеты и используем только наши компоненты
    componentDirs: ['components/OgImage'],
    defaults: {
      // Используем режим плоской отрисовки без сложных CSS-вычислений
      colorScheme: 'light',
      cacheTtl: 60 * 60 * 24 * 7, // кэширование на 1 неделю
      // Отключаем поддержку некоторых CSS-свойств, которые вызывают ошибки
      satoriOptions: {
        // Отключаем поддержку некоторых CSS-свойств
        fonts: [
          {
            name: 'sans-serif',
            weight: 400,
            style: 'normal',
            data: new Uint8Array(),
          },
          {
            name: 'sans-serif',
            weight: 700,
            style: 'normal',
            data: new Uint8Array(),
          },
        ],
      },
    },
  },
}) 