export const site = {
  name: 'Switty',
  url: 'https://ne-nas.ru',
  title: 'Рустам — сайты, боты и серверы | Амурская область',
  description: 'Делаю сайты для бизнеса в Амурской области. На Тильде или на коде — как удобнее потом вести сайт. Рустам, Благовещенск и Свободный.',
  telegram: 'https://t.me/IDS_Switty',
  telegramHandle: '@IDS_Switty',
  email: 'refractory40@gmail.com',
  github: 'https://github.com/IncludeSpecial',
  githubHandle: 'IncludeSpecial',
  author: 'Рустам Кутаев',
  year: 2026,
} as const

export const techStack = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'Vue',
  'Nuxt',
  'React',
  'Next.js',
  'Electron',
  'Tailwind',
  'Tilda',
  'Python',
  'Linux',
  'nginx',
] as const

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  title: string
  description: string
  image: string
  imageAlt: string
  width: number
  height: number
  chrome: string
  light?: boolean
  tags: string[]
  links: ProjectLink[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'AdBlock DNS',
    description: 'Персональный DNS: блокирует рекламу и трекеры на телефоне, компьютере и роутере. Приложение ставить не нужно.',
    image: '/works/adblock.jpg',
    imageAlt: 'Сайт AdBlock DNS — блокировка рекламы и трекеров через DNS',
    width: 1440,
    height: 820,
    chrome: 'adblock.ne-nas.ru',
    tags: ['Next.js'],
    links: [{ label: 'Сайт', href: 'https://adblock.ne-nas.ru/' }],
    featured: true,
  },
  {
    title: 'Салон красоты «Елена»',
    description: 'Сайт салона в Свободном: услуги, цены, мастера и запись в WhatsApp.',
    image: '/works/elena.jpg',
    imageAlt: 'Сайт салона красоты «Елена» в Свободном',
    width: 1440,
    height: 900,
    chrome: 'Салон «Елена», Свободный',
    light: true,
    tags: ['Tilda'],
    links: [{ label: 'Сайт', href: 'https://zero-extended-soybean.tilda.ws/' }],
  },
  {
    title: 'GetBox',
    description: 'Магазин программ для Windows. Нашёл, нажал «Установить» — дальше всё само.',
    image: '/works/getbox.jpg',
    imageAlt: 'Лендинг GetBox — магазин программ для Windows',
    width: 1440,
    height: 900,
    chrome: 'getbox.ne-nas.ru',
    tags: ['Electron', 'React', 'TypeScript'],
    links: [
      { label: 'Сайт', href: 'https://getbox.ne-nas.ru/' },
      { label: 'GitHub', href: 'https://github.com/IncludeSpecial/GetBox' },
    ],
  },
  {
    title: 'DayZ Helper',
    description: 'Инструменты для игры DayZ: генератор паролей, калькулятор рейда и карта.',
    image: '/works/dayz.jpg',
    imageAlt: 'Главная страница DayZ Helper',
    width: 1440,
    height: 900,
    chrome: 'team.ne-nas.ru',
    tags: ['Nuxt', 'Vue'],
    links: [
      { label: 'Сайт', href: 'https://team.ne-nas.ru/' },
      { label: 'GitHub', href: 'https://github.com/IncludeSpecial/dayz-helper-web' },
    ],
  },
  {
    title: 'Sicilian Pizzeria Drive',
    description: 'Меню и тренажёр, чтобы команда пиццерии учила позиции наизусть.',
    image: '/works/pizza.jpg',
    imageAlt: 'Главная страница Sicilian Pizzeria Drive',
    width: 1440,
    height: 900,
    chrome: 'Sicilian Pizzeria Drive',
    tags: ['React', 'TypeScript'],
    links: [
      { label: 'Сайт', href: 'https://pizza-app-sepia-chi.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/IncludeSpecial/pizza-app' },
    ],
  },
]

export const siteServices = [
  {
    title: 'Лендинг или сайт-визитка',
    text: 'Одна страница с услугами, контактами и кнопкой, чтобы вам написать.',
  },
  {
    title: 'Сайт для салона, магазина или услуги',
    text: 'Несколько страниц: услуги, цены, фото, контакты и запись.',
  },
  {
    title: 'Сайт на Тильде',
    text: 'Вы сами меняете тексты, цены и фото в редакторе, без программиста на каждую правку.',
  },
  {
    title: 'Сайт на коде',
    text: 'Если нужен свой функционал: каталог, личный кабинет, сервис в браузере.',
  },
]

export const serverServices = [
  {
    title: 'Telegram-боты',
    text: 'Боты для записи, заявок и уведомлений.',
  },
  {
    title: 'Настройка VPS',
    text: 'Подниму сервер и подготовлю его к работе.',
  },
  {
    title: 'Обслуживание серверов',
    text: 'Nginx, деплой, мониторинг и обновления.',
  },
]

export const included = [
  'Мобильная версия',
  'Форма заявок в Telegram',
  'Яндекс Карты и базовая настройка поиска',
  'Помощь после запуска',
]

export const steps = [
  'Пишете в Telegram и коротко описываете задачу.',
  'Согласовываем структуру, я собираю черновик.',
  'Смотрите, правим и запускаем сайт.',
  'Подключаю заявки и карты, показываю, как пользоваться.',
]
