import {programmingQuotes} from "~/data/programmingQuotes";

let fullName: string = "Рустам Кутаев";

export const navbarData = {
  homeTitle: "Switty's Blog | Блог Свитти",
};

export const footerData = {
  author: fullName,
  aboutAuthor:
    "Привет! Я Рустам Кутаев, и в настоящее время я Frontend Web-Developer, специализирующийся на создании интуитивно понятных и эффективных пользовательских интерфейсов.",
  authorInterest:
    "Если у вас есть интересная идея, будь то проект с открытым исходным кодом или платная работа, давайте создавать что-то необычное вместе. Открыт к сотрудничеству и новым вызовам в веб-разработке.",
  aboutTheSite:
    "Это мой персональный блог, созданный с использованием Nuxt3 и TailwindCSS, где я делюсь своими знаниями, опытом и новинками в мире веб-разработки.",
};

export const aboutPage = {
  title: fullName,
  description: "Инженер-программист, который решает реальные задачи и создает инновационные веб-решения.",
  aboutMe: "Я разработчик с многолетним опытом, увлечённый созданием функциональных и красивых решений для пользователей. Всегда стремлюсь к совершенству в коде и дизайне, постоянно изучая новые технологии и методики. Моя работа не просто код; это создание опыта, который делает жизнь людей удобнее и приятнее.",
  socialLinks: [
    {
      label: "GitHub",
      url: "https://github.com/IncludeSpecial",
      icon: "fa:github"
    },
    {
      label: "ВКонтакте",
      url: "https://vk.com/k8rnash",
      icon: "fa:vk"
    },
    {
      label: "YouTube",
      url: "https://www.youtube.com/@IDS_Switty",
      icon: "mdi:youtube"
    },
    {
      label: "Telegram",
      url: "https://t.me/IDS_Switty",
      icon: "mdi:telegram"
    },
  ],

  education: [
    {
      institution: "Благовещенский государственный педагогический университет",
      degree: "Информационные системы и технологии",
      year: "2022 - 2027"
    },
    {
      institution: "Курсы Frontend разработки",
      degree: "Сертификат",
      year: "2020"
    }
  ],

  hobbies: [
    "Программирование",
    "Дизайн",
    "Фотография",
    "Путешествия",
  ],
  projects: [
    {
      title: "",
      description: "",
      link: ""
    },
    {
      title: "",
      description: "",
      link: ""
    },
    {
      title: "",
      description: "",
      link: ""
    },

  ]
};


export const homePage = {
  title: "Главная",
  description:
    "Получите информацию по веб-разработке, соответствующие статьи, советы, обучающие ресурсы и многое другое прямо здесь.",
};

export const blogsPage = {
  title: "Блог",
  description: "Здесь вы найдете все мои записи, которые я написал и опубликовал, рассказывая о пути разработчика и новых технологиях.",
};

export const categoryPage = {
  title: "Категории",
  description:
    "Эта категория создается на основе всех тегов, упомянутых в различных записях блога, для вашего удобства и быстрого поиска интересующих тем.",
};

export const seoData = {
  description: "Switty, инженер-программист, Web-developer с опытом работы в области разработки программного обеспечения более 2 лет, специализирующийся на создании инновационных и эффективных веб-решений.",
  ogTitle: "Занимаюсь кодом и помогаю другим изучать Nuxt3, Tailwindcss, решать проблемы и просто пишу различные статьи по веб-разработке.",
  twitterDescription:
    "Сайт моего блога, где я программирую на Nuxt, Vue и т.д., а также демонстрирую свой блог, ресурсы и т.д., чтобы делиться знаниями и вдохновлять других.",
  image: "https://res.cloudinary.com/dmecmyphj/image/upload/v1673548905/nuxt-blog/cover_ntgs6u.webp",
  mySite: "https://switty.ru/",
  twitterHandle: "@Switty",
  mailAddress: "IncludeSpecial@gmail.com",
};

export const siteMetaData = [
  {
    name: "description",
    content: seoData.description
  },
  {
    property: "og:site_name",
    content: seoData.mySite
  },
  {
    property: "og:type",
    content: "website"
  },
  {
    property: "og:url",
    content: seoData.mySite
  },
  {
    property: "og:title",
    content: seoData.ogTitle
  },
  {
    property: "og:description",
    content: seoData.description
  },
  {
    property: "og:image",
    content: seoData.image
  },
  {
    name: "twitter:site",
    content: seoData.twitterHandle
  },
  {
    name: "twitter:card",
    content: "summary_large_image"
  },
  {
    name: "twitter:url",
    content: seoData.mySite
  },
  {
    name: "twitter:title",
    content: seoData.ogTitle
  },
  {
    name: "twitter:description",
    content: seoData.twitterDescription
  },
  {
    name: "twitter:image",
    content: seoData.image
  },
];
