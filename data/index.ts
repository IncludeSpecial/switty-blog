let fullName: string = "Рустам Кутаев";

export const navbarData = {
  homeTitle: "Switty's Blog | Блог Свитти",
};

export const footerData = {
  author: fullName,
  aboutAuthor:
    "Привет! Я Рустам и в настоящее время я Frontend Web-Developer",
  authorInterest:
    "Если у вас есть интересная идея, как с открытым исходным кодом, так и платная, давайте работать вместе.",
  aboutTheSite:
    "Это персональный блог, созданный с помощью фреймворков Nuxt3  и TailwindCSS",
};

export const aboutPage = {
  title: fullName,
  description: "Инженер-программист, специалист по решению проблем и их созданию, web-developer.",
  aboutMe:
    "Я разработчик программного обеспечения, который большую часть своего дня проводит за написанием кода  в команде со своими друзьями или в одиночку. Когда я не занимаюсь написанием кода, делаю макеты в Figma!",
};

export const homePage = {
  title: "Главная",
  description:
    "Получите информацию по веб-разработке, соответствующие статьи, советы, обучающие ресурсы и многое другое.",
};

export const blogsPage = {
  title: "Блог",
  description: "Здесь вы найдете все записи, которые я написал и опубликовал на этом сайте.",
};

export const categoryPage = {
  title: "Категории",
  description:
    "Эта категория создается на основе всех тегов, упомянутых в различных записях блога.",
};

export const seoData = {
  description: "Switty, инженер-программист, Web-developer с опытом работы в области разработки программного обеспечения более 2 лет.",
  ogTitle: "Занимаюсь кодом и помогаю другим изучать Nuxt3, Tailwindcss, решать проблемы и просто пишу различные статьи.",
  twitterDescription:
    "Сайт моего блога, где я программирую на Nuxt, Vue и т.д., а также демонстрирую свой блог, ресурсы и т.д.",
  image: "https://res.cloudinary.com/dmecmyphj/image/upload/v1673548905/nuxt-blog/cover_ntgs6u.webp",
  mySite: "https://switty.ru/",
  twitterHandle: "@Switty",
  mailAddress: "IncludeSpecial@gmail.com",
};

export const siteMetaData = [
  { name: "description", content: seoData.description },
  { property: "og:site_name", content: seoData.mySite },
  { property: "og:type", content: "website" },
  { property: "og:url", content: seoData.mySite },
  { property: "og:title", content: seoData.ogTitle },
  { property: "og:description", content: seoData.description },
  { property: "og:image", content: seoData.image },
  { name: "twitter:site", content: seoData.twitterHandle },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:url", content: seoData.mySite },
  { name: "twitter:title", content: seoData.ogTitle },
  { name: "twitter:description", content: seoData.twitterDescription },
  { name: "twitter:image", content: seoData.image },
];
